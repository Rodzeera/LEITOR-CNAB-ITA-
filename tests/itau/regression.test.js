const assert=require("assert");
const crypto=require("crypto");
const fs=require("fs");
const path=require("path");
const analyzer=require("../../core/analyzer.js");
const itau=require("../../banks/itau/bank.js");
const legacy=require("../../parser/parser-core.js").create(require("../../spec.js"));

const root=path.resolve(__dirname,"../..");
const expected={
  "valido.rem":"ba5b349f9f82f0be4665bc0f4b367e058d0d89a0eb5b71814aec8368f1160cb1",
  "invalido.rem":"6b39e6358121088d462d991b12bc307ce0928d6e7e0de0a3b7ad6adb1fb75148",
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
