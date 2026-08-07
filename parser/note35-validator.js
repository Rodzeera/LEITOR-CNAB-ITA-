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
    "01":"Crédito em conta corrente no Itaú","02":"Cheque pagamento/administrativo",
    "03":"DOC C","05":"Crédito em conta poupança no Itaú",
    "06":"Crédito em conta corrente de mesma titularidade","07":"DOC D",
    "10":"Ordem de pagamento à disposição","13":"Pagamento de concessionárias",
    "16":"DARF normal","17":"GPS","18":"DARF simples","19":"Tributos municipais",
    "22":"GARE-SP ICMS","25":"IPVA","27":"DPVAT","30":"Título no Itaú",
    "31":"Título em outro banco","32":"Nota Fiscal - Liquidação Eletrônica",
    "35":"FGTS","41":"TED - outro titular","43":"TED - mesmo titular",
    "45":"PIX Transferência","47":"PIX QR-Code","60":"Cartão salário",
    "91":"GNRE e tributos com código de barras"
  };
  const GENERIC_SEGMENT_A_FORMS=new Set(["01","02","03","05","06","07","10","41","43","45","60"]);

  const value=(raw,start,end)=>String(raw||"").slice(start-1,end);
  const shown=raw=>{
    const text=String(raw??"").trim();
    return text&& !/^0+$/.test(text)?`“${text}”`:"não informado";
  };
  const isEmptyIspb=raw=>/^(?: {8}|0{8})$/.test(String(raw??""));
  const isValidIspb=raw=>/^\d{8}$/.test(String(raw??""))&&String(raw)!=="00000000";
  const isInvalidPresentIspb=raw=>!isEmptyIspb(raw)&&!isValidIspb(raw);

  function paymentContext(header,segmentA){
    const type=value(header?.raw,10,11),form=value(header?.raw,12,13);
    const transferType=value(segmentA.raw,113,114).trim().toUpperCase();
    const tedPurpose=value(segmentA.raw,220,224).trim();
    const isTed=form==="41"||form==="43",isPix=form==="45";
    let classification="Outro pagamento";
    if(isPix)classification="PIX Transferência";
    else if(isTed&&tedPurpose==="00011")classification="TED para Corretora";
    else if(isTed&&transferType==="PG")classification="TED para Conta Pagamento";
    else if(isTed)classification="TED para outro destinatário";
    return{
      type,form,transferType,tedPurpose,isTed,isPix,classification,
      description:`${classification}; tipo ${type||"não informado"} - ${PAYMENT_TYPES[type]||"não identificado"}; forma ${form||"não informada"} - ${PAYMENT_FORMS[form]||"não identificada"}`
    };
  }

  function validate(records,allIssues){
    const headers=new Map(),segmentsB=new Map();
    for(const record of records){
      if(record.type==="1")headers.set(record.lot,record);
      if(record.type==="3"&&record.seg==="B")segmentsB.set(`${record.lot}|${value(record.raw,9,13)}`,record);
    }

    function add(record,severity,start,end,context,chamber,ispbA,ispbB,expected,detail){
      const message=`Nota 35 - Tipo de pagamento identificado: ${context.description}; lote: ${record.lot||"não informado"}; registro: ${value(record.raw,9,13).trim()||"não informado"}; Câmara encontrada: ${shown(chamber)}; ISPB encontrado no Segmento A: ${shown(ispbA)}; ISPB encontrado no Segmento B: ${shown(ispbB)}; Valor esperado: ${expected}. ${detail}`;
      const validationIssue={severity,line:record.line,start,end,message,rule:"NOTA_35"};
      record.issues.push(validationIssue);allIssues.push(validationIssue);
    }

    for(const segmentA of records){
      if(segmentA.type!=="3"||segmentA.seg!=="A")continue;
      const header=headers.get(segmentA.lot),context=paymentContext(header,segmentA);
      if(!GENERIC_SEGMENT_A_FORMS.has(context.form))continue;
      const segmentB=segmentsB.get(`${segmentA.lot}|${value(segmentA.raw,9,13)}`);
      const chamber=value(segmentA.raw,18,20),ispbA=value(segmentA.raw,105,112);
      const ispbB=segmentB?value(segmentB.raw,233,240):"        ";
      const validA=isValidIspb(ispbA),validB=isValidIspb(ispbB);
      const invalidA=isInvalidPresentIspb(ispbA),invalidB=isInvalidPresentIspb(ispbB);
      const isBroker=context.isTed&&context.tedPurpose==="00011";
      const isPaymentAccount=context.isTed&&!isBroker&&context.transferType==="PG";
      const needsIspb=isBroker||isPaymentAccount;

      if(context.isPix){
        if(chamber!=="009")add(segmentA,"erro",18,20,context,chamber,ispbA,ispbB,"Câmara 009",`Para PIX, a Câmara deve ser 009; a regra 888 não se aplica.`);
        continue;
      }

      if(isBroker&&chamber!=="888")add(segmentA,"erro",18,20,context,chamber,ispbA,ispbB,"Câmara 888 e um ISPB válido no Segmento A ou B",`Para TED destinada a Corretora, a Câmara 888 é obrigatória.`);

      if(needsIspb&&!validA&&!validB){
        add(segmentA,"erro",105,112,context,chamber,ispbA,ispbB,"um ISPB estruturalmente válido, com 8 dígitos e diferente de 00000000, no Segmento A ou B",`Nenhum dos dois segmentos contém ISPB válido; o pagamento poderá ser rejeitado.`);
        continue;
      }

      if(needsIspb&&validA&&validB&&ispbA!==ispbB){
        add(segmentB||segmentA,"aviso",segmentB?233:105,segmentB?240:112,context,chamber,ispbA,ispbB,"ISPBs iguais quando ambos forem informados",`Os ISPBs são diferentes; conforme a Nota 35 do Itaú, será considerado o valor do Segmento B.`);
      }else if(needsIspb&&invalidA&&validB){
        add(segmentB||segmentA,"informacao",segmentB?233:105,segmentB?240:112,context,chamber,ispbA,ispbB,"ao menos um ISPB válido",`O ISPB do Segmento A está inconsistente; será considerado o ISPB válido do Segmento B.`);
      }else if(needsIspb&&validA&&invalidB){
        add(segmentA,"informacao",105,112,context,chamber,ispbA,ispbB,"ao menos um ISPB válido",`O ISPB do Segmento B está inconsistente; será considerado o ISPB válido do Segmento A.`);
      }

      if(!context.isTed){
        if(chamber!=="000")add(segmentA,"erro",18,20,context,chamber,ispbA,ispbB,"Câmara 000",`Câmara não aplicável a esta forma de lançamento; preencher com zeros conforme a picture numérica.`);
        if(!isEmptyIspb(ispbA))add(segmentA,"erro",105,112,context,chamber,ispbA,ispbB,"ISPB do Segmento A com oito zeros ou oito espaços",`ISPB não aplicável a esta forma de lançamento.`);
        if(segmentB&&!isEmptyIspb(ispbB))add(segmentB,"erro",233,240,context,chamber,ispbA,ispbB,"ISPB do Segmento B com oito zeros ou oito espaços",`ISPB não aplicável a esta forma de lançamento.`);
      }else if(!needsIspb){
        if(chamber!=="000")add(segmentA,"erro",18,20,context,chamber,ispbA,ispbB,"Câmara 000",`A Câmara 888 não se aplica a esta TED, pois o destinatário não foi identificado como Corretora.`);
        if(!isEmptyIspb(ispbA))add(segmentA,"erro",105,112,context,chamber,ispbA,ispbB,"ISPB do Segmento A com oito zeros ou oito espaços",`ISPB não aplicável a esta TED para outro destinatário.`);
        if(segmentB&&!isEmptyIspb(ispbB))add(segmentB,"erro",233,240,context,chamber,ispbA,ispbB,"ISPB do Segmento B com oito zeros ou oito espaços",`ISPB não aplicável a esta TED para outro destinatário.`);
      }
    }
  }

  return{validate,isValidIspb,paymentContext};
});
