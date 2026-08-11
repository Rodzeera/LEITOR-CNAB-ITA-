(function(root,factory){
  const isNode=typeof module==="object"&&module.exports;
  const occurrences=isNode?require("../../core/occurrences.js"):root.CNABCoreOccurrences;
  const taxId=isNode?require("../../core/tax-id.js"):root.CNABCoreTaxId;
  const api=factory(occurrences,taxId);
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABBankModules.itau.validations=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(occurrences,taxId){
  "use strict";
  const issue=occurrences.create;
  const value=(raw,start,end)=>String(raw||"").slice(start-1,end);
  const shown=raw=>{const text=String(raw??"").trim();return text?`“${text}”`:"em branco"};
  const isValidIspb=raw=>/^\d{8}$/.test(String(raw??""))&&String(raw)!=="00000000";
  const PAYMENT_TYPES={"10":"Dividendos","15":"Debêntures","20":"Fornecedores","22":"Tributos","30":"Salários","40":"Fundos de investimentos","50":"Sinistros de seguros","60":"Despesas de viajante em trânsito","80":"Representantes autorizados","90":"Benefícios","98":"Diversos"};
  const PAYMENT_FORMS={"41":"TED - outro titular","43":"TED - mesmo titular","45":"PIX Transferência"};
  const TAX_ID_PAIR_RULES=Object.freeze({
    header_arquivo:[{typeStart:18,typeEnd:18,numberStart:19,numberEnd:32,required:true}],
    header_lote_a:[{typeStart:18,typeEnd:18,numberStart:19,numberEnd:32,required:true}],
    header_lote_j:[{typeStart:18,typeEnd:18,numberStart:19,numberEnd:32,required:true}],
    header_lote_o:[{typeStart:18,typeEnd:18,numberStart:19,numberEnd:32,required:true}],
    header_lote_n:[{typeStart:18,typeEnd:18,numberStart:19,numberEnd:32,required:true}],
    segmento_b:[{typeStart:18,typeEnd:18,numberStart:19,numberEnd:32,required:false}],
    segmento_b_pix:[{typeStart:18,typeEnd:18,numberStart:19,numberEnd:32,required:false}],
    segmento_b_boleto:[{typeStart:18,typeEnd:18,numberStart:19,numberEnd:32,required:false}],
    segmento_j52:[
      {typeStart:20,typeEnd:20,numberStart:21,numberEnd:35,required:false},
      {typeStart:76,typeEnd:76,numberStart:77,numberEnd:91,required:true},
      {typeStart:132,typeEnd:132,numberStart:133,numberEnd:147,required:false},
    ],
    segmento_j52_pix:[
      {typeStart:20,typeEnd:20,numberStart:21,numberEnd:35,required:false},
      {typeStart:76,typeEnd:76,numberStart:77,numberEnd:91,required:true},
    ],
  });

  function fieldIssues(field,rawValue,lineNumber){
    const out=[],numeric=/^9/.test(field.picture),alpha=/^X/.test(field.picture);
    if(numeric&&!/^\d+$/.test(rawValue))out.push(issue("erro",lineNumber,field.start,field.end,`${field.name}: esperado campo numérico.`));
    if(alpha&&/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(rawValue))out.push(issue("erro",lineNumber,field.start,field.end,`${field.name}: caractere de controle não permitido.`));
    const fixed=field.content.replace(/\s/g,"");
    if(/^\d+$/.test(fixed)&&fixed.length===rawValue.length&&rawValue!==fixed)out.push(issue("erro",lineNumber,field.start,field.end,`${field.name}: valor fixo esperado “${fixed}”.`));
    if(field.name==="BRANCOS"&&rawValue.trim())out.push(issue("erro",lineNumber,field.start,field.end,`${field.name}: deve ser preenchido com brancos.`));
    if(field.name==="ZEROS"&&!/^0+$/.test(rawValue))out.push(issue("erro",lineNumber,field.start,field.end,`${field.name}: deve ser preenchido com zeros.`));
    if(/DDMMAAAA/i.test(field.content)&&rawValue!=="00000000"&&/^\d{8}$/.test(rawValue)){const day=+rawValue.slice(0,2),month=+rawValue.slice(2,4),year=+rawValue.slice(4),date=new Date(year,month-1,day);if(date.getFullYear()!==year||date.getMonth()!==month-1||date.getDate()!==day)out.push(issue("erro",lineNumber,field.start,field.end,`${field.name}: data inválida.`))}
    return out;
  }

  function validateRequired(records,issues){
    let form="",main=null,seen=new Set();
    const flush=()=>{if(!main)return;const required=form==="45"?["A","B"]:["30","31"].includes(form)?["J","J52"]:form==="11"?["O"]:form==="22"?["N"]:["A"];required.forEach(segment=>{if(!seen.has(segment)){const occurrence=issue("erro",main.line,14,14,`Segmento ${segment} obrigatório para a forma de pagamento ${form}.`);main.issues.push(occurrence);issues.push(occurrence)}})};
    records.forEach(record=>{if(record.type==="1"){flush();form=record.raw.slice(11,13);main=null;seen=new Set()}if(record.type==="3"){const id=record.seg==="J"&&record.raw.slice(17,19)==="52"?"J52":record.seg;if(!["B","C","D","E","F","W","Z","J52"].includes(id)){flush();main=record;seen=new Set()}seen.add(id)}if(record.type==="5")flush()});
  }

  function paymentContext(header,segmentA){
    const type=value(header?.raw,10,11),form=value(header?.raw,12,13);
    const transferType=value(segmentA.raw,113,114).trim().toUpperCase(),tedPurpose=value(segmentA.raw,220,224).trim();
    const isTed=form==="41"||form==="43",isPix=form==="45",isBroker=isTed&&tedPurpose==="00011";
    const classification=isPix?"PIX Transferência":isBroker?"TED para Corretora":isTed?"TED para outro destinatário":"Outro pagamento";
    return{type,form,transferType,tedPurpose,isTed,isPix,isBroker,classification,description:`${classification}; tipo ${type||"não informado"} - ${PAYMENT_TYPES[type]||"não identificado"}; forma ${form||"não informada"} - ${PAYMENT_FORMS[form]||"não identificada"}`};
  }

  function validateNote35(records,allIssues){
    const headers=new Map(),segmentsB=new Map();
    for(const record of records){if(record.type==="1")headers.set(record.lot,record);if(record.type==="3"&&record.seg==="B")segmentsB.set(`${record.lot}|${value(record.raw,9,13)}`,record)}
    const add=(record,start,end,message)=>{const occurrence=issue("erro",record.line,start,end,message,{rule:"NOTA_35"});record.issues.push(occurrence);allIssues.push(occurrence)};
    for(const segmentA of records){
      if(segmentA.type!=="3"||segmentA.seg!=="A")continue;
      const context=paymentContext(headers.get(segmentA.lot),segmentA);
      if(!context.isPix&&!context.isBroker)continue;
      const sequence=value(segmentA.raw,9,13),segmentB=segmentsB.get(`${segmentA.lot}|${sequence}`);
      const chamber=value(segmentA.raw,18,20),ispbA=value(segmentA.raw,105,112),ispbB=segmentB?value(segmentB.raw,233,240):"        ";
      const identification=`Tipo de pagamento identificado: ${context.description}; lote: ${segmentA.lot||"não informado"}; registro: ${sequence.trim()||"não informado"}`;
      if(context.isPix){if(chamber!=="009")add(segmentA,18,20,`Código da Câmara Centralizadora inválido para PIX Transferência. Campo: CÓDIGO DA CÂMARA CENTRALIZADORA; Segmento: A; posição: 18–20; ${identification}; valor esperado: 009; valor encontrado: ${shown(chamber)}; regra utilizada: Forma de Pagamento 45 exige Câmara 009; referência: Nota 35 do layout Itaú.`);continue}
      if(chamber!=="888")add(segmentA,18,20,`Código da Câmara Centralizadora inválido para TED destinada a Corretora. Campo: CÓDIGO DA CÂMARA CENTRALIZADORA; Segmento: A; posição: 18–20; ${identification}; Forma de Pagamento: ${context.form}; Finalidade TED: 00011 - Pagamento a Corretoras; valor esperado: 888; valor encontrado: ${shown(chamber)}; regra utilizada: TED forma 41/43 com finalidade 00011; referência: Nota 35 do layout Itaú.`);
      if(!isValidIspb(ispbA)&&!isValidIspb(ispbB))add(segmentA,105,112,`Código ISPB obrigatório não encontrado ou inválido para TED destinada a Corretora. ${identification}; Forma de Pagamento: ${context.form}; Finalidade TED: 00011 - Pagamento a Corretoras; ISPB encontrado no Segmento A, posições 105–112: ${shown(ispbA)}; ISPB encontrado no Segmento B, posições 233–240: ${shown(ispbB)}; valor esperado: ISPB estruturalmente válido em pelo menos um dos segmentos; verificar Segmento A (105–112) ou Segmento B (233–240); referência: Nota 35 do layout Itaú.`);
    }
  }

  function recordContext(record){
    const sequence=record.type==="3"?value(record.raw,9,13).trim():"não aplicável";
    return`registro: ${record.title}; segmento: ${record.seg||"não aplicável"}; lote: ${record.lot||"não informado"}; número do registro: ${sequence||"não informado"}`;
  }

  function fieldName(record,start,end){
    return record.fields.find(field=>field.start===start&&field.end===end)?.name||"NÚMERO DE INSCRIÇÃO";
  }

  function addTaxIdIssue(record,allIssues,start,end,message){
    if(record.issues.some(existing=>existing.start===start&&existing.end===end&&/esperado campo numérico/i.test(existing.message)))return;
    const occurrence=issue("erro",record.line,start,end,message,{rule:"CPF_CNPJ"});
    record.issues.push(occurrence);allIssues.push(occurrence);
    const field=record.fields.find(candidate=>candidate.start===start&&candidate.end===end);
    if(field&&!field.issues.includes(occurrence))field.issues.push(occurrence);
  }

  function taxIdMessage(record,rule,typeRaw,raw,result){
    const expected=result.expectedType||result.actualType||"CPF/CNPJ",typeLabel=typeRaw==="1"?"1 - CPF":typeRaw==="2"?"2 - CNPJ":typeRaw||"não informado";
    const base=`Campo: ${fieldName(record,rule.numberStart,rule.numberEnd)}; ${recordContext(record)}; posições: ${rule.numberStart}–${rule.numberEnd}; tipo informado: ${typeLabel}; valor encontrado: ${shown(raw)}`;
    if(result.code==="type_mismatch")return`Tipo de inscrição incompatível com o número informado. ${base}; documento identificado como: ${result.actualType}; motivo: o número possui estrutura e dígitos verificadores de ${result.actualType}, mas o tipo informado exige ${expected}.`;
    const reasons={non_numeric:"conteúdo não numérico",invalid_length:`quantidade de dígitos incompatível com ${expected}`,invalid_padding:`preenchimento físico incompatível com ${expected}`,invalid_check_digits:"dígitos verificadores inválidos"};
    return`${expected} inválido. ${base}; motivo: ${reasons[result.code]||"documento inconsistente"}.`;
  }

  function validateTaxIdPair(record,rule,allIssues){
    const typeRaw=value(record.raw,rule.typeStart,rule.typeEnd),numberRaw=value(record.raw,rule.numberStart,rule.numberEnd);
    if(!rule.required&&taxId.isEmpty(typeRaw)&&taxId.isEmpty(numberRaw))return;
    if(typeRaw!=="1"&&typeRaw!=="2"){
      addTaxIdIssue(record,allIssues,rule.typeStart,rule.typeEnd,`Tipo de inscrição inválido. Campo: ${fieldName(record,rule.typeStart,rule.typeEnd)}; ${recordContext(record)}; posição: ${rule.typeStart}; valor encontrado: ${shown(typeRaw)}; esperado: 1 - CPF ou 2 - CNPJ.`);
      return;
    }
    const expectedType=typeRaw==="1"?taxId.CPF:taxId.CNPJ,result=taxId.inspect(numberRaw,expectedType);
    if(!result.valid)addTaxIdIssue(record,allIssues,rule.numberStart,rule.numberEnd,taxIdMessage(record,rule,typeRaw,numberRaw,result));
  }

  function validateStandaloneTaxId(record,allIssues,start,end,expectedType=null){
    const raw=value(record.raw,start,end);if(taxId.isEmpty(raw))return;
    const result=expectedType?taxId.inspect(raw,expectedType):taxId.detect(raw);
    if(result.valid)return;
    const rule={numberStart:start,numberEnd:end},typeRaw=expectedType===taxId.CPF?"1":expectedType===taxId.CNPJ?"2":"";
    const normalized=expectedType?result:{...result,expectedType:result.actualType||"CPF/CNPJ"};
    addTaxIdIssue(record,allIssues,start,end,taxIdMessage(record,rule,typeRaw,raw,normalized));
  }

  function validateTaxIds(records,allIssues){
    for(const record of records){
      for(const rule of TAX_ID_PAIR_RULES[record.key]||[])validateTaxIdPair(record,rule,allIssues);
      if(record.key==="segmento_a")validateStandaloneTaxId(record,allIssues,204,217);
      if(record.key==="segmento_a_pix"){
        const identificationType=value(record.raw,218,218);
        if(identificationType==="3")validateStandaloneTaxId(record,allIssues,178,191,taxId.CNPJ);
        if(identificationType==="1")validateStandaloneTaxId(record,allIssues,204,217,taxId.CNPJ);
        else validateStandaloneTaxId(record,allIssues,204,217);
      }
    }
  }

  const validateRecord=fieldIssues;
  const validatePayment=validateNote35;
  const validateLot=()=>[];
  function validateFile(records,issues){validateRequired(records,issues);validateNote35(records,issues);validateTaxIds(records,issues)}
  return{fieldIssues,validateRequired,validateNote35,validateTaxIds,isValidIspb,paymentContext,validateRecord,validatePayment,validateLot,validateFile,TAX_ID_PAIR_RULES};
});
