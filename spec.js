window.CNAB_SPEC = {
  "manual": {
    "title": "Manual Técnico SISPAG - Layout de Arquivo - CNAB 240",
    "version": "086",
    "updated": "05/05/2022",
    "pages": 75
  },
  "layouts": {
    "header_arquivo": {
      "id": "header_arquivo",
      "title": "Header de Arquivo",
      "manualPage": 9,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO DO BCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "0000"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO HEADER DE ARQUIVO",
          "picture": "9(01)",
          "content": "0"
        },
        {
          "start": 9,
          "end": 14,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(06)",
          "content": ""
        },
        {
          "start": 15,
          "end": 17,
          "name": "LAYOUT DE ARQUIVO",
          "meaning": "Nº DA VERSÃO DO LAYOUT DO ARQUIVO",
          "picture": "9(03)",
          "content": "080"
        },
        {
          "start": 18,
          "end": 18,
          "name": "EMPRESA – INSCRIÇÃO",
          "meaning": "TIPO DE INSCRIÇÃO DA EMPRESA",
          "picture": "9(01)",
          "content": "1 = CPF"
        },
        {
          "start": 19,
          "end": 32,
          "name": "INSCRIÇÃO NÚMERO",
          "meaning": "CNPJ EMPRESA DEBITADA",
          "picture": "9(14)",
          "content": "NOTA 1"
        },
        {
          "start": 33,
          "end": 52,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 53,
          "end": 57,
          "name": "AGÊNCIA",
          "meaning": "NÚMERO AGÊNCIA DEBITADA",
          "picture": "9(05)",
          "content": "NOTA 1"
        },
        {
          "start": 58,
          "end": 58,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 59,
          "end": 70,
          "name": "CONTA",
          "meaning": "NÚMERO DE C/C DEBITADA",
          "picture": "9(12)",
          "content": "NOTA 1"
        },
        {
          "start": 71,
          "end": 71,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 72,
          "end": 72,
          "name": "DAC",
          "meaning": "DAC DA AGÊNCIA/CONTA DEBITADA",
          "picture": "9(01)",
          "content": "NOTA 1"
        },
        {
          "start": 73,
          "end": 102,
          "name": "NOME DA EMPRESA",
          "meaning": "NOME DA EMPRESA",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 103,
          "end": 132,
          "name": "NOME DO BANCO",
          "meaning": "NOME DO BANCO",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 133,
          "end": 142,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(10)",
          "content": ""
        },
        {
          "start": 143,
          "end": 143,
          "name": "ARQUIVO-CÓDIGO",
          "meaning": "CÓDIGO REMESSA/RETORNO",
          "picture": "9(01)",
          "content": "1=REMESSA"
        },
        {
          "start": 144,
          "end": 151,
          "name": "DATA DE GERAÇÃO",
          "meaning": "DATA DE GERAÇÃO DO ARQUIVO",
          "picture": "9(08)",
          "content": "DDMMAAAA"
        },
        {
          "start": 152,
          "end": 157,
          "name": "HORA DA GERAÇÃO",
          "meaning": "HORA DE GERAÇÃO DO ARQUIVO",
          "picture": "9(06)",
          "content": "HHMMSS"
        },
        {
          "start": 158,
          "end": 166,
          "name": "ZEROS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "9(09)",
          "content": ""
        },
        {
          "start": 167,
          "end": 171,
          "name": "UNIDADE DE DENSIDADE",
          "meaning": "DENSIDADE DE GRAVAÇÃO DO ARQUIVO",
          "picture": "9(05)",
          "content": "NOTA 2"
        },
        {
          "start": 172,
          "end": 240,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(69)",
          "content": ""
        }
      ]
    },
    "header_lote_a": {
      "id": "header_lote_a",
      "title": "Header de Lote - Cheque, OP, DOC, TED, PIX Transferência e crédito em conta",
      "manualPage": 10,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE IDENTIFICAÇÃO DE PAGTOS",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO HEADER DE LOTE",
          "picture": "9(01)",
          "content": "1"
        },
        {
          "start": 9,
          "end": 9,
          "name": "(1) TIPO DE OPERAÇÃO",
          "meaning": "TIPO DA OPERAÇÃO",
          "picture": "X(01)",
          "content": "C=CRÉDITO"
        },
        {
          "start": 10,
          "end": 11,
          "name": "(3) TIPO DE PAGAMENTO",
          "meaning": "TIPO DE PAGTO",
          "picture": "9(02)",
          "content": "NOTA 4"
        },
        {
          "start": 12,
          "end": 13,
          "name": "(3) FORMA DE PAGAMENTO",
          "meaning": "FORMA DE PAGAMENTO",
          "picture": "9(02)",
          "content": "NOTA 5"
        },
        {
          "start": 14,
          "end": 16,
          "name": "LAYOUT DO LOTE",
          "meaning": "Nº DA VERSÃO DO LAYOUT DO LOTE",
          "picture": "9(03)",
          "content": "040"
        },
        {
          "start": 17,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 18,
          "end": 18,
          "name": "EMPRESA – INSCRIÇÃO",
          "meaning": "TIPO INSCRIÇÃO EMPRESA DEBITADA",
          "picture": "9(01)",
          "content": "1 = CPF"
        },
        {
          "start": 19,
          "end": 32,
          "name": "INSCRIÇÃO NÚMERO",
          "meaning": "CNPJ EMPRESA DEBITADA",
          "picture": "9(14)",
          "content": "NOTA 1"
        },
        {
          "start": 33,
          "end": 36,
          "name": "Campo",
          "meaning": "",
          "picture": "X(04)",
          "content": "NOTA 13"
        },
        {
          "start": 37,
          "end": 52,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(16)",
          "content": ""
        },
        {
          "start": 53,
          "end": 57,
          "name": "AGÊNCIA",
          "meaning": "NÚMERO AGÊNCIA DEBITADA",
          "picture": "9(05)",
          "content": "NOTA 1"
        },
        {
          "start": 58,
          "end": 58,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 59,
          "end": 70,
          "name": "CONTA",
          "meaning": "NÚMERO DE C/C DEBITADA",
          "picture": "9(12)",
          "content": "NOTA 1"
        },
        {
          "start": 71,
          "end": 71,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 72,
          "end": 72,
          "name": "DAC",
          "meaning": "DAC DA AGÊNCIA/CONTA DEBITADA",
          "picture": "9(01)",
          "content": "NOTA 1"
        },
        {
          "start": 73,
          "end": 102,
          "name": "NOME DA EMPRESA",
          "meaning": "NOME DA EMPRESA DEBITADA",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 103,
          "end": 132,
          "name": "(2) FINALIDADE DO LOTE",
          "meaning": "FINALIDADE DOS PAGTOS DO LOTE",
          "picture": "X(30)",
          "content": "NOTA 6"
        },
        {
          "start": 133,
          "end": 142,
          "name": "HISTÓRICO DE C/C",
          "meaning": "COMPLEMENTO HISTÓRICO C/C DEBITADA",
          "picture": "X(10)",
          "content": "NOTA 7"
        },
        {
          "start": 143,
          "end": 172,
          "name": "ENDEREÇO DA EMPRESA",
          "meaning": "NOME DA RUA, AV, PÇA, ETC...",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 173,
          "end": 177,
          "name": "NÚMERO",
          "meaning": "NÚMERO DO LOCAL",
          "picture": "9(05)",
          "content": ""
        },
        {
          "start": 178,
          "end": 192,
          "name": "COMPLEMENTO.",
          "meaning": "CASA, APTO, SALA, ETC...",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 193,
          "end": 212,
          "name": "CIDADE",
          "meaning": "NOME DA CIDADE",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 213,
          "end": 220,
          "name": "CEP",
          "meaning": "CEP",
          "picture": "9(08)",
          "content": ""
        },
        {
          "start": 221,
          "end": 222,
          "name": "ESTADO",
          "meaning": "SIGLA DO ESTADO",
          "picture": "X(02)",
          "content": ""
        },
        {
          "start": 223,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(08)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO OCORRÊNCIAS P/RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "segmento_a": {
      "id": "segmento_a",
      "title": "Segmento A",
      "manualPage": 12,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DE LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "A"
        },
        {
          "start": 15,
          "end": 17,
          "name": "TIPO DE MOVIMENTO",
          "meaning": "TIPO DE MOVIMENTO",
          "picture": "9(03)",
          "content": "NOTA 10"
        },
        {
          "start": 18,
          "end": 20,
          "name": "CÂMARA",
          "meaning": "CÓDIGO DA CÂMARA CENTRALIZADORA",
          "picture": "9(03)",
          "content": "NOTA 35"
        },
        {
          "start": 21,
          "end": 23,
          "name": "BANCO FAVORECIDO",
          "meaning": "CÓDIGO BANCO FAVORECIDO",
          "picture": "9(03)",
          "content": ""
        },
        {
          "start": 24,
          "end": 43,
          "name": "AGÊNCIA CONTA",
          "meaning": "AGÊNCIA CONTA FAVORECIDO",
          "picture": "X(20)",
          "content": "NOTA 11"
        },
        {
          "start": 44,
          "end": 73,
          "name": "NOME DO FAVORECIDO",
          "meaning": "NOME DO FAVORECIDO",
          "picture": "X(30)",
          "content": "NOTA 34"
        },
        {
          "start": 74,
          "end": 93,
          "name": "SEU NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELA EMPRESA",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 94,
          "end": 101,
          "name": "(1) DATA DE PAGTO",
          "meaning": "DATA PREVISTA PARA PAGTO",
          "picture": "9(08)",
          "content": "DDMMAAAA"
        },
        {
          "start": 102,
          "end": 104,
          "name": "MOEDA – TIPO",
          "meaning": "TIPO DA MOEDA",
          "picture": "X(03)",
          "content": "REA OU 009"
        },
        {
          "start": 105,
          "end": 112,
          "name": "CÓDIGO ISPB",
          "meaning": "IDENTIFICAÇÃO DA INSTITUIÇÃO PARA O SPB",
          "picture": "X(08)",
          "content": "NOTA 35"
        },
        {
          "start": 113,
          "end": 114,
          "name": "IDENTI. TRANSFERENCIA",
          "meaning": "CONTA PAGAMENTO / PIX",
          "picture": "X(02)",
          "content": "NOTA 36"
        },
        {
          "start": 115,
          "end": 119,
          "name": "ZEROS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "9(05)",
          "content": ""
        },
        {
          "start": 120,
          "end": 134,
          "name": "(1) VALOR DO PAGTO",
          "meaning": "VALOR PREVISTO DO PAGTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 135,
          "end": 149,
          "name": "(*) NOSSO NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELO BANCO",
          "picture": "X(15)",
          "content": "NOTA 12"
        },
        {
          "start": 150,
          "end": 154,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(05)",
          "content": "NOTA 42"
        },
        {
          "start": 155,
          "end": 162,
          "name": "(*) DATA EFETIVA",
          "meaning": "DATA REAL EFETIVAÇÃO DO PAGTO",
          "picture": "9(08)",
          "content": "DDMMAAAA"
        },
        {
          "start": 163,
          "end": 177,
          "name": "(*) VALOR EFETIVO",
          "meaning": "VALOR REAL EFETIVAÇÃO DO PAGTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 178,
          "end": 197,
          "name": "FINALIDADE DETALHE",
          "meaning": "INFORMAÇÃO COMPLEMENTAR P/ HIST. DE C/C",
          "picture": "X(20)",
          "content": "NOTA 13"
        },
        {
          "start": 198,
          "end": 203,
          "name": "(*) Nº DO DOCUMENTO",
          "meaning": "Nº DO DOC/TED/ OP/ CHEQUE NO RETORNO",
          "picture": "9(6)",
          "content": "NOTA 14"
        },
        {
          "start": 204,
          "end": 217,
          "name": "Nº DE INSCRIÇÃO",
          "meaning": "Nº DE INSCRIÇÃO DO FAVORECIDO (CPF/CNPJ)",
          "picture": "9(14)",
          "content": "NOTA 15"
        },
        {
          "start": 218,
          "end": 219,
          "name": "Campo",
          "meaning": "",
          "picture": "X(02)",
          "content": "NOTA 30"
        },
        {
          "start": 220,
          "end": 224,
          "name": "(2) FINALIDADE TED",
          "meaning": "FINALIDADE DA TED",
          "picture": "X(05)",
          "content": "NOTA 26"
        },
        {
          "start": 225,
          "end": 229,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(05)",
          "content": ""
        },
        {
          "start": 230,
          "end": 230,
          "name": "AVISO",
          "meaning": "AVISO AO FAVORECIDO",
          "picture": "X(01)",
          "content": "NOTA 16"
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO OCORRÊNCIAS NO RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "segmento_a_pix": {
      "id": "segmento_a_pix",
      "title": "Segmento A - PIX",
      "manualPage": 14,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DE LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "A"
        },
        {
          "start": 15,
          "end": 17,
          "name": "TIPO DE MOVIMENTO",
          "meaning": "TIPO DE MOVIMENTO",
          "picture": "9(03)",
          "content": "NOTA 10"
        },
        {
          "start": 18,
          "end": 20,
          "name": "ZEROS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "9(03)",
          "content": ""
        },
        {
          "start": 21,
          "end": 23,
          "name": "BANCO FAVORECIDO",
          "meaning": "CÓDIGO BANCO FAVORECIDO",
          "picture": "9(03)",
          "content": ""
        },
        {
          "start": 24,
          "end": 43,
          "name": "AGÊNCIA CONTA",
          "meaning": "AGÊNCIA CONTA FAVORECIDO",
          "picture": "X(20)",
          "content": "NOTA 11"
        },
        {
          "start": 44,
          "end": 73,
          "name": "NOME DO FAVORECIDO",
          "meaning": "NOME DO FAVORECIDO",
          "picture": "X(30)",
          "content": "NOTA 34"
        },
        {
          "start": 74,
          "end": 93,
          "name": "SEU NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELA EMPRESA",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 94,
          "end": 101,
          "name": "DATA DE PAGTO",
          "meaning": "DATA PREVISTA PARA PAGTO",
          "picture": "9(08)",
          "content": "DDMMAAAA"
        },
        {
          "start": 102,
          "end": 104,
          "name": "MOEDA – TIPO",
          "meaning": "TIPO DA MOEDA",
          "picture": "X(03)",
          "content": "REA OU 009"
        },
        {
          "start": 105,
          "end": 119,
          "name": "ZEROS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "9(15)",
          "content": ""
        },
        {
          "start": 120,
          "end": 134,
          "name": "VALOR DO PAGTO",
          "meaning": "VALOR PREVISTO DO PAGTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 135,
          "end": 149,
          "name": "(*) NOSSO NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELO BANCO",
          "picture": "X(15)",
          "content": "NOTA 12"
        },
        {
          "start": 150,
          "end": 154,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(05)",
          "content": ""
        },
        {
          "start": 155,
          "end": 162,
          "name": "(*) DATA EFETIVA",
          "meaning": "DATA REAL EFETIVAÇÃO DO PAGTO",
          "picture": "9(08)",
          "content": "DDMMAAAA"
        },
        {
          "start": 163,
          "end": 177,
          "name": "(*) VALOR EFETIVO",
          "meaning": "VALOR REAL EFETIVAÇÃO DO PAGTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 178,
          "end": 191,
          "name": "Nº NOTA FISCAL/CNPJ",
          "meaning": "NÚMERO DA NOTA FISCAL/CNPJ",
          "picture": "9(14)",
          "content": "NOTA 31"
        },
        {
          "start": 192,
          "end": 197,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(06)",
          "content": ""
        },
        {
          "start": 198,
          "end": 203,
          "name": "(*) Nº DO DOCUMENTO",
          "meaning": "Nº DO DOC/TED/ OP/ CHEQUE NO RETORNO",
          "picture": "9(06)",
          "content": "NOTA 14"
        },
        {
          "start": 204,
          "end": 217,
          "name": "Nº DE INSCRIÇÃO",
          "meaning": "Nº DE INSCRIÇÃO DO FAVORECIDO (CPF/CNPJ)",
          "picture": "9(14)",
          "content": "NOTA 15"
        },
        {
          "start": 218,
          "end": 218,
          "name": "TIPO DE IDENTIFICAÇÃO",
          "meaning": "TIPO DE IDENTIFICAÇÃO DA LIQUIDAÇÃO",
          "picture": "9(01)",
          "content": "nota 32"
        },
        {
          "start": 219,
          "end": 229,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(11)",
          "content": ""
        },
        {
          "start": 230,
          "end": 230,
          "name": "AVISO",
          "meaning": "AVISO AO FAVORECIDO",
          "picture": "X(01)",
          "content": "NOTA 16"
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO OCORRÊNCIAS NO RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "segmento_b": {
      "id": "segmento_b",
      "title": "Segmento B",
      "manualPage": 15,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "B"
        },
        {
          "start": 15,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(03)",
          "content": ""
        },
        {
          "start": 18,
          "end": 18,
          "name": "EMPRESA – INSCRIÇÃO",
          "meaning": "TIPO INSCRIÇÃO DO FAVORECIDO",
          "picture": "9(01)",
          "content": ""
        },
        {
          "start": 19,
          "end": 32,
          "name": "Nº DE INSCRIÇÃO",
          "meaning": "Nº DE INSCRIÇÃO DO FAVORECIDO (CPF/CNPJ)",
          "picture": "9(14)",
          "content": "NOTA 15"
        },
        {
          "start": 33,
          "end": 62,
          "name": "ENDEREÇO",
          "meaning": "NOME DA RUA, AV, PÇA, ETC",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 63,
          "end": 67,
          "name": "NÚMERO",
          "meaning": "NÚMERO DO LOCAL",
          "picture": "9(05)",
          "content": ""
        },
        {
          "start": 68,
          "end": 82,
          "name": "COMPLEMENTO",
          "meaning": "CASA, APTO, ETC",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 83,
          "end": 97,
          "name": "BAIRRO",
          "meaning": "BAIRRO",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 98,
          "end": 117,
          "name": "CIDADE",
          "meaning": "NOME DA CIDADE",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 118,
          "end": 125,
          "name": "CEP",
          "meaning": "CEP",
          "picture": "9(08)",
          "content": ""
        },
        {
          "start": 126,
          "end": 127,
          "name": "ESTADO",
          "meaning": "SIGLA DO ESTADO",
          "picture": "X(02)",
          "content": ""
        },
        {
          "start": 128,
          "end": 227,
          "name": "E-MAIL",
          "meaning": "ENDEREÇO DE E-MAIL",
          "picture": "X(100)",
          "content": "NOTA 23"
        },
        {
          "start": 228,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(03)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO DE OCORRÊNCIAS NO RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "segmento_b_pix": {
      "id": "segmento_b_pix",
      "title": "Segmento B - PIX",
      "manualPage": 16,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "B"
        },
        {
          "start": 15,
          "end": 16,
          "name": "TIPO CHAVE",
          "meaning": "TIPO IDENTIFICAÇÃO DE CHAVE PIX",
          "picture": "X(02)",
          "content": "NOTA 37"
        },
        {
          "start": 17,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 18,
          "end": 18,
          "name": "EMPRESA – INSCRIÇÃO",
          "meaning": "TIPO INSCRIÇÃO DO FAVORECIDO",
          "picture": "9(01)",
          "content": ""
        },
        {
          "start": 19,
          "end": 32,
          "name": "Nº DE INSCRIÇÃO",
          "meaning": "Nº DE INSCRIÇÃO DO FAVORECIDO (CPF/CNPJ)",
          "picture": "9(14)",
          "content": "NOTA 15"
        },
        {
          "start": 33,
          "end": 62,
          "name": "TXID",
          "meaning": "IDENTIFICADOR ÚNICO DA TRANSAÇÃO",
          "picture": "X(30)",
          "content": "NOTA 38"
        },
        {
          "start": 63,
          "end": 127,
          "name": "Campo",
          "meaning": "INFORMAÇÃO ENTRE USUÁRIOS",
          "picture": "9(65)",
          "content": "NOTA 39"
        },
        {
          "start": 128,
          "end": 227,
          "name": "CHAVE PIX",
          "meaning": "CHAVE DE ENDEREÇAMENTO",
          "picture": "X(100)",
          "content": "NOTA 40"
        },
        {
          "start": 228,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(03)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO DE OCORRÊNCIAS NO RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "segmento_c": {
      "id": "segmento_c",
      "title": "Segmento C",
      "manualPage": 17,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQÜENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "C"
        },
        {
          "start": 15,
          "end": 29,
          "name": "VALOR C.S.L.L.",
          "meaning": "VALOR DA CONTRIBUIÇÃO SOBRE O LUCRO LÍQUIDO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 30,
          "end": 37,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(08)",
          "content": ""
        },
        {
          "start": 38,
          "end": 45,
          "name": "VENCIMENTO",
          "meaning": "DATA DE VENCIMENTO",
          "picture": "X(08)",
          "content": "DDMMAAAA"
        },
        {
          "start": 46,
          "end": 60,
          "name": "VALOR DOCUMENTO",
          "meaning": "VALOR NOMINAL DO DOCUMENTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 61,
          "end": 75,
          "name": "VALOR PIS",
          "meaning": "VALOR PROGRAMA DE INTEGRAÇÃO SOCIAL",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 76,
          "end": 90,
          "name": "VALOR I.R.",
          "meaning": "VALOR DO IMPOSTO DE RENDA",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 91,
          "end": 105,
          "name": "VALOR I.S.S.",
          "meaning": "VALOR DO IMPOSTO SOBRE SERVIÇOS",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 106,
          "end": 120,
          "name": "VALOR COFINS",
          "meaning": "VALOR CONTRIBUIÇÃO FINALIDADE SOCIAL",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 121,
          "end": 135,
          "name": "DESCONTO",
          "meaning": "VALOR DO DESCONTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 136,
          "end": 150,
          "name": "ABATIMENTO",
          "meaning": "VALOR DO ABATIMENTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 151,
          "end": 165,
          "name": "OUTRAS DEDUÇÕES",
          "meaning": "VALOR DE OUTRAS DEDUÇÕES",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 166,
          "end": 180,
          "name": "MORA",
          "meaning": "VALOR DA MORA",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 181,
          "end": 195,
          "name": "MULTA",
          "meaning": "VALOR DA MULTA",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 196,
          "end": 210,
          "name": "OUTROS ACRÉSCIMOS",
          "meaning": "VALOR DE OUTROS ACRÉSCIMOS",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 211,
          "end": 230,
          "name": "FATURA/DOCUMENTO",
          "meaning": "NÚMERO DA FATURA/DOCUMENTO",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(10)",
          "content": ""
        }
      ]
    },
    "segmento_d": {
      "id": "segmento_d",
      "title": "Segmento D",
      "manualPage": 18,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQÜENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "D"
        },
        {
          "start": 15,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(03)",
          "content": ""
        },
        {
          "start": 18,
          "end": 23,
          "name": "PERÍODO/COMPETÊNCIA",
          "meaning": "MÊS / ANO DO PAGAMENTO",
          "picture": "9(06)",
          "content": "MMAAAA"
        },
        {
          "start": 24,
          "end": 38,
          "name": "CENTRO DE CUSTO",
          "meaning": "ÓRGÃO / CENTRO DE CUSTO",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 39,
          "end": 53,
          "name": "CÓDIGO FUNCIONÁRIO",
          "meaning": "CÓDIGO DO FUNCIONÁRIO",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 54,
          "end": 83,
          "name": "CARGO",
          "meaning": "CARGO DO FUNCIONÁRIO",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 84,
          "end": 91,
          "name": "FÉRIAS",
          "meaning": "PERÍODO DE FÉRIAS “DE”",
          "picture": "9(08)",
          "content": "DDMMAAAA"
        },
        {
          "start": 92,
          "end": 99,
          "name": "FÉRIAS",
          "meaning": "PERÍODO DE FÉRIAS “ATÉ”",
          "picture": "9(08)",
          "content": "DDMMAAAA"
        },
        {
          "start": 100,
          "end": 101,
          "name": "DEPENDENTES I.R.",
          "meaning": "QUANTIDADE DE DEPENDENTES IMP.DE RENDA",
          "picture": "9(02)",
          "content": ""
        },
        {
          "start": 102,
          "end": 103,
          "name": "DEPENDENTES S.F.",
          "meaning": "QUANTIDADE DE DEPENDENTES SALÁRIO FAMÍLIA",
          "picture": "9(02)",
          "content": ""
        },
        {
          "start": 104,
          "end": 105,
          "name": "HORAS",
          "meaning": "HORAS SEMANAIS",
          "picture": "9(02)",
          "content": ""
        },
        {
          "start": 106,
          "end": 120,
          "name": "SALÁRIO CONTRIBUIÇÃO",
          "meaning": "VALOR DO SALÁRIO CONTRIBUIÇÃO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 121,
          "end": 135,
          "name": "F.G.T.S.",
          "meaning": "VALOR DO F.G.T.S.",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 136,
          "end": 150,
          "name": "VALOR CRÉDITOS",
          "meaning": "VALOR TOTAL DOS CRÉDITOS",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 151,
          "end": 165,
          "name": "VALOR DÉBITO",
          "meaning": "VALOR TOTAL DOS DÉBITOS",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 166,
          "end": 180,
          "name": "VALOR LÍQUIDO",
          "meaning": "VALOR LIQUIDO DO PAGAMENTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 181,
          "end": 195,
          "name": "VALOR FIXO / BASE",
          "meaning": "VALOR DO SALÁRIO FIXO / BASE",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 196,
          "end": 210,
          "name": "Campo",
          "meaning": "VALOR DA BASE DO I.R.R.F.",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 211,
          "end": 225,
          "name": "Campo",
          "meaning": "VALOR DA BASE DO F.G.T.S.",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 226,
          "end": 227,
          "name": "DISPONIBILIZAÇÃO",
          "meaning": "",
          "picture": "X(02)",
          "content": "NOTA 27"
        },
        {
          "start": 228,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(03)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO OCORRÊNCIA PARA RETORNO",
          "picture": "X(10)",
          "content": ""
        }
      ]
    },
    "segmento_e": {
      "id": "segmento_e",
      "title": "Segmento E",
      "manualPage": 19,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQÜENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "E"
        },
        {
          "start": 15,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(03)",
          "content": ""
        },
        {
          "start": 18,
          "end": 18,
          "name": "MOVIMENTO",
          "meaning": "TIPO DE MOVIMENTO",
          "picture": "X(01)",
          "content": "NOTA 24"
        },
        {
          "start": 19,
          "end": 218,
          "name": "Campo",
          "meaning": "",
          "picture": "X(200)",
          "content": "ANEXO D"
        },
        {
          "start": 219,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(12)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO OCORRÊNCIA PARA RETORNO",
          "picture": "X(10)",
          "content": ""
        }
      ]
    },
    "segmento_f": {
      "id": "segmento_f",
      "title": "Segmento F",
      "manualPage": 20,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQÜENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "F"
        },
        {
          "start": 15,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(03)",
          "content": ""
        },
        {
          "start": 18,
          "end": 161,
          "name": "INFORMAÇÕES",
          "meaning": "",
          "picture": "X(144)",
          "content": "NOTA 25"
        },
        {
          "start": 162,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(69)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "OCORRÊNCIAS",
          "meaning": "CÓDIGO OCORRÊNCIA PARA RETORNO",
          "picture": "X(10)",
          "content": ""
        }
      ]
    },
    "segmento_z": {
      "id": "segmento_z",
      "title": "Segmento Z",
      "manualPage": 21,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "Z"
        },
        {
          "start": 15,
          "end": 78,
          "name": "AUTENTICAÇÃO",
          "meaning": "AUTENTICAÇÃO ELETRÔNICA DO PAGAMENTO",
          "picture": "X(64)",
          "content": ""
        },
        {
          "start": 79,
          "end": 98,
          "name": "SEU NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELA EMPRESA",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 99,
          "end": 103,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(05)",
          "content": ""
        },
        {
          "start": 104,
          "end": 118,
          "name": "NOSSO NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELO BANCO",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 119,
          "end": 240,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(122)",
          "content": ""
        }
      ]
    },
    "trailer_lote_a": {
      "id": "trailer_lote_a",
      "title": "Trailer de Lote - Transferências",
      "manualPage": 22,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO TRAILER DE LOTE",
          "picture": "9(01)",
          "content": "5"
        },
        {
          "start": 9,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(09)",
          "content": ""
        },
        {
          "start": 18,
          "end": 23,
          "name": "TOTAL QTDE REGISTROS",
          "meaning": "QTDE REGISTROS DO LOTE",
          "picture": "9(06)",
          "content": "NOTA 17"
        },
        {
          "start": 24,
          "end": 41,
          "name": "(1) TOTAL VALOR PAGTOS",
          "meaning": "SOMA VALOR DOS PGTOS DO LOTE",
          "picture": "9(16)V9(2)",
          "content": "NOTA 17"
        },
        {
          "start": 42,
          "end": 59,
          "name": "ZEROS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "9(18)",
          "content": ""
        },
        {
          "start": 60,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(171)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGOS OCORRÊNCIAS P/ RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "header_lote_j": {
      "id": "header_lote_j",
      "title": "Header de Lote - Boletos",
      "manualPage": 23,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE IDENTIFICAÇÃO DE PAGTOS",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO HEADER DE LOTE",
          "picture": "9(01)",
          "content": "1"
        },
        {
          "start": 9,
          "end": 9,
          "name": "(1) TIPO DE OPERAÇÃO",
          "meaning": "TIPO DA OPERAÇÃO",
          "picture": "X(01)",
          "content": "C =CRÉDITO"
        },
        {
          "start": 10,
          "end": 11,
          "name": "TIPO DE PAGAMENTO",
          "meaning": "TIPO DE PAGTO",
          "picture": "9(02)",
          "content": "NOTA 4"
        },
        {
          "start": 12,
          "end": 13,
          "name": "FORMA DE PAGAMENTO",
          "meaning": "FORMA DE PAGAMENTO",
          "picture": "9(02)",
          "content": "NOTA 5"
        },
        {
          "start": 14,
          "end": 16,
          "name": "LAYOUT DO LOTE",
          "meaning": "Nº DA VERSÃO DO LAYOUT DO LOTE",
          "picture": "9(03)",
          "content": "030"
        },
        {
          "start": 17,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 18,
          "end": 18,
          "name": "EMPRESA - INSCRIÇÃO",
          "meaning": "TIPO INSCRIÇÃO EMPRESA DEBITADA",
          "picture": "9(01)",
          "content": "1= CPF"
        },
        {
          "start": 19,
          "end": 32,
          "name": "INSCRIÇÃO NÚMERO",
          "meaning": "CNPJ EMPRESA OU CPF DEBITADO",
          "picture": "9(14)",
          "content": "NOTA 1"
        },
        {
          "start": 33,
          "end": 52,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 53,
          "end": 57,
          "name": "AGÊNCIA",
          "meaning": "NÚMERO AGÊNCIA DEBITADA",
          "picture": "9(05)",
          "content": "NOTA 1"
        },
        {
          "start": 58,
          "end": 58,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 59,
          "end": 70,
          "name": "CONTA",
          "meaning": "NÚMERO DE C/C DEBITADA",
          "picture": "9(12)",
          "content": "NOTA 1"
        },
        {
          "start": 71,
          "end": 71,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 72,
          "end": 72,
          "name": "DAC",
          "meaning": "DAC DA AGÊNCIA/CONTA DEBITADA",
          "picture": "9(01)",
          "content": "NOTA 1"
        },
        {
          "start": 73,
          "end": 102,
          "name": "NOME DA EMPRESA",
          "meaning": "NOME DA EMPRESA DEBITADA",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 103,
          "end": 132,
          "name": "FINALIDADE DO LOTE",
          "meaning": "FINALIDADE DOS PAGTOS DO LOTE",
          "picture": "X(30)",
          "content": "NOTA 6"
        },
        {
          "start": 133,
          "end": 142,
          "name": "HISTÓRICO DE C/C",
          "meaning": "COMPLEMENTO HISTÓRICO C/C DEBITADA",
          "picture": "X(10)",
          "content": "NOTA 7"
        },
        {
          "start": 143,
          "end": 172,
          "name": "ENDEREÇO DA EMPRESA",
          "meaning": "NOME DA RUA, AV, PÇA, ETC...",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 173,
          "end": 177,
          "name": "NÚMERO",
          "meaning": "NÚMERO DO LOCAL",
          "picture": "9(05)",
          "content": ""
        },
        {
          "start": 178,
          "end": 192,
          "name": "COMPLEMENTO.",
          "meaning": "CASA, APTO, SALA, ETC...",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 193,
          "end": 212,
          "name": "CIDADE",
          "meaning": "NOME DA CIDADE",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 213,
          "end": 220,
          "name": "CEP",
          "meaning": "CEP",
          "picture": "9(08)",
          "content": ""
        },
        {
          "start": 221,
          "end": 222,
          "name": "ESTADO",
          "meaning": "SIGLA DO ESTADO",
          "picture": "X(02)",
          "content": ""
        },
        {
          "start": 223,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(08)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO OCORRÊNCIAS P/RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "segmento_j": {
      "id": "segmento_j",
      "title": "Segmento J",
      "manualPage": 24,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DE LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "J"
        },
        {
          "start": 15,
          "end": 17,
          "name": "TIPO DE MOVIMENTO",
          "meaning": "TIPO DE MOVIMENTO",
          "picture": "9(03)",
          "content": "NOTA 10"
        },
        {
          "start": 18,
          "end": 20,
          "name": "BANCO FAVORECIDO",
          "meaning": "CÓD. DE BARRAS – CÓDIGO BANCO FAVORECIDO",
          "picture": "9(03)",
          "content": "NOTA 18"
        },
        {
          "start": 21,
          "end": 21,
          "name": "MOEDA",
          "meaning": "CÓD. DE BARRAS – CÓDIGO DA MOEDA",
          "picture": "9(01)",
          "content": "NOTA 18"
        },
        {
          "start": 22,
          "end": 22,
          "name": "DV",
          "meaning": "CÓD. DE BARRAS – DÍGITO VERIF. DO CÓD. BARRAS",
          "picture": "9(01)",
          "content": "NOTA 18"
        },
        {
          "start": 23,
          "end": 26,
          "name": "VENCIMENTO",
          "meaning": "CÓD. DE BARRAS – FATOR DE VENCIMENTO",
          "picture": "9(04)",
          "content": "NOTA 18"
        },
        {
          "start": 27,
          "end": 36,
          "name": "VALOR",
          "meaning": "CÓD. DE BARRAS – VALOR",
          "picture": "9(08)V9(02)",
          "content": "NOTA 18"
        },
        {
          "start": 37,
          "end": 61,
          "name": "CAMPO LIVRE",
          "meaning": "CÓD. DE BARRAS - 'CAMPO LIVRE'",
          "picture": "9(25)",
          "content": "NOTA 18"
        },
        {
          "start": 62,
          "end": 91,
          "name": "NOME DO FAVORECIDO",
          "meaning": "NOME DO FAVORECIDO",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 92,
          "end": 99,
          "name": "DATA VENCTO",
          "meaning": "DATA DO VENCIMENTO (NOMINAL)",
          "picture": "9(08)",
          "content": "DDMMAAAA"
        },
        {
          "start": 100,
          "end": 114,
          "name": "VALOR DO TÍTULO",
          "meaning": "VALOR DO TÍTULO (NOMINAL)",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 115,
          "end": 129,
          "name": "DESCONTOS",
          "meaning": "VALOR DO DESCONTO + ABATIMENTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 130,
          "end": 144,
          "name": "ACRÉSCIMOS",
          "meaning": "VALOR DA MORA + MULTA",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 145,
          "end": 152,
          "name": "DATA PAGAMENTO",
          "meaning": "DATA DO PAGAMENTO",
          "picture": "9(08)",
          "content": "DDMMAAAA"
        },
        {
          "start": 153,
          "end": 167,
          "name": "VALOR PAGAMENTO",
          "meaning": "VALOR DO PAGAMENTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 168,
          "end": 182,
          "name": "ZEROS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "9(15)",
          "content": ""
        },
        {
          "start": 183,
          "end": 202,
          "name": "SEU NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELA EMPRESA",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 203,
          "end": 215,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(13)",
          "content": ""
        },
        {
          "start": 216,
          "end": 230,
          "name": "(*) NOSSO NÚMERO",
          "meaning": "NÚMERO ATRIBUÍDO PELO BANCO",
          "picture": "X(15)",
          "content": "NOTA 12"
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO DE OCORRÊNCIAS P/ RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "segmento_j52": {
      "id": "segmento_j52",
      "title": "Segmento J-52",
      "manualPage": 25,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DE LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "J"
        },
        {
          "start": 15,
          "end": 17,
          "name": "TIPO DE MOVIMENTO",
          "meaning": "TIPO DE MOVIMENTO",
          "picture": "9(03)",
          "content": "NOTA 10"
        },
        {
          "start": 18,
          "end": 19,
          "name": "CÓDIGO DO REGISTRO",
          "meaning": "IDENTIFICAÇÃO DO REGISTRO OPCIONAL",
          "picture": "9(02)",
          "content": "52"
        },
        {
          "start": 20,
          "end": 20,
          "name": "TIPO INSCRIÇÃO SACADO",
          "meaning": "TIPO DE INSCRIÇÃO DO SACADO",
          "picture": "9(01)",
          "content": ""
        },
        {
          "start": 21,
          "end": 35,
          "name": "Campo",
          "meaning": "NÚMERO DE INSCRIÇÃO DO SACADO",
          "picture": "9(15)",
          "content": ""
        },
        {
          "start": 36,
          "end": 75,
          "name": "NOME SACADO",
          "meaning": "NOME DO SACADO",
          "picture": "X(40)",
          "content": ""
        },
        {
          "start": 76,
          "end": 76,
          "name": "Campo",
          "meaning": "TIPO DE INSCRIÇÃO DO CEDENTE",
          "picture": "9(01)",
          "content": ""
        },
        {
          "start": 77,
          "end": 91,
          "name": "Campo",
          "meaning": "NÚMERO DE INSCRIÇÃO DO CEDENTE",
          "picture": "9(15)",
          "content": ""
        },
        {
          "start": 92,
          "end": 131,
          "name": "NOME CEDENTE",
          "meaning": "NOME DO CEDENTE",
          "picture": "X(40)",
          "content": ""
        },
        {
          "start": 132,
          "end": 132,
          "name": "Campo",
          "meaning": "TIPO DE INSCRIÇÃO DO SACADOR AVALISTA",
          "picture": "9(01)",
          "content": ""
        },
        {
          "start": 133,
          "end": 147,
          "name": "Campo",
          "meaning": "NÚMERO DE INSCRIÇÃO DO SACADOR AVALISTA",
          "picture": "9(15)",
          "content": ""
        },
        {
          "start": 148,
          "end": 187,
          "name": "NOME SACADOR",
          "meaning": "NOME DO SACADOR AVALISTA",
          "picture": "X(40)",
          "content": ""
        },
        {
          "start": 188,
          "end": 240,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(53)",
          "content": ""
        }
      ]
    },
    "segmento_j52_pix": {
      "id": "segmento_j52_pix",
      "title": "Segmento J-52 PIX",
      "manualPage": 26,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DE LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "J"
        },
        {
          "start": 15,
          "end": 17,
          "name": "TIPO DE MOVIMENTO",
          "meaning": "TIPO DE MOVIMENTO",
          "picture": "9(03)",
          "content": "NOTA 10"
        },
        {
          "start": 18,
          "end": 19,
          "name": "CÓDIGO DO REGISTRO",
          "meaning": "IDENTIFICAÇÃO DO REGISTRO OPCIONAL",
          "picture": "9(02)",
          "content": "52"
        },
        {
          "start": 20,
          "end": 20,
          "name": "TIPO INSCRIÇÃO SACADO",
          "meaning": "TIPO DE INSCRIÇÃO DO SACADO",
          "picture": "9(01)",
          "content": ""
        },
        {
          "start": 21,
          "end": 35,
          "name": "Campo",
          "meaning": "NÚMERO DE INSCRIÇÃO DO SACADO",
          "picture": "9(15)",
          "content": ""
        },
        {
          "start": 36,
          "end": 75,
          "name": "NOME SACADO",
          "meaning": "NOME DO SACADO",
          "picture": "X(40)",
          "content": ""
        },
        {
          "start": 76,
          "end": 76,
          "name": "Campo",
          "meaning": "TIPO DE INSCRIÇÃO DO CEDENTE",
          "picture": "9(01)",
          "content": ""
        },
        {
          "start": 77,
          "end": 91,
          "name": "Campo",
          "meaning": "NÚMERO DE INSCRIÇÃO DO CEDENTE",
          "picture": "9(15)",
          "content": ""
        },
        {
          "start": 92,
          "end": 131,
          "name": "NOME CEDENTE",
          "meaning": "NOME DO CEDENTE",
          "picture": "X(40)",
          "content": ""
        },
        {
          "start": 132,
          "end": 208,
          "name": "CHAVE DE PAGAMENTO",
          "meaning": "URL / CHAVE DE ENDEREÇAMENTO",
          "picture": "X(77)",
          "content": "NOTA 41"
        },
        {
          "start": 209,
          "end": 240,
          "name": "TXID",
          "meaning": "CÓDIGO DE IDENTIFICAÇÃO DO QR-CODE",
          "picture": "X(32)",
          "content": "NOTA 38"
        }
      ]
    },
    "segmento_b_boleto": {
      "id": "segmento_b_boleto",
      "title": "Segmento B - Boletos",
      "manualPage": 27,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQÜENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "B"
        },
        {
          "start": 15,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(03)",
          "content": ""
        },
        {
          "start": 18,
          "end": 18,
          "name": "EMPRESA – INSCRIÇÃO",
          "meaning": "TIPO INSCRIÇÃO DO FAVORECIDO",
          "picture": "9(01)",
          "content": ""
        },
        {
          "start": 19,
          "end": 32,
          "name": "Nº DE INSCRIÇÃO",
          "meaning": "Nº DE INSCRIÇÃO DO FAVORECIDO (CPF/CNPJ)",
          "picture": "9(14)",
          "content": "NOTA 15"
        },
        {
          "start": 33,
          "end": 62,
          "name": "ENDEREÇO",
          "meaning": "NOME DA RUA, AV., PÇA, ETC",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 63,
          "end": 67,
          "name": "NÚMERO",
          "meaning": "NÚMERO DO LOCAL",
          "picture": "9(05)",
          "content": ""
        },
        {
          "start": 68,
          "end": 82,
          "name": "COMPLEMENTO.",
          "meaning": "CASA, APTO, ETC...",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 83,
          "end": 97,
          "name": "BAIRRO",
          "meaning": "BAIRRO",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 98,
          "end": 117,
          "name": "CIDADE",
          "meaning": "NOME DA CIDADE",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 118,
          "end": 125,
          "name": "CEP",
          "meaning": "CEP",
          "picture": "9(08)",
          "content": ""
        },
        {
          "start": 126,
          "end": 127,
          "name": "ESTADO",
          "meaning": "SIGLA DO ESTADO",
          "picture": "X(02)",
          "content": ""
        },
        {
          "start": 128,
          "end": 227,
          "name": "E-MAIL",
          "meaning": "ENDEREÇO DE E-MAIL",
          "picture": "X(100)",
          "content": "NOTA 23"
        },
        {
          "start": 228,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(03)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO DE OCORRÊNCIAS NO RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "segmento_c_boleto": {
      "id": "segmento_c_boleto",
      "title": "Segmento C - Boletos",
      "manualPage": 28,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQÜENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "C"
        },
        {
          "start": 15,
          "end": 29,
          "name": "VALOR C.S.L.L.",
          "meaning": "VALOR DA CONTRIBUIÇÃO SOBRE O LUCRO LÍQUIDO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 30,
          "end": 37,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(08)",
          "content": ""
        },
        {
          "start": 38,
          "end": 45,
          "name": "VENCIMENTO",
          "meaning": "DATA DE VENCIMENTO",
          "picture": "X(08)",
          "content": "DDMMAAAA"
        },
        {
          "start": 46,
          "end": 60,
          "name": "VALOR DOCUMENTO",
          "meaning": "VALOR NOMINAL DO DOCUMENTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 61,
          "end": 75,
          "name": "VALOR PIS",
          "meaning": "VALOR PROGRAMA DE INTEGRAÇÃO SOCIAL",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 76,
          "end": 90,
          "name": "VALOR I.R.",
          "meaning": "VALOR DO IMPOSTO DE RENDA",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 91,
          "end": 105,
          "name": "VALOR I.S.S.",
          "meaning": "VALOR DO IMPOSTO SOBRE SERVIÇOS",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 106,
          "end": 120,
          "name": "VALOR COFINS",
          "meaning": "VALOR CONTRIBUIÇÃO FINALIDADE SOCIAL",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 121,
          "end": 135,
          "name": "DESCONTO",
          "meaning": "VALOR DO DESCONTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 136,
          "end": 150,
          "name": "ABATIMENTO",
          "meaning": "VALOR DO ABATIMENTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 151,
          "end": 165,
          "name": "OUTRAS DEDUÇÕES",
          "meaning": "VALOR DE OUTRAS DEDUÇÕES",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 166,
          "end": 180,
          "name": "MORA",
          "meaning": "VALOR DA MORA",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 181,
          "end": 195,
          "name": "MULTA",
          "meaning": "VALOR DA MULTA",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 196,
          "end": 210,
          "name": "OUTROS ACRÉSCIMOS",
          "meaning": "VALOR DE OUTROS ACRÉSCIMOS",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 211,
          "end": 230,
          "name": "FATURA/DOCUMENTO",
          "meaning": "NÚMERO DA FATURA/DOCUMENTO",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(10)",
          "content": ""
        }
      ]
    },
    "segmento_z_boleto": {
      "id": "segmento_z_boleto",
      "title": "Segmento Z - Boletos",
      "manualPage": 29,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "Z"
        },
        {
          "start": 15,
          "end": 78,
          "name": "AUTENTICAÇÃO",
          "meaning": "AUTENTICAÇÃO ELETRÔNICA DO PAGAMENTO",
          "picture": "X(64)",
          "content": ""
        },
        {
          "start": 79,
          "end": 98,
          "name": "SEU NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELA EMPRESA",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 99,
          "end": 103,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(05)",
          "content": ""
        },
        {
          "start": 104,
          "end": 118,
          "name": "NOSSO NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELO BANCO",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 119,
          "end": 240,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(122)",
          "content": ""
        }
      ]
    },
    "trailer_lote_j": {
      "id": "trailer_lote_j",
      "title": "Trailer de Lote - Boletos",
      "manualPage": 30,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO TRAILER DE LOTE",
          "picture": "9(01)",
          "content": "5"
        },
        {
          "start": 9,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(09)",
          "content": ""
        },
        {
          "start": 18,
          "end": 23,
          "name": "TOTAL QTDE REGISTROS",
          "meaning": "QTDE REGISTROS DO LOTE",
          "picture": "9(06)",
          "content": "NOTA 17"
        },
        {
          "start": 24,
          "end": 41,
          "name": "TOTAL VALOR PAGTOS",
          "meaning": "SOMA VALOR DOS PGTOS DO LOTE",
          "picture": "9(16)V9(2)",
          "content": "NOTA 17"
        },
        {
          "start": 42,
          "end": 59,
          "name": "ZEROS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "9(18)",
          "content": ""
        },
        {
          "start": 60,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(171)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGOS OCORRÊNCIAS P/ RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "header_lote_o": {
      "id": "header_lote_o",
      "title": "Header de Lote - Concessionárias",
      "manualPage": 31,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE IDENTIFICAÇÃO DE PAGTOS",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO HEADER DE LOTE",
          "picture": "9(01)",
          "content": "1"
        },
        {
          "start": 9,
          "end": 9,
          "name": "TIPO DE OPERAÇÃO",
          "meaning": "TIPO DA OPERAÇÃO",
          "picture": "X(01)",
          "content": "C =CRÉDITO"
        },
        {
          "start": 10,
          "end": 11,
          "name": "TIPO DE PAGAMENTO",
          "meaning": "TIPO DE PAGTO",
          "picture": "9(02)",
          "content": "NOTA 4"
        },
        {
          "start": 12,
          "end": 13,
          "name": "FORMA DE PAGAMENTO",
          "meaning": "FORMA DE PAGAMENTO",
          "picture": "9(02)",
          "content": "NOTA 5"
        },
        {
          "start": 14,
          "end": 16,
          "name": "LAYOUT DO LOTE",
          "meaning": "Nº DA VERSÃO DO LAYOUT DO LOTE",
          "picture": "9(03)",
          "content": "030"
        },
        {
          "start": 17,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 18,
          "end": 18,
          "name": "EMPRESA - INSCRIÇÃO",
          "meaning": "TIPO INSCRIÇÃO EMPRESA DEBITADA",
          "picture": "9(01)",
          "content": ""
        },
        {
          "start": 19,
          "end": 32,
          "name": "INSCRIÇÃO NÚMERO",
          "meaning": "CNPJ EMPRESA OU CPF DEBITADO",
          "picture": "9(14)",
          "content": "NOTA 1"
        },
        {
          "start": 33,
          "end": 52,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 53,
          "end": 57,
          "name": "AGÊNCIA",
          "meaning": "NÚMERO AGÊNCIA DEBITADA",
          "picture": "9(05)",
          "content": "NOTA 1"
        },
        {
          "start": 58,
          "end": 58,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 59,
          "end": 70,
          "name": "CONTA",
          "meaning": "NÚMERO DE C/C DEBITADA",
          "picture": "9(12)",
          "content": "NOTA 1"
        },
        {
          "start": 71,
          "end": 71,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 72,
          "end": 72,
          "name": "DAC",
          "meaning": "DAC DA AGÊNCIA/CONTA DEBITADA",
          "picture": "9(01)",
          "content": "NOTA 1"
        },
        {
          "start": 73,
          "end": 102,
          "name": "NOME DA EMPRESA",
          "meaning": "NOME DA EMPRESA DEBITADA",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 103,
          "end": 132,
          "name": "FINALIDADE DO LOTE",
          "meaning": "FINALIDADE DOS PAGTOS DO LOTE",
          "picture": "X(30)",
          "content": "NOTA 6"
        },
        {
          "start": 133,
          "end": 142,
          "name": "HISTÓRICO DE C/C",
          "meaning": "COMPLEMENTO HISTÓRICO C/C DEBITADA",
          "picture": "X(10)",
          "content": "NOTA 7"
        },
        {
          "start": 143,
          "end": 172,
          "name": "ENDEREÇO DA EMPRESA",
          "meaning": "NOME DA RUA, AV, PÇA, ETC...",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 173,
          "end": 177,
          "name": "NÚMERO",
          "meaning": "NÚMERO DO LOCAL",
          "picture": "9(05)",
          "content": ""
        },
        {
          "start": 178,
          "end": 192,
          "name": "COMPLEMENTO.",
          "meaning": "CASA, APTO, SALA, ETC...",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 193,
          "end": 212,
          "name": "CIDADE",
          "meaning": "NOME DA CIDADE",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 213,
          "end": 220,
          "name": "CEP",
          "meaning": "CEP",
          "picture": "9(08)",
          "content": ""
        },
        {
          "start": 221,
          "end": 222,
          "name": "ESTADO",
          "meaning": "SIGLA DO ESTADO",
          "picture": "X(02)",
          "content": ""
        },
        {
          "start": 223,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(08)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO OCORRÊNCIAS P/RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "segmento_o": {
      "id": "segmento_o",
      "title": "Segmento O",
      "manualPage": 32,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DE LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "O"
        },
        {
          "start": 15,
          "end": 17,
          "name": "TIPO DE MOVIMENTO",
          "meaning": "TIPO DE MOVIMENTO",
          "picture": "9(03)",
          "content": "NOTA 10"
        },
        {
          "start": 18,
          "end": 65,
          "name": "CÓDIGO DE BARRAS",
          "meaning": "CÓDIGO DE BARRAS",
          "picture": "X(48)",
          "content": "NOTA 18"
        },
        {
          "start": 66,
          "end": 95,
          "name": "NOME",
          "meaning": "NOME DA CONCESSIONÁRIA / CONTRIBUINTE",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 96,
          "end": 103,
          "name": "DATA VENCTO",
          "meaning": "DATA DO VENCIMENTO (NOMINAL)",
          "picture": "9(08)",
          "content": "DDMMAAAA"
        },
        {
          "start": 104,
          "end": 106,
          "name": "MOEDA",
          "meaning": "TIPO DE MOEDA",
          "picture": "X(03)",
          "content": "REA"
        },
        {
          "start": 107,
          "end": 121,
          "name": "QUANTIDADE MOEDA",
          "meaning": "QUANTIDADE DE MOEDA",
          "picture": "9(07)V9(08)",
          "content": "NOTA 19"
        },
        {
          "start": 122,
          "end": 136,
          "name": "VALOR A PAGAR",
          "meaning": "VALOR PREVISTO DO PAGAMENTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 137,
          "end": 144,
          "name": "DATA PAGAMENTO",
          "meaning": "DATA DO PAGAMENTO",
          "picture": "9(08)",
          "content": "DDMMAAAA"
        },
        {
          "start": 145,
          "end": 159,
          "name": "(*) VALOR PAGO",
          "meaning": "VALOR DE EFETIVAÇÃO DO PAGAMENTO",
          "picture": "9(13)V9(02)",
          "content": ""
        },
        {
          "start": 160,
          "end": 162,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(03)",
          "content": ""
        },
        {
          "start": 163,
          "end": 171,
          "name": "NOTA FISCAL",
          "meaning": "NÚMERO DA NOTA FISCAL",
          "picture": "9(09)",
          "content": "NOTA 33"
        },
        {
          "start": 172,
          "end": 174,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(03)",
          "content": ""
        },
        {
          "start": 175,
          "end": 194,
          "name": "SEU NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELA EMPRESA",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 195,
          "end": 215,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(21)",
          "content": ""
        },
        {
          "start": 216,
          "end": 230,
          "name": "(*) NOSSO NÚMERO",
          "meaning": "NÚMERO ATRIBUÍDO PELO BANCO",
          "picture": "X(15)",
          "content": "NOTA 12"
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO DE OCORRÊNCIAS P/ RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "segmento_z_o": {
      "id": "segmento_z_o",
      "title": "Segmento Z - Concessionárias",
      "manualPage": 33,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "Z"
        },
        {
          "start": 15,
          "end": 78,
          "name": "AUTENTICAÇÃO",
          "meaning": "AUTENTICAÇÃO ELETRÔNICA DO PAGAMENTO",
          "picture": "X(64)",
          "content": ""
        },
        {
          "start": 79,
          "end": 98,
          "name": "SEU NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELA EMPRESA",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 99,
          "end": 103,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(05)",
          "content": ""
        },
        {
          "start": 104,
          "end": 118,
          "name": "NOSSO NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELO BANCO",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 119,
          "end": 240,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(122)",
          "content": ""
        }
      ]
    },
    "trailer_lote_o": {
      "id": "trailer_lote_o",
      "title": "Trailer de Lote - Concessionárias",
      "manualPage": 34,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO TRAILER DE LOTE",
          "picture": "9(01)",
          "content": "5"
        },
        {
          "start": 9,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(09)",
          "content": ""
        },
        {
          "start": 18,
          "end": 23,
          "name": "TOTAL QTDE REGISTROS",
          "meaning": "QTDE REGISTROS DO LOTE",
          "picture": "9(06)",
          "content": "NOTA 17"
        },
        {
          "start": 24,
          "end": 41,
          "name": "TOTAL VALOR PAGTOS",
          "meaning": "SOMA VALOR DOS PGTOS DO LOTE",
          "picture": "9(16)V9(02)",
          "content": "NOTA 17"
        },
        {
          "start": 42,
          "end": 56,
          "name": "TOTAL QTDE MOEDA",
          "meaning": "SOMA DA QUANTIDADE DE MOEDA DO LOTE",
          "picture": "9(07)V9(08)",
          "content": "NOTA 17"
        },
        {
          "start": 57,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(174)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGOS OCORRÊNCIAS P/ RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "header_lote_n": {
      "id": "header_lote_n",
      "title": "Header de Lote - Tributos",
      "manualPage": 35,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE IDENTIFICAÇÃO DE PAGTOS",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO HEADER DE LOTE",
          "picture": "9(01)",
          "content": "1"
        },
        {
          "start": 9,
          "end": 9,
          "name": "TIPO DE OPERAÇÃO",
          "meaning": "TIPO DA OPERAÇÃO",
          "picture": "X(01)",
          "content": "C =CRÉDITO"
        },
        {
          "start": 10,
          "end": 11,
          "name": "TIPO DE PAGAMENTO",
          "meaning": "TIPO DE PAGTO",
          "picture": "9(02)",
          "content": "NOTA 4"
        },
        {
          "start": 12,
          "end": 13,
          "name": "FORMA DE PAGAMENTO",
          "meaning": "FORMA DE PAGAMENTO",
          "picture": "9(02)",
          "content": "NOTA 5"
        },
        {
          "start": 14,
          "end": 16,
          "name": "LAYOUT DO LOTE",
          "meaning": "Nº DA VERSÃO DO LAYOUT DO LOTE",
          "picture": "9(03)",
          "content": "030"
        },
        {
          "start": 17,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 18,
          "end": 18,
          "name": "EMPRESA - INSCRIÇÃO",
          "meaning": "TIPO INSCRIÇÃO EMPRESA DEBITADA",
          "picture": "9(01)",
          "content": ""
        },
        {
          "start": 19,
          "end": 32,
          "name": "INSCRIÇÃO NÚMERO",
          "meaning": "CNPJ EMPRESA OU CPF DEBITADO",
          "picture": "9(14)",
          "content": "NOTA 1"
        },
        {
          "start": 33,
          "end": 52,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 53,
          "end": 57,
          "name": "AGÊNCIA",
          "meaning": "NÚMERO AGÊNCIA DEBITADA",
          "picture": "9(05)",
          "content": "NOTA 1"
        },
        {
          "start": 58,
          "end": 58,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 59,
          "end": 70,
          "name": "CONTA",
          "meaning": "NÚMERO DE C/C DEBITADA",
          "picture": "9(12)",
          "content": "NOTA 1"
        },
        {
          "start": 71,
          "end": 71,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(01)",
          "content": ""
        },
        {
          "start": 72,
          "end": 72,
          "name": "DAC",
          "meaning": "DAC DA AGÊNCIA/CONTA DEBITADA",
          "picture": "9(01)",
          "content": "NOTA 1"
        },
        {
          "start": 73,
          "end": 102,
          "name": "NOME DA EMPRESA",
          "meaning": "NOME DA EMPRESA DEBITADA",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 103,
          "end": 132,
          "name": "FINALIDADE DO LOTE",
          "meaning": "FINALIDADE DOS PAGTOS DO LOTE",
          "picture": "X(30)",
          "content": "NOTA 6"
        },
        {
          "start": 133,
          "end": 142,
          "name": "HISTÓRICO DE C/C",
          "meaning": "COMPLEMENTO HISTÓRICO C/C DEBITADA",
          "picture": "X(10)",
          "content": "NOTA 7"
        },
        {
          "start": 143,
          "end": 172,
          "name": "ENDEREÇO DA EMPRESA",
          "meaning": "NOME DA RUA, AV, PÇA, ETC...",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 173,
          "end": 177,
          "name": "NÚMERO",
          "meaning": "NÚMERO DO LOCAL",
          "picture": "9(05)",
          "content": ""
        },
        {
          "start": 178,
          "end": 192,
          "name": "COMPLEMENTO.",
          "meaning": "CASA, APTO, SALA, ETC...",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 193,
          "end": 212,
          "name": "CIDADE",
          "meaning": "NOME DA CIDADE",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 213,
          "end": 220,
          "name": "CEP",
          "meaning": "CEP",
          "picture": "9(08)",
          "content": ""
        },
        {
          "start": 221,
          "end": 222,
          "name": "ESTADO",
          "meaning": "SIGLA DO ESTADO",
          "picture": "X(02)",
          "content": ""
        },
        {
          "start": 223,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(08)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO OCORRÊNCIAS P/RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "segmento_n": {
      "id": "segmento_n",
      "title": "Segmento N",
      "manualPage": 36,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DE LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "'N'"
        },
        {
          "start": 15,
          "end": 17,
          "name": "TIPO DE MOVIMENTO",
          "meaning": "TIPO DE MOVIMENTO",
          "picture": "9(03)",
          "content": "NOTA 10"
        },
        {
          "start": 18,
          "end": 195,
          "name": "DADOS DO TRIBUTO",
          "meaning": "DADOS DE IDENTIFICAÇÃO DO TRIBUTO",
          "picture": "X(178)",
          "content": "ANEXO \"C\""
        },
        {
          "start": 196,
          "end": 215,
          "name": "SEU NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELA EMPRESA",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 216,
          "end": 230,
          "name": "(*) NOSSO NÚMERO",
          "meaning": "NÚMERO ATRIBUÍDO PELO BANCO",
          "picture": "X(15)",
          "content": "NOTA 12"
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGO DE OCORRÊNCIAS P/ RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "segmento_b_n": {
      "id": "segmento_b_n",
      "title": "Segmento B - Tributos",
      "manualPage": 37,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "B"
        },
        {
          "start": 15,
          "end": 32,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(18)",
          "content": "BRANCOS"
        },
        {
          "start": 33,
          "end": 62,
          "name": "ENDEREÇO",
          "meaning": "NOME DA RUA, AV, PÇA, ETC",
          "picture": "X(30)",
          "content": ""
        },
        {
          "start": 63,
          "end": 67,
          "name": "NÚMERO",
          "meaning": "NÚMERO DO LOCAL",
          "picture": "9(05)",
          "content": ""
        },
        {
          "start": 68,
          "end": 82,
          "name": "COMPLEMENTO.",
          "meaning": "CASA, APTO, ETC",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 83,
          "end": 97,
          "name": "BAIRRO",
          "meaning": "BAIRRO",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 98,
          "end": 117,
          "name": "CIDADE",
          "meaning": "NOME DA CIDADE",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 118,
          "end": 125,
          "name": "CEP",
          "meaning": "CEP",
          "picture": "9(08)",
          "content": ""
        },
        {
          "start": 126,
          "end": 127,
          "name": "ESTADO",
          "meaning": "SIGLA DO ESTADO",
          "picture": "X(02)",
          "content": ""
        },
        {
          "start": 128,
          "end": 138,
          "name": "(1) TELEFONE",
          "meaning": "DDD E NÚMERO DO TELEFONE",
          "picture": "X(11)",
          "content": ""
        },
        {
          "start": 139,
          "end": 152,
          "name": "ACRÉSCIMOS",
          "meaning": "VALOR DO ACRÉSCIMO",
          "picture": "9(12)V(02)",
          "content": ""
        },
        {
          "start": 153,
          "end": 166,
          "name": "(1) HONORÁRIOS",
          "meaning": "VALOR DO HONORÁRIO",
          "picture": "9(12)V(02)",
          "content": ""
        },
        {
          "start": 167,
          "end": 240,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(74)",
          "content": "BRANCOS"
        }
      ]
    },
    "segmento_w": {
      "id": "segmento_w",
      "title": "Segmento W",
      "manualPage": 38,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQÜENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "W"
        },
        {
          "start": 15,
          "end": 16,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(02)",
          "content": "BRANCOS"
        },
        {
          "start": 17,
          "end": 56,
          "name": "INFORMAÇÃO 1",
          "meaning": "INFORMAÇÃO COMPLEMENTAR 1",
          "picture": "X(40)",
          "content": ""
        },
        {
          "start": 57,
          "end": 96,
          "name": "INFORMAÇÃO 2",
          "meaning": "INFORMAÇÃO COMPLEMENTAR 2",
          "picture": "X(40)",
          "content": ""
        },
        {
          "start": 97,
          "end": 136,
          "name": "INFORMAÇÃO 3",
          "meaning": "INFORMAÇÃO COMPLEMENTAR 3",
          "picture": "X(40)",
          "content": ""
        },
        {
          "start": 137,
          "end": 176,
          "name": "INFORMAÇÃO 4",
          "meaning": "INFORMAÇÃO COMPLEMENTAR 4",
          "picture": "X(40)",
          "content": ""
        },
        {
          "start": 177,
          "end": 240,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(64)",
          "content": ""
        }
      ]
    },
    "segmento_z_n": {
      "id": "segmento_z_n",
      "title": "Segmento Z - Tributos",
      "manualPage": 39,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO DETALHE DO LOTE",
          "picture": "9(01)",
          "content": "3"
        },
        {
          "start": 9,
          "end": 13,
          "name": "NÚMERO DO REGISTRO",
          "meaning": "Nº SEQUENCIAL REGISTRO NO LOTE",
          "picture": "9(05)",
          "content": "NOTA 9"
        },
        {
          "start": 14,
          "end": 14,
          "name": "CÓDIGO DO SEGMENTO",
          "meaning": "CÓDIGO SEGMENTO REG. DETALHE",
          "picture": "X(01)",
          "content": "Z"
        },
        {
          "start": 15,
          "end": 78,
          "name": "AUTENTICAÇÃO",
          "meaning": "AUTENTICAÇÃO ELETRÔNICA DO PAGAMENTO",
          "picture": "X(64)",
          "content": ""
        },
        {
          "start": 79,
          "end": 98,
          "name": "SEU NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELA EMPRESA",
          "picture": "X(20)",
          "content": ""
        },
        {
          "start": 99,
          "end": 103,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(05)",
          "content": ""
        },
        {
          "start": 104,
          "end": 118,
          "name": "NOSSO NÚMERO",
          "meaning": "Nº DOCTO ATRIBUÍDO PELO BANCO",
          "picture": "X(15)",
          "content": ""
        },
        {
          "start": 119,
          "end": 240,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(122)",
          "content": ""
        }
      ]
    },
    "trailer_lote_n": {
      "id": "trailer_lote_n",
      "title": "Trailer de Lote - Tributos",
      "manualPage": 40,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "NOTA 3"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO TRAILER DE LOTE",
          "picture": "9(01)",
          "content": "5"
        },
        {
          "start": 9,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(09)",
          "content": ""
        },
        {
          "start": 18,
          "end": 23,
          "name": "TOTAL QTDE REGISTROS",
          "meaning": "QTDE REGISTROS DO LOTE",
          "picture": "9(06)",
          "content": "NOTA 17"
        },
        {
          "start": 24,
          "end": 37,
          "name": "TOTAL VALOR PRINCIPAL",
          "meaning": "SOMA VALOR PRINCIPAL DOS PGTOS DO LOTE",
          "picture": "9(12)V9(02)",
          "content": "NOTA 17"
        },
        {
          "start": 38,
          "end": 51,
          "name": "(1) TOTAL OUTRAS ENTIDAD.",
          "meaning": "SOMA VALORES DE OUTRAS ENTIDADES DO LOTE",
          "picture": "9(12)V9(02)",
          "content": "NOTA 17"
        },
        {
          "start": 52,
          "end": 65,
          "name": "TOTAL VAL. ACRESCIMOS",
          "meaning": "SOMA VALORES ATUALIZ. MONET/MULTA/MORA",
          "picture": "9(12)V9(02)",
          "content": "NOTA 17"
        },
        {
          "start": 66,
          "end": 79,
          "name": "TOTAL VALOR ARRECAD.",
          "meaning": "SOMA VALOR DOS PAGAMENTOS DO LOTE",
          "picture": "9(12)V9(02)",
          "content": "NOTA 17"
        },
        {
          "start": 80,
          "end": 230,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(151)",
          "content": ""
        },
        {
          "start": 231,
          "end": 240,
          "name": "(*) OCORRÊNCIAS",
          "meaning": "CÓDIGOS OCORRÊNCIAS P/ RETORNO",
          "picture": "X(10)",
          "content": "NOTA 8"
        }
      ]
    },
    "trailer_arquivo": {
      "id": "trailer_arquivo",
      "title": "Trailer de Arquivo",
      "manualPage": 41,
      "fields": [
        {
          "start": 1,
          "end": 3,
          "name": "CÓDIGO DO BANCO",
          "meaning": "CÓDIGO BANCO NA COMPENSAÇÃO",
          "picture": "9(03)",
          "content": "341"
        },
        {
          "start": 4,
          "end": 7,
          "name": "CÓDIGO DO LOTE",
          "meaning": "LOTE DE SERVIÇO",
          "picture": "9(04)",
          "content": "9999"
        },
        {
          "start": 8,
          "end": 8,
          "name": "TIPO DE REGISTRO",
          "meaning": "REGISTRO TRAILER DE ARQUIVO",
          "picture": "9(01)",
          "content": "9"
        },
        {
          "start": 9,
          "end": 17,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(09)",
          "content": ""
        },
        {
          "start": 18,
          "end": 23,
          "name": "TOTAL QTDE LOTES",
          "meaning": "QTDE LOTES DO ARQUIVO",
          "picture": "9(06)",
          "content": "NOTA 17"
        },
        {
          "start": 24,
          "end": 29,
          "name": "TOTAL QTDE REGISTROS",
          "meaning": "QTDE REGISTROS DO ARQUIVO",
          "picture": "9(06)",
          "content": "NOTA 17"
        },
        {
          "start": 30,
          "end": 240,
          "name": "BRANCOS",
          "meaning": "COMPLEMENTO DE REGISTRO",
          "picture": "X(211)",
          "content": ""
        }
      ]
    }
  },
  "notes": {
    "1": "(1) Devem ser informadas todas as 14 posições do CNPJ a ser verificado (raiz + variação + DV);",
    "2": "(2) Serão consistidos apenas os 8 primeiros dígitos do CNPJ (ocupando as posições 204 a 211), demais posições deverá ser zerado. Não se aplica os pagamentos cuja forma seja através de DOC/TED e OP;",
    "3": "(3) Para os códigos 517, 519 e 999 informar os campos obrigatórios devendo os demais campos ser preenchidos com brancos ou zeros, conforme sua picture.",
    "4": "(4) Estes códigos destinam-se exclusivamente ao produto Demonstrativo de Pagamentos/Holerite, que deve previamente ser negociado com o Banco;",
    "5": "(5) Será disponibilizada no campo observações do Demonstrativo de Pagamentos/Holerite a informação: “Este demonstrativo substitui o Anterior” Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 47",
    "6": "(6) FINALIDADE DO LOTE Na contratação, não tendo sido acertada a sua utilização, este campo deverá ser obrigatoriamente preenchido com brancos. Se contratado, a mensagem constará em todos os avisos e documentos originados do lote, desde que seja solicitado aviso ao favorecido conforme nota 16. Quando se tratar de Conta de Investimento ou o tipo de pagamento for SISPAG Salários e tiver sido contratado o serviço Holerite – Demonstrativo de Pagamentos / Informe de Rendimentos, via Itaú Empresas na Internet / Auto-Atendimento, deverá ser indicado nas posições 103 a 104 o código correspondente, conforme tabela abaixo: Código Descrição 01 Folha Mensal 02 Folha Quinzenal 03 Folha Complementar 04 13º Salário 05 Participação de Resultados 06 Informe de Rendimentos 07 Férias 08 Rescisão 09 Rescisão Complementar 10 Outros 85 Débito Conta Investimento Para pagamentos que envolvam Conta Investimento os campos Finalidade do Lote (Posições 103 e 104 do Registro Header de Lote) e Finalidade TED (Posições 220 a 224 do Registro Detalhe Segmento A - Nota 26), devem apresentar os seguintes conteúdos, de acordo com a operação: Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 43 DÉBITO CRÉDITO FINALIDADE DO LOTE FINALIDADE TED CONTA CORRENTE CONTA CORRENTE “00” “00000” ou brancos (forma de pagamento “06”) CONTA CORRENTE CONTA INVESTIMENTO “00” “00016” (formas de pagamento “06” ou “43”) CONTA INVESTIMENTO CONTA CORRENTE “85” “00000” ou brancos (formas de pagamento “06” ou “43”) CONTA INVESTIMENTO CONTA INVESTIMENTO “85” “00016” (formas de pagamento “06” ou “43”)",
    "7": "(7) HISTÓRICO DE C/C DEBITADA Na contratação, não tendo sido acertada a sua utilização, este campo deverá ser obrigatoriamente preenchido com brancos. Se na contratação tiver sido determinado que a conta corrente receberá um débito por lote de serviço, este campo permite complementar o histórico do lançamento no extrato de conta corrente debitada da empresa, facilitando sua conciliação.",
    "8": "(8) OCORRÊNCIAS Campo utilizado no arquivo retorno para informação das ocorrências detectadas no processamento do arquivo remessa, enviado pela empresa, e também para confirmar a execução dos pagamentos. Pode-se informar até cinco ocorrências em seqüência, cada uma delas codificada em dois dígitos, conforme relação abaixo: Obs. CÓDIGO SIGNIFICADO 00 PAGAMENTO EFETUADO AE DATA DE PAGAMENTO ALTERADA AG NÚMERO DO LOTE INVÁLIDO AH NÚMERO SEQUENCIAL DO REGISTRO NO LOTE INVÁLIDO AI PRODUTO DEMONSTRATIVO DE PAGAMENTO NÃO CONTRATADO AJ TIPO DE MOVIMENTO INVÁLIDO AL CÓDIGO DO BANCO FAVORECIDO INVÁLIDO AM AGÊNCIA DO FAVORECIDO INVÁLIDA AN CONTA CORRENTE DO FAVORECIDO INVÁLIDA AO NOME DO FAVORECIDO INVÁLIDO DATA DE PAGAMENTO / DATA DE VALIDADE / HORA DE LANÇAMENTO / AP ARRECADAÇÃO / APURAÇÃO INVÁLIDA AQ QUANTIDADE DE REGISTROS MAIOR QUE 999999 AR VALOR ARRECADADO / LANÇAMENTO INVÁLIDO BC NOSSO NÚMERO INVÁLIDO BD PAGAMENTO AGENDADO BE PAGAMENTO AGENDADO COM FORMA ALTERADA PARA OP CNPJ / CPF DO FAVORECIDO NO SEGMENTO J-52 ou B INVÁLIDO / DOCUMENTO BI FAVORECIDO INVÁLIDO PIX BL VALOR DA PARCELA INVÁLIDO CD CNPJ / CPF INFORMADO DIVERGENTE DO CADASTRADO CE PAGAMENTO CANCELADO CF VALOR DO DOCUMENTO INVÁLIDO / VALOR DIVERGENTE DO QR CODE CG VALOR DO ABATIMENTO INVÁLIDO CH VALOR DO DESCONTO INVÁLIDO CNPJ / CPF / IDENTIFICADOR / INSCRIÇÃO ESTADUAL / INSCRIÇÃO NO CAD / ICMS CI INVÁLIDO CJ VALOR DA MULTA INVÁLIDO CK TIPO DE INSCRIÇÃO INVÁLIDA CL VALOR DO INSS INVÁLIDO Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 44 CM VALOR DO COFINS INVÁLIDO CN CONTA NÃO CADASTRADA CO VALOR DE OUTRAS ENTIDADES INVÁLIDO B CP CONFIRMAÇÃO DE OP CUMPRIDA CQ SOMA DAS FATURAS DIFERE DO PAGAMENTO CR VALOR DO CSLL INVÁLIDO CS DATA DE VENCIMENTO DA FATURA INVÁLIDA DA NÚMERO DE DEPEND. SALÁRIO FAMILIA INVALIDO DB NÚMERO DE HORAS SEMANAIS INVÁLIDO DC SALÁRIO DE CONTRIBUIÇÃO INSS INVÁLIDO DD SALÁRIO DE CONTRIBUIÇÃO FGTS INVÁLIDO DE VALOR TOTAL DOS PROVENTOS INVÁLIDO DF VALOR TOTAL DOS DESCONTOS INVÁLIDO DG VALOR LÍQUIDO NÃO NUMÉRICO DH VALOR LIQ. INFORMADO DIFERE DO CALCULADO DI VALOR DO SALÁRIO-BASE INVÁLIDO DJ BASE DE CÁLCULO IRRF INVÁLIDA DK BASE DE CÁLCULO FGTS INVÁLIDA DL FORMA DE PAGAMENTO INCOMPATÍVEL COM HOLERITE DM E-MAIL DO FAVORECIDO INVÁLIDO A DV DOC / TED DEVOLVIDO PELO BANCO FAVORECIDO D0 FINALIDADE DO HOLERITE INVÁLIDA D1 MÊS DE COMPETENCIA DO HOLERITE INVÁLIDA D2 DIA DA COMPETENCIA DO HOLETITE INVÁLIDA D3 CENTRO DE CUSTO INVÁLIDO D4 CAMPO NUMÉRICO DA FUNCIONAL INVÁLIDO D5 DATA INÍCIO DE FÉRIAS NÃO NUMÉRICA D6 DATA INÍCIO DE FÉRIAS INCONSISTENTE D7 DATA FIM DE FÉRIAS NÃO NUMÉRICO D8 DATA FIM DE FÉRIAS INCONSISTENTE D9 NÚMERO DE DEPENDENTES IR INVÁLIDO B EM CONFIRMAÇÃO DE OP EMITIDA B EX DEVOLUÇÃO DE OP NÃO SACADA PELO FAVORECIDO E0 TIPO DE MOVIMENTO HOLERITE INVÁLIDO E1 VALOR 01 DO HOLERITE / INFORME INVÁLIDO E2 VALOR 02 DO HOLERITE / INFORME INVÁLIDO E3 VALOR 03 DO HOLERITE / INFORME INVÁLIDO E4 VALOR 04 DO HOLERITE / INFORME INVÁLIDO FC PAGAMENTO EFETUADO ATRAVÉS DE FINANCIAMENTO COMPROR FD PAGAMENTO EFETUADO ATRAVÉS DE FINANCIAMENTO DESCOMPROR HÁ ERRO NO LOTE HM ERRO NO REGISTRO HEADER DE ARQUIVO IB VALOR DO DOCUMENTO INVÁLIDO IC VALOR DO ABATIMENTO INVÁLIDO ID VALOR DO DESCONTO INVÁLIDO IE VALOR DA MORA INVÁLIDO IF VALOR DA MULTA INVÁLIDO IG VALOR DA DEDUÇÃO INVÁLIDO IH VALOR DO ACRÉSCIMO INVÁLIDO II DATA DE VENCIMENTO INVÁLIDA / QR CODE EXPIRADO IJ COMPETÊNCIA / PERÍODO REFERÊNCIA / PARCELA INVÁLIDA IK TRIBUTO NÃO LIQUIDÁVEL VIA SISPAG OU NÃO CONVENIADO COM ITAÚ IL CÓDIGO DE PAGAMENTO / EMPRESA /RECEITA INVÁLIDO IM TIPO X FORMA NÃO COMPATÍVEL IN BANCO/AGÊNCIA NÃO CADASTRADOS Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 45 DAC / VALOR / COMPETÊNCIA / IDENTIFICADOR DO LACRE INVÁLIDO / IO IDENTIFICAÇÃO DO QR CODE INVÁLIDO IP DAC DO CÓDIGO DE BARRAS INVÁLIDO / ERRO NA VALIDAÇÃO DO QR CODE IQ DÍVIDA ATIVA OU NÚMERO DE ETIQUETA INVÁLIDO IR PAGAMENTO ALTERADO IS CONCESSIONÁRIA NÃO CONVENIADA COM ITAÚ IT VALOR DO TRIBUTO INVÁLIDO IU VALOR DA RECEITA BRUTA ACUMULADA INVÁLIDO IV NÚMERO DO DOCUMENTO ORIGEM / REFERÊNCIA INVÁLIDO IX CÓDIGO DO PRODUTO INVÁLIDO LA DATA DE PAGAMENTO DE UM LOTE ALTERADA LC LOTE DE PAGAMENTOS CANCELADO NA PAGAMENTO CANCELADO POR FALTA DE AUTORIZAÇÃO NB IDENTIFICAÇÃO DO TRIBUTO INVÁLIDA NC EXERCÍCIO (ANO BASE) INVÁLIDO ND CÓDIGO RENAVAM NÃO ENCONTRADO/INVÁLIDO NE UF INVÁLIDA NF CÓDIGO DO MUNICÍPIO INVÁLIDO NG PLACA INVÁLIDA NH OPÇÃO/PARCELA DE PAGAMENTO INVÁLIDA NI TRIBUTO JÁ FOI PAGO OU ESTÁ VENCIDO NR OPERAÇÃO NÃO REALIZADA AQUISIÇÃO CONFIRMADA (EQUIVALE A OCORRÊNCIA 02 NO LAYOUT DE RISCO PD SACADO) RJ REGISTRO REJEITADO – CONTA EM PROCESSO DE ABERTURA OU BLOQUEADA PAGAMENTO DISPONÍVEL PARA ANTECIPAÇÃO NO RISCO SACADO – MODALIDADE RS RISCO SACADO PÓS AUTORIZADO PAGAMENTO CANCELADO POR INSUFICIÊNCIA DE SALDO / LIMITE DIÁRIO DE SS PAGTO EXCEDIDO TA LOTE NÃO ACEITO - TOTAIS DO LOTE COM DIFERENÇA TI TITULARIDADE INVÁLIDA X1 FORMA INCOMPATÍVEL COM LAYOUT 010 X2 NÚMERO DA NOTA FISCAL INVÁLIDO X3 IDENTIFICADOR DE NF/CNPJ INVÁLIDO X4 FORMA 32 INVÁLIDA ( A ) A devolução do DOC será informada no arquivo retorno desde que seja feita pelo banco favorecido em até 3 dias úteis após o envio pelo Itaú. A devolução da TED somente será informada quando ocorrer no próprio dia. ( B ) Necessita cadastramento junto ao banco (prazo mínimo de 10 dias e máximo de 365 dias).",
    "9": "(9) N.º DO REGISTRO DETALHE Número seqüencial de um pagamento dentro do lote. O primeiro registro de um lote recebe o nº '00001' e assim consecutivamente. Para o Segmento “J-52”, \"B\", “C”, “D”, “E”, “F”, “W” e “Z”, por se tratar de complemento de informações, conterá o mesmo número atribuído no Segmento \"A\", “J” e “N” correspondente.",
    "10": "(10) TIPO DE MOVIMENTO Indica o tipo de movimentação a que o detalhe se destina: Código Tipo de Movimento Observações 000 Inclusão de pagamento 001 CPF Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 46 002 (1) CNPJ (completo) Utilizar somente quando tiver interesse que o banco verifique se o CPF/CNPJ informado nas posições 204 a 217 do 003 (2) CNPJ (raiz) segmento “A” pertence à Conta Corrente de Crédito no Itaú. Para incluir o “Demonstrativo de Pagamentos/Holerite”, de um pagamento que já foi efetuado ou que se encontra agendado, deve-se informar: Inclusão de Demonstrativo de • Segmento “A”: Todas as informações do pagamento e 004 (4) Pagamento/Holerite Nosso Número; • Segmentos “D” e “E”: Todos os campos do Demonstrativo; • Segmento “F”: Informar apenas se houver mensagem a ser exibida. Para alterar (5) um “Demonstrativo de Pagamentos/Holerite”, de um pagamento que já se encontra agendado ou já foi efetuado, deve-se informar: Alteração do Demonstrativo de • Segmento “A”: Todas as informações do pagamento e 512 (4) Pagamentos/Holerite Nosso Número; • Segmentos “D” e “E”: Todos os campos do Demonstrativo; • Segmento “F”: Informar apenas se houver mensagem a ser exibida. Para comandar a alteração do Valor de um pagamento (código 517), deve-se informar no registro de detalhe (Segmentos A, J, N ou O) os campos Código do Banco, 517 (3) Alteração de Valor do Pagamento Código do Lote, Tipo de Registro, Número do Registro, Segmento, Tipo de Movimento, novo valor do pagamento e Nosso Número. Para comandar a alteração da data de um pagamento (código 519), deve-se informar no registro de detalhe (Segmentos A, 519 (3) Alteração da Data de Pagamento J, N ou O) os campos Código do Banco, Código do Lote, Tipo de Registro, Número do Registro, Segmento, Tipo de Movimento, nova Data de Pagamento e Nosso Número. Para comandar a exclusão de um “Demonstrativo de Pagamentos/Holerite”, de um pagamento que já se encontra agendado ou já foi efetuado, deve-se informar: Exclusão do Demonstrativo de • Segmento “A”: Todas as informações do pagamento e 998 (4) Pagamentos/Holerite Nosso Número; • Segmentos “D” e “E”: Todos os campos do Demonstrativo; • Segmento “F”: Informar apenas se houver mensagem a ser exibida. Para comandar uma exclusão (código 999), devem-se informar no registro detalhe (Segmentos A, J, N ou O), os Exclusão de pagamento incluído 999 (3) campos Código do Banco, Código do Lote, Tipo de Registro, anteriormente Número do Registro, Segmento, Tipo de Movimento e Nosso Número.",
    "11": "(11) CONTA CORRENTE DO FAVORECIDO a) Quando o banco favorecido for 341 (Banco Itaú) ou 409 (Unibanco) este campo deverá ser preenchido da seguinte forma: NOME DO CAMPO SIGNIFICADO POSIÇÃO PICTURE CONTEÚDO ZEROS COMPLEMENTO DE REGISTRO 024 024 9(01) AGÊNCIA NÚMERO AGÊNCIA CREDITADA 025 028 9(04) BRANCOS COMPLEMENTO DE REGISTRO 029 029 X(01) ZEROS COMPLEMENTO DE REGISTRO 030 035 9(06) CONTA NÚMERO DE C/C CREDITADA 036 041 9(06) BRANCOS COMPLEMENTO DE REGISTRO 042 042 X(01) DAC DAC DA AGÊNCIA/CONTA CREDITADA 043 043 9(01) Os campos Conta e DAC devem ser preenchidos com zeros quando a forma de pagamento for 02 ou 10 (Cheque ou Ordem de Pagamento). O lote de cheques ficará à disposição do representante legal do pagador na agência favorecida indicada. b) Quando o banco favorecido não for 341 ou 409 (portanto as formas de pagamento são 03- DOC C, 07-DOC D, 41-TED/outro titular e 43-TED/mesmo titular ) os campos deverão ser preenchidos da seguinte forma: Conta Corrente – Outros Bancos NOME DO CAMPO SIGNIFICADO POSIÇÃO PICTURE CONTEÚDO AGÊNCIA NÚMERO AGÊNCIA CREDITADA 024 028 9(05) BRANCOS COMPLEMENTO DE REGISTRO 029 029 X(01) CONTA NÚMERO DE C/C CREDITADA 030 041 9(12) BRANCOS COMPLEMENTO DE REGISTRO 042 042 X(01) DAC DAC DA AGÊNCIA/CONTA CREDITADA 043 043 X(01) Observações: • Preencher os campos com zeros à esquerda; • Não coloque o DAC da agência no campo \"AGÊNCIA\". Isto poderá acarretar envio do DOC ou da TED para local indevido; • Se o DAC tiver dois caracteres, coloque o primeiro na posição 042 e o segundo na posição 043. Conta Pagamento – Outros Bancos NOME DO CAMPO SIGNIFICADO POSIÇÃO PICTURE CONTEÚDO CONTA NÚMERO DA CONTA PAGAMENTO 024 043 9(20) Observações: • Preencher os campos com zeros à esquerda; • No caso de Conta Pagamento verificar NOTA 36 Quando se tratar de uma transferência via PIX (“Código de Compensação 009”), deve-se tratar o campo CONTA CORRENTE DO FAVORECIDO da seguinte forma: Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 48 Se o campo \"COMPLEMENTO DE REGISTRO\" estiver preenchido com \"01\", \"PG\", \"03\" (Conta Corrente, Conta Pagamento, Conta Poupança, respectivamente) nas posições 113 a 114, esse campo é obrigatório o preenchimento para envio do PIX. Caso o campo \"COMPLEMENTO DE REGISTRO\" estiver preenchido com \"04\"(Chave de Endereçamento) nas posições 113 a 114, esse campo é Opcional, e caso esteja preenchido será utilizado para validação contra os dados bancários resgatados da chave de endereçamento na DICT. Conta Iti Quando se tratar de transferência Pix para conta Iti, deve ser utilizado o código \"01\" no campo “COMPLEMENTO DO REGISTRO” (posições 113 a 114) e os dados de destino (posições 24 a 43) deverão ser preenchidos conforme instruções da nota 11 – conta corrente do favorecido.",
    "12": "(12) NOSSO NÚMERO Na inclusão de um novo pagamento, deve ser preenchido com brancos. No arquivo retorno, a cada pagamento incluído, o Itaú atribuirá o 'Nosso Número'. No cancelamento ou alteração de data de pagamento é necessário que a empresa informe o 'Nosso Número'.",
    "13": "(13) FINALIDADE DETALHE / HISTÓRICO VARIÁVEL Não tendo sido acertado a sua utilização este campo deverá ser preenchido com brancos. Caso contrário, deverá seguir as regras conforme indicado a seguir: Tipo de Pagamento “20” (Fornecedores) e Forma de Pagamento “01” (Crédito em Conta Corrente no Itaú) O histórico do extrato de conta corrente do favorecido constará uma mensagem fixa (“SISPAG “) seguido do complemento informado nas posições 178 a 192 do segmento A. Caso o complemento seja informado com brancos será assumida a mensagem fixa (“SISPAG “) mais o nome da empresa pagadora. Tipo de Pagamento “20” (Fornecedores) e Forma de Pagamento “41” (TED - Outro Titular) Para a Finalidade de TED “00100” (Depósito Judicial), informada nas posições 220 a 224 do segmento A, este campo deverá ser utilizado para informar o respectivo Código Identificador da Transação (CIT). Tipo de Pagamento “30” (Salários) e Formas de Pagamentos “01” (Crédito em Conta Corrente no Itaú) ou “60” (Cartão Salário) Para utilizar histórico variável, adotar os seguintes critérios para informação no arquivo de pagamentos: Registro HEADER DE LOTE Nas posições 33 a 36 (Identificação do Lançamento no Extrato do Favorecido) informar o conteúdo “1707”. Registro SEGMENTO A Nas posições 178 a 181 informar um dos códigos da tabela abaixo, de acordo com a identificação desejada: Código Histórico Variável Identificação no extrato do favorecido HP01 PAGTO SALÁRIO HP02 PAGTO FERIAS HP03 PAGTO 13. SALÁRIO Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 49 HP04 PAGTO BONUS HP05 PAGTO COMISSOES HP06 PAGTO ADIANT SALARIAL HP07 PAGTO RESCIS CONTRATUAL HP08 PAGTO VALE TRANSPORTE HP09 PAGTO AUXILIO ALIMENT HP10 PAGTO PENSAO ALIMENTICIA HP11 PAGTO BOLSA ESTAGIO HP12 PAGTO BOLSA AUXILIO HP13 PAGTO EM CONTA CORRENTE HP14 PAGTO REMUNERACAO ATENÇÃO: - Se a empresa NÃO informar o código 1707 no HEADER DE LOTE, o sistema assumirá o histórico padrão REMUNERAÇÃO/SALÁRIO nos extratos dos favorecidos. - Quando a empresa informar o código 1707 no HEADER DE LOTE e NÃO informar um dos códigos válidos de Histórico Variável nos registros de Segmento A, o sistema assumirá o histórico REMUNERAÇÃO/SALÁRIO nos extratos dos favorecidos. - O retorno do arquivo para a empresa conterá as informações enviadas pela empresa na remessa, exceto quando a empresa informar o código 1707 no HEADER DE LOTE e NÃO informar um dos códigos válidos de Histórico Variável nos registros de Segmento A, onde será informado no retorno do segmento A o código HP01.",
    "14": "(14) NÚMERO DE DOC/TED/OP/CHEQUE Para DOC, TED e OP, o número do documento é atribuído no agendamento / efetivação do pagamento e informado no arquivo retorno. Para cheques, o número será atribuído somente na efetivação do pagamento, constando apenas no arquivo retorno de pagamentos efetuados.",
    "15": "(15) NÚMERO DE INSCRIÇÃO DO FAVORECIDO Para pagamentos através de DOC, TED, PIX Transferência Itaú e Outros Bancos e Ordem de Pagamento, por determinação do BACEN é obrigatória a identificação do CNPJ/CPF do favorecido. O número de inscrição do favorecido (CPF/CNPJ) pode ser informado tanto no segmento ‘A’ quanto no segmento ‘B’, com as seguintes condições: - Se ambos estiverem consistentes/válidos, será considerado o conteúdo indicado no segmento ‘B’; - Se o CPF/CNPJ do favorecido indicado em um dos segmentos ‘A’ ou ‘B’ estiver inconsistente/inválido, será considerado o conteúdo que estiver correto, independente do segmento; - Se ambos estiverem inconsistentes / inválidos, o pagamento será rejeitado. - Quando contratado o serviço de “Demonstrativo de Pagamentos” via web / e-mail ou “Informe de Rendimentos”, a informação do CPF/CNPJ do favorecido deve obrigatoriamente ser indicada no segmento. “B”. Este campo deve ser informado com zeros quando o favorecido for isento de CPF/CNPJ, sendo obrigatório o preenchimento do campo ‘Nome do Favorecido’. Nesta situação, cabe ao Banco destinatário confirmar se o favorecido é ou não isento de CPF/CNPJ. No caso de PIX Transferência Itaú para contas correntes, contas pagamentos e contas poupança, será validado se a conta creditada está vinculada ao número de inscrição do favorecido (CPF/CNPJ) informado. Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 50 Para checagem do CPF/CNPJ do favorecido de pagamentos através de Crédito em Conta Corrente/Poupança no Itaú, proceder conforme nota 10 deste manual. Para a forma de pagamento Nota Fiscal – Liquidação Eletrônica, este campo é obrigatório desde que a identificação da liquidação seja por CNPJ do cedente, código 1, conforme nota 32 deste manual. Para as demais formas de pagamentos, este conteúdo, apesar de recomendável, é opcional e se informado não será realizada nenhuma consistência pelo banco. OBS.: Quando o CNPJ do favorecido for iniciado com 5 zeros (00000), deve-se acrescentar o segmento B do arquivo de pagamentos para confirmar que se trata de um CNPJ e não um CPF. Caso o pagamento seja efetuado com complemento apenas do segmento A, o pagamento será rejeitado, pois o sistema irá considerar que se trata de CPF e não de CNPJ.",
    "16": "(16) AVISO Se igual a ‘0’ não emite aviso ao favorecido; Se igual a ‘3’ emite aviso ao favorecido quando do agendamento do pagamento, sendo obrigatória a existência de um registro com segmento B. Se igual a ‘5’ emite aviso ao favorecido após pagamento efetuado, sendo obrigatória a existência de um registro com segmento B. Se igual a ‘9’ emite aviso ao favorecido tanto no agendamento quanto após o pagamento, sendo obrigatória a existência de um registro com segmento B. Observação: Apenas serão emitidos avisos para os tipos de pagamentos 20 (fornecedores) ou 98 (diversos) e para as formas abaixo, conforme segue: Emite Forma (NOTA 5) No Agendamento Após Pagamento 01 SIM SIM 02 SIM SIM 03 SIM SIM 05 SIM NÃO 06 SIM NÃO 07 SIM NÃO 10 SIM NÃO 41 SIM SIM 43 SIM SIM",
    "17": "(17) TOTAIS a. Total da quantidade de registros: • Trailer de Lote: total de registros de tipo 1, 3 e 5 no lote. Se o arquivo contiver os segmentos A, B, C, D, E, F e Z; ou J, J-52, B, C e Z; ou O e Z; ou N, B, W e Z, devem ser considerados todos os registros do lote na somatória; • Trailer de Arquivo: - Quantidade de lotes do arquivo = somatória dos registros tipo 1; - Quantidade total de registros no arquivo = somatória dos registros tipo 0, 1, 3, 5 e 9. b. Valor total de pagamentos / Quantidade de moedas / Valor total Acréscimos: • Somatório dos registros com tipo de movimento “000”, “001”, “002”, ou “003” - Inclusão (vide nota 10). Não soma os registros com movimento tipo 519 - Alteração da Data de Pagamento ou 999 - Exclusão de Pagamento. Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 51 • Quando se tratar de pagamento de Tributos, deverá ser informado no campo “TOTAL VAL. ACRESCIMOS” a somatória dos valores referentes a mora, multa, atualização monetária, juros, encargos, etc., conforme tributo que está sendo pago.",
    "18": "(18) CÓDIGO DE BARRAS Boletos de Cobrança (Segmento J) - Campo obrigatório constante na margem esquerda inferior da ficha de compensação dos boletos de cobrança. Sua captura pode ser realizada através de leitura ótica, ou da digitação da representação numérica constante na margem superior atentando-se à checagem do dígito verificador dos campos, conforme indicado no anexo “A” deste manual. Pagamento de Contas - Concessionárias e Tributos com código de barras (Segmento O) - Campo obrigatório, constante na parte superior direita e ou no centro da parte inferior do documento de recebimento. Sua captura pode ser realizada através de leitura ótica, ou da digitação da representação numérica constante nos boxes localizados na parte superior do código de barras, atentando-se à checagem do dígito verificador dos campos, conforme indicado no anexo \"B\" deste manual. Para pagamentos através de QR Code - preencher com zeros os campos “Banco favorecido”, “MOEDA”, “DV”, “Vencimento”, “VALOR” e “CAMPO LIVRE”.",
    "19": "(19) QUANTIDADE DE MOEDA Caso a moeda seja o \"Real\", indicar o valor a ser pago no campo \"VALOR A PAGAR\". Caso a moeda seja diferente de \"Real\", indicar o valor em unidades no campo \"QUANTIDADE DE MOEDA\".",
    "20": "(20) CÓDIGO DE PAGAMENTO A tabela abaixo contém apenas os códigos de pagamentos mais utilizados. Eventuais dúvidas no preenchimento da GPS, ou informações relativas a outros códigos de pagamentos, devem ser obtidas através do \"Manual de Preenchimento da GPS\", que pode ser encontrado no site do INSS através do endereço http://www.mpas.gov.br. CÓDIGO DESCRIÇÃO 1007 Contribuinte Individual - Recolhimento Mensal - NIT/PIS/PASEP 1104 Contribuinte Individual - Recolhimento Trimestral - NIT/PIS/PASEP 1406 Securado Facultativo - Recolhimento Mensal - NIT/PIS/PASEP 1457 Securado Facultativo - Recolhimento Trimestral - NIT/PIS/PASEP 1503 Securado Especial - Recolhimento Mensal – NIT/PIS/PASEP 1554 Securado Especial - Recolhimento Trimestral - NIT/PIS/PASEP 2003 Empresas Optantes pelo Simples – CNPJ 2100 Empresas em Geral – CNPJ 2208 Empresas em Geral – CEI 2631 Contribuição retida sobre a NF / Fatura da empresa prestadora de serviço – CNPJ 2909 Reclamatória Trabalhista – CNPJ",
    "21": "(21) INFORMAÇÕES COMPLEMENTARES Campo não obrigatório, de livre utilização pela empresa, cuja informação não é consistida pelo Itaú. O conteúdo deste campo será impresso no comprovante de pagamento da Guia GPS (obtido através do Itaú Empresas na Internet e/ou Empresa Plus) e apresentado no arquivo retorno com as mesmas informações da entrada. Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 52 Para que seja impresso na guia o conteúdo indicado no segmento “B”, este campo deverá ser informado com brancos.",
    "22": "(22) NOME DO CONTRIBUINTE Campo destinado à identificação do nome do contribuinte, cujo conteúdo será impresso no comprovante de pagamento da Guia DARF, DARF SIMPLES, DARJ, GARE – SP ICMS, GPS, IPVA ou DPVAT e apresentado no arquivo retorno com as mesmas informações da entrada.",
    "23": "(23) E-MAIL As informações deste campo somente serão consideradas se tiver sido contratado junto ao Banco o serviço de “Demonstrativo de Pagamentos” via e-mail. Caso contrário, serão ignoradas.",
    "24": "(24) MOVIMENTO Quando o tipo de pagamento for Sispag Salários e tiver sido contratado o serviço “Holerite - Demonstrativo de Pagamentos” ou “Informe de Rendimentos” via Itaú Empresas na Internet / Auto Atendimento, deverá ser indicado na posição “018” o código correspondente, conforme tabela abaixo: 1 = Crédito Obrigatórios para este serviço definem em qual campo (Crédito/Débito) a informação correspondente 2 = Débito ao “valor” deve ser disponibilizada no Holerite – Demonstrativo de Pagamento 3 = Acumulado Opcional - deve ser utilizado somente quando se desejar incluir no “Holerite - Demonstrativo de Pagamentos”, as informações acumuladas dos valores pagos (Ex: Liquido de Pagamento, Contribuição, Pensão, IRRF, Despesas Médicas / Odontológicas, etc.). 4 = Rendimentos Tributáveis, Deduções e IRRF 5 = Rendimentos Isentos e não Tributáveis Opcional – deve ser utilizado somente quando se 6 = Rendimentos Sujeitos à Tributação desejar emitir o “Informe de Rendimentos” anual para Exclusiva Imposto de Renda (Nota 6, código = 6). 9 = Rendimentos Recebidos Acumuladamente 7 = Informações Complementares",
    "25": "(25) MENSAGEM O conteúdo desse campo será diferenciado de acordo com a Finalidade do Lote indicada no registro Header de Lote (posições 103 e 104 – Nota 6). Para Finalidade do Lote ‘01’, ‘02’, ‘03’, ‘04’, ‘05’, ‘07’, ‘08’, ‘09’ ou ‘10’, será considerado como mensagem de “Holerite – Demonstrativo de Pagamentos” e, portanto, deve ser informado na estrutura: NOME DO CAMPO SIGNIFICADO POSIÇÃO PICTURE CONTEÚDO MENSAGEM 1 DESCRIÇÃO DA MENSAGEM 1 018 065 X(48) MENSAGEM 2 DESCRIÇÃO DA MENSAGEM 2 066 113 X(48) Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 53 MENSAGEM 3 DESCRIÇÃO DA MENSAGEM 3 114 161 X(48) Observação: Estas informações são de inteira responsabilidade da empresa pagadora e serão disponibilizadas no Campo “Mensagem” do corpo do “Holerite – Demonstrativo de Pagamentos”. Para Finalidade do Lote ‘06’, será considerado como “Informe de Rendimentos” e deve ser informado na estrutura: NOME DO CAMPO SIGNIFICADO POSIÇÃO PICTURE CONTEÚDO MENSAGEM DESCRIÇÃO DA MENSAGEM 018 099 X(82) BRANCOS COMPLEMENTO DE REGISTRO 100 161 X(62) Observação: • Estas informações são de inteira responsabilidade da empresa pagadora e serão disponibilizadas no campo “Informações Complementares” do corpo do “Informe de Rendimentos”; • Pode-se utilizar até 30 registros segmento “F” seguidos, para compor as informações que devem ser apresentadas no campo “Informações Complementares” do corpo do “Informe de Rendimentos”, inclusive linhas que devem ficar em branco; • As mensagens não podem conter caracteres especiais (palavras acentuadas, “Ç”, etc.).",
    "26": "(26) FINALIDADE DA TED Campo que possibilita a identificação da finalidade da TED, conforme códigos descritos abaixo. Caso o campo não seja preenchido ou não apresente um conteúdo válido, será assumido o código “00010 – Crédito em Conta Corrente ou Conta Poupança”. O conteúdo desta tabela poderá ser modificado a qualquer momento, sem prévio aviso, visto que estes códigos e suas descrições são de responsabilidade do Banco Central do Brasil: Código Descrição 00001 Pagamento de Impostos, Tributos e Taxas 00002 Pagamento a Concessionárias de Serviço Público 00003 Pagamento de Dividendos 00004 Pagamento de Salários 00005 Pagamento de Fornecedores 00006 Pagamento de Honorários 00007 Pagamento de Aluguéis e Taxas e Condomínio 00008 Pagamento de Duplicatas e Títulos 00009 Pagamento de Mensalidades Escolares 00010 Crédito em Conta Corrente ou Conta Poupança 00011 Pagamento a Corretoras 00015 Liquidação Financeira Operadora Cartão de Crédito 00016 Crédito em Conta Investimento 00043 Lei Rouanet – Patrocínio 00044 Lei Rouanet – Doação 00100 Depósito Judicial 00101 Pensão Alimentícia 00200 Transferência Internacional de Reais 00201 Ajuste Posição Mercado Futuro 00204 Compra/Venda de Ações – Bolsas de Valores e Mercado de Balcão 00205 Contrato referenciado em Ações/Índices de Ações – BV/BMF 00300 Restituição de Imposto de Renda 00500 Restituição de Prêmio de Seguros 00501 Pagamento de indenização de Sinistro de Seguro 00502 Pagamento de Prêmio de Co-seguro 00503 Restituição de prêmio de Co-seguro Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 54 00504 Pagamento de indenização de Co-seguro 00505 Pagamento de prêmio de Resseguro 00506 Restituição de prêmio de Resseguro 00507 Pagamento de Indenização de Sinistro de Resseguro 00508 Restituição de Indenização de Sinistro de Resseguro 00509 Pagamento de Despesas com Sinistros 00510 Pagamento de Inspeções/Vistorias Prévias 00511 Pagamento de Resgate de Título de Capitalização 00512 Pagamento de Sorteio de Título de Capitalização 00513 Pagamento de Devolução de Mensalidade de Título de Capitalização 00514 Restituição de Contribuição de Plano Previdenciário 00515 Pagamento de Benefício Previdenciário de Pecúlio 00516 Pagamento de Benefício Previdenciário de Pensão 00517 Pagamento de Benefício Previdenciário de Aposentadoria 00518 Pagamento de Resgate Previdenciário 00519 Pagamento de Comissão de Corretagem 00520 Pagamento de Transferências/Portabilidade de Reserva de Seguro/Previdência Para a finalidade de TED 00100 (Depósito Judicial), o Código de Identificação de Transação (CIT) deve ser informado no campo Finalidade Detalhe nas posições 178 a 197 do segmento A. O Banco Itaú não se responsabiliza pelo tratamento dado a esta informação pelo Banco recebedor da TED. Também, não cabe ao Banco Itaú assegurar que a finalidade utilizada pelo pagador esteja em conformidade com qualquer regulamentação que lhe seja aplicada em função da sua atividade ou de acordos com os favorecidos.",
    "27": "(27) PRAZO PARA DISPONIBILIZAÇÃO DO HOLERITE Campo que possibilita indicar com quantos dias úteis de antecedência da data de pagamento, o holerite deve estar disponível para consulta: PRAZO DESCRIÇÃO 00 Disponibiliza o holerite na data de pagamento. (zero) 01 a 10 Disponibiliza o holerite XX dias úteis antes da data de pagamento, onde o prazo (XX) será a quantidade indicada. OBS.: Para qualquer conteúdo apresentado, diferente dos prazos descritos, o holerite será disponibilizado dentro do prazo máximo de antecedência de 10 (dez) dias úteis. Atenção para arquivos remessa Sispag Holerite transmitidos para processamento em ambiente de TESTE: Recomenda-se gerar arquivo remessa contendo holerite somente para favorecidos previamente selecionados e que tenham conhecimento do processo de teste. Os arquivos remessa processados com sucesso em ambiente de TESTE, geram normalmente o holerite o qual fica disponível para consulta e impressão nos caixas eletrônicos e internet (Itaú Empresas na Internet) por um período de 7 (sete) dias corridos a contar da data de pagamento indicada. Neste caso, como se trata de holerite para validação do teste, o campo destinado ao nome do funcionário no holerite apresentará o conteúdo “EM TESTE ATE DD/MM/AAAA”, onde “DD/MM/AAAA” será a data de pagamento acrescida de 7 (sete) dias corridos.",
    "28": "(28) OPÇÃO DE PAGAMENTO Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 55 Indica as opções para quitação do imposto: Código Descrição 0 Pagamento de DPVAT 1 Parcela Única com desconto 2 Parcela Única sem desconto 3 Parcela Nº 1 4 Parcela Nº 2 5 Parcela Nº 3 6 Parcela Nº 4 7 Parcela Nº 5 8 Parcela Nº 6 OBS.: O código de opção “2” não se aplica para pagamentos do IPVA MG.",
    "29": "(29) VALOR DO IPVA/DPVAT, VALOR DO DESCONTO, VALOR DO PAGAMENTO E DATA DE VENCIMENTO DO IPVA São campos obrigatórios no arquivo remessa, pois serão comparados com os dados fornecidos pelo Detran ao Banco, podendo ser rejeitados no caso de divergência. No arquivo retorno, constarão as mesmas informações enviadas na remessa.",
    "30": "(30) FINALIDADE DO DOC E STATUS DO FUNCIONARIO NA EMPRESA Campo que possibilita a identificação da finalidade do DOC, e também do status atual do funcionário na Empresa. Para a informação da finalidade do DOC, utilizar os códigos conforme tabela 1 abaixo, apenas quando se tratar de forma de pagamento ‘03’ (DOC C). Código Descrição 01 Crédito em Conta 02 Pagamento de Aluguel / Condomínio 03 Pagamento de Duplicata / Títulos 04 Pagamento de Dividendos 05 Pagamento de Mensalidade Escolar 06 Pagamento de Salários 07 Pagamento de Fornecedores / Honorários 08 Operações de Câmbio / Fundos 09 Repasse de Arrecadação / Pagamento de Tributos 10 Transferência Internacional de Reais 11 DOC para Poupança 12 DOC para Depósito Judicial 13 Pensão Alimentícia 99 Outros Tabela 1 – Códigos de Finalidade do DOC Para a informação do Status atual do Funcionário na Empresa, utilizar os códigos conforme tabela 2 abaixo, apenas quando se tratar de Tipo ‘30’ (pagamento de salários) e Forma ‘01’ (crédito em conta corrente no Banco Itaú). Código Descrição 21 Efetivo Privado 22 Efetivo Público Estatutário 23 Efetivo Público CLT 25 Efetivo Militar 31 Autônomo Privado Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 56 34 Autônomo Público Desvinculado 41 Temporário Privado 42 Temporário Público Estatutário 43 Temporário Público CLT 44 Temporário e Público Desvinculado 45 Temporário Militar 51 Estagiário Privado 54 Estagiário Público Desvinculado 61 Aposentado Privado 65 Aposentado Militar 66 Aposentado Público Inativo 71 Pensionista Privado 75 Pensionista Militar 76 Pensionista Público Inativo 81 Comissionado e Privado 82 Comissionado e Público Estatutário 83 Comissionado e Público CLT 84 Comissionado e Público Desvinculado 85 Comissionado e Público Militar 86 Comissionado e Público Inativo Tabela 2 – Códigos de Status do Funcionário e Tipo de Empresa",
    "31": "(31) NÚMERO DE NOTA FISCAL/CNPJ Para a forma de pagamento Nota Fiscal – Liquidação Eletrônica, este campo é obrigatório desde que a identificação da liquidação seja por número de nota fiscal ou por número do CNPJ de terceiros/filial, códigos 2 e 3 respectivamente, conforme nota 32 deste manual. • Para identificação por número de nota fiscal usar apenas as 8 primeiras posições do campo, da posição 178 a 185, preenchendo com BRANCOS as posições 186 a 191. Neste caso, a informação da agência/conta do favorecido é obrigatória. • Para a identificação por número do CNPJ de terceiros/filial (diferente do CNPJ pagador), usar todas as 14 posições. Nesse caso a agência/conta do favorecido é opcional.",
    "32": "(32) TIPO DE IDENTIFICAÇÃO DA LIQUIDAÇÃO Para a forma de pagamento Nota Fiscal – Liquidação Eletrônica informar o tipo de identificação da liquidação: Código Descrição 1 Identificação por CNPJ do cedente 2 Identificação por número de nota fiscal 3 Identificação por CNPJ de Terceiros/Filial",
    "33": "(33) NÚMERO DA NOTA FISCAL Campo de preenchimento obrigatório para pagamento na forma de GNRE-SP com código de receita 10009.9 – Substituição Tributária por Operação. Para demais pagamentos de tributos com código de barras ou GNRE-SP com outros códigos de receita, este campo deverá ser preenchido com zeros ou brancos.",
    "34": "(34) NOME DO FAVORECIDO Quando a forma de pagamento for Crédito em Conta no Itaú (conta corrente ou poupança) e na contratação do serviço a empresa tiver optado pela validação do nome do favorecido, a informação desse campo será assumida conforme cadastro de contas do Banco, independente do conteúdo informado na remessa. Este procedimento não causará a rejeição Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 57 do pagamento. No arquivo retorno será apresentado o nome do favorecido conforme cadastro de contas do Banco.",
    "35": "(35) CÂMARA e CÓDIGO ISPB (código adotado pelo Banco Central do Brasil para identificação das instituições no Sistema de Pagamentos Brasileiro) Para pagamento através de TED para Conta Pagamento, por determinação do BACEN é obrigatória identificação do Código ISPB. Para pagamento através de TED para Corretoras, por determinação do Banco Central do Brasil é obrigatória a identificação da Câmara e do Código ISPB. Neste caso, o Código da Câmara Centralizadora deve ser informado no segmento ’A’ (posições 18 a 20) com o conteúdo “888”. O número do Código ISPB pode ser informado tanto no segmento ‘A’ (posições 105 a 112) quanto no segmento ‘B (posições 233 a 240)’, com as seguintes condições: • Se ambos estiverem consistentes/válidos, será considerado o conteúdo indicado no segmento ‘B’; • Se o Código ISPB indicado em um dos segmentos ‘A’ ou ‘B’ estiver inconsistente/inválido, será considerado o conteúdo que estiver correto, independente do segmento; • Se ambos estiverem inconsistentes / inválidos, o pagamento será rejeitado. Para as demais formas de pagamentos e diferente de TED para Corretora, os campos referentes ao número da Câmara e Código ISPB devem ser informados com zeros ou brancos de acordo com sua picture. A informação do Código ISPB pode ser obtida por meio do site do Banco Central do Brasil (www.bacen.gov.br), na área destinada ao Sistema de Pagamentos Brasileiro (opção STR – Sistema de Transferência de Reservas – Relação de participantes do STR). Para pagamento através de PIX Transferência deve ser informado no segmento ‘A’ (posição 18 a 20) com o conteúdo “009” – PIX (SPI).",
    "36": "(36) IDENTIFICAÇÃO DO TIPO DE TRANSFERÊNCIA Quando se tratar de uma transferência via PIX (“Código de Compensação 009”), deve ser informado nas posições 113 a 114 o tipo de transferência: 01 - Conta corrente PG - Conta Pagamento 03 – Conta Poupança 04 – Chave de endereçamento",
    "37": "(37) TIPO IDENTIFICAÇÃO DE CHAVE PIX Quando se tratar de uma transferência via PIX (“Código de Compensação 009”),deve-se informar o Tipo de chave de endereçamento (Chave PIX). Campo obrigatório para o modelo de transferência via “Chave de Endereçamento” - Opção “4” preenchido nas posições 113 a 114 do segmento A. 01 – Telefone 02 – E-mail 03 – CPF/CNPJ 04 – Chave Aleatória Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 58",
    "38": "(38) IDENTIFICADOR ÚNICO DA TRANSAÇÃO Opcional, que determina o identificador da transação. O objetivo desse campo é ser um elemento que possibilite ao PSP do recebedor apresentar ao usuário recebedor a funcionalidade de conciliação de pagamentos.",
    "39": "(39) INFORMAÇÃO ENTRE USUÁRIOS Essas posições 63 a 127 devem ser destinadas para envio de mensagem para o recebedor, opcional, quando o pagador desejar utilizar esse conjunto de posições para envio de mensagens entre os usuários.",
    "40": "(40) CHAVE DE ENDEREÇAMENTO – CHAVE PIX Chave de identificação dos dados do cliente na base única de registro do BACEN. Deve ser preenchido com as informações da chave PIX do recebedor (CNPJ/CPF, Número de Celular, endereço de E-mail ou Chave Aleatória), conforme padrão descrito abaixo: Tipo Formato Descrição inicia com \"+\", seguido do código do país, DDD, e Número de telefone +XXXXXXXXXXXXX número de celular com nove dígitos. Endereço de e-mail xxxxxxxx@xxxxxxx.xxx(.xx) contém \"@\", e o tamanho máximo é de 77 caracteres. contém 11 números, incluindo os dígitos verificadores. CPF XXXXXXXXXXX Deve ser informado sem pontos ou traços. contém 14 números, incluindo os dígitos verificadores. CNPJ XXXXXXXXXXXXXX Deve ser informado sem pontos ou traços. número hexadecimal de 32 posições, divido em 5 XXXXXXXX-XXXX-XXXX- Chave aleatória blocos separados por um “-“. Deve ser informado com XXXX-XXXXXXXXXXXX os traços, ou seja com as 36 posições totais.",
    "41": "(41) URL / CHAVE DE ENDEREÇAMENTO – CHAVE PIX Obrigatório, quando se tratar de QR CODE Dinâmico, deve ser informada a URL capturada a partir da leitura do QR CODE. A URL deverá ser informada sem o https://. Obrigatório, quando se tratar de QR CODE Estático, deve ser informada a CHAVE DE ENDEREÇAMENTO capturada a partir da leitura do QR CODE. Ao capturar um QR Code estático é possível identificar a chave Pix vinculada a ele. Para identificar corretamente o tipo de chave, consulte a nota 40.",
    "42": "(42) COMPLEMENTO DE REGISTRO Número de Agência para conta pagamento (opcional). Maio 2022 Manual Técnico: SISPAG – Layout de Arquivo – CNAB 240 59"
  }
};
