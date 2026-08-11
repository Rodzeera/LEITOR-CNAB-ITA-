(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABCoreReader=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

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

  function bankCodeFromLines(lines){
    const first=(lines||[]).find(line=>String(line).length>0);
    return first?String(first).slice(0,3):"";
  }

  function readBytes(input){
    const text=decodeBytes(input),lines=splitPhysicalRecords(text);
    return{text,lines,bankCode:bankCodeFromLines(lines)};
  }

  return{asBytes,decodeBytes,splitPhysicalRecords,bankCodeFromLines,readBytes};
});
