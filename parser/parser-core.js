(function(root,factory){
  const note35=typeof module==="object"&&module.exports?require("./note35-validator.js"):root.CNABNote35Validator;
  const api=factory(note35);
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABParser=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(note35){
  "use strict";
  const slice=(line,a,b)=>line.slice(a-1,b);
  const int=s=>/^\d+$/.test(s)?Number(s):NaN;
  const issue=(severity,line,start,end,message)=>({severity,line,start,end,message});

  function asBytes(input){
    if(input instanceof Uint8Array)return input;
    if(typeof ArrayBuffer!=="undefined"&&input instanceof ArrayBuffer)return new Uint8Array(input);
    if(typeof ArrayBuffer!=="undefined"&&ArrayBuffer.isView(input))return new Uint8Array(input.buffer,input.byteOffset,input.byteLength);
    return Uint8Array.from(input||[]);
  }

  function decodeBytes(input){
    const bytes=asBytes(input);
    if(bytes[0]===0xEF&&bytes[1]===0xBB&&bytes[2]===0xBF)
      return new TextDecoder("utf-8").decode(bytes.subarray(3));
    if(bytes[0]===0xFF&&bytes[1]===0xFE)
      return new TextDecoder("utf-16le").decode(bytes.subarray(2));
    if(bytes[0]===0xFE&&bytes[1]===0xFF)
      return new TextDecoder("utf-16be").decode(bytes.subarray(2));
    return new TextDecoder("windows-1252").decode(bytes);
  }

  function splitPhysicalRecords(text){
    const content=String(text??"").replace(/^\uFEFF/,"");
    if(content==="")return[];
    const lines=content.split(/\r\n|\n|\r/);
    if(lines.at(-1)==="")lines.pop();
    return lines;
  }

  function create(S){
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

    function interpreted(f,v){
      if(/^9/.test(f.picture)&&/V9\((\d+)\)/.test(f.picture)){const d=+RegExp.$1;return(Number(v||0)/10**d).toLocaleString("pt-BR",{minimumFractionDigits:d,maximumFractionDigits:d})}
      if(/DDMMAAAA/i.test(f.content)&&/^\d{8}$/.test(v)&&v!=="00000000")return v.slice(0,2)+"/"+v.slice(2,4)+"/"+v.slice(4);
      if(/HHMMSS/i.test(f.content)&&/^\d{6}$/.test(v))return v.slice(0,2)+":"+v.slice(2,4)+":"+v.slice(4);
      return v.trim()||"(vazio)";
    }

    function fieldIssues(f,v,lineNo){
      const out=[],numeric=/^9/.test(f.picture),alpha=/^X/.test(f.picture);
      if(numeric&&!/^\d+$/.test(v))out.push(issue("erro",lineNo,f.start,f.end,`${f.name}: esperado campo numérico.`));
      if(alpha&&/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(v))out.push(issue("erro",lineNo,f.start,f.end,`${f.name}: caractere de controle não permitido.`));
      const fixed=f.content.replace(/\s/g,"");
      if(/^\d+$/.test(fixed)&&fixed.length===v.length&&v!==fixed)out.push(issue("erro",lineNo,f.start,f.end,`${f.name}: valor fixo esperado “${fixed}”.`));
      if(f.name==="BRANCOS"&&v.trim())out.push(issue("erro",lineNo,f.start,f.end,`${f.name}: deve ser preenchido com brancos.`));
      if(f.name==="ZEROS"&&!/^0+$/.test(v))out.push(issue("erro",lineNo,f.start,f.end,`${f.name}: deve ser preenchido com zeros.`));
      if(/DDMMAAAA/i.test(f.content)&&v!=="00000000"&&/^\d{8}$/.test(v)){const d=+v.slice(0,2),m=+v.slice(2,4),y=+v.slice(4),dt=new Date(y,m-1,d);if(dt.getFullYear()!==y||dt.getMonth()!==m-1||dt.getDate()!==d)out.push(issue("erro",lineNo,f.start,f.end,`${f.name}: data inválida.`))}
      return out;
    }

    function validateRequired(records,issues){
      let form="",main=null,seen=new Set();
      const flush=()=>{if(!main)return;const required=form==="45"?["A","B"]:["30","31"].includes(form)?["J","J52"]:form==="11"?["O"]:form==="22"?["N"]:["A"];required.forEach(s=>{if(!seen.has(s)){const x=issue("erro",main.line,14,14,`Segmento ${s} obrigatório para a forma de pagamento ${form}.`);main.issues.push(x);issues.push(x)}})};
      records.forEach(r=>{if(r.type==="1"){flush();form=r.raw.slice(11,13);main=null;seen=new Set()}if(r.type==="3"){const id=r.seg==="J"&&r.raw.slice(17,19)==="52"?"J52":r.seg;if(!["B","C","D","E","F","W","Z","J52"].includes(id)){flush();main=r;seen=new Set()}seen.add(id)}if(r.type==="5")flush()});
    }

    function parse(text,name){
      const rawLines=splitPhysicalRecords(text),records=[],issues=[];
      let ctx={family:"a",form:"",lot:""},lotStart=-1,seqExpected=1,lots=0;
      rawLines.forEach((line,i)=>{
        const n=i+1,type=line[7]||"",lot=line.slice(3,7),seg=type==="3"?(line[13]||""):"",local=[];
        if(line.length!==240)local.push(issue("erro",n,1,Math.max(1,line.length),`Comprimento inválido: ${line.length} caracteres; esperado 240.`));
        if(line.length>=8){if(line.slice(0,3)!=="341")local.push(issue("erro",n,1,3,"Código do banco inválido; esperado 341 (Itaú)."));if(!["0","1","3","5","9"].includes(type))local.push(issue("erro",n,8,8,`Tipo de registro inválido: “${type||"vazio"}”.`))}
        if(type==="1"){ctx.lot=lot;ctx.form=line.slice(11,13);ctx.family=["30","31"].includes(ctx.form)?"j":ctx.form==="11"?"o":ctx.form==="22"?"n":"a";lotStart=i;seqExpected=1;lots++}
        if(["1","3","5"].includes(type)&&ctx.lot&&lot!==ctx.lot)local.push(issue("erro",n,4,7,`Código do lote não corresponde ao lote aberto (${ctx.lot}).`));
        if(type==="3"){const sq=int(line.slice(8,13));const complementary=["B","C","D","E","F","W","Z"].includes(seg)||(seg==="J"&&line.slice(17,19)==="52");if(!complementary){if(sq!==seqExpected)local.push(issue("erro",n,9,13,`Sequência inválida: esperado ${String(seqExpected).padStart(5,"0")}.`));seqExpected=sq+1}else if(sq!==seqExpected-1)local.push(issue("erro",n,9,13,"Complemento deve repetir o número do segmento principal correspondente."))}
        const key=variant(line,ctx),layout=key&&S.layouts[key];
        if(type==="3"&&!layout)local.push(issue("erro",n,14,14,`Segmento “${seg||"vazio"}” não reconhecido para esta forma de pagamento.`));
        const fields=(layout?.fields||[]).map(f=>{const value=slice(line,f.start,f.end),fi=fieldIssues(f,value,n);local.push(...fi);return{...f,value,interpreted:interpreted(f,value),issues:fi}});
        if(type==="5"&&lotStart>=0){const expected=i-lotStart+1,decl=int(line.slice(17,23));if(decl!==expected)local.push(issue("erro",n,18,23,`Total do lote divergente: informado ${decl}, calculado ${expected}.`));lotStart=-1}
        records.push({line:n,raw:line,type,lot,seg,key,title:recordIdentity(type,seg,key),fields,issues:local});issues.push(...local);
      });
      const first=records[0],last=records.at(-1);
      if(first?.type!=="0")issues.push(issue("erro",first?.line||1,8,8,"O primeiro registro deve ser Header de Arquivo (tipo 0)."));
      if(last?.type!=="9")issues.push(issue("erro",last?.line||1,8,8,"O último registro deve ser Trailer de Arquivo (tipo 9)."));
      if(last?.type==="9"){const dl=int(last.raw.slice(17,23)),dr=int(last.raw.slice(23,29));if(dl!==lots)issues.push(issue("erro",last.line,18,23,`Quantidade de lotes divergente: informada ${dl}, calculada ${lots}.`));if(dr!==records.length)issues.push(issue("erro",last.line,24,29,`Quantidade de registros divergente: informada ${dr}, calculada ${records.length}.`))}
      validateRequired(records,issues);
      note35?.validate(records,issues);
      return{name,records,issues,lots};
    }
    function parseBytes(bytes,name){
      return parse(decodeBytes(bytes),name);
    }
    return{parse,parseBytes,variant,recordIdentity,splitPhysicalRecords,decodeBytes};
  }
  return{create,splitPhysicalRecords,decodeBytes};
});
