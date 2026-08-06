(()=>{"use strict";
const S=window.CNAB_SPEC,$=s=>document.querySelector(s),P=window.CNABParser.create(S);
let analysis=null,selected=0;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function loadBytes(bytes,name){
  analysis=P.parseBytes(bytes,name);selected=0;render();
  $("#drop").hidden=true;$("#workspace").hidden=false;
}
async function read(file){loadBytes(await file.arrayBuffer(),file.name)}
function resetUpload(){
  analysis=null;selected=0;$("#file").value="";
  $("#workspace").hidden=true;$("#drop").hidden=false;
}
function render(){
  $("#filename").textContent=analysis.name;$("#meta").textContent=`${analysis.records.length} linhas · ${analysis.lots} lotes`;
  const e=analysis.issues.filter(x=>x.severity==="erro").length,w=analysis.issues.filter(x=>x.severity==="aviso").length,ok=analysis.records.filter(r=>!r.issues.length).length;
  $("#stats").innerHTML=[["Registros",analysis.records.length,""],["Sem erros",ok,"ok"],["Erros",e,"error"],["Avisos",w,"warn"]].map(x=>`<div class="stat ${x[2]}"><span>${x[0]}</span><b>${x[1]}</b></div>`).join("");
  fillFilters();renderRecords();show(selected);
}
function fillFilters(){
  const lots=[...new Set(analysis.records.map(r=>r.lot).filter(x=>x&&x!=="0000"&&x!=="9999"))],segs=[...new Set(analysis.records.map(r=>r.seg).filter(Boolean))];
  $("#lotFilter").innerHTML='<option value="">Todos os lotes</option>'+lots.map(x=>`<option>${x}</option>`).join("");
  $("#segmentFilter").innerHTML='<option value="">Todos os segmentos</option>'+segs.map(x=>`<option>${x}</option>`).join("");
  $("#lineFilter").innerHTML='<option value="">Todas as linhas</option>'+analysis.records.map(r=>`<option value="${r.line}">Linha ${r.line}</option>`).join("");
}
function filtered(){
  const q=$("#search").value.toLowerCase(),lot=$("#lotFilter").value,seg=$("#segmentFilter").value,sev=$("#severityFilter").value,line=$("#lineFilter").value;
  return analysis.records.filter(r=>(!lot||r.lot===lot)&&(!seg||r.seg===seg)&&(!line||r.line==line)&&(!sev||r.issues.some(i=>i.severity===sev))&&(!q||[r.title,r.raw,...r.fields.flatMap(f=>[f.name,f.meaning,f.value]),...r.issues.map(i=>i.message)].join(" ").toLowerCase().includes(q)));
}
function renderRecords(){
  const rows=filtered();$("#visibleCount").textContent=`${rows.length} exibidos`;
  $("#records").innerHTML=rows.map(r=>{const cls=r.issues.some(x=>x.severity==="erro")?"erro":r.issues.length?"aviso":"";return`<div class="record ${r.line===analysis.records[selected]?.line?"active":""}" data-i="${r.line-1}"><span class="line-no">${r.line}</span><div><strong>${esc(r.title)}</strong><small>Lote ${esc(r.lot||"—")}${r.seg?" · Segmento "+esc(r.seg):""}</small></div><span class="badge ${cls}">${r.issues.length||"OK"}</span></div>`}).join("");
  document.querySelectorAll(".record").forEach(x=>x.onclick=()=>{selected=+x.dataset.i;renderRecords();show(selected)});
}
function fieldObservations(f){
  return (f.observations||[]).map(observation=>{
    if(observation.kind==="note"){
      const number=String(observation.note);
      return {icon:"📖",title:`Nota ${number}`,text:S.notes[number]||"Nota referenciada no manual oficial."};
    }
    if(observation.kind==="fixed")return {icon:"📌",title:observation.title||"Caractere fixo ou constante",text:observation.text};
    return {icon:"ℹ️",title:observation.title||"Regra do layout",text:observation.text};
  });
}
function observationButton(observation){
  return `<button type="button" class="obs-icon" aria-label="${esc(observation.title)}" title="${esc(observation.title+": "+observation.text)}" data-title="${esc(observation.title)}" data-text="${esc(observation.text)}">${observation.icon}</button>`;
}
function pictureParts(picture,fallbackSize){
  const notation=String(picture||"").trim().toUpperCase(),code=notation.match(/^([A-Z9])/i)?.[1]||"";
  const labels={"9":"Numérico",X:"Caractere",A:"Alfabético",N:"Numérico"};
  const quantities=[...notation.matchAll(/\((\d+)\)/g)].map(match=>Number(match[1]));
  return {type:labels[code]||code||"—",quantity:quantities.length?quantities.reduce((total,value)=>total+value,0):fallbackSize};
}
function show(i){
  const r=analysis.records[i];if(!r)return;
  const marks=[...r.issues].filter(x=>x.start&&x.end).sort((a,b)=>a.start-b.start);let raw="",p=1;
  marks.forEach(m=>{if(m.start<p)return;raw+=esc(r.raw.slice(p-1,m.start-1))+"<mark>"+esc(r.raw.slice(m.start-1,m.end))+"</mark>";p=m.end+1});raw+=esc(r.raw.slice(p-1));
  const issues=r.issues.length?`<div class="issues">${r.issues.map(x=>`<div class="issue ${x.severity}"><b>${x.severity.toUpperCase()}</b> · posições ${x.start}-${x.end}: ${esc(x.message)}</div>`).join("")}</div>`:"";
  const rows=r.fields.map(f=>{const bad=f.issues.length?"field-error":"",observations=fieldObservations(f).map(observationButton).join(""),format=pictureParts(f.picture,f.end-f.start+1);return`<tr class="${bad}"><td>${f.start}–${f.end}</td><td><b>${esc(f.name)}</b><br><small>${esc(f.meaning)}</small></td><td>${esc(format.type)}</td><td>${format.quantity}</td><td><code>${esc(f.value)}</code></td><td>${esc(f.interpreted)}</td><td><div class="obs-list">${observations}</div></td></tr>`}).join("");
  $("#detail").innerHTML=`<div class="detail-head"><div><h2>Linha ${r.line} · ${esc(r.title)}</h2><p>Layout do manual, página ${S.layouts[r.key]?.manualPage||"—"} · ${r.raw.length} caracteres</p></div><span class="badge ${r.issues.length?"erro":""}">${r.issues.length?r.issues.length+" ocorrência(s)":"Registro válido"}</span></div><div class="raw">${raw||"(linha vazia)"}</div>${issues}<table class="fields"><thead><tr><th>Posição</th><th>Campo / significado</th><th>Tipo</th><th>Qtde</th><th>Valor bruto</th><th>Interpretado</th><th>Observações</th></tr></thead><tbody>${rows}</tbody></table>`;
  document.querySelectorAll(".obs-icon").forEach(button=>button.onclick=()=>{$("#help h2").textContent=button.dataset.title;$("#help p").textContent=button.dataset.text;$("#help").showModal()});
}
["search","lotFilter","segmentFilter","severityFilter","lineFilter"].forEach(id=>$("#"+id).addEventListener(id==="search"?"input":"change",renderRecords));
$("#chooseFile").onclick=()=>$("#file").click();
$("#file").onchange=e=>e.target.files[0]&&read(e.target.files[0]);
$("#newFile").onclick=resetUpload;$("#theme").onclick=()=>document.body.classList.toggle("dark");
window.CNAB_UI={loadBytes,read};
})();
