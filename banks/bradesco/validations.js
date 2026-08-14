(function(root,factory){
  const isNode=typeof module==="object"&&module.exports;
  const api=factory(
    isNode?require("../../core/occurrences.js"):root.CNABCoreOccurrences,
    isNode?require("../../core/tax-id.js"):root.CNABCoreTaxId,
    isNode?require("./records.js"):root.CNABBankModules.bradesco.records,
    isNode?require("./constants.js"):root.CNABBankModules.bradesco.constants,
    isNode?require("./notes.js"):root.CNABBankModules.bradesco.notes
  );
  if(isNode)module.exports=api;else root.CNABBankModules.bradesco.validations=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(occurrences,taxId,recordRules,constants,notes){
  "use strict";
  const issue=occurrences.create;
  const value=(raw,start,end)=>String(raw||"").slice(start-1,end);
  const shown=raw=>{const text=String(raw??"").trim();return text?`“${text}”`:"em branco"};
  const isDigits=raw=>/^\d+$/.test(String(raw??""));
  const isEmpty=raw=>!String(raw??"").trim()||/^[0 ]+$/.test(String(raw??""));
  const validIspb=raw=>/^\d{8}$/.test(String(raw??""))&&String(raw)!=="00000000";

  function validDate(raw){
    if(!/^\d{8}$/.test(raw)||raw==="00000000")return raw==="00000000";
    const day=+raw.slice(0,2),month=+raw.slice(2,4),year=+raw.slice(4),date=new Date(year,month-1,day);
    return date.getFullYear()===year&&date.getMonth()===month-1&&date.getDate()===day;
  }

  function fieldIssues(field,raw,lineNumber){
    const out=[],numeric=/^9/.test(field.picture),alpha=/^X/.test(field.picture);
    if(numeric&&!isDigits(raw))out.push(issue("erro",lineNumber,field.start,field.end,`${field.name}: esperado campo numérico conforme o layout Bradesco.`));
    if(alpha&&/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(raw))out.push(issue("erro",lineNumber,field.start,field.end,`${field.name}: caractere de controle não permitido.`));
    if(field.fixed!==undefined&&raw!==field.fixed)out.push(issue("erro",lineNumber,field.start,field.end,`${field.name}: valor fixo esperado ${shown(field.fixed)}; encontrado ${shown(raw)}.`));
    if(field.domain&&raw.trim()&&!field.domain.includes(raw))out.push(issue("erro",lineNumber,field.start,field.end,`${field.name}: valor fora do domínio do manual Bradesco; encontrado ${shown(raw)}; permitidos: ${field.domain.join(", ")}.`));
    if(field.date==="DDMMAAAA"&&isDigits(raw)&&!validDate(raw))out.push(issue("erro",lineNumber,field.start,field.end,`${field.name}: data inválida no formato DDMMAAAA.`));
    return out;
  }

  function attach(record,allIssues,start,end,message,severity="erro",rule="BRADESCO"){
    const occurrence=issue(severity,record.line,start,end,message,{rule});
    record.issues.push(occurrence);allIssues.push(occurrence);
    const field=record.fields.find(candidate=>candidate.start===start&&candidate.end===end);
    if(field&&!field.issues.includes(occurrence))field.issues.push(occurrence);
    return occurrence;
  }

  function context(record){return`registro: ${record.title}; lote: ${record.lot||"não informado"}; linha: ${record.line}; sequência: ${record.type==="3"?(value(record.raw,9,13).trim()||"não informada"):"não aplicável"}`}

  function validateRegistrationPair(record,allIssues,typeStart,typeEnd,numberStart,numberEnd,kind="G005"){
    const typeRaw=value(record.raw,typeStart,typeEnd),numberRaw=value(record.raw,numberStart,numberEnd);
    if(isEmpty(typeRaw)&&isEmpty(numberRaw))return;
    const expected=kind==="N003"?(typeRaw==="01"?taxId.CNPJ:typeRaw==="02"?taxId.CPF:null):(typeRaw==="1"?taxId.CPF:typeRaw==="2"?taxId.CNPJ:null);
    if(!expected){
      if((kind==="G005"&&typeRaw==="0")&& !isEmpty(numberRaw))attach(record,allIssues,numberStart,numberEnd,`Número de inscrição deve ser preenchido com zeros quando o tipo G005 for 0 — Isento/Não informado; ${context(record)}; encontrado: ${shown(numberRaw)}.`,"erro","CPF_CNPJ");
      return;
    }
    const result=taxId.inspect(numberRaw,expected);
    if(result.valid)return;
    const cause={type_mismatch:`tipo incompatível; o número corresponde a ${result.actualType}`,non_numeric:"conteúdo não numérico",invalid_length:`quantidade de dígitos incompatível com ${expected}`,invalid_padding:`preenchimento físico incompatível com ${expected}`,invalid_check_digits:"dígitos verificadores inválidos"}[result.code]||"documento inconsistente";
    attach(record,allIssues,numberStart,numberEnd,`${expected} inválido. Campo: ${record.fields.find(f=>f.start===numberStart&&f.end===numberEnd)?.name||"Identificação"}; tipo informado: ${shown(typeRaw)}; valor encontrado: ${shown(numberRaw)}; motivo: ${cause}; ${context(record)}.`,"erro","CPF_CNPJ");
  }

  const G005_PAIRS=Object.freeze({
    header_arquivo:[[18,18,19,32]],header_lote_pagamentos:[[18,18,19,32]],header_lote_titulos:[[18,18,19,32]],header_lote_tributos:[[18,18,19,32]],
    segmento_b:[[18,18,19,32]],segmento_j52:[[20,20,21,35],[76,76,77,91],[132,132,133,147]]
  });
  const N003_KEYS=new Set(["segmento_n1","segmento_n2","segmento_n3","segmento_n4"]);
  function validateTaxIds(records,allIssues){for(const record of records){for(const rule of G005_PAIRS[record.key]||[])validateRegistrationPair(record,allIssues,...rule,"G005");if(N003_KEYS.has(record.key))validateRegistrationPair(record,allIssues,117,118,119,132,"N003");if(record.key==="segmento_w1")validateRegistrationPair(record,allIssues,185,186,187,200,"N003")}}

  function validateRequired(records,allIssues){
    let header=null,details=[];
    const flush=()=>{if(!header)return;const form=value(header.raw,12,13),family=recordRules.familyForForm(form),segments=new Set(details.map(record=>record.key));const expected=family==="titles"?["segmento_j"]:family==="barcode_taxes"?["segmento_o"]:family==="taxes"?["segmento_n","segmento_n1","segmento_n2","segmento_n3","segmento_n4"]:["segmento_a"];const present=family==="taxes"?expected.some(key=>segments.has(key)):segments.has(expected[0]);if(!present)attach(header,allIssues,12,13,`Lote Bradesco sem o segmento principal obrigatório para a forma ${form}: esperado ${family==="titles"?"Segmento J":family==="barcode_taxes"?"Segmento O":family==="taxes"?"Segmento N":"Segmento A"}.`,"erro","SEGMENTO_OBRIGATORIO");const agreement=value(header.raw,33,52).trim();if(family==="barcode_taxes"&&(/0181|0182/.test(agreement))&&!segments.has("segmento_w1"))attach(header,allIssues,33,52,`Segmento W1 obrigatório para pagamento de FGTS dos convênios 0181/0182, juntamente com o Segmento O; convênio encontrado: ${shown(agreement)}.`,"erro","FGTS_W1");header=null;details=[]};
    for(const record of records){if(record.type==="1"){flush();header=record;details=[]}else if(record.type==="3"&&header)details.push(record);else if(record.type==="5")flush()}flush();
  }

  function pairPayments(records){
    const pairs=[],headers=new Map(),currentByLot=new Map();
    for(const record of records){if(record.type==="1")headers.set(record.lot,record);if(record.type!=="3")continue;if(record.seg==="A"){const entry={header:headers.get(record.lot),a:record,b:null};pairs.push(entry);currentByLot.set(record.lot,entry)}else if(record.seg==="B"){const entry=currentByLot.get(record.lot);if(entry&&!entry.b)entry.b=record}else if(["J","O","N"].includes(record.seg))currentByLot.delete(record.lot)}
    return pairs;
  }

  function validateChamber(records,allIssues){
    for(const payment of pairPayments(records)){
      const form=value(payment.header?.raw,12,13),chamber=value(payment.a.raw,18,20),applicable=["03","41","43"].includes(form);
      if(!applicable)continue;
      const expected=form==="03"?["018","700","888"]:["018","888"];
      if(!expected.includes(chamber))attach(payment.a,allIssues,18,20,`Código da Câmara Centralizadora inválido para a forma de lançamento ${form}. Esperado: ${expected.join(" ou ")}; encontrado: ${shown(chamber)}; ${context(payment.a)}; referência: P001 e G029 do Layout Multipag Bradesco v04.`,"erro","CAMARA_BRADESCO");
      if(chamber==="888"){
        const ispb=payment.b?value(payment.b.raw,233,240):"";
        if(!validIspb(ispb))attach(payment.b||payment.a,allIssues,payment.b?233:18,payment.b?240:20,`Código ISPB obrigatório para TED com Câmara 888. Segmento B, posições 233–240: ${shown(ispb)}; ${context(payment.a)}; referência: P001/P015 do Layout Multipag Bradesco v04.`,"erro","ISPB_BRADESCO");
      }
    }
  }

  function validateOccurrenceCodes(records,allIssues){for(const record of records){const field=record.fields.find(candidate=>candidate.name==="CÓDIGOS DAS OCORRÊNCIAS");if(!field)continue;for(const code of notes.splitOccurrences(field.value)){if(!notes.getOccurrence(code))attach(record,allIssues,field.start,field.end,`Código de ocorrência ${shown(code)} não localizado no catálogo G059 do manual Bradesco.`,"aviso","G059")}}}

  function bigint(raw){return /^\d+$/.test(raw)?BigInt(raw):0n}
  function validateTotals(records,allIssues){
    let headerIndex=-1;
    records.forEach((record,index)=>{if(record.type==="1")headerIndex=index;if(record.type!=="5"||headerIndex<0)return;const lotRecords=records.slice(headerIndex,index+1),details=lotRecords.filter(item=>item.type==="3"),declaredCount=Number(value(record.raw,18,23));if(declaredCount!==lotRecords.length)attach(record,allIssues,18,23,`Quantidade de registros do lote divergente: informada ${declaredCount}; calculada ${lotRecords.length}.`,"erro","TOTAL_LOTE");let amount=0n,quantity=0n;for(const item of details){if(item.key==="segmento_a"){amount+=bigint(value(item.raw,120,134));quantity+=bigint(value(item.raw,105,119))}if(item.key==="segmento_j"){amount+=bigint(value(item.raw,153,167));quantity+=bigint(value(item.raw,168,182))}if(item.key==="segmento_o")amount+=bigint(value(item.raw,108,122));if(item.key&&item.key.startsWith("segmento_n"))amount+=bigint(value(item.raw,96,110))}const declaredAmount=bigint(value(record.raw,24,41)),declaredQuantity=bigint(value(record.raw,42,59));if(declaredAmount!==amount)attach(record,allIssues,24,41,`Somatória dos valores do lote divergente: informada ${declaredAmount}; calculada ${amount} (vírgula implícita preservada).`,"erro","TOTAL_LOTE");if(declaredQuantity!==quantity)attach(record,allIssues,42,59,`Somatória das quantidades de moeda divergente: informada ${declaredQuantity}; calculada ${quantity} (vírgula implícita preservada).`,"erro","TOTAL_LOTE");headerIndex=-1});
  }

  function validateFile(records,issues){validateRequired(records,issues);validateChamber(records,issues);validateTaxIds(records,issues);validateTotals(records,issues);validateOccurrenceCodes(records,issues)}
  return Object.freeze({fieldIssues,validateRecord:fieldIssues,validatePayment:validateChamber,validateLot:validateTotals,validateFile,validateRequired,validateChamber,validateTaxIds,validateTotals,validateOccurrenceCodes,validIspb,G005_PAIRS});
});
