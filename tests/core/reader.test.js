const assert=require("assert");
const reader=require("../../core/reader.js");

for(const separator of ["\r\n","\n","\r"]){
  const source=["341a","341b"].join(separator)+separator;
  assert.deepStrictEqual(reader.splitPhysicalRecords(source),["341a","341b"]);
}
assert.strictEqual(reader.bankCodeFromLines(["341arquivo"]),"341");
assert.strictEqual(reader.readBytes(Buffer.from("033registro","latin1")).bankCode,"033");
console.log("OK — CORE preserva registros físicos e identifica o código bancário.");
