(function(root,factory){
  const layouts=typeof module==="object"&&module.exports?require("./layouts.js"):root.CNABBankModules.itau.layouts;
  const api=factory(layouts);
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABBankModules.itau.notes=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(layouts){
  "use strict";
  const getNotes=(version="086")=>layouts.getDefinition(version)?.notes||{};
  const getNote=(number,version="086")=>getNotes(version)[String(number)]||null;
  return{getNotes,getNote};
});
