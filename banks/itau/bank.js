(function(root,factory){
  const isNode=typeof module==="object"&&module.exports;
  const api=factory(
    isNode?require("../../core/reader.js"):root.CNABCoreReader,
    isNode?require("../../core/utils.js"):root.CNABCoreUtils,
    isNode?require("../../core/occurrences.js"):root.CNABCoreOccurrences,
    isNode?require("../../core/validator.js"):root.CNABCoreValidator,
    isNode?require("./config.js"):root.CNABBankModules.itau.config,
    isNode?require("./layouts.js"):root.CNABBankModules.itau.layouts,
    isNode?require("./records.js"):root.CNABBankModules.itau.records,
    isNode?require("./interpretations.js"):root.CNABBankModules.itau.interpretations,
    isNode?require("./validations.js"):root.CNABBankModules.itau.validations
  );
  if(isNode)module.exports=api;
  else root.CNABBankModules.itau.bank=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(reader,utils,occurrences,coreValidator,config,layouts,recordRules,interpretations,validations){
  "use strict";
  const integer=utils.integer;
  const issue=occurrences.create;

  function create(definition){
    const spec=definition||layouts.getDefinition(config.defaultVersion);

    function parse(text,name){
      const rawLines=reader.splitPhysicalRecords(text),records=[],issues=[];
      let ctx={family:"a",form:"",lot:""},lotStart=-1,seqExpected=1,lots=0;
      rawLines.forEach((line,index)=>{
        const lineNumber=index+1,type=line[7]||"",lot=line.slice(3,7),segment=type==="3"?(line[13]||""):"",local=[];
        local.push(...coreValidator.physicalLine(line,lineNumber));
        if(line.length>=8){
          if(line.slice(0,3)!==config.bankCode)local.push(issue("erro",lineNumber,1,3,`Código do banco inválido; esperado ${config.bankCode} (Itaú).`));
          if(!["0","1","3","5","9"].includes(type))local.push(issue("erro",lineNumber,8,8,`Tipo de registro inválido: “${type||"vazio"}”.`));
        }
        if(type==="1"){
          ctx.lot=lot;ctx.form=line.slice(11,13);
          ctx.family=["30","31"].includes(ctx.form)?"j":ctx.form==="11"?"o":ctx.form==="22"?"n":"a";
          lotStart=index;seqExpected=1;lots++;
        }
        if(["1","3","5"].includes(type)&&ctx.lot&&lot!==ctx.lot)local.push(issue("erro",lineNumber,4,7,`Código do lote não corresponde ao lote aberto (${ctx.lot}).`));
        if(type==="3"){
          const sequence=integer(line.slice(8,13));
          const complementary=["B","C","D","E","F","W","Z"].includes(segment)||(segment==="J"&&line.slice(17,19)==="52");
          if(!complementary){
            if(sequence!==seqExpected)local.push(issue("erro",lineNumber,9,13,`Sequência inválida: esperado ${String(seqExpected).padStart(5,"0")}.`));
            seqExpected=sequence+1;
          }else if(sequence!==seqExpected-1)local.push(issue("erro",lineNumber,9,13,"Complemento deve repetir o número do segmento principal correspondente."));
        }
        const key=recordRules.variant(line,ctx),layout=key&&spec.layouts[key];
        if(type==="3"&&!layout)local.push(issue("erro",lineNumber,14,14,`Segmento “${segment||"vazio"}” não reconhecido para esta forma de pagamento.`));
        const fields=(layout?.fields||[]).map(field=>{
          const value=utils.slice(line,field.start,field.end),fieldOccurrences=validations.fieldIssues(field,value,lineNumber);
          local.push(...fieldOccurrences);
          return{...field,value,interpreted:interpretations.interpretField(field,value),issues:fieldOccurrences};
        });
        if(type==="5"&&lotStart>=0){
          const expected=index-lotStart+1,declared=integer(line.slice(17,23));
          if(declared!==expected)local.push(issue("erro",lineNumber,18,23,`Total do lote divergente: informado ${declared}, calculado ${expected}.`));
          lotStart=-1;
        }
        records.push({line:lineNumber,raw:line,type,lot,seg:segment,key,title:recordRules.recordIdentity(type,segment,key),fields,issues:local});
        issues.push(...local);
      });
      const first=records[0],last=records.at(-1);
      if(first?.type!=="0")issues.push(issue("erro",first?.line||1,8,8,"O primeiro registro deve ser Header de Arquivo (tipo 0)."));
      if(last?.type!=="9")issues.push(issue("erro",last?.line||1,8,8,"O último registro deve ser Trailer de Arquivo (tipo 9)."));
      if(last?.type==="9"){
        const declaredLots=integer(last.raw.slice(17,23)),declaredRecords=integer(last.raw.slice(23,29));
        if(declaredLots!==lots)issues.push(issue("erro",last.line,18,23,`Quantidade de lotes divergente: informada ${declaredLots}, calculada ${lots}.`));
        if(declaredRecords!==records.length)issues.push(issue("erro",last.line,24,29,`Quantidade de registros divergente: informada ${declaredRecords}, calculada ${records.length}.`));
      }
      validations.validateFile(records,issues);
      return{name,records,issues,lots};
    }

    const parseBytes=(bytes,name)=>parse(reader.decodeBytes(bytes),name);
    return{parse,parseBytes,variant:recordRules.variant,recordIdentity:recordRules.recordIdentity,splitPhysicalRecords:reader.splitPhysicalRecords,decodeBytes:reader.decodeBytes};
  }

  const defaultParser=create();
  return{
    bankCode:config.bankCode,bankName:config.bankName,status:config.status,metadata:config,create,
    analyzeBytes:defaultParser.parseBytes,
    identifyRecord:recordRules.identifyRecord,
    getLayout:layouts.getLayout,
    getNote:number=>layouts.getDefinition(config.defaultVersion)?.notes?.[number]||null,
    interpretField:interpretations.interpretField,
    validateRecord:validations.validateRecord,
    validatePayment:validations.validatePayment,
    validateLot:validations.validateLot,
    validateFile:validations.validateFile
  };
});
