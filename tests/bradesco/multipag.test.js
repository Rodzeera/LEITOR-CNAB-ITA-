const assert=require("assert");
const analyzer=require("../../core/analyzer.js");
const bradesco=require("../../banks/bradesco/bank.js");
const layouts=require("../../banks/bradesco/layouts.js");
const records=require("../../banks/bradesco/records.js");
const interpretations=require("../../banks/bradesco/interpretations.js");
const validations=require("../../banks/bradesco/validations.js");
const taxId=require("../../core/tax-id.js");
const {makeFile,detail,put}=require("./fixtures.js");

const parse=options=>bradesco.analyzeBytes(Buffer.from(makeFile(options).join("\r\n")+"\r\n","latin1"),"bradesco.rem");
const rules=(result,rule)=>result.issues.filter(item=>item.rule===rule);

assert.strictEqual(bradesco.bankCode,"237","1. código do banco");
assert.strictEqual(bradesco.status,"active","2. módulo ativo");
assert.strictEqual(bradesco.metadata.defaultVersion,"004","3. versão do manual");
assert.strictEqual(bradesco.metadata.fileLayout,"089","4. versão do arquivo");
assert.deepStrictEqual(bradesco.metadata.lotLayouts,{pagamentos:"045",titulos:"040",tributos:"012"},"5. versões de lote");

const allLayouts=layouts.getDefinition().layouts;
assert(Object.keys(allLayouts).length>=20,"6. catálogo de layouts completo");
for(const [key,layout] of Object.entries(allLayouts)){let expected=1;for(const field of layout.fields){assert.strictEqual(field.start,expected,`${key}: lacuna antes de ${field.name}`);assert(field.end>=field.start,`${key}: faixa inválida`);expected=field.end+1}assert.strictEqual(expected,241,`${key}: deve cobrir 1–240`)}
assert.strictEqual(records.recordIdentity("3","J","segmento_j52"),"Segmento J52","7. nome J52");
assert.strictEqual(records.recordIdentity("3","W","segmento_w1"),"Segmento W1 — FGTS","8. nome W1");

let result=parse();
assert.strictEqual(result.records.length,6,"9. uma linha física por registro");
assert.deepStrictEqual(result.records.map(item=>item.title),["Header do Arquivo","Header do Lote","Segmento A","Segmento B","Trailer do Lote","Trailer do Arquivo"],"10. identificação dos registros");
assert.strictEqual(analyzer.analyzeBytes(Buffer.from(makeFile().join("\n"),"latin1"),"route.rem").bankCode,"237","11. registry despacha 237");
assert.strictEqual(rules(result,"SEGMENTO_OBRIGATORIO").length,0,"12. Segmento A presente");
assert.strictEqual(rules(result,"TOTAL_LOTE").length,0,"13. totais válidos");
assert.strictEqual(rules(result,"CPF_CNPJ").length,0,"14. documentos válidos");
assert.strictEqual(rules(result,"CAMARA_BRADESCO").length,0,"15. pagamento comum não recebe regra indevida de câmara");
result=parse({detailSpecs:[{key:"segmento_a",overrides:{18:"000"}}]});assert.strictEqual(result.issues.filter(item=>item.start===18&&item.end===20).length,0,"15b. Câmara 000 aceita quando não aplicável");

result=parse({form:"30",detailSpecs:[{key:"segmento_j"},{key:"segmento_j52"}]});
assert.deepStrictEqual(result.records.slice(2,4).map(item=>item.title),["Segmento J","Segmento J52"],"16. títulos J/J52");
assert.strictEqual(rules(result,"SEGMENTO_OBRIGATORIO").length,0,"17. J obrigatório atendido");
result=parse({form:"11",detailSpecs:[{key:"segmento_o"}]});
assert.strictEqual(result.records[2].key,"segmento_o","18. tributo com código de barras usa O");
for(const [form,key,label] of [["17","segmento_n1","N1"],["16","segmento_n2","N2"],["18","segmento_n3","N3"],["22","segmento_n4","N4"]]){result=parse({form,detailSpecs:[{key}]});assert.strictEqual(result.records[2].key,key,`19. sublayout ${label}`)}
result=parse({form:"11",detailSpecs:[{key:"segmento_o"},{key:"segmento_w1"}]});
assert.strictEqual(result.records[3].key,"segmento_w1","20. W1 por identificador 01");
result=parse({form:"71",detailSpecs:[{key:"segmento_5_judicial"}]});
assert.strictEqual(result.records[2].key,"segmento_5_judicial","21. Segmento 5 judicial por forma 71");

