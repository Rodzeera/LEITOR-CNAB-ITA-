(function(root,factory){
  const isNode=typeof module==="object"&&module.exports;
  const api=factory(
    isNode?require("./reader.js"):root.CNABCoreReader,
    isNode?require("./occurrences.js"):root.CNABCoreOccurrences,
    isNode?require("./registry.js"):root.CNABBankRegistry
  );
  if(isNode)module.exports=api;
  else root.CNABAnalyzer=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(reader,occurrences,registry){
  "use strict";
  const issue=occurrences.create;
  const flowLog=(stage,message)=>{if(typeof window!=="undefined")console.info(`[${stage}] ${message}`)};

  function physicalResult(name,lines,severity,message){
    const records=lines.map((raw,index)=>{
      const occurrence=index===0?issue(severity,1,1,3,message):null;
      return{line:index+1,raw,type:raw[7]||"",lot:raw.slice(3,7),seg:raw[7]==="3"?(raw[13]||""):"",key:null,title:"Registro não analisado",fields:[],issues:occurrence?[occurrence]:[]};
    });
    const issues=records[0]?.issues||[issue(severity,1,1,3,message)];
    return{name,records,issues,lots:0};
  }

  function analyzeBytes(input,name){
    const source=reader.readBytes(input);
    if(!source.lines.length)return physicalResult(name,[],"erro","Arquivo vazio: nenhum registro físico encontrado.");
    flowLog("BANK",`código identificado: ${source.bankCode||"não informado"}`);
    const bank=registry.get(source.bankCode);
    if(!bank)return physicalResult(name,source.lines,"erro",`Código bancário ${source.bankCode||"não informado"} não possui módulo cadastrado.`);
    flowLog("REGISTRY",`módulo selecionado: ${bank.bankName}`);
    if(bank.status!=="active")return physicalResult(name,source.lines,"informacao",`Banco ${bank.bankName} identificado. Validador CNAB240 ${bank.bankName} ainda não implementado.`);
    return bank.analyzeBytes(input,name);
  }

  function bankForResult(result){
    return registry.get(reader.bankCodeFromLines((result?.records||[]).map(record=>record.raw)));
  }

  return{analyzeBytes,bankForResult,registry};
});
