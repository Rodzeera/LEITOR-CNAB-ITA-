const layouts=require("../../banks/bradesco/layouts.js");

function put(raw,start,end,value,{numeric=false}={}){
  const size=end-start+1,text=String(value??"");
  const fitted=numeric?text.padStart(size,"0").slice(-size):text.padEnd(size," ").slice(0,size);
  return raw.slice(0,start-1)+fitted+raw.slice(end);
}

function record(key,overrides={}){
  const layout=layouts.getLayout(key);if(!layout)throw new Error(`Layout inexistente: ${key}`);
  let raw=" ".repeat(240);
  for(const field of layout.fields){
    const numeric=/^9/.test(field.picture),initial=field.fixed!==undefined?field.fixed:(numeric?"0".repeat(field.end-field.start+1):" ".repeat(field.end-field.start+1));
    raw=put(raw,field.start,field.end,initial,{numeric:false});
  }
  for(const [startText,value] of Object.entries(overrides)){
    const start=Number(startText),field=layout.fields.find(item=>item.start===start);
    if(!field)throw new Error(`${key}: posição inicial ${start} não encontrada`);
    raw=put(raw,field.start,field.end,value,{numeric:/^9/.test(field.picture)});
  }
  return raw;
}

function headerFile(overrides={}){return record("header_arquivo",{18:"2",19:"11222333000181",33:"CONVENIO MULTIPAG",53:"1234",59:"123456",73:"EMPRESA TESTE BRADESCO",103:"BANCO BRADESCO S.A.",143:"1",144:"06052019",152:"120000",158:"1",167:"1600",...overrides})}
function headerLot(form="01",overrides={}){const key=["30","31"].includes(form)?"header_lote_titulos":form==="11"||["16","17","18","19","21","22","23","24","25","26","27"].includes(form)?"header_lote_tributos":"header_lote_pagamentos";return record(key,{4:"1",10:key==="header_lote_tributos"?"22":"20",12:form,18:"2",19:"11222333000181",33:"CONVENIO MULTIPAG",53:"1234",59:"123456",73:"EMPRESA TESTE BRADESCO",143:"RUA TESTE",173:"10",193:"SAO PAULO",213:"01001",221:"SP",...overrides})}

function detail(key,sequence,overrides={}){const defaults={4:"1",9:String(sequence)};if(key==="segmento_a")Object.assign(defaults,{15:"0",16:"00",18:"018",21:"237",24:"1234",30:"123456",44:"FAVORECIDO TESTE",94:"06052019",102:"BRL",120:"10000",155:"00000000",218:"01",220:"00001",225:"CC",230:"0"});if(key==="segmento_b")Object.assign(defaults,{18:"1",19:"52998224725",33:"RUA FAVORECIDO",63:"10",83:"CENTRO",98:"SAO PAULO",118:"01001",126:"SP",128:"00000000",226:"0"});if(key==="segmento_j")Object.assign(defaults,{15:"0",16:"00",18:"0".repeat(44),62:"CEDENTE TESTE",92:"06052019",100:"10000",145:"06052019",153:"10000",223:"09"});if(key==="segmento_j52")Object.assign(defaults,{15:" ",16:"00",20:"0",21:"0",36:"SACADO TESTE",76:"2",77:"11222333000181",92:"CEDENTE TESTE",132:"0",133:"0"});if(key==="segmento_o")Object.assign(defaults,{15:"0",16:"00",18:"0".repeat(44),62:"CONCESSIONARIA",92:"06052019",100:"06052019",108:"10000"});if(key.startsWith("segmento_n"))Object.assign(defaults,{15:"0",16:"00",58:"CONTRIBUINTE TESTE",88:"06052019",96:"10000"});if(["segmento_n1","segmento_n2","segmento_n3","segmento_n4"].includes(key))Object.assign(defaults,{117:"01",119:"11222333000181",133:key==="segmento_n1"?"17":key==="segmento_n3"?"18":"16"});if(key==="segmento_n1")Object.assign(defaults,{111:"2100",135:"052019"});if(key==="segmento_n2")Object.assign(defaults,{111:"0561",135:"06052019",205:"06052019"});if(key==="segmento_n3")Object.assign(defaults,{135:"06052019"});if(key==="segmento_n4")Object.assign(defaults,{111:"046",135:"06052019"});if(key==="segmento_w1")Object.assign(defaults,{15:"1",16:"9",179:"0181",185:"01",187:"11222333000181",201:"FGTS-TESTE",217:"123456789",226:"01"});return record(key,{...defaults,...overrides})}

function totals(details){let amount=0n,quantity=0n;for(const item of details){const seg=item[13],optional=item.slice(17,19)==="52";if(seg==="A"){amount+=BigInt(item.slice(119,134));quantity+=BigInt(item.slice(104,119))}else if(seg==="J"&&!optional){amount+=BigInt(item.slice(152,167));quantity+=BigInt(item.slice(167,182))}else if(seg==="O")amount+=BigInt(item.slice(107,122));else if(seg==="N")amount+=BigInt(item.slice(95,110))}return{amount:String(amount),quantity:String(quantity)}}

function makeFile({form="01",detailSpecs=[{key:"segmento_a"},{key:"segmento_b"}],headerOverrides={},fileOverrides={},trailerOverrides={},fileTrailerOverrides={}}={}){
  const details=detailSpecs.map((spec,index)=>detail(spec.key,index+1,spec.overrides||{})),sum=totals(details);
  const lotTrailer=record("trailer_lote",{4:"1",18:String(details.length+2),24:sum.amount,42:sum.quantity,...trailerOverrides});
  const fileTrailer=record("trailer_arquivo",{18:"1",24:String(details.length+4),...fileTrailerOverrides});
  return[headerFile(fileOverrides),headerLot(form,headerOverrides),...details,lotTrailer,fileTrailer];
}

module.exports={put,record,detail,makeFile,headerFile,headerLot,totals};
