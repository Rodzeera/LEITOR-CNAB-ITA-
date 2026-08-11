(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABBankModules.itau.interpretations=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  function interpretField(field,value){
    if(/^9/.test(field.picture)&&/V9\((\d+)\)/.test(field.picture)){const decimals=+RegExp.$1;return(Number(value||0)/10**decimals).toLocaleString("pt-BR",{minimumFractionDigits:decimals,maximumFractionDigits:decimals})}
    if(/DDMMAAAA/i.test(field.content)&&/^\d{8}$/.test(value)&&value!=="00000000")return value.slice(0,2)+"/"+value.slice(2,4)+"/"+value.slice(4);
    if(/HHMMSS/i.test(field.content)&&/^\d{6}$/.test(value))return value.slice(0,2)+":"+value.slice(2,4)+":"+value.slice(4);
    return value.trim()||"(vazio)";
  }
  return{interpretField};
});
