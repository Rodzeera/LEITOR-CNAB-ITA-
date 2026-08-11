const assert=require("assert");
const base=require("../../banks/base.js");
const registry=require("../../core/registry.js");

assert.deepStrictEqual(registry.list().map(bank=>bank.bankCode),["341","033","237"]);
assert.deepStrictEqual(registry.active().map(bank=>bank.bankCode),["341"]);
for(const bank of registry.list())assert.strictEqual(base.assertContract(bank),bank);
console.log("OK — registro de bancos usa contrato comum e seleção por código.");
