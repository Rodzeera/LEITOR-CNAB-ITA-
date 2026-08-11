(function(root,factory){
  const occurrences=typeof module==="object"&&module.exports?require("./occurrences.js"):root.CNABCoreOccurrences;
  const api=factory(occurrences);
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABCoreValidator=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(occurrences){
  "use strict";
  function physicalLine(line,lineNumber){
    if(String(line).length===240)return[];
    return[occurrences.create("erro",lineNumber,1,Math.max(1,String(line).length),`Comprimento inválido: ${String(line).length} caracteres; esperado 240.`)];
  }
  function emptyFile(lines){
    return(lines||[]).length?[]:[occurrences.create("erro",1,1,3,"Arquivo vazio; não foi possível identificar o banco CNAB240.")];
  }
  return{physicalLine,emptyFile};
});