result=parse({form:"03",detailSpecs:[{key:"segmento_a",overrides:{18:"018"}}]});assert.strictEqual(rules(result,"CAMARA_BRADESCO").length,0,"22. forma 03 aceita 018");
result=parse({form:"03",detailSpecs:[{key:"segmento_a",overrides:{18:"700"}}]});assert.strictEqual(rules(result,"CAMARA_BRADESCO").length,0,"23. forma 03 aceita 700");
result=parse({form:"41",detailSpecs:[{key:"segmento_a",overrides:{18:"018"}}]});assert.strictEqual(rules(result,"CAMARA_BRADESCO").length,0,"24. TED aceita 018");
result=parse({form:"41",detailSpecs:[{key:"segmento_a",overrides:{18:"700"}}]});assert.strictEqual(rules(result,"CAMARA_BRADESCO").length,1,"25. TED rejeita 700");
result=parse({form:"41",detailSpecs:[{key:"segmento_a",overrides:{18:"888"}}]});assert.strictEqual(rules(result,"ISPB_BRADESCO").length,1,"26. Câmara 888 exige ISPB no B");
result=parse({form:"41",detailSpecs:[{key:"segmento_a",overrides:{18:"888"}},{key:"segmento_b",overrides:{233:"12345678"}}]});assert.strictEqual(rules(result,"ISPB_BRADESCO").length,0,"27. Câmara 888 aceita ISPB válido no B");

const validCpf="52998224725",invalidCpf="52998224724",validCnpj="11222333000181",invalidCnpj="11222333000180";
result=parse({detailSpecs:[{key:"segmento_a"},{key:"segmento_b",overrides:{18:"1",19:validCpf}}]});assert.strictEqual(rules(result,"CPF_CNPJ").length,0,"28. CPF G005 válido");
result=parse({detailSpecs:[{key:"segmento_a"},{key:"segmento_b",overrides:{18:"1",19:invalidCpf}}]});assert.strictEqual(rules(result,"CPF_CNPJ").length,1,"29. CPF G005 inválido");
result=parse({fileOverrides:{18:"2",19:validCnpj}});assert.strictEqual(rules(result,"CPF_CNPJ").length,0,"30. CNPJ G005 válido");
result=parse({fileOverrides:{18:"2",19:invalidCnpj}});assert.strictEqual(rules(result,"CPF_CNPJ").length,1,"31. CNPJ G005 inválido");
result=parse({form:"17",detailSpecs:[{key:"segmento_n1",overrides:{117:"02",119:validCpf}}]});assert.strictEqual(rules(result,"CPF_CNPJ").length,0,"32. N003 tipo 02 valida CPF");
result=parse({form:"17",detailSpecs:[{key:"segmento_n1",overrides:{117:"01",119:validCnpj}}]});assert.strictEqual(rules(result,"CPF_CNPJ").length,0,"33. N003 tipo 01 valida CNPJ");
assert(taxId.isValidCpf(validCpf)&&taxId.isValidCnpj(validCnpj),"34. cálculo genérico reutilizado");

