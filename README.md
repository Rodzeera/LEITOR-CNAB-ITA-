# Leitor e Validador CNAB 240 Itaú

Aplicação web local para inspecionar arquivos de remessa `.rem` e `.txt`, registro por registro e campo por campo.

Base documental: **Manual Técnico SISPAG Itaú - Layout de Arquivo CNAB 240, versão 086, atualização 05/05/2022**.

## Como usar

### Opção mais simples (Windows)

1. Dê dois cliques em `iniciar.bat`.
2. O navegador abrirá em `http://localhost:8765`.
3. Clique em **Importe seu Arquivo de Remessa** e selecione o arquivo `.rem` ou `.txt`.

Se o Python não estiver instalado, abra diretamente o arquivo `index.html`. A análise também funciona assim, sem servidor.

### Interface web com Streamlit

Funciona no Windows, macOS e Linux:

```sh
pip install -r requirements.txt
streamlit run interface_web.py
```

O navegador abrirá a interface Streamlit. Clique em **Importe seu Arquivo de Remessa** para selecionar o arquivo.

### Interface desktop no macOS / Linux

No terminal, dentro desta pasta:

```sh
python3 -m http.server 8765
```

Depois abra `http://localhost:8765`.

## Duas interfaces, um único parser

- Desktop: `iniciar.bat` ou `index.html`;
- Web: `streamlit run interface_web.py`;
- Núcleo compartilhado: `parser/parser-core.js`.

As interfaces não possuem cópias das regras de negócio. Ambas carregam o mesmo módulo
`parser-core.js` e o mesmo `spec.js`, portanto produzem o mesmo resultado para os mesmos bytes.
O Python da interface web apenas recebe o upload e monta o componente visual; ele não interpreta
nem altera o CNAB.

### Fluxo único de importação

Os dois seletores de arquivo entregam os bytes originais a
`CNABParser.parseBytes()`. A detecção de encoding ocorre exclusivamente nesse
módulo: UTF-8, UTF-16 LE ou UTF-16 BE quando existe BOM e Windows-1252 para
arquivos CNAB sem BOM. Nenhuma interface converte o arquivo para texto antes da
análise e o parser é chamado uma única vez.

Na interface, apenas o botão **Importe seu Arquivo de Remessa** abre o
seletor. O controle “Upload CNAB240” é exclusivamente visual e desabilitado.
Não existem importação por drag & drop, label associado ao input ou uploader
paralelo do Streamlit.

Na tabela de campos, a coluna **Interpretado** contém apenas o valor. Notas,
constantes, preenchimentos fixos, formatos e regras do layout são apresentados
na coluna **Observações**, usando 📖, 📌 e ℹ️. Os ícones exibem um resumo no
tooltip e abrem o conteúdo completo no modal.

A notação técnica `Picture` permanece armazenada no layout, mas é apresentada
de forma mais direta na tabela: **Tipo** (`9` como Numérico e `X` como
Caractere) e **Qtde**, calculada automaticamente pela soma dos tamanhos da
notação. Assim, formatos decimais compostos como `9(07)V9(08)` são exibidos
como **Numérico / 15**, sem alterar a interpretação ou a validação do campo.

### Associação auditada das observações

As observações não são inferidas por semelhança de nome ou texto durante a
execução. Cada nota, caractere fixo, constante ou regra está vinculada
explicitamente ao layout, à página do manual e às posições inicial e final do
respectivo campo em `spec.js`. Uma nota só é apresentada quando a tabela oficial
daquele registro referencia expressamente seu número.

O catálogo das Notas 1 a 42 foi reconstruído na ordem documental para impedir
que itens numerados dentro de uma nota sejam interpretados como novas notas. O
resultado verificável da revisão integral está em
`layouts/observation-audit.json`.

## Publicação no Streamlit Community Cloud

