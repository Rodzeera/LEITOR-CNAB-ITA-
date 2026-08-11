(function(root){
  "use strict";
  const spec=typeof module==="object"&&module.exports?require("./banks/itau/versions/v086.js"):root.CNABBankDefinitions?.["341"]?.["086"];
  if(!spec)throw new Error("Layout Itaú CNAB240 v086 não carregado.");
  if(typeof module==="object"&&module.exports)module.exports=spec;
  else root.CNAB_SPEC=spec;
})(typeof globalThis!=="undefined"?globalThis:this);
