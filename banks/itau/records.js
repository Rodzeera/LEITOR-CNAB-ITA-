(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABBankModules.itau.records=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  function variant(line,ctx){
    const type=line[7],seg=line[13]||"";
    if(type==="0")return"header_arquivo";
    if(type==="9")return"trailer_arquivo";
    if(type==="1"){const form=line.slice(11,13);return["30","31"].includes(form)?"header_lote_j":form==="11"?"header_lote_o":form==="22"?"header_lote_n":"header_lote_a"}
    if(type==="5")return ctx.family==="j"?"trailer_lote_j":ctx.family==="o"?"trailer_lote_o":ctx.family==="n"?"trailer_lote_n":"trailer_lote_a";
    if(type!=="3")return null;
    if(seg==="A")return"segmento_a";
    if(seg==="J"){const code=line.slice(17,19);return code==="52"?(line.slice(19,20)==="P"?"segmento_j52_pix":"segmento_j52"):"segmento_j"}
    if(seg==="B")return ctx.family==="j"?"segmento_b_boleto":ctx.family==="n"?"segmento_b_n":ctx.form==="45"?"segmento_b_pix":"segmento_b";
    if(seg==="C")return ctx.family==="j"?"segmento_c_boleto":"segmento_c";
    if(seg==="Z")return ctx.family==="j"?"segmento_z_boleto":ctx.family==="o"?"segmento_z_o":ctx.family==="n"?"segmento_z_n":"segmento_z";
    return{D:"segmento_d",E:"segmento_e",F:"segmento_f",N:"segmento_n",O:"segmento_o",W:"segmento_w"}[seg]||null;
  }
  function recordIdentity(type,segment,key){
    if(type==="0")return"Header do Arquivo";
    if(type==="1")return"Header do Lote";
    if(type==="5")return"Trailer do Lote";
    if(type==="9")return"Trailer do Arquivo";
    if(type!=="3")return"Registro desconhecido";
    if(key==="segmento_j52_pix")return"Segmento J52 PIX";
    if(key==="segmento_j52")return"Segmento J52";
    return segment?`Segmento ${segment}`:"Registro de Detalhe";
  }
  return{variant,recordIdentity,identifyRecord:recordIdentity};
});
