(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.CNABCoreModels=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const field=data=>Object.assign({start:0,end:0,name:"",meaning:"",picture:"",value:"",interpreted:"",observations:[],issues:[]},data||{});
  const record=data=>Object.assign({line:0,raw:"",type:"",lot:"",seg:"",key:null,title:"Registro não analisado",fields:[],issues:[]},data||{});
  const result=data=>Object.assign({name:"",records:[],issues:[],lots:0},data||{});
  return{field,record,result};
});
