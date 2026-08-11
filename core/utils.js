(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABCoreUtils=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const slice=(line,start,end)=>String(line||"").slice(start-1,end);
  const integer=value=>/^\d+$/.test(value)?Number(value):NaN;
  const groupBy=(items,keyOf)=>{
    const groups=new Map();
    for(const item of items||[]){const key=keyOf(item);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(item)}
    return groups;
  };
  return{slice,integer,groupBy};
});
