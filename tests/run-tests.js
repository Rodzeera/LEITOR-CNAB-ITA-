const fs=require("fs"),vm=require("vm"),path=require("path"),cp=require("child_process");
const root=path.resolve(__dirname,".."),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root,"spec.js"),"utf8"),ctx);
const spec=ctx.window.CNAB_SPEC, assert=(x,m)=>{if(!x)throw Error(m)};
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
const accountOk=note35Issues(note35Case({transfer:"PG",ispbA:"12345678"}));
assert(accountOk.length===0,"TED para Conta Pagamento aceita ISPB válido no Segmento A sem exigir Câmara 888");
const accountMissing=note35Issues(note35Case({transfer:"PG"}));
assert(accountMissing.length===1&&accountMissing[0].severity==="erro"&&accountMissing[0].message.includes("TED para Conta Pagamento"),"TED para Conta Pagamento exige ISPB");
const brokerChamber=note35Issues(note35Case({purpose:"00011",chamber:"123",ispbA:"12345678"}));
assert(brokerChamber.length===1&&brokerChamber[0].severity==="erro"&&brokerChamber[0].message.includes("Câmara 888"),"TED para Corretora exige Câmara 888");
const brokerIspb=note35Issues(note35Case({purpose:"00011",chamber:"888"}));
assert(brokerIspb.length===1&&brokerIspb[0].severity==="erro"&&brokerIspb[0].message.includes("Nenhum dos dois segmentos contém ISPB válido"),"TED para Corretora exige ISPB");
const pixOk=note35Issues(note35Case({form:"45",chamber:"009"}));
assert(pixOk.length===0,"PIX aceita exclusivamente Câmara 009 sem exigir ISPB");
const pixWrong=note35Issues(note35Case({form:"45",chamber:"888"}));
assert(pixWrong.length===1&&pixWrong[0].severity==="erro"&&pixWrong[0].message.includes("Câmara 009")&&pixWrong[0].message.includes("888 não se aplica"),"PIX não recebe regra de Câmara 888");
assert(parser.variant(put(valid[2],18,20,"009"),{form:"45",family:"a"})==="segmento_a","PIX usa o Segmento A oficial da Nota 35");
const different=note35Issues(note35Case({transfer:"PG",ispbA:"12345678",ispbB:"87654321"}));
assert(different.length===1&&different[0].severity==="aviso"&&different[0].message.includes("será considerado o valor do Segmento B"),"ISPBs válidos diferentes geram aviso e prevalência do B");
const fallbackB=note35Issues(note35Case({transfer:"PG",ispbA:"ABC12345",ispbB:"87654321"}));
assert(fallbackB.length===1&&fallbackB[0].severity==="informacao"&&fallbackB[0].message.includes("ISPB válido do Segmento B"),"ISPB B válido substitui A inconsistente");
const fallbackA=note35Issues(note35Case({transfer:"PG",ispbA:"12345678",ispbB:"ABC12345"}));
assert(fallbackA.length===1&&fallbackA[0].severity==="informacao"&&fallbackA[0].message.includes("ISPB válido do Segmento A"),"ISPB A válido substitui B inconsistente");
const bothInvalid=note35Issues(note35Case({transfer:"PG",ispbA:"ABC12345",ispbB:"8765ABCD"}));
assert(bothInvalid.length===1&&bothInvalid[0].severity==="erro","dois ISPBs inválidos geram um erro centralizado");
assert(note35Issues(note35Case({form:"01"})).length===0,"campos não aplicáveis aceitam zeros");
assert(note35Issues(note35Case({form:"01",chamber:"888"})).some(item=>item.severity==="erro"&&item.message.includes("Câmara 000")),"pagamento não aplicável não aceita Câmara 888");
assert(note35Issues(note35Case({form:"41",chamber:"888"})).some(item=>item.severity==="erro"&&item.message.includes("não foi identificado como Corretora")),"TED comum não exige nem aceita automaticamente Câmara 888");
for(const item of [accountMissing[0],brokerChamber[0],different[0],fallbackB[0]]){
  for(const requiredText of ["Tipo de pagamento identificado:","lote:","registro:","Câmara encontrada:","ISPB encontrado no Segmento A:","ISPB encontrado no Segmento B:","Valor esperado:","Nota 35"])
    assert(item.message.includes(requiredText),"mensagem da Nota 35 incompleta: "+requiredText);
}
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
  path.join(root,"interface_web.py"),
  path.join(root,"utils","component_loader.py"),
];
const parseDefinitions=sourceFiles.reduce((n,p)=>n+(fs.readFileSync(p,"utf8").match(/function parse\s*\(/g)||[]).length,0);
assert(parseDefinitions===1,"a lógica do parser deve existir em um único módulo");
assert(fs.readFileSync(path.join(root,"app.js"),"utf8").includes("CNABParser.create"),"desktop não usa o parser compartilhado");
const desktopSource=fs.readFileSync(path.join(root,"app.js"),"utf8");
const webSource=fs.readFileSync(path.join(root,"utils","component_loader.py"),"utf8");
const htmlSource=fs.readFileSync(path.join(root,"index.html"),"utf8");
const streamlitSource=fs.readFileSync(path.join(root,"interface_web.py"),"utf8");
assert(webSource.includes("parser/parser-core.js"),"web não usa o parser compartilhado");
assert(webSource.includes("parser/note35-validator.js"),"web não usa o validador compartilhado da Nota 35");
assert(htmlSource.includes('src="parser/note35-validator.js"'),"desktop não usa o validador compartilhado da Nota 35");
assert(htmlSource.includes('value="informacao"'),"filtro de informações ausente");
assert(desktopSource.includes("parseBytes")&&!desktopSource.includes("readAsText"),"desktop não usa o fluxo único de bytes");
assert(!webSource.includes("TextDecoder"),"web altera o texto antes do parser");
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
console.log("OK — apresentação preservada e regras cruzadas da Nota 35 validadas.");
