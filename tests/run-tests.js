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
const sourceFiles=[
  path.join(root,"app.js"),
  path.join(root,"parser","parser-core.js"),
  path.join(root,"interface_web.py"),
  path.join(root,"utils","component_loader.py"),
];
const parseDefinitions=sourceFiles.reduce((n,p)=>n+(fs.readFileSync(p,"utf8").match(/function parse\s*\(/g)||[]).length,0);
assert(parseDefinitions===1,"a lógica do parser deve existir em um único módulo");
assert(fs.readFileSync(path.join(root,"app.js"),"utf8").includes("CNABParser.create"),"desktop não usa o parser compartilhado");
assert(fs.readFileSync(path.join(root,"utils","component_loader.py"),"utf8").includes("parser/parser-core.js"),"web não usa o parser compartilhado");
console.log("OK — desktop e web usam o mesmo parser; 6 linhas, 6 registros e nomes corretos.");
