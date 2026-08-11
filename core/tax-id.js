(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABCoreTaxId=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const CPF="CPF",CNPJ="CNPJ";
  const onlyDigits=value=>/^\d+$/.test(String(value??""));
  const repeated=value=>/^(\d)\1+$/.test(value);

  function isValidCpf(value){
    const digits=String(value??"");
    if(!/^\d{11}$/.test(digits)||repeated(digits))return false;
    const calculate=length=>{
      let sum=0;
      for(let index=0;index<length;index++)sum+=Number(digits[index])*(length+1-index);
      const remainder=(sum*10)%11;
      return remainder===10?0:remainder;
    };
    return calculate(9)===Number(digits[9])&&calculate(10)===Number(digits[10]);
  }

  function isValidCnpj(value){
    const digits=String(value??"");
    if(!/^\d{14}$/.test(digits)||repeated(digits))return false;
    const calculate=length=>{
      const weights=length===12?[5,4,3,2,9,8,7,6,5,4,3,2]:[6,5,4,3,2,9,8,7,6,5,4,3,2];
      const sum=weights.reduce((total,weight,index)=>total+Number(digits[index])*weight,0);
      const remainder=sum%11;
      return remainder<2?0:11-remainder;
    };
    return calculate(12)===Number(digits[12])&&calculate(13)===Number(digits[13]);
  }

  function extract(value,type){
    const raw=String(value??""),size=type===CPF?11:type===CNPJ?14:0;
    if(!size)return{ok:false,code:"unsupported_type",value:""};
    if(!onlyDigits(raw))return{ok:false,code:"non_numeric",value:""};
    if(raw.length<size)return{ok:false,code:"invalid_length",value:""};
    const padding=raw.slice(0,raw.length-size),document=raw.slice(-size);
    if(padding&&!/^0+$/.test(padding))return{ok:false,code:"invalid_padding",value:document};
    return{ok:true,code:"ok",value:document,padding};
  }

  function inspect(value,expectedType){
    if(expectedType!==CPF&&expectedType!==CNPJ)return{valid:false,code:"unsupported_type",expectedType,value:""};
    const expected=extract(value,expectedType),otherType=expectedType===CPF?CNPJ:CPF,other=extract(value,otherType);
    const expectedValid=expected.ok&&(expectedType===CPF?isValidCpf(expected.value):isValidCnpj(expected.value));
    if(expectedValid)return{valid:true,code:"ok",expectedType,actualType:expectedType,value:expected.value};
    const otherValid=other.ok&&(otherType===CPF?isValidCpf(other.value):isValidCnpj(other.value));
    if(otherValid)return{valid:false,code:"type_mismatch",expectedType,actualType:otherType,value:other.value};
    if(!expected.ok)return{valid:false,code:expected.code,expectedType,actualType:null,value:expected.value};
    return{valid:false,code:"invalid_check_digits",expectedType,actualType:null,value:expected.value};
  }

  function detect(value){
    const raw=String(value??""),cpf=extract(raw,CPF),cnpj=extract(raw,CNPJ);
    const cpfValid=cpf.ok&&isValidCpf(cpf.value),cnpjValid=cnpj.ok&&isValidCnpj(cnpj.value);
    if(cpfValid&&!cnpjValid)return{valid:true,code:"ok",actualType:CPF,value:cpf.value};
    if(cnpjValid&&!cpfValid)return{valid:true,code:"ok",actualType:CNPJ,value:cnpj.value};
    if(cpfValid&&cnpjValid)return{valid:true,code:"ambiguous",actualType:null,value:raw};
    if(!onlyDigits(raw))return{valid:false,code:"non_numeric",actualType:null,value:""};
    if(raw.length<11||raw.length>14)return{valid:false,code:"invalid_length",actualType:null,value:raw};
    if(raw.length>11&&!/^0+$/.test(raw.slice(0,raw.length-11))&&raw.length<14)
      return{valid:false,code:"invalid_padding",actualType:null,value:raw};
    return{valid:false,code:"invalid_check_digits",actualType:null,value:raw};
  }

  const isEmpty=value=>{const raw=String(value??"");return !raw.trim()||/^[0 ]+$/.test(raw)};
  return{CPF,CNPJ,onlyDigits,isValidCpf,isValidCnpj,extract,inspect,detect,isEmpty};
});
