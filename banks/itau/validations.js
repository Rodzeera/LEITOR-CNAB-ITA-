(function(root,factory){
  const occurrences=typeof module==="object"&&module.exports?require("../../core/occurrences.js"):root.CNABCoreOccurrences;
  const api=factory(occurrences);
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABBankModules.itau.validations=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(occurrences){
  "use strict";
  const issue=occurrences.create;
  const value=(raw,start,end)=>String(raw||"").slice(start-1,end);
  const shown=raw=>{const text=String(raw??"").trim();return text?`“${text}”`:"em branco"};
  const isValidIspb=raw=>/^\d{8}$/.test(String(raw??""))&&String(raw)!=="00000000";
  const PAYMENT_TYPES={"10":"Dividendos","15":"Debêntures","20":"Fornecedores","22":"Tributos","30":"Salários","40":"Fundos de investimentos","50":"Sinistros de seguros","60":"Despesas de viajante em trânsito","80":"Representantes autorizados","90":"Benefícios","98":"Diversos"};
  const PAYMENT_FORMS={"41":"TED - outro titular","43":"TED - mesmo titular","45":"PIX Transferência"};

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

  const validateRecord=fieldIssues;
  const validatePayment=validateNote35;
  const validateLot=()=>[];
  function validateFile(records,issues){validateRequired(records,issues);validateNote35(records,issues)}
  return{fieldIssues,validateRequired,validateNote35,isValidIspb,paymentContext,validateRecord,validatePayment,validateLot,validateFile};
});
