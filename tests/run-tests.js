const fs=require("fs"),vm=require("vm"),path=require("path"),cp=require("child_process");
const root=path.resolve(__dirname,".."),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root,"spec.js"),"utf8"),ctx);
const spec=ctx.window.CNAB_SPEC, assert=(x,m)=>{if(!x)throw Error(m)};
assert(spec.manual.version==="086","versão do manual");
assert(Object.keys(spec.layouts).length>=30,"famílias de layout");
for(const [id,l] of Object.entries(spec.layouts)){assert(l.fields.length>0,id+" sem campos");for(const f of l.fields)assert(f.start>=1&&f.end<=240&&f.start<=f.end,id+" posição inválida")}
const lines=p=>fs.readFileSync(p,"latin1").replace(/(?:\r?\n)+$/,"").split(/\r?\n/);
const valid=lines(path.join(root,"exemplos","valido.rem"));
assert(valid.length===6,"quantidade do exemplo válido");valid.forEach((l,i)=>assert(l.length===240,`linha válida ${i+1} tem ${l.length}`));
const invalid=lines(path.join(root,"exemplos","invalido.rem"));
assert(invalid.some(l=>l.length!==240),"exemplo inválido deve ter erro de tamanho");
cp.execFileSync(process.execPath,["--check",path.join(root,"app.js")]);
cp.execFileSync(process.execPath,["--check",path.join(root,"parser","parser-core.js")]);
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
assert(desktopSource.includes("parseBytes")&&!desktopSource.includes("readAsText"),"desktop não usa o fluxo único de bytes");
assert(!webSource.includes("TextDecoder"),"web altera o texto antes do parser");
assert(htmlSource.match(/id="chooseFile"/g)?.length===1,"deve existir um único botão de importação");
assert(htmlSource.includes('id="uploadVisual"')&&htmlSource.includes("disabled"),"controle visual deve estar desabilitado");
assert(!htmlSource.includes('for="file"'),"label ainda pode abrir o seletor");
assert((desktopSource.match(/\$\("#file"\)\.click\(\)/g)||[]).length===1,"mais de um evento abre o seletor");
assert(!/dragenter|dragover|dragleave|dataTransfer/.test(desktopSource),"drag & drop ainda inicia importação");
assert(!streamlitSource.includes("file_uploader"),"Streamlit ainda oferece outro upload");
assert((desktopSource.match(/<th>Observações<\/th>/g)||[]).length===1,"coluna Observações ausente ou duplicada");
assert(desktopSource.includes("fieldObservations"),"observações não estão centralizadas");
assert(desktopSource.includes('icon:"📖"')&&desktopSource.includes('icon:"📌"')&&desktopSource.includes('icon:"ℹ️"'),"ícones de observação ausentes");
assert(desktopSource.includes("${esc(f.interpreted)}</td><td>"),"valor interpretado ainda mistura observações");
console.log("OK — valor interpretado e observações estão em colunas separadas.");
