(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABCoreOccurrences=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const SEVERITIES=Object.freeze({ERROR:"erro",WARNING:"aviso",INFO:"informacao"});
  const create=(severity,line,start,end,message,extra)=>Object.assign({severity,line,start,end,message},extra||{});
  return{SEVERITIES,create};
});
