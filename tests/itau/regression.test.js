const assert=require("assert");
const crypto=require("crypto");
const fs=require("fs");
const path=require("path");
const analyzer=require("../../core/analyzer.js");
const itau=require("../../banks/itau/bank.js");
const legacy=require("../../parser/parser-core.js").create(require("../../spec.js"));

const root=path.resolve(__dirname,"../..");
const expected={
  "valido.rem":"8d039f78a350385dbf2db56f6c4157b45cb75a102b3ed340d3b8278adc524c77",
  "invalido.rem":"2847b857de465c4ff701b59702459ca08b5a247ee494f77395a95cb510cae9e9",
};
for(const [name,digest] of Object.entries(expected)){
  const bytes=fs.readFileSync(path.join(root,"exemplos",name));
  const modern=itau.analyzeBytes(bytes,name);
  const prior=legacy.parseBytes(bytes,name);
  assert.deepStrictEqual(modern,prior,`${name}: adaptador alterou o resultado Itaú`);
  assert.strictEqual(crypto.createHash("sha256").update(JSON.stringify(modern)).digest("hex"),digest,`${name}: regressão no resultado`);
  assert.strictEqual(modern.records.length,bytes.toString("latin1").replace(/(?:\r?\n)+$/," ").trimEnd().split(/\r\n|\n|\r/).length,`${name}: contagem física divergente`);
}
const validBytes=fs.readFileSync(path.join(root,"exemplos","valido.rem"));
assert.deepStrictEqual(analyzer.analyzeBytes(validBytes,"valido.rem"),itau.analyzeBytes(validBytes,"valido.rem"));
console.log("OK — Itaú v086 mantém resultados idênticos após a modularização.");