result=parse({detailSpecs:[{key:"segmento_b"}]});assert.strictEqual(rules(result,"SEGMENTO_OBRIGATORIO").length,1,"35. A obrigatório");
result=parse({detailSpecs:[{key:"segmento_a"}]});assert.strictEqual(rules(result,"SEGMENTO_OBRIGATORIO").length,0,"36. B não é exigido globalmente");
result=parse({form:"30",detailSpecs:[{key:"segmento_j52"}]});assert.strictEqual(rules(result,"SEGMENTO_OBRIGATORIO").length,1,"37. J obrigatório");
result=parse({form:"11",detailSpecs:[{key:"segmento_w"}]});assert.strictEqual(rules(result,"SEGMENTO_OBRIGATORIO").length,1,"38. O obrigatório");
result=parse({form:"16",detailSpecs:[{key:"segmento_w"}]});assert.strictEqual(rules(result,"SEGMENTO_OBRIGATORIO").length,1,"39. N obrigatório");
result=parse({form:"11",headerOverrides:{33:"CONVENIO 0181"},detailSpecs:[{key:"segmento_o"}]});assert.strictEqual(rules(result,"FGTS_W1").length,1,"40. convênio 0181 exige W1");
result=parse({form:"11",headerOverrides:{33:"CONVENIO 0182"},detailSpecs:[{key:"segmento_o"},{key:"segmento_w1"}]});assert.strictEqual(rules(result,"FGTS_W1").length,0,"41. convênio 0182 com W1");

const seqLines=makeFile();seqLines[3]=put(seqLines[3],9,13,"00003",{numeric:false});result=bradesco.analyzeBytes(Buffer.from(seqLines.join("\n"),"latin1"),"seq.rem");assert(result.issues.some(item=>/Sequência Bradesco inválida/.test(item.message)),"42. sequência de todo detalhe");
const short=Buffer.from(makeFile().map((line,index)=>index===2?line.slice(0,239):line).join("\n"),"latin1");result=bradesco.analyzeBytes(short,"short.rem");assert(result.issues.some(item=>/Comprimento inválido/.test(item.message)),"43. comprimento 240");
result=parse({fileOverrides:{164:"088"}});assert(result.issues.some(item=>item.start===164&&/valor fixo esperado/.test(item.message)),"44. versão de arquivo 089");
result=parse({headerOverrides:{14:"044"}});assert(result.issues.some(item=>item.start===14&&/valor fixo esperado/.test(item.message)),"45. versão de lote 045");
result=parse({trailerOverrides:{18:"9"}});assert(rules(result,"TOTAL_LOTE").length>=1,"46. total de registros do lote");
result=parse({fileTrailerOverrides:{24:"99"}});assert(result.issues.some(item=>/Quantidade de registros divergente/.test(item.message)),"47. total do arquivo");
result=parse({fileTrailerOverrides:{18:"2"}});assert(result.issues.some(item=>/Quantidade de lotes divergente/.test(item.message)),"48. total de lotes");
result=parse({trailerOverrides:{24:"999"}});assert(rules(result,"TOTAL_LOTE").some(item=>item.start===24),"49. somatória de valores");
result=parse({trailerOverrides:{42:"999"}});assert(rules(result,"TOTAL_LOTE").some(item=>item.start===42),"50. somatória de moeda");

assert.match(interpretations.interpretField({name:"CÓDIGOS DAS OCORRÊNCIAS",picture:"X(10)"},"00AK      "),/Crédito.*Câmara/s,"51. catálogo G059 interpretado");
result=parse({trailerOverrides:{231:"XX"}});assert.strictEqual(rules(result,"G059").length,1,"52. ocorrência desconhecida gera aviso");
for(const separator of ["\r\n","\n","\r"]){const lines=makeFile(),parsed=bradesco.analyzeBytes(Buffer.from(lines.join(separator)+separator,"latin1"),"eol.rem");assert.strictEqual(parsed.records.length,lines.length,`53. EOL ${JSON.stringify(separator)}`)}
const bankWrong=makeFile();bankWrong[2]="341"+bankWrong[2].slice(3);result=bradesco.analyzeBytes(Buffer.from(bankWrong.join("\n"),"latin1"),"wrong.rem");assert(result.issues.some(item=>item.start===1&&/esperado 237/.test(item.message)),"54. código de banco por registro");

console.log("OK — 54 verificações Bradesco Multipag v04 aprovadas.");
