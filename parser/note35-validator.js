(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABNote35Validator=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const PAYMENT_TYPES={
    "10":"Dividendos","15":"Debêntures","20":"Fornecedores","22":"Tributos",
    "30":"Salários","40":"Fundos de investimentos","50":"Sinistros de seguros",
    "60":"Despesas de viajante em trânsito","80":"Representantes autorizados",
    "90":"Benefícios","98":"Diversos"
  };
  const PAYMENT_FORMS={
    "41":"TED - outro titular","43":"TED - mesmo titular","45":"PIX Transferência"
  };

  const value=(raw,start,end)=>String(raw||"").slice(start-1,end);
  const shown=raw=>{
    const text=String(raw??"").trim();
    return text?`“${text}”`:"em branco";
  };
  const isValidIspb=raw=>/^\d{8}$/.test(String(raw??""))&&String(raw)!=="00000000";

  function paymentContext(header,segmentA){
    const type=value(header?.raw,10,11),form=value(header?.raw,12,13);
    const transferType=value(segmentA.raw,113,114).trim().toUpperCase();
    const tedPurpose=value(segmentA.raw,220,224).trim();
    const isTed=form==="41"||form==="43",isPix=form==="45";
    const isBroker=isTed&&tedPurpose==="00011";
    const classification=isPix?"PIX Transferência":isBroker?"TED para Corretora":isTed?"TED para outro destinatário":"Outro pagamento";
    return{
      type,form,transferType,tedPurpose,isTed,isPix,isBroker,classification,
      description:`${classification}; tipo ${type||"não informado"} - ${PAYMENT_TYPES[type]||"não identificado"}; forma ${form||"não informada"} - ${PAYMENT_FORMS[form]||"não identificada"}`
    };
  }

  function validate(records,allIssues){
    const headers=new Map(),segmentsB=new Map();
    for(const record of records){
      if(record.type==="1")headers.set(record.lot,record);
      if(record.type==="3"&&record.seg==="B")segmentsB.set(`${record.lot}|${value(record.raw,9,13)}`,record);
    }

    function add(record,start,end,message){
      const validationIssue={severity:"erro",line:record.line,start,end,message,rule:"NOTA_35"};
      record.issues.push(validationIssue);allIssues.push(validationIssue);
    }

    for(const segmentA of records){
      if(segmentA.type!=="3"||segmentA.seg!=="A")continue;
      const header=headers.get(segmentA.lot),context=paymentContext(header,segmentA);
      if(!context.isPix&&!context.isBroker)continue;

      const sequence=value(segmentA.raw,9,13);
      const segmentB=segmentsB.get(`${segmentA.lot}|${sequence}`);
      const chamber=value(segmentA.raw,18,20),ispbA=value(segmentA.raw,105,112);
      const ispbB=segmentB?value(segmentB.raw,233,240):"        ";
      const identification=`Tipo de pagamento identificado: ${context.description}; lote: ${segmentA.lot||"não informado"}; registro: ${sequence.trim()||"não informado"}`;

      if(context.isPix){
        if(chamber!=="009")add(segmentA,18,20,`Código da Câmara Centralizadora inválido para PIX Transferência. Campo: CÓDIGO DA CÂMARA CENTRALIZADORA; Segmento: A; posição: 18–20; ${identification}; valor esperado: 009; valor encontrado: ${shown(chamber)}; regra utilizada: Forma de Pagamento 45 exige Câmara 009; referência: Nota 35 do layout Itaú.`);
        continue;
      }

      if(chamber!=="888")add(segmentA,18,20,`Código da Câmara Centralizadora inválido para TED destinada a Corretora. Campo: CÓDIGO DA CÂMARA CENTRALIZADORA; Segmento: A; posição: 18–20; ${identification}; Forma de Pagamento: ${context.form}; Finalidade TED: 00011 - Pagamento a Corretoras; valor esperado: 888; valor encontrado: ${shown(chamber)}; regra utilizada: TED forma 41/43 com finalidade 00011; referência: Nota 35 do layout Itaú.`);

      if(!isValidIspb(ispbA)&&!isValidIspb(ispbB))add(segmentA,105,112,`Código ISPB obrigatório não encontrado ou inválido para TED destinada a Corretora. ${identification}; Forma de Pagamento: ${context.form}; Finalidade TED: 00011 - Pagamento a Corretoras; ISPB encontrado no Segmento A, posições 105–112: ${shown(ispbA)}; ISPB encontrado no Segmento B, posições 233–240: ${shown(ispbB)}; valor esperado: ISPB estruturalmente válido em pelo menos um dos segmentos; verificar Segmento A (105–112) ou Segmento B (233–240); referência: Nota 35 do layout Itaú.`);
    }
  }

  return{validate,isValidIspb,paymentContext};
});
