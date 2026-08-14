(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else{
    root.CNABBankDefinitions=root.CNABBankDefinitions||{};
    root.CNABBankDefinitions["237"]=root.CNABBankDefinitions["237"]||{};
    root.CNABBankDefinitions["237"]["004"]=api;
  }
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const refText={
    G001:"Código do Banco na Compensação",G002:"Lote de Serviço",G003:"Tipo de Registro",G004:"Uso Exclusivo FEBRABAN/CNAB",
    G005:"Tipo de Inscrição",G006:"Número de Inscrição",G007:"Código do Convênio no Banco",G008:"Agência Mantenedora da Conta",
    G009:"Dígito Verificador da Agência",G010:"Número da Conta Corrente",G011:"Dígito Verificador da Conta",G012:"Dígito Verificador da Agência/Conta",
    G013:"Nome",G014:"Nome do Banco",G015:"Código Remessa/Retorno",G016:"Data de Geração do Arquivo",G017:"Hora de Geração do Arquivo",
    G018:"Número Sequencial do Arquivo",G019:"Versão do Layout do Arquivo",G020:"Densidade de Gravação",G021:"Reservado ao Banco",
    G022:"Reservado à Empresa",G025:"Tipo de Serviço",G028:"Tipo de Operação",G029:"Forma de Lançamento",G030:"Versão do Layout do Lote",
    G031:"Mensagem 1/2",G032:"Endereço",G033:"Número do Local",G034:"Complemento",G035:"Cidade",G036:"Estado/UF",G038:"Número Sequencial do Registro no Lote",
    G039:"Código de Segmento",G040:"Tipo de Moeda",G041:"Quantidade de Moeda",G042:"Valor do Documento",G043:"Nosso Número",G044:"Data de Vencimento",
    G045:"Valor do Abatimento",G046:"Valor do Desconto",G047:"Valor da Mora",G048:"Valor da Multa",G049:"Quantidade de Lotes do Arquivo",
    G050:"Valor do IR",G051:"Valor do ISS",G052:"Valor do IOF",G053:"Outras Deduções",G054:"Outros Acréscimos",G055:"Valor de INSS",
    G056:"Quantidade de Registros do Arquivo",G057:"Quantidade de Registros do Lote",G058:"Somatória de Quantidade de Moedas",G059:"Códigos das Ocorrências",
    G067:"Identificação de Registro Opcional",P001:"Código da Câmara Centralizadora",P002:"Banco do Favorecido",P003:"Data Real do Pagamento",
    P004:"Valor Real do Pagamento",P005:"Finalidade do DOC",P006:"Aviso ao Favorecido",P007:"Somatória dos Valores",P008:"Documento do Favorecido",
    P009:"Data do Pagamento",P010:"Valor do Pagamento",P011:"Finalidade da TED",P012:"UG Centralizadora",P013:"Finalidade Complementar",
    P014:"Indicativo da Forma de Pagamento",P015:"Código ISPB",N001:"Código de Barras",N002:"Código da Receita do Tributo",
    N003:"Tipo de Identificação do Contribuinte",N004:"Identificação do Contribuinte",N005:"Identificação do Tributo",N006:"Período de Referência/Competência",
    N007:"Atualização Monetária",N008:"Período de Apuração",N009:"Número de Referência",N010:"Receita Bruta Acumulada",
    N011:"Percentual sobre Receita Bruta",N012:"Inscrição Estadual/Município/Declaração",N013:"Dívida Ativa/Etiqueta",
    N014:"Parcela/Notificação",N021:"Identificador do FGTS",N023:"Sequencial do Complemento",N024:"Tipo de Informação",
    N025:"Informação Complementar",N026:"Informação Complementar de Tributo",N027:"Identificador de Tributo",N028:"Lacre do Conectividade Social",
    N029:"Dígito do Lacre",C004:"Código de Movimento",C006:"Data do Vencimento",C007:"Valor do Título",C009:"Número do Documento",
    C010:"Nosso Número",C011:"Código de Moeda",J001:"Código de Barras",J002:"Nome do Cedente",J003:"Data de Vencimento",J004:"Valor do Título",
    J005:"Desconto/Abatimento",J006:"Mora/Multa",J007:"Data do Pagamento",J008:"Valor do Pagamento",J009:"Quantidade de Moeda",
    J010:"Referência do Pagador",J011:"Nosso Número",J012:"Código da Moeda",O001:"Código de Barras",O002:"Concessionária",
    O003:"Data de Vencimento",O004:"Data do Pagamento",O005:"Valor do Pagamento",O006:"Seu Número",O007:"Nosso Número",
    "5001":"Número da Lista de Débito","5002":"Horário do Débito","5003":"Código de Lançamento Específico","5004":"Segunda Linha do Extrato",
    "5005":"Uso da Empresa","5006":"Tipo de Documento","5007":"Número do Documento","5008":"Série do Documento","5010":"Data de Emissão",
    "5011":"Informações de TED Depósito Judicial"
  };

  const obs=(kind,title,text,page,extra)=>Object.assign({kind,title,text,manualPage:page},extra||{});
  function field(start,end,name,picture,content,reference,page,options){
    const settings=options||{},observations=[];
    if(reference)observations.push(obs("info",reference,`${reference} — ${refText[reference]||name}.`,page,{reference}));
    if(settings.fixed!==undefined)observations.push(obs("fixed","Caractere fixo ou constante",`Preencher com “${settings.fixed.replace(/ /g,"espaço")}”.`,page));
    if(settings.note)observations.push(obs("note",settings.note.title,settings.note.text,page));
    return Object.assign({start,end,name,meaning:settings.meaning||name,picture,content:content||reference||"",manualPage:page,observations},settings.fixed!==undefined?{fixed:settings.fixed}: {},settings.date?{date:settings.date}:{},settings.domain?{domain:settings.domain}:{});
  }
  const n=(s,e,name,ref,page,opt)=>field(s,e,name,`9(${String(e-s+1).padStart(2,"0")})`,ref,ref,page,opt);
  const a=(s,e,name,ref,page,opt)=>field(s,e,name,`X(${String(e-s+1).padStart(2,"0")})`,ref,ref,page,opt);
  const amount=(s,e,name,integer,decimal,ref,page,opt)=>field(s,e,name,`9(${String(integer).padStart(2,"0")})V9(${String(decimal).padStart(2,"0")})`,ref,ref,page,opt);
  const blank=(s,e,page,name="USO EXCLUSIVO FEBRABAN/CNAB")=>a(s,e,name,"G004",page,{fixed:" ".repeat(e-s+1)});
  const bank=(page)=>n(1,3,"CÓDIGO DO BANCO NA COMPENSAÇÃO","G001",page,{fixed:"237"});
  const lot=(page)=>n(4,7,"LOTE DE SERVIÇO","G002",page);
  const type=(value,page)=>n(8,8,"TIPO DE REGISTRO","G003",page,{fixed:value});
  const seq=(page)=>n(9,13,"Nº SEQUENCIAL DO REGISTRO NO LOTE","G038",page);
  const segment=(value,page)=>a(14,14,"CÓDIGO DE SEGMENTO","G039",page,{fixed:value});
  const occurrences=(page)=>a(231,240,"CÓDIGOS DAS OCORRÊNCIAS","G059",page,{note:{title:"Catálogo de ocorrências",text:"Cada par de caracteres deve ser interpretado pelo catálogo G059 do manual Bradesco."}});
  const layout=(id,title,page,fields)=>({id,title,manualPage:page,fields});

  const headerArquivo=layout("header_arquivo","Header do Arquivo",14,[
    bank(14),n(4,7,"LOTE DE SERVIÇO","G002",14,{fixed:"0000"}),type("0",14),blank(9,17,14),
    n(18,18,"TIPO DE INSCRIÇÃO DA EMPRESA","G005",14,{domain:["0","1","2","3","9"]}),n(19,32,"NÚMERO DE INSCRIÇÃO DA EMPRESA","G006",14),
    a(33,52,"CÓDIGO DO CONVÊNIO NO BANCO","G007",14),n(53,57,"AGÊNCIA MANTENEDORA DA CONTA","G008",14),a(58,58,"DV DA AGÊNCIA","G009",14),
    n(59,70,"NÚMERO DA CONTA CORRENTE","G010",14),a(71,71,"DV DA CONTA","G011",14),a(72,72,"DV DA AGÊNCIA/CONTA","G012",14),
    a(73,102,"NOME DA EMPRESA","G013",14),a(103,132,"NOME DO BANCO","G014",14),blank(133,142,14),
    n(143,143,"CÓDIGO REMESSA/RETORNO","G015",14,{domain:["1","2"]}),n(144,151,"DATA DE GERAÇÃO DO ARQUIVO","G016",14,{date:"DDMMAAAA"}),
    n(152,157,"HORA DE GERAÇÃO DO ARQUIVO","G017",14),n(158,163,"NÚMERO SEQUENCIAL DO ARQUIVO","G018",14),
    n(164,166,"VERSÃO DO LAYOUT DO ARQUIVO","G019",14,{fixed:"089"}),n(167,171,"DENSIDADE DE GRAVAÇÃO","G020",14),
    a(172,191,"RESERVADO AO BANCO","G021",14),a(192,211,"RESERVADO À EMPRESA","G022",14),blank(212,240,14)
  ]);

  const trailerArquivo=layout("trailer_arquivo","Trailer do Arquivo",15,[bank(15),n(4,7,"LOTE DE SERVIÇO","G002",15,{fixed:"9999"}),type("9",15),blank(9,17,15),n(18,23,"QUANTIDADE DE LOTES DO ARQUIVO","G049",15),n(24,29,"QUANTIDADE DE REGISTROS DO ARQUIVO","G056",15),n(30,35,"QUANTIDADE DE CONTAS PARA CONCILIAÇÃO","G037",15),blank(36,240,15)]);

  function headerLote(id,title,page,version,withPaymentIndicator){
    const fields=[bank(page),lot(page),type("1",page),a(9,9,"TIPO DE OPERAÇÃO","G028",page,{fixed:"C"}),n(10,11,"TIPO DE SERVIÇO","G025",page),n(12,13,"FORMA DE LANÇAMENTO","G029",page),n(14,16,"VERSÃO DO LAYOUT DO LOTE","G030",page,{fixed:version}),blank(17,17,page),n(18,18,"TIPO DE INSCRIÇÃO DA EMPRESA","G005",page,{domain:["0","1","2","3","9"]}),n(19,32,"NÚMERO DE INSCRIÇÃO DA EMPRESA","G006",page),a(33,52,"CÓDIGO DO CONVÊNIO NO BANCO","G007",page),n(53,57,"AGÊNCIA MANTENEDORA DA CONTA","G008",page),a(58,58,"DV DA AGÊNCIA","G009",page),n(59,70,"NÚMERO DA CONTA CORRENTE","G010",page),a(71,71,"DV DA CONTA","G011",page),a(72,72,"DV DA AGÊNCIA/CONTA","G012",page),a(73,102,"NOME DA EMPRESA","G013",page),a(103,142,"INFORMAÇÃO 1","G031",page),a(143,172,"LOGRADOURO","G032",page),n(173,177,"NÚMERO DO LOCAL","G033",page),a(178,192,"COMPLEMENTO","G034",page),a(193,212,"CIDADE","G035",page),n(213,217,"CEP","G035",page),a(218,220,"COMPLEMENTO DO CEP","G035",page),a(221,222,"UF","G036",page)];
    if(withPaymentIndicator){fields.push(n(223,224,"INDICATIVO DA FORMA DE PAGAMENTO","P014",page,{fixed:"01"}),blank(225,230,page));}
    else fields.push(blank(223,230,page));
    fields.push(occurrences(page));return layout(id,title,page,fields);
  }

  const segmentoA=layout("segmento_a","Segmento A",23,[bank(23),lot(23),type("3",23),seq(23),segment("A",23),n(15,15,"TIPO DE MOVIMENTO","C004",23),n(16,17,"CÓDIGO DA INSTRUÇÃO","C004",23),n(18,20,"CÓDIGO DA CÂMARA CENTRALIZADORA","P001",23,{domain:["000","018","700","888"],note:{title:"Aplicabilidade da Câmara",text:"Usar 000 quando a Câmara não se aplicar; G029/P001 definem 018, 700 ou 888 para DOC/TED."}}),n(21,23,"BANCO DO FAVORECIDO","P002",23),n(24,28,"AGÊNCIA DO FAVORECIDO","G008",23),a(29,29,"DV DA AGÊNCIA","G009",23),n(30,41,"CONTA DO FAVORECIDO","G010",23),a(42,42,"DV DA CONTA","G011",23),a(43,43,"DV DA AGÊNCIA/CONTA","G012",23),a(44,73,"NOME DO FAVORECIDO","G013",23),a(74,93,"SEU NÚMERO","G043",23),n(94,101,"DATA DO PAGAMENTO","P009",23,{date:"DDMMAAAA"}),a(102,104,"TIPO DE MOEDA","G040",23),amount(105,119,"QUANTIDADE DA MOEDA",10,5,"G041",23),amount(120,134,"VALOR DO PAGAMENTO",13,2,"P010",23),a(135,154,"NOSSO NÚMERO","G043",23),n(155,162,"DATA REAL DO PAGAMENTO","P003",23,{date:"DDMMAAAA"}),amount(163,177,"VALOR REAL DO PAGAMENTO",13,2,"P004",23),a(178,217,"INFORMAÇÃO 2","G031",23),a(218,219,"FINALIDADE DO DOC","P005",23),a(220,224,"FINALIDADE DA TED","P011",23),a(225,226,"FINALIDADE COMPLEMENTAR","P013",23),blank(227,229,23),n(230,230,"AVISO AO FAVORECIDO","P006",23),occurrences(23)]);

  const segmentoB=layout("segmento_b","Segmento B",24,[bank(24),lot(24),type("3",24),seq(24),segment("B",24),blank(15,17,24),n(18,18,"TIPO DE INSCRIÇÃO DO FAVORECIDO","G005",24,{domain:["0","1","2","3","9"]}),n(19,32,"Nº DE INSCRIÇÃO DO FAVORECIDO","G006",24),a(33,62,"LOGRADOURO","G032",24),n(63,67,"NÚMERO DO LOCAL","G033",24),a(68,82,"COMPLEMENTO","G034",24),a(83,97,"BAIRRO","G032",24),a(98,117,"CIDADE","G035",24),n(118,122,"CEP","G035",24),a(123,125,"COMPLEMENTO DO CEP","G035",24),a(126,127,"UF","G036",24),n(128,135,"DATA DE VENCIMENTO","G044",24,{date:"DDMMAAAA"}),amount(136,150,"VALOR DO DOCUMENTO",13,2,"G042",24),amount(151,165,"VALOR DO ABATIMENTO",13,2,"G045",24),amount(166,180,"VALOR DO DESCONTO",13,2,"G046",24),amount(181,195,"VALOR DA MORA",13,2,"G047",24),amount(196,210,"VALOR DA MULTA",13,2,"G048",24),a(211,225,"CÓDIGO/DOCUMENTO DO FAVORECIDO","P008",24),n(226,226,"AVISO AO FAVORECIDO","P006",24),n(227,232,"UG CENTRALIZADORA","P012",24),n(233,240,"CÓDIGO ISPB","P015",24)]);

  const segmentoC=layout("segmento_c","Segmento C",25,[bank(25),lot(25),type("3",25),seq(25),segment("C",25),blank(15,17,25),amount(18,32,"VALOR DO IR",13,2,"G050",25),amount(33,47,"VALOR DO ISS",13,2,"G051",25),amount(48,62,"VALOR DO IOF",13,2,"G052",25),amount(63,77,"OUTRAS DEDUÇÕES",13,2,"G053",25),amount(78,92,"OUTROS ACRÉSCIMOS",13,2,"G054",25),n(93,97,"AGÊNCIA SUBSTITUTA","G008",25),a(98,98,"DV DA AGÊNCIA","G009",25),n(99,110,"CONTA SUBSTITUTA","G010",25),a(111,111,"DV DA CONTA","G011",25),a(112,112,"DV DA AGÊNCIA/CONTA","G012",25),amount(113,127,"VALOR DO INSS",13,2,"G055",25),blank(128,240,25)]);

  function segment5(judicial){const page=26,fields=[bank(page),lot(page),type("3",page),seq(page),segment("5",page),blank(15,17,page),n(18,26,"NÚMERO DA LISTA DE DÉBITO","5001",page),n(27,32,"HORÁRIO DO DÉBITO","5002",page),n(33,37,"CÓDIGO DE LANÇAMENTO ESPECÍFICO","5003",page),n(38,42,"SEGUNDA LINHA DO EXTRATO","5004",page),a(43,92,"USO DA EMPRESA","5005",page),n(93,95,"TIPO DE DOCUMENTO","5006",page),n(96,110,"NÚMERO DO DOCUMENTO","5007",page),a(111,112,"SÉRIE DO DOCUMENTO","5008",page),blank(113,127,page),n(128,135,"DATA DE EMISSÃO DO DOCUMENTO","5010",page,{date:"DDMMAAAA"})];if(judicial)fields.push(a(136,165,"NOME DO RECLAMANTE — TED DEPÓSITO JUDICIAL","5011",page),a(166,190,"NÚMERO DO PROCESSO — TED DEPÓSITO JUDICIAL","5011",page),n(191,205,"PIS/PASEP — TED DEPÓSITO JUDICIAL","5011",page),blank(206,230,page));else fields.push(blank(136,230,page));fields.push(occurrences(page));return layout(judicial?"segmento_5_judicial":"segmento_5",judicial?"Segmento 5 — TED Depósito Judicial":"Segmento 5",page,fields)}
  const segmento5=segment5(false),segmento5Judicial=segment5(true);
  const segmentoZ=layout("segmento_z","Segmento Z",27,[bank(27),lot(27),type("3",27),seq(27),segment("Z",27),a(15,78,"AUTENTICAÇÃO BANCÁRIA",null,27),a(79,103,"CONTROLE BANCÁRIO/PROTOCOLO",null,27),a(104,230,"RESERVADO",null,27),occurrences(27)]);

  const segmentoJ=layout("segmento_j","Segmento J",31,[bank(31),lot(31),type("3",31),seq(31),segment("J",31),n(15,15,"TIPO DE MOVIMENTO","C004",31),n(16,17,"CÓDIGO DA INSTRUÇÃO","C004",31),n(18,61,"CÓDIGO DE BARRAS","J001",31),a(62,91,"NOME DO CEDENTE","J002",31),n(92,99,"DATA DE VENCIMENTO","J003",31,{date:"DDMMAAAA"}),amount(100,114,"VALOR DO TÍTULO",13,2,"J004",31),amount(115,129,"DESCONTO/ABATIMENTO",13,2,"J005",31),amount(130,144,"MORA/MULTA",13,2,"J006",31),n(145,152,"DATA DO PAGAMENTO","J007",31,{date:"DDMMAAAA"}),amount(153,167,"VALOR DO PAGAMENTO",13,2,"J008",31),amount(168,182,"QUANTIDADE DE MOEDA",10,5,"J009",31),a(183,202,"REFERÊNCIA DO PAGADOR","J010",31),a(203,222,"NOSSO NÚMERO","J011",31),n(223,224,"CÓDIGO DA MOEDA","J012",31),blank(225,230,31),occurrences(31)]);
  const segmentoJ52=layout("segmento_j52","Segmento J52",32,[bank(32),lot(32),type("3",32),seq(32),segment("J",32),blank(15,15,32),n(16,17,"CÓDIGO DE MOVIMENTO","C004",32),n(18,19,"IDENTIFICAÇÃO DO REGISTRO OPCIONAL","G067",32,{fixed:"52"}),n(20,20,"TIPO DE INSCRIÇÃO DO SACADO","G005",32,{domain:["0","1","2","3","9"]}),n(21,35,"NÚMERO DE INSCRIÇÃO DO SACADO","G006",32),a(36,75,"NOME DO SACADO","G013",32),n(76,76,"TIPO DE INSCRIÇÃO DO CEDENTE","G005",32,{domain:["0","1","2","3","9"]}),n(77,91,"NÚMERO DE INSCRIÇÃO DO CEDENTE","G006",32),a(92,131,"NOME DO CEDENTE","G013",32),n(132,132,"TIPO DE INSCRIÇÃO DO SACADOR","G005",32,{domain:["0","1","2","3","9"]}),n(133,147,"NÚMERO DE INSCRIÇÃO DO SACADOR","G006",32),a(148,187,"NOME DO SACADOR","G013",32),blank(188,240,32)]);

  const segmentoO=layout("segmento_o","Segmento O",38,[bank(38),lot(38),type("3",38),seq(38),segment("O",38),n(15,15,"TIPO DE MOVIMENTO","C004",38),n(16,17,"CÓDIGO DA INSTRUÇÃO","C004",38),a(18,61,"CÓDIGO DE BARRAS","O001",38),a(62,91,"NOME DA CONCESSIONÁRIA/ÓRGÃO","O002",38),n(92,99,"DATA DE VENCIMENTO","O003",38,{date:"DDMMAAAA"}),n(100,107,"DATA DO PAGAMENTO","O004",38,{date:"DDMMAAAA"}),amount(108,122,"VALOR DO PAGAMENTO",13,2,"O005",38),a(123,142,"SEU NÚMERO","O006",38),a(143,162,"NOSSO NÚMERO","O007",38),blank(163,230,38),occurrences(38)]);

  const nBase=[bank(39),lot(39),type("3",39),seq(39),segment("N",39),n(15,15,"TIPO DE MOVIMENTO","C004",39),n(16,17,"CÓDIGO DA INSTRUÇÃO","C004",39),a(18,37,"SEU NÚMERO","O006",39),a(38,57,"NOSSO NÚMERO","O007",39),a(58,87,"NOME DO CONTRIBUINTE","G013",39),n(88,95,"DATA DO PAGAMENTO","P009",39,{date:"DDMMAAAA"}),amount(96,110,"VALOR TOTAL DO PAGAMENTO",13,2,"P010",39)];
  const nTail=(page)=>[occurrences(page)];
  const segmentoN=layout("segmento_n","Segmento N",39,[...nBase,blank(111,230,39),...nTail(39)]);
  function contributorFields(page){return[n(117,118,"TIPO DE IDENTIFICAÇÃO DO CONTRIBUINTE","N003",page,{domain:["01","02","03","04","06","07","08","09"]}),n(119,132,"IDENTIFICAÇÃO DO CONTRIBUINTE","N004",page),a(133,134,"CÓDIGO DE IDENTIFICAÇÃO DO TRIBUTO","N005",page)]}
  const segmentoN1=layout("segmento_n1","Segmento N1 — GPS",40,[...nBase,a(111,116,"CÓDIGO DA RECEITA DO TRIBUTO","N002",40),...contributorFields(40),n(135,140,"COMPETÊNCIA","N006",40),amount(141,155,"VALOR DO TRIBUTO",13,2,"P010",40),amount(156,170,"VALOR DE OUTRAS ENTIDADES",13,2,"G054",40),amount(171,185,"ATUALIZAÇÃO MONETÁRIA",13,2,"N007",40),blank(186,230,40),...nTail(40)]);
  const segmentoN2=layout("segmento_n2","Segmento N2 — DARF",41,[...nBase,a(111,116,"CÓDIGO DA RECEITA DO TRIBUTO","N002",41),...contributorFields(41),n(135,142,"PERÍODO DE APURAÇÃO","N008",41,{date:"DDMMAAAA"}),n(143,159,"NÚMERO DE REFERÊNCIA","N009",41),amount(160,174,"VALOR PRINCIPAL",13,2,"P010",41),amount(175,189,"VALOR DA MULTA",13,2,"G048",41),amount(190,204,"VALOR DOS JUROS",13,2,"G047",41),n(205,212,"DATA DE VENCIMENTO","G044",41,{date:"DDMMAAAA"}),blank(213,230,41),...nTail(41)]);
  const segmentoN3=layout("segmento_n3","Segmento N3 — DARF Simples",42,[...nBase,a(111,116,"CÓDIGO DA RECEITA DO TRIBUTO","N002",42,{fixed:"6106  "}),...contributorFields(42),n(135,142,"PERÍODO DE APURAÇÃO","N008",42,{date:"DDMMAAAA"}),amount(143,157,"RECEITA BRUTA ACUMULADA",13,2,"N010",42),amount(158,164,"PERCENTUAL SOBRE A RECEITA BRUTA",5,2,"N011",42),amount(165,179,"VALOR PRINCIPAL",13,2,"P010",42),amount(180,194,"VALOR DA MULTA",13,2,"G048",42),amount(195,209,"VALOR DOS JUROS",13,2,"G047",42),blank(210,230,42),...nTail(42)]);
  const segmentoN4=layout("segmento_n4","Segmento N4 — GARE-SP",43,[...nBase,a(111,116,"CÓDIGO DA RECEITA DO TRIBUTO","N002",43),...contributorFields(43),n(135,142,"DATA DE VENCIMENTO","G044",43,{date:"DDMMAAAA"}),n(143,154,"INSCRIÇÃO ESTADUAL/MUNICÍPIO/DECLARAÇÃO","N012",43),n(155,167,"DÍVIDA ATIVA/NÚMERO DA ETIQUETA","N013",43),n(168,173,"PERÍODO DE REFERÊNCIA","N006",43),n(174,186,"PARCELA/NOTIFICAÇÃO","N014",43),amount(187,201,"VALOR DA RECEITA",13,2,"P010",43),amount(202,215,"VALOR DOS JUROS",12,2,"G047",43),amount(216,229,"VALOR DA MULTA",12,2,"G048",43),blank(230,230,43),...nTail(43)]);

  const wPrefix=[bank(44),lot(44),type("3",44),seq(44),segment("W",44),n(15,15,"NÚMERO SEQUENCIAL DO COMPLEMENTO","N023",44),a(16,16,"TIPO DE INFORMAÇÃO","N024",44),a(17,96,"INFORMAÇÃO COMPLEMENTAR 1","N025",44),a(97,176,"INFORMAÇÃO COMPLEMENTAR 2","N025",44)];
  const segmentoW=layout("segmento_w","Segmento W",44,[...wPrefix,a(177,178,"IDENTIFICADOR DE TRIBUTO","N027",44),a(179,228,"INFORMAÇÃO COMPLEMENTAR DE TRIBUTO","N026",44),blank(229,230,44),occurrences(44)]);
  const segmentoW1=layout("segmento_w1","Segmento W1 — FGTS",45,[...wPrefix,a(177,178,"IDENTIFICADOR DE TRIBUTO","N027",45,{fixed:"01"}),a(179,184,"CÓDIGO DA RECEITA DO TRIBUTO","N002",45),a(185,186,"TIPO DE IDENTIFICAÇÃO DO CONTRIBUINTE","N003",45,{domain:["01","02","03","04","06","07","08","09"]}),a(187,200,"IDENTIFICAÇÃO DO CONTRIBUINTE","N004",45),a(201,216,"IDENTIFICADOR DO FGTS","N021",45),a(217,225,"LACRE DO CONECTIVIDADE SOCIAL","N028",45),a(226,227,"DÍGITO DO LACRE","N029",45),blank(228,230,45),occurrences(45)]);

  const trailerLote=layout("trailer_lote","Trailer do Lote",28,[bank(28),lot(28),type("5",28),blank(9,17,28),n(18,23,"QUANTIDADE DE REGISTROS DO LOTE","G057",28),amount(24,41,"SOMATÓRIA DOS VALORES",16,2,"P007",28),amount(42,59,"SOMATÓRIA DE QUANTIDADE DE MOEDAS",13,5,"G058",28),n(60,65,"NÚMERO DO AVISO DE DÉBITO","P006",28),blank(66,230,28),occurrences(28)]);

  const layouts={
    header_arquivo:headerArquivo,trailer_arquivo:trailerArquivo,
    header_lote_pagamentos:headerLote("header_lote_pagamentos","Header do Lote — Pagamentos",22,"045",true),
    header_lote_titulos:headerLote("header_lote_titulos","Header do Lote — Pagamento de Títulos",30,"040",false),
    header_lote_tributos:headerLote("header_lote_tributos","Header do Lote — Pagamento de Tributos",37,"012",true),
    trailer_lote:trailerLote,segmento_a:segmentoA,segmento_b:segmentoB,segmento_c:segmentoC,segmento_5:segmento5,
    segmento_5_judicial:segmento5Judicial,segmento_z:segmentoZ,segmento_j:segmentoJ,segmento_j52:segmentoJ52,
    segmento_o:segmentoO,segmento_n:segmentoN,segmento_n1:segmentoN1,segmento_n2:segmentoN2,segmento_n3:segmentoN3,
    segmento_n4:segmentoN4,segmento_w:segmentoW,segmento_w1:segmentoW1
  };
  return Object.freeze({manual:Object.freeze({title:"Layout Multipag Bradesco CNAB 240",version:"04",updated:"06/05/2019",pages:112,fileLayout:"089",lotLayouts:Object.freeze({pagamentos:"045",titulos:"040",tributos:"012"})}),layouts:Object.freeze(layouts),references:Object.freeze(refText)});
});
