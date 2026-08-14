# CNAB240 Analyzer — arquitetura multi-banco

Aplicação local/web para inspecionar arquivos de remessa `.rem` e `.txt`, registro por registro e campo por campo. O banco é identificado automaticamente pelo código das posições 1–3.

Bases documentais:

- **Manual Técnico SISPAG Itaú — CNAB 240, versão 086, atualização 05/05/2022**;
- **Layout Multipag Bradesco CNAB 240, versão 04, atualização 06/05/2019**.

## Como executar

### Desktop no Windows

Execute:

```text
iniciar.bat
```

O navegador abrirá em `http://localhost:8765`. Também é possível abrir `index.html` diretamente.

### Web com Streamlit

```sh
pip install -r requirements.txt
streamlit run interface_web.py
```

O projeto usa apenas caminhos relativos calculados com `pathlib` e está pronto para Linux e Streamlit Community Cloud.

## Upload e privacidade

Existe um único ponto de entrada: **Importe seu Arquivo de Remessa**. O controle “Upload CNAB240” é apenas visual e permanece desabilitado. Não existem outro uploader, drag-and-drop ou leitura paralela.

Os bytes são entregues uma única vez a `CNABAnalyzer.analyzeBytes()`. `core/reader.js` reconhece UTF-8/UTF-16 com BOM e usa Windows-1252 quando não há BOM. O processamento acontece no navegador; o arquivo não é enviado ao servidor Streamlit.

## Bancos suportados

| Código | Banco | Estado |
|---|---|---|
| 341 | Itaú | Ativo — SISPAG v086 |
| 237 | Bradesco | Ativo — Multipag v04 |
| 033 | Santander | Em breve |

O código 033 permanece segregado. Um arquivo Santander recebe mensagem controlada e nunca é processado pelos módulos Itaú ou Bradesco.

## Bradesco Multipag v04

Implementação baseada exclusivamente no manual Bradesco atualizado em 06/05/2019:

- layout de arquivo `089`;
- lote de pagamentos `045`;
- lote de títulos `040`;
- lote de tributos `012`;
- Header e Trailer de Arquivo/Lote;
- Segmentos A, B, C, 5, Z, J, J52, O, N e W;
- sublayouts N1 (GPS), N2 (DARF), N3 (DARF Simples), N4 (GARE-SP) e W1 (FGTS);
- sequência 9–13 crescente para todos os registros detalhe;
- totais de registros, lotes, valores e quantidades de moeda;
- catálogo G059 de ocorrências de retorno;
- Câmara `018`, `700` ou `888` conforme a forma de lançamento;
- ISPB obrigatório no Segmento B, posições 233–240, quando a Câmara é `888`;
- W1 obrigatório com O para convênios FGTS 0181/0182;
- CPF/CNPJ com dígitos verificadores.

O Segmento B não é exigido globalmente, conforme a matriz geral de composição do manual. No Bradesco, G005 preserva o domínio `0 = Isento/Não informado`, `1 = CPF`, `2 = CNPJ`, `3 = PIS/PASEP` e `9 = Outro`. Em tributos, N003 usa `01 = CNPJ` e `02 = CPF`. Essas decisões ficam exclusivamente no módulo Bradesco.

## Itaú SISPAG v086

As regras existentes permanecem isoladas em `banks/itau/`, incluindo identificação de registros, notas, interpretações, obrigatoriedade de segmentos, Nota 35 e validação de CPF/CNPJ. A suíte de regressão compara o resultado moderno com a fachada legada para impedir mudanças acidentais.

## Interface de análise

A tabela apresenta posição, campo/significado, Tipo, Qtde, valor bruto, valor interpretado e Observações. A notação Picture permanece no layout e é convertida automaticamente em Tipo/Qtde apenas na apresentação. Notas, constantes e regras ficam exclusivamente em Observações.

Os filtros permitem selecionar lote, segmento, linha, severidade e texto livre. Cada linha física gera exatamente um registro exibido.

## Estrutura

- `index.html`, `styles.css`, `ux.css`, `app.js`: interface compartilhada;
- `interface_web.py`: entrada Streamlit;
- `utils/component_loader.py`: incorpora CSS e JavaScript local na ordem declarada no HTML;
- `core/`: leitura, ocorrências, validações genéricas, CPF/CNPJ, registry e despacho;
- `banks/itau/versions/v086.js`: layout Itaú versionado;
- `banks/bradesco/versions/v004.js`: layout Bradesco versionado;
- `banks/santander/`: módulo futuro isolado;
- `parser/` e `spec.js`: fachadas de compatibilidade do Itaú;
- `exemplos/`: remessas sintéticas;
- `tests/`: testes segregados por core e banco.

## Amostras

- `exemplos/valido.rem`: Itaú sintético válido;
- `exemplos/invalido.rem`: Itaú sintético inválido;
- `exemplos/bradesco-valido.rem`: Bradesco sintético válido;
- `exemplos/bradesco-invalido.rem`: Bradesco com Câmara, CPF e total inválidos.

## Testes

No Windows:

```text
testar.bat
```

Em qualquer sistema com Node.js e Python:

```sh
node tests/run-tests.js
python tests/audit_deploy.py
python tests/smoke_streamlit.py
```

A suíte Bradesco executa 54 verificações específicas, incluindo cobertura 1–240 dos layouts, segmentos/sublayouts, Câmara/ISPB, CPF/CNPJ, sequência, totais, ocorrências, contagem física e terminações CRLF/LF/CR.

## Streamlit Community Cloud

1. Envie o conteúdo desta pasta para a raiz do repositório GitHub.
2. Selecione `interface_web.py` como arquivo principal.
3. Use o Python padrão 3.12.
4. Faça o deploy.

Não são necessários secrets, banco de dados, serviços externos ou pacotes de sistema. Todos os scripts locais declarados em `index.html`, inclusive `banks/bradesco/versions/v004.js`, são incorporados no HTML final antes da validação que bloqueia referências externas.

## Limites

Regras que dependem de contrato, cadastro bancário ou dados externos não são inventadas. O aplicativo valida apenas o que pode ser determinado pelo arquivo e pelos manuais versionados. A homologação bancária continua sendo a confirmação definitiva.
