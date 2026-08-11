(function(root,factory){
  const v086=typeof module==="object"&&module.exports?require("./versions/v086.js"):root.CNABBankDefinitions?.["341"]?.["086"];
  const api=factory(v086);
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABBankModules.itau.layouts=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(v086){
  "use strict";
  const versions=Object.freeze({"086":v086});
  const getDefinition=(version="086")=>versions[version]||null;
  const getLayout=(key,version="086")=>getDefinition(version)?.layouts?.[key]||null;
  return{versions,getDefinition,getLayout};
});