1. Envie o conteúdo desta pasta para a raiz de um repositório GitHub.
2. No Streamlit Community Cloud, selecione o repositório e a branch.
3. Informe `interface_web.py` como arquivo principal.
4. Mantenha o Python padrão 3.12.
5. Clique em **Deploy**. O aplicativo não utiliza secrets, banco de dados,
   serviços externos ou pacotes Linux adicionais.

O arquivo `requirements.txt` fixa a versão de Streamlit validada pelo projeto.
A configuração opcional fica em `.streamlit/config.toml`, conforme a estrutura
esperada pelo Community Cloud.

## O que é validado

- comprimento exato de 240 caracteres por registro;
- campos numéricos e alfanuméricos;
- conteúdos fixos, brancos e zeros;
- banco Itaú (341), lote, tipo de registro e segmento;
- datas no formato DDMMAAAA;
- valores com vírgula decimal implícita;
- sequência dos detalhes e repetição da sequência nos complementos;
- total de registros por lote;
- quantidade de lotes e registros no trailer do arquivo;
- presença de segmentos principais conforme a forma de pagamento, incluindo A/B para PIX Transferência, J/J-52 para boletos, O para concessionárias e N para tributos.
- regras da Nota 35 para Câmara e ISPB, diferenciando TED para Conta Pagamento,
  TED para Corretora, PIX Transferência e pagamentos nos quais esses campos não
  se aplicam. A validação cruza os ISPBs dos Segmentos A e B pelo mesmo lote e
  número de registro e informa qual valor prevalece quando necessário.

Para a Nota 35, um ISPB é considerado estruturalmente válido quando contém oito
dígitos e não é `00000000`. A lista oficial de participantes do STR não é
consultada externamente, mantendo o processamento local e independente de rede.

Cada linha física é lida uma única vez. São aceitas terminações de linha Windows (CRLF), Linux/macOS (LF) e legadas (CR); a quebra final apenas encerra o último registro e não cria um registro vazio artificial.

O aplicativo exibe posição inicial/final, nome, significado, picture, valor bruto, valor interpretado, página do manual e notas referenciadas. Os filtros aceitam lote, segmento, linha, severidade e busca livre.

## Privacidade e codificação

O processamento acontece integralmente no navegador. O arquivo não é enviado a servidor algum. A leitura usa ISO-8859-1, codificação comum em arquivos bancários legados.

## Limites importantes

Algumas regras do manual dependem de contratos, cadastros bancários ou dados externos (por exemplo, serviços previamente contratados e validação cadastral de favorecidos). Nesses casos, o app apresenta os campos e notas aplicáveis, mas não inventa uma validação sem acesso ao cadastro do Itaú. A homologação bancária continua sendo a confirmação definitiva.

## Testes

A pasta `exemplos` contém:

- `valido.rem`: estrutura sintética consistente;
- `invalido.rem`: erros propositais de tamanho, banco, data, tipo de campo, sequência e totais.

Execute `testar.bat` no Windows ou `node tests/run-tests.js` em qualquer ambiente com Node.js. O teste confere a integridade da especificação, os 240 caracteres do arquivo válido, os defeitos esperados do inválido e a sintaxe dos scripts.

Auditoria adicional para publicação:

```sh
python tests/audit_deploy.py
python tests/smoke_streamlit.py
```

## Estrutura

- `index.html`, `styles.css`, `app.js`: aplicação;
- `interface_web.py`: entrada da interface Streamlit;
- `parser/parser-core.js`: parser e regras de negócio compartilhados;
- `parser/note35-validator.js`: validação centralizada e cruzada de Câmara/ISPB;
- `utils/component_loader.py`: montagem do componente web com caminhos relativos;
- `spec.js`: layouts estruturados extraídos das tabelas do manual;
- `layouts/observation-audit.json`: relatório da auditoria posicional de notas e observações;
- `manual-extraido.txt`: texto integral extraído para auditoria;
- `exemplos/`: remessas sintéticas;
- `tests/`: testes automatizados.
