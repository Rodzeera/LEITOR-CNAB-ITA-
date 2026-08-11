const assert=require("assert");
const fs=require("fs");
const path=require("path");
const analyzer=require("../../core/analyzer.js");

const bytes=fs.readFileSync(path.resolve(__dirname,"../../exemplos/valido.rem"));
bytes.write("033",0,"latin1");
const result=analyzer.analyzeBytes(bytes,"santander.rem");
assert.strictEqual(result.records.length,6);
assert.strictEqual(result.issues.length,1);
assert.strictEqual(result.issues[0].severity,"informacao");
assert.match(result.issues[0].message,/Santander identificado/);
assert.doesNotMatch(result.issues[0].message,/esperado 341/);
console.log("OK — Santander é identificado sem aplicar regras Itaú.");
