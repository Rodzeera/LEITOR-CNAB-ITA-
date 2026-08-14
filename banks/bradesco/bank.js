(function(root,factory){
  const isNode=typeof module==="object"&&module.exports;
  const api=factory(
    isNode?require("../../core/reader.js"):root.CNABCoreReader,
    isNode?require("../../core/utils.js"):root.CNABCoreUtils,
    isNode?require("../../core/occurrences.js"):root.CNABCoreOccurrences,
    isNode?require("../../core/validator.js"):root.CNABCoreValidator,
    isNode?require("./config.js"):root.CNABBankModules.bradesco.config,
    isNode?require("./layouts.js"):root.CNABBankModules.bradesco.layouts,
    isNode?require("./records.js"):root.CNABBankModules.bradesco.records,
    isNode?require("./interpretations.js"):root.CNABBankModules.bradesco.interpretations,
    isNode?require("./validations.js"):root.CNABBankModules.bradesco.validations
  );
  if(isNode)module.exports=api;else root.CNABBankModules.bradesco.bank=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(reader,utils,occurrences,coreValidator,config,layouts,recordRules,interpretations,validations){
  "use strict";
  const integer=utils.integer,issue=occurrences.create;
  const flowLog=(stage,message)=>{if(typeof window!=="undefined")console.info(`[${stage}] ${message}`)};

  function create(definition){
    const spec=definition||layouts.getDefinition(config.defaultVersion);
    function parse(text,name){
      const rawLines=reader.splitPhysicalRecords(text),records=[],issues=[];
      flowLog("PARSER",`Bradesco: processamento iniciado para ${rawLines.length} registro(s) físico(s)`);
      let ctx={family:"payments",form:"",lot:""},lotStart=-1,sequenceExpected=1,lots=0,expectedLot=1,openLot=null;
      rawLines.forEach((line,index)=>{
        const lineNumber=index+1,type=line[7]||"",lot=line.slice(3,7),segment=type==="3"?(line[13]||""):"",local=[];
        local.push(...coreValidator.physicalLine(line,lineNumber));
        if(line.length>=8){
          if(line.slice(0,3)!==config.bankCode)local.push(issue("erro",lineNumber,1,3,`Código do banco inválido; esperado 237 (Bradesco).`));
          if(!["0","1","3","5","9"].includes(type))local.push(issue("erro",lineNumber,8,8,`Tipo de registro inválido ou não suportado no Multipag: “${type||"vazio"}”.`));
        }
        if(type==="1"){
          const lotNumber=integer(lot);
          if(openLot)local.push(issue("erro",lineNumber,4,7,`Novo Header de Lote encontrado antes do Trailer do lote ${openLot}.`));
          if(lotNumber!==expectedLot)local.push(issue("erro",lineNumber,4,7,`Número do lote fora de sequência: esperado ${String(expectedLot).padStart(4,"0")}; encontrado ${lot||"vazio"}.`));
          expectedLot=lotNumber+1;ctx={lot,form:line.slice(11,13),family:recordRules.familyForForm(line.slice(11,13))};
          lotStart=index;sequenceExpected=1;lots++;openLot=lot;
        }
        if(["1","3","5"].includes(type)&&ctx.lot&&lot!==ctx.lot)local.push(issue("erro",lineNumber,4,7,`Código do lote não corresponde ao lote aberto (${ctx.lot}).`));
        if(type==="3"){
          const sequence=integer(line.slice(8,13));
          if(sequence!==sequenceExpected)local.push(issue("erro",lineNumber,9,13,`Sequência Bradesco inválida: esperado ${String(sequenceExpected).padStart(5,"0")}; encontrado ${line.slice(8,13)||"vazio"}.`));
          sequenceExpected=sequence+1;
        }
        const key=recordRules.variant(line,ctx),recordLayout=key&&spec.layouts[key];
        if(type==="3"&&!recordLayout)local.push(issue("erro",lineNumber,14,14,`Segmento “${segment||"vazio"}” não reconhecido para a forma de lançamento ${ctx.form||"não informada"} no layout Bradesco.`));
        const fields=(recordLayout?.fields||[]).map(field=>{
          const rawValue=utils.slice(line,field.start,field.end),fieldOccurrences=validations.fieldIssues(field,rawValue,lineNumber);
          local.push(...fieldOccurrences);
          return{...field,value:rawValue,interpreted:interpretations.interpretField(field,rawValue),issues:fieldOccurrences};
        });
        if(type==="5"){
          if(!openLot)local.push(issue("erro",lineNumber,8,8,"Trailer de Lote sem Header de Lote correspondente."));
          if(lotStart>=0){const expected=index-lotStart+1,declared=integer(line.slice(17,23));if(declared!==expected)local.push(issue("erro",lineNumber,18,23,`Total físico do lote divergente: informado ${declared}; calculado ${expected}.`))}
          lotStart=-1;openLot=null;
        }
        const title=recordRules.recordIdentity(type,segment,key);
        records.push({line:lineNumber,raw:line,type,lot,seg:segment,key,title,fields,issues:local});issues.push(...local);
      });
      const first=records[0],last=records.at(-1);
      if(first?.type!=="0")issues.push(issue("erro",first?.line||1,8,8,"O primeiro registro deve ser Header do Arquivo (tipo 0)."));
      if(last?.type!=="9")issues.push(issue("erro",last?.line||1,8,8,"O último registro deve ser Trailer do Arquivo (tipo 9)."));
      if(openLot)issues.push(issue("erro",records.at(-1)?.line||1,4,7,`Lote ${openLot} não possui Trailer de Lote.`));
      if(last?.type==="9"){
        const declaredLots=integer(last.raw.slice(17,23)),declaredRecords=integer(last.raw.slice(23,29));
        if(declaredLots!==lots)issues.push(issue("erro",last.line,18,23,`Quantidade de lotes divergente: informada ${declaredLots}; calculada ${lots}.`));
        if(declaredRecords!==records.length)issues.push(issue("erro",last.line,24,29,`Quantidade de registros divergente: informada ${declaredRecords}; calculada ${records.length}.`));
      }
      validations.validateFile(records,issues);
      flowLog("PARSER",`Bradesco: ${records.length} registro(s) processado(s)`);flowLog("VALIDATOR",`Bradesco: ${issues.length} ocorrência(s)`);
      return{name,records,issues,lots,bankCode:config.bankCode,bankName:config.bankName,layoutVersion:config.defaultVersion};
    }
    const parseBytes=(bytes,name)=>parse(reader.decodeBytes(bytes),name);
    return{parse,parseBytes,variant:recordRules.variant,recordIdentity:recordRules.recordIdentity,splitPhysicalRecords:reader.splitPhysicalRecords,decodeBytes:reader.decodeBytes};
  }
  const defaultParser=create();
  return Object.freeze({bankCode:config.bankCode,bankName:config.bankName,status:config.status,metadata:config,create,analyzeBytes:defaultParser.parseBytes,identifyRecord:recordRules.identifyRecord,getLayout:layouts.getLayout,interpretField:interpretations.interpretField,validateRecord:validations.validateRecord,validatePayment:validations.validatePayment,validateLot:validations.validateLot,validateFile:validations.validateFile});
});
