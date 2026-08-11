(function(root,factory){
  const validations=typeof module==="object"&&module.exports?require("../banks/itau/validations.js"):root.CNABBankModules.itau.validations;
  const api=factory(validations);
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABNote35Validator=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(validations){
  "use strict";
  return{validate:validations.validateNote35,isValidIspb:validations.isValidIspb,paymentContext:validations.paymentContext};
});
