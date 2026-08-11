const fs=require("fs"),path=require("path"),cp=require("child_process");
const root=path.resolve(__dirname,"..");
const spec=require(path.join(root,"spec.js")),assert=(x,m)=>{if(!x)throw Error(m)};
assert(spec.manual.version==="086","versão do manual");
assert(Object.keys(spec.layouts).length>=30,"famílias de layout");
assert(Object.keys(spec.notes).length===42,"catálogo completo das notas 1 a 42");
assert(spec.notes["1"].includes("IDENTIFICAÇÃO DO CNPJ E AG/CONTA"),"texto oficial da Nota 1");
let noteReferences=0,explicitObservations=0;
for(const [id,l] of Object.entries(spec.layouts)){
  assert(l.fields.length>0,id+" sem campos");let expectedStart=1;
  for(const f of l.fields){
    assert(f.start===expectedStart,id+" possui lacuna ou sobreposição na posição "+expectedStart);expectedStart=f.end+1;
    assert(f.start>=1&&f.end<=240&&f.start<=f.end,id+" posição inválida");
    assert(f.name!=="Campo",id+" possui campo sem identificação na posição "+f.start);
    assert(["9","X"].includes(f.picture[0]),id+" possui tipo Picture desconhecido na posição "+f.start);
    const quantities=[...f.picture.matchAll(/\((\d+)\)/g)].map(match=>Number(match[1]));
    assert(quantities.length>0,id+" possui Picture sem quantidade na posição "+f.start);
    assert(quantities.reduce((total,value)=>total+value,0)===f.end-f.start+1,id+" possui tamanho Picture divergente na posição "+f.start);
    assert(Array.isArray(f.observations),id+" não possui observações explícitas na posição "+f.start);
    for(const observation of f.observations){
      explicitObservations++;
      assert(observation.manualPage===l.manualPage,id+" possui página de observação divergente na posição "+f.start);
      if(observation.kind==="note"){
        noteReferences++;const number=String(observation.note);
        assert(spec.notes[number],id+" referencia nota inexistente "+number);
        assert(new RegExp("\\bNOTA\\s*"+number+"\\b","i").test(f.content||""),id+" associa Nota "+number+" sem referência na tabela, posição "+f.start);
      }
    }
  }
  assert(expectedStart===241,id+" não cobre exatamente as posições 1–240");
}
assert(noteReferences===172,"quantidade auditada de referências de notas");
assert(explicitObservations===425,"quantidade auditada de observações explícitas");
const lines=p=>fs.readFileSync(p,"latin1").replace(/(?:\r?\n)+$/,"").split(/\r?\n/);
const valid=lines(path.join(root,"exemplos","valido.rem"));
assert(valid.length===6,"quantidade do exemplo válido");valid.forEach((l,i)=>assert(l.length===240,`linha válida ${i+1} tem ${l.length}`));
const invalid=lines(path.join(root,"exemplos","invalido.rem"));
assert(invalid.some(l=>l.length!==240),"exemplo inválido deve ter erro de tamanho");
cp.execFileSync(process.execPath,["--check",path.join(root,"app.js")]);
cp.execFileSync(process.execPath,["--check",path.join(root,"parser","parser-core.js")]);
cp.execFileSync(process.execPath,["--check",path.join(root,"parser","note35-validator.js")]);
const parser=require(path.join(root,"parser","parser-core.js")).create(spec);
const expected=["Header do Arquivo","Header do Lote","Segmento A","Segmento B","Trailer do Lote","Trailer do Arquivo"];
for(const separator of ["\r\n","\n","\r"]){
  const parsed=parser.parse(valid.join(separator)+separator,"valido.rem");
  assert(parsed.records.length===valid.length,`contagem física com separador ${JSON.stringify(separator)}`);
  assert(JSON.stringify(parsed.records.map(r=>r.title))===JSON.stringify(expected),"identificação dos registros");
  parsed.records.forEach((r,i)=>assert(r.raw===valid[i],"registro duplicado ou alterado"));
}
assert(parser.recordIdentity("3","J","segmento_j")==="Segmento J","nome do Segmento J");
assert(parser.recordIdentity("3","J","segmento_j52")==="Segmento J52","nome do Segmento J52");
assert(parser.recordIdentity("3","O","segmento_o")==="Segmento O","nome do Segmento O");
assert(parser.recordIdentity("3","N","segmento_n")==="Segmento N","nome do Segmento N");
const put=(line,start,end,content)=>line.slice(0,start-1)+String(content).padEnd(end-start+1," ").slice(0,end-start+1)+line.slice(end);
function note35Case({form="41",type="20",chamber="000",ispbA="00000000",transfer="  ",purpose="00010",ispbB="00000000"}={}){
  const sample=[...valid];
  sample[1]=put(put(sample[1],10,11,type),12,13,form);
  sample[2]=put(put(put(put(sample[2],18,20,chamber),105,112,ispbA),113,114,transfer),220,224,purpose);
  sample[3]=put(sample[3],233,240,ispbB);
  return parser.parse(sample.join("\r\n")+"\r\n","nota35.rem");
}
const note35Issues=result=>result.issues.filter(item=>item.rule==="NOTA_35");
assert(note35Issues(note35Case({form:"45",chamber:"009"})).length===0,"cenário 1: PIX com Câmara 009 deve ser aceito");
const pixWrong=note35Issues(note35Case({form:"45",chamber:"000"}));
assert(pixWrong.length===1&&pixWrong[0].severity==="erro"&&pixWrong[0].start===18&&pixWrong[0].end===20,"cenário 2: PIX com Câmara diferente de 009 deve gerar erro posicional");
assert(note35Issues(note35Case({form:"41",purpose:"00011",chamber:"888",ispbA:"12345678"})).length===0,"cenário 3: TED 41 Corretora com Câmara e ISPB válidos deve ser aceita");
const brokerChamber=note35Issues(note35Case({form:"41",purpose:"00011",chamber:"000",ispbA:"12345678"}));
assert(brokerChamber.length===1&&brokerChamber[0].severity==="erro"&&brokerChamber[0].start===18&&brokerChamber[0].end===20,"cenário 4: TED 41 Corretora com Câmara 000 deve gerar erro");
assert(note35Issues(note35Case({form:"43",purpose:"00011",chamber:"888",ispbB:"87654321"})).length===0,"cenário 5: TED 43 Corretora aceita ISPB válido no Segmento B");
assert(note35Issues(note35Case({form:"41",purpose:"00010",chamber:"000"})).length===0,"cenário 6: TED 41 não Corretora não exige Câmara 888");
assert(note35Issues(note35Case({form:"43",purpose:"00010",chamber:"123"})).length===0,"cenário 7: TED 43 não Corretora não recebe nova validação de Câmara");
const brokerIspb=note35Issues(note35Case({form:"41",purpose:"00011",chamber:"888",ispbA:"00000000",ispbB:"ABC12345"}));
assert(brokerIspb.length===1&&brokerIspb[0].severity==="erro"&&brokerIspb[0].start===105&&brokerIspb[0].end===112,"cenário 8: TED Corretora sem ISPB válido deve gerar erro");
assert(note35Issues(note35Case({form:"41",purpose:"00011",chamber:"888",ispbA:"12345678",ispbB:"87654321"})).length===0,"dois ISPBs válidos são aceitos e o Segmento B prevalece sem nova ocorrência");
assert(note35Issues(note35Case({form:"41",purpose:"00011",chamber:"888",ispbA:"ABC12345",ispbB:"87654321"})).length===0,"ISPB válido do Segmento B prevalece sobre A inválido");
assert(note35Issues(note35Case({form:"43",purpose:"00011",chamber:"888",ispbA:"12345678",ispbB:"ABC12345"})).length===0,"ISPB válido do Segmento A prevalece sobre B inválido");
assert(note35Issues(note35Case({form:"01",chamber:"888",ispbA:"12345678"})).length===0,"formas diferentes de 41, 43 e 45 não recebem novas ocorrências");
assert(note35Issues(note35Case({form:"47",chamber:"000"})).length===0,"PIX QR-Code forma 47 não recebe a regra exclusiva da forma 45");
for(const item of [pixWrong[0],brokerChamber[0],brokerIspb[0]]){
  for(const requiredText of ["lote:","registro:","valor esperado:","referência: Nota 35"])
    assert(item.message.includes(requiredText),"mensagem da Nota 35 incompleta: "+requiredText);
}
for(const requiredText of ["CÓDIGO DA CÂMARA CENTRALIZADORA","Segmento: A","posição: 18–20","valor encontrado:","regra utilizada:"])
  assert(brokerChamber[0].message.includes(requiredText),"mensagem de Câmara incompleta: "+requiredText);
