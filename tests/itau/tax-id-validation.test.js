const assert=require("assert");
const fs=require("fs");
const path=require("path");
const validations=require("../../banks/itau/validations.js");
const itau=require("../../banks/itau/bank.js");

const validCpf="52998224725",invalidCpf="52998224724";
const validCnpj="11222333000181",invalidCnpj="11222333000180";
const put=(raw,start,end,value)=>raw.slice(0,start-1)+String(value).padStart(end-start+1,"0").slice(-(end-start+1))+raw.slice(end);

function record(key,title="Header do Arquivo",length=240){
  return{line:1,raw:" ".repeat(length),type:key.startsWith("header_")?"0":"3",lot:"0001",seg:key.includes("segmento_")?key.replace("segmento_","").split("_")[0].toUpperCase():"",key,title,fields:[],issues:[]};
}

function withPair({key="header_arquivo",type="1",number="00052998224725",typeStart=18,typeEnd=18,numberStart=19,numberEnd=32,title="Header do Arquivo",length=240}={}){
  const item=record(key,title,length);
  item.raw=put(item.raw,typeStart,typeEnd,type);
  item.raw=put(item.raw,numberStart,numberEnd,number);
  item.fields=[
    {start:typeStart,end:typeEnd,name:"TIPO DE INSCRIÇÃO",issues:[]},
    {start:numberStart,end:numberEnd,name:"Nº DE INSCRIÇÃO",issues:[]},
  ];
  return item;
}

function taxIssues(records){
  const issues=[];
  validations.validateTaxIds(records,issues);
  assert(issues.every(item=>item.rule==="CPF_CNPJ"&&item.severity==="erro"),"ocorrência fora do padrão CPF/CNPJ");
  return issues;
}

assert.strictEqual(taxIssues([withPair({type:"1",number:"000"+validCpf})]).length,0,"1. CPF válido com tipo 1");
let issues=taxIssues([withPair({type:"1",number:"000"+invalidCpf})]);
assert.strictEqual(issues.length,1,"2. CPF inválido deve gerar uma única ocorrência");
assert.match(issues[0].message,/CPF inválido.*dígitos verificadores inválidos/i);
const contextualIssue=issues[0];

const shortCpf=withPair({type:"1",number:"123"});
shortCpf.raw=" ".repeat(17)+"1"+"123";
issues=taxIssues([shortCpf]);
assert.strictEqual(issues.length,1,"3. CPF com tamanho inválido deve gerar erro");
assert.match(issues[0].message,/quantidade de dígitos incompatível com CPF/i);

assert.strictEqual(taxIssues([withPair({type:"2",number:validCnpj})]).length,0,"4. CNPJ válido com tipo 2");
issues=taxIssues([withPair({type:"2",number:invalidCnpj})]);
assert.strictEqual(issues.length,1,"5. CNPJ inválido deve gerar uma única ocorrência");
assert.match(issues[0].message,/CNPJ inválido.*dígitos verificadores inválidos/i);

const shortCnpj=withPair({type:"2",number:"123"});
shortCnpj.raw=" ".repeat(17)+"2"+"123";
issues=taxIssues([shortCnpj]);
assert.strictEqual(issues.length,1,"6. CNPJ com tamanho inválido deve gerar erro");
assert.match(issues[0].message,/quantidade de dígitos incompatível com CNPJ/i);

issues=taxIssues([withPair({type:"1",number:validCnpj})]);
assert.strictEqual(issues.length,1,"7. tipo 1 com CNPJ deve gerar uma única incompatibilidade");
assert.match(issues[0].message,/Tipo de inscrição incompatível.*CNPJ/i);

issues=taxIssues([withPair({type:"2",number:"000"+validCpf})]);
assert.strictEqual(issues.length,1,"8. tipo 2 com CPF deve gerar uma única incompatibilidade");
assert.match(issues[0].message,/Tipo de inscrição incompatível.*CPF/i);

issues=taxIssues([withPair({type:"9",number:validCnpj})]);
assert.strictEqual(issues.length,1,"9. tipo diferente de 1/2 deve gerar uma única ocorrência");
assert.match(issues[0].message,/Tipo de inscrição inválido/i);

const optionalBlank=withPair({key:"segmento_b",title:"Segmento B",type:" ",number:"              "});
assert.strictEqual(taxIssues([optionalBlank]).length,0,"10. campo opcional vazio não deve gerar erro");
const optionalZeros=withPair({key:"segmento_b",title:"Segmento B",type:"0",number:"00000000000000"});
assert.strictEqual(taxIssues([optionalZeros]).length,0,"11. campo não aplicável zerado não deve gerar erro");

assert.strictEqual(taxIssues([withPair({key:"segmento_b",title:"Segmento B",type:"1",number:"000"+validCpf})]).length,0,"12. CPF em campo maior com zeros à esquerda deve ser válido");

const sameHeader=withPair({type:"2",number:validCnpj});
const sameB=withPair({key:"segmento_b",title:"Segmento B",type:"2",number:validCnpj});
assert.strictEqual(taxIssues([sameHeader,sameB]).length,0,"13. mesmo documento válido em registros diferentes deve ser aceito");

const standalone=record("segmento_a","Segmento A");
standalone.raw=put(standalone.raw,204,217,validCnpj);
standalone.fields=[{start:204,end:217,name:"Nº DE INSCRIÇÃO",issues:[]}];
assert.strictEqual(taxIssues([standalone]).length,0,"campo explícito de CPF/CNPJ do Segmento A deve ser validado");
standalone.raw=put(standalone.raw,204,217,invalidCnpj);
assert.strictEqual(taxIssues([standalone]).length,1,"CNPJ inválido isolado do Segmento A deve gerar erro");

const invoice=record("segmento_a_pix","Segmento A — Liquidação Eletrônica");
invoice.raw=put(invoice.raw,178,191,invalidCnpj);
invoice.raw=put(invoice.raw,218,218,"2");
invoice.fields=[{start:178,end:191,name:"Nº NOTA FISCAL / CNPJ",issues:[]}];
assert.strictEqual(taxIssues([invoice]).length,0,"Nota Fiscal com identificação 2 não pode ser tratada como CNPJ");
invoice.raw=put(invoice.raw,218,218,"3");
assert.strictEqual(taxIssues([invoice]).length,1,"CNPJ de terceiros/filial inválido deve gerar erro");

for(const fragment of ["registro:","segmento:","lote:","posições:","valor encontrado:"])
  assert(contextualIssue.message.includes(fragment),`mensagem sem contexto obrigatório: ${fragment}`);

const samplePath=path.resolve(__dirname,"../../exemplos/valido.rem");
const sampleLines=fs.readFileSync(samplePath,"latin1").replace(/(?:\r\n|\n|\r)+$/g,"").split(/\r\n|\n|\r/);
sampleLines[0]=sampleLines[0].slice(0,18)+invalidCnpj+sampleLines[0].slice(32);
const parsed=itau.analyzeBytes(Buffer.from(sampleLines.join("\r\n"),"latin1"),"cpf-cnpj-invalido.rem");
const parsedTaxIssues=parsed.issues.filter(item=>item.rule==="CPF_CNPJ");
assert.strictEqual(parsed.records.length,6,"a validação de documento não pode alterar a contagem física");
assert.strictEqual(parsedTaxIssues.length,1,"o fluxo completo deve publicar uma única ocorrência de documento");
assert.strictEqual(parsedTaxIssues[0].line,1,"a ocorrência deve permanecer associada ao registro correto");

console.log("OK — 13 cenários globais e campos condicionais do Itaú aprovados sem duplicidade.");
