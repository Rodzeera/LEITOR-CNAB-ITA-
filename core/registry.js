(function(root,factory){
  const isNode=typeof module==="object"&&module.exports;
  const api=factory(
    isNode?require("../banks/base.js"):root.CNABBankBase,
    isNode?require("../banks/itau/bank.js"):root.CNABBankModules.itau.bank,
    isNode?require("../banks/santander/bank.js"):root.CNABBankModules.santander.bank,
    isNode?require("../banks/bradesco/bank.js"):root.CNABBankModules.bradesco.bank
  );
  if(isNode)module.exports=api;
  else root.CNABBankRegistry=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(base,itau,santander,bradesco){
  "use strict";
  const entries=new Map();
  const register=bank=>{const valid=base.assertContract(bank);entries.set(valid.bankCode,valid);return valid};
  [itau,santander,bradesco].forEach(register);
  const get=bankCode=>entries.get(String(bankCode||""))||null;
  const list=()=>[...entries.values()];
  const active=()=>list().filter(bank=>bank.status==="active");
  return{register,get,list,active};
});