const sampleBytes=fs.readFileSync(path.join(root,"exemplos","valido.rem"));
const desktopResult=parser.parseBytes(sampleBytes.buffer.slice(sampleBytes.byteOffset,sampleBytes.byteOffset+sampleBytes.byteLength),"valido.rem");
const transported=Uint8Array.from(Buffer.from(sampleBytes.toString("base64"),"base64"));
const webResult=parser.parseBytes(transported,"valido.rem");
assert(JSON.stringify(desktopResult)===JSON.stringify(webResult),"desktop e web divergem para os mesmos bytes");
const accented=Buffer.from("\uFEFF"+valid.join("\r\n").replace("EMPRESA TESTE","EMPRESA AÇÃO ")+"\r\n","utf8");
const bomDesktop=parser.parseBytes(accented.buffer.slice(accented.byteOffset,accented.byteOffset+accented.byteLength),"bom.rem");
const bomWeb=parser.parseBytes(Uint8Array.from(Buffer.from(accented.toString("base64"),"base64")),"bom.rem");
assert(JSON.stringify(bomDesktop)===JSON.stringify(bomWeb),"desktop e web divergem com BOM UTF-8");
assert(bomDesktop.records[0].raw.length===240,"BOM alterou as posições do primeiro registro");
const sourceFiles=[
  path.join(root,"app.js"),
  path.join(root,"parser","parser-core.js"),
  path.join(root,"banks","itau","bank.js"),
  path.join(root,"interface_web.py"),
  path.join(root,"utils","component_loader.py"),
];
const parseDefinitions=sourceFiles.reduce((n,p)=>n+(fs.readFileSync(p,"utf8").match(/function parse\s*\(/g)||[]).length,0);
assert(parseDefinitions===1,"a lógica do parser deve existir em um único módulo");
assert(fs.readFileSync(path.join(root,"app.js"),"utf8").includes("CNABAnalyzer"),"desktop não usa o analisador compartilhado");
const desktopSource=fs.readFileSync(path.join(root,"app.js"),"utf8");
const webSource=fs.readFileSync(path.join(root,"utils","component_loader.py"),"utf8");
const htmlSource=fs.readFileSync(path.join(root,"index.html"),"utf8");
const streamlitSource=fs.readFileSync(path.join(root,"interface_web.py"),"utf8");
assert(webSource.includes("parser/parser-core.js"),"web não usa o parser compartilhado");
assert(webSource.includes("parser/note35-validator.js"),"web não usa o validador compartilhado da Nota 35");
assert(htmlSource.includes('src="parser/note35-validator.js"'),"desktop não usa o validador compartilhado da Nota 35");
assert(htmlSource.includes('value="informacao"'),"filtro de informações ausente");
assert(desktopSource.includes("analyzeBytes")&&!desktopSource.includes("readAsText"),"desktop não usa o fluxo único de bytes");
assert(!webSource.includes("TextDecoder"),"web altera o texto antes do parser");
assert(desktopSource.includes('$("#file").onchange=async'),"evento change não aguarda o processamento assíncrono");
assert(desktopSource.includes("catch(error){showUploadError(error)}"),"falha do upload ainda pode ficar silenciosa");
assert(desktopSource.includes("requireAnalyzer"),"inicialização não verifica o motor CNAB240");
assert(webSource.includes("if '<script src=' in html"),"Streamlit não bloqueia scripts externos não incorporados");
assert(htmlSource.match(/id="chooseFile"/g)?.length===1,"deve existir um único botão de importação");
assert(htmlSource.includes('id="uploadVisual"')&&htmlSource.includes("disabled"),"controle visual deve estar desabilitado");
assert(!htmlSource.includes('for="file"'),"label ainda pode abrir o seletor");
assert((desktopSource.match(/\$\("#file"\)\.click\(\)/g)||[]).length===1,"mais de um evento abre o seletor");
assert(!/dragenter|dragover|dragleave|dataTransfer/.test(desktopSource),"drag & drop ainda inicia importação");
assert(!streamlitSource.includes("file_uploader"),"Streamlit ainda oferece outro upload");
assert((desktopSource.match(/<th>Observações<\/th>/g)||[]).length===1,"coluna Observações ausente ou duplicada");
assert(!desktopSource.includes("<th>Picture</th>"),"coluna Picture ainda está visível");
assert((desktopSource.match(/<th>Tipo<\/th>/g)||[]).length===1,"coluna Tipo ausente ou duplicada");
assert((desktopSource.match(/<th>Qtde<\/th>/g)||[]).length===1,"coluna Qtde ausente ou duplicada");
assert(desktopSource.includes("function pictureParts"),"Picture não é convertido automaticamente");
assert(desktopSource.includes('"9":"Numérico"')&&desktopSource.includes('X:"Caractere"'),"mapeamento de tipo incompleto");
assert(!desktopSource.includes("${esc(f.picture)}"),"notação Picture ainda é exibida");
assert(desktopSource.includes("fieldObservations"),"observações não estão centralizadas");
assert(desktopSource.includes("f.observations||[]"),"interface não usa observações explícitas por campo");
assert(!desktopSource.includes("matchAll(/NOTA"),"interface ainda infere notas pelo texto do campo");
assert(desktopSource.includes('icon:"📖"')&&desktopSource.includes('icon:"📌"')&&desktopSource.includes('icon:"ℹ️"'),"ícones de observação ausentes");
assert(desktopSource.includes("${esc(f.interpreted)}</td><td>"),"valor interpretado ainda mistura observações");
console.log("OK — regras isoladas da Nota 35 validadas sem alterar parser ou identificação de registros.");
require("./core/reader.test.js");
require("./core/tax-id.test.js");
require("./core/registry.test.js");
require("./itau/regression.test.js");
require("./itau/tax-id-validation.test.js");
require("./santander/not-implemented.test.js");
require("./bradesco/not-implemented.test.js");
