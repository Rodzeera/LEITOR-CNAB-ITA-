(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABBankBase=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const REQUIRED=["bankCode","bankName","status","analyzeBytes","identifyRecord","getLayout","interpretField","validateRecord","validatePayment","validateLot","validateFile"];
  function assertContract(bank){
    if(!bank||typeof bank!=="object")throw new TypeError("Módulo bancário inválido.");
    for(const name of REQUIRED){
      const valid=name==="bankCode"||name==="bankName"||name==="status"?typeof bank[name]==="string":typeof bank[name]==="function";
      if(!valid)throw new TypeError(`Módulo bancário não implementa o contrato: ${name}.`);
    }
    return bank;
  }
  return{REQUIRED:Object.freeze([...REQUIRED]),assertContract};
});
