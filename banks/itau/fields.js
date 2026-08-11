(function(root,factory){
  const layouts=typeof module==="object"&&module.exports?require("./layouts.js"):root.CNABBankModules.itau.layouts;
  const api=factory(layouts);
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABBankModules.itau.fields=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(layouts){
  "use strict";
  const getFields=(layoutKey,version="086")=>layouts.getLayout(layoutKey,version)?.fields||[];
  const getField=(layoutKey,start,end,version="086")=>getFields(layoutKey,version).find(field=>field.start===start&&field.end===end)||null;
  return{getFields,getField};
});
