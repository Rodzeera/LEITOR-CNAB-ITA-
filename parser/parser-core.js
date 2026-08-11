(function(root,factory){
  const isNode=typeof module==="object"&&module.exports;
  const api=factory(
    isNode?require("../banks/itau/bank.js"):root.CNABBankModules.itau.bank,
    isNode?require("../core/reader.js"):root.CNABCoreReader
  );
  if(isNode)module.exports=api;
  else root.CNABParser=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(itau,reader){
  "use strict";
  return{create:itau.create,splitPhysicalRecords:reader.splitPhysicalRecords,decodeBytes:reader.decodeBytes};
});
