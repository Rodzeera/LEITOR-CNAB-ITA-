from __future__ import annotations

import ast
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


required = (
    "interface_web.py",
    "requirements.txt",
    "README.md",
    ".streamlit/config.toml",
    "index.html",
    "app.js",
    "styles.css",
    "ux.css",
    "spec.js",
    "parser/note35-validator.js",
    "parser/parser-core.js",
    "core/reader.js",
    "core/registry.js",
    "core/analyzer.js",
    "core/tax-id.js",
    "banks/base.js",
    "banks/itau/bank.js",
    "banks/itau/versions/v086.js",
    "banks/santander/bank.js",
    "banks/bradesco/bank.js",
    "layouts/observation-audit.json",
    "utils/component_loader.py",
    "tests/smoke_streamlit.py",
)
for relative in required:
    require((ROOT / relative).is_file(), f"Arquivo obrigatório ausente: {relative}")

requirements = (ROOT / "requirements.txt").read_text(encoding="utf-8").splitlines()
requirements = [line.strip() for line in requirements if line.strip() and not line.startswith("#")]
require(requirements == ["streamlit==1.61.1"], "requirements.txt inesperado")

python_files = [ROOT / "interface_web.py", ROOT / "utils/component_loader.py"]
third_party: set[str] = set()
standard_library = {"__future__", "base64", "json", "pathlib", "re", "urllib"}
for file_path in python_files:
    tree = ast.parse(file_path.read_text(encoding="utf-8"), filename=str(file_path))
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            third_party.update(alias.name.split(".")[0] for alias in node.names)
        elif isinstance(node, ast.ImportFrom) and node.module:
            third_party.add(node.module.split(".")[0])
third_party -= standard_library | {"utils"}
require(third_party == {"streamlit"}, f"Dependências não declaradas: {third_party}")

absolute_path_pattern = re.compile(r"(?:[A-Za-z]:\\|/Users/|/home/|/mnt/)")
for extension in ("*.py", "*.js", "*.html", "*.css", "*.toml", "*.md"):
    for file_path in ROOT.rglob(extension):
        if file_path.resolve() == Path(__file__).resolve():
            continue
        text = file_path.read_text(encoding="utf-8", errors="replace")
        require(
            not absolute_path_pattern.search(text),
            f"Caminho absoluto encontrado em {file_path.relative_to(ROOT)}",
        )

loader_source = (ROOT / "utils/component_loader.py").read_text(encoding="utf-8")
require("SCRIPT_SRC_RE.sub(replace_script, html)" in loader_source, "A interface web não incorpora os scripts na ordem do HTML")
require('match.group("src")' in loader_source, "A interface web não descobre os scripts pelo index.html")
require(
    "CNABAnalyzer"
    in (ROOT / "app.js").read_text(encoding="utf-8"),
    "A interface desktop não carrega o parser compartilhado",
)

spec_source = (ROOT / "banks/itau/versions/v086.js").read_text(encoding="utf-8")
spec_match = spec_source.index("return {") + len("return ")
require(spec_match is not None, "spec.js não contém uma especificação válida")
spec_end = spec_source.rindex("};});") + 1
spec = json.loads(spec_source[spec_match:spec_end])
require(len(spec["notes"]) == 42, "O catálogo oficial deve conter as 42 notas do manual")
require(
    "IDENTIFICAÇÃO DO CNPJ E AG/CONTA" in spec["notes"]["1"],
    "A Nota 1 não corresponde ao texto oficial",
)
note_references = 0
explicit_observations = 0
for layout_id, layout in spec["layouts"].items():
    expected_start = 1
    for field in layout["fields"]:
        require(field["start"] == expected_start, f"Lacuna ou sobreposição em {layout_id}:{expected_start}")
        expected_start = field["end"] + 1
        require(field.get("name") != "Campo", f"Campo sem identificação em {layout_id}:{field['start']}")
        picture = field.get("picture", "")
        require(picture[:1] in {"9", "X"}, f"Tipo Picture desconhecido em {layout_id}:{field['start']}: {picture}")
        quantities = [int(value) for value in re.findall(r"\((\d+)\)", picture)]
        require(quantities, f"Picture sem quantidade em {layout_id}:{field['start']}: {picture}")
        require(
            sum(quantities) == field["end"] - field["start"] + 1,
            f"Tamanho do Picture divergente em {layout_id}:{field['start']}: {picture}",
        )
        require(isinstance(field.get("observations"), list), f"Observações ausentes em {layout_id}:{field['start']}")
        for observation in field["observations"]:
            explicit_observations += 1
            require(observation.get("manualPage") == layout["manualPage"], f"Página divergente em {layout_id}:{field['start']}")
            if observation["kind"] == "note":
                note_references += 1
                number = str(observation["note"])
                require(number in spec["notes"], f"Nota inexistente {number} em {layout_id}:{field['start']}")
                require(
                    re.search(rf"\bNOTA\s*{re.escape(number)}\b", field.get("content", ""), re.IGNORECASE),
                    f"Nota {number} não está indicada na tabela oficial em {layout_id}:{field['start']}",
                )
    require(expected_start == 241, f"O layout {layout_id} não cobre exatamente as posições 1–240")

audit = json.loads((ROOT / "layouts/observation-audit.json").read_text(encoding="utf-8"))
require(audit["validatedLayouts"] == len(spec["layouts"]), "Quantidade de layouts auditados divergente")
require(audit["validatedPositionsPerLayout"] == "1-240", "Cobertura posicional não auditada")
require(audit["noteCatalogEntries"] == len(spec["notes"]), "Catálogo de notas divergente")
require(audit["noteReferencesValidated"] == note_references, "Referências de notas divergentes")
require(audit["explicitObservationsGenerated"] == explicit_observations, "Observações explícitas divergentes")

html = (ROOT / "index.html").read_text(encoding="utf-8")
desktop_js = (ROOT / "app.js").read_text(encoding="utf-8")
web_py = (ROOT / "interface_web.py").read_text(encoding="utf-8")
loader_py = (ROOT / "utils/component_loader.py").read_text(encoding="utf-8")
require(html.count('id="chooseFile"') == 1, "Botão de importação ausente ou duplicado")
require('id="uploadVisual"' in html and "disabled" in html, "Elemento inicial não está desabilitado")
require('for="file"' not in html, "Label ainda abre o seletor de arquivos")
require(desktop_js.count('$("#file").click()') == 1, "Há mais de um acionador do seletor")
require('$("#chooseFile").onclick' in desktop_js, "Botão autorizado não abre o seletor")
require(
    "dragenter" not in desktop_js
    and "dragover" not in desktop_js
    and "dataTransfer" not in desktop_js,
    "Drag & drop ainda inicia upload",
)
require("file_uploader" not in web_py, "Streamlit ainda possui um segundo uploader")
require("getvalue()" not in loader_py and "base64" not in loader_py, "Camada web ainda injeta arquivo")
require('value="informacao"' in html, "Filtro de informações da Nota 35 ausente")
require('src="parser/note35-validator.js"' in html, "Validador da Nota 35 ausente no desktop")
require(
    "validateNote35(records,issues)" in (ROOT / "banks/itau/validations.js").read_text(encoding="utf-8"),
    "Parser não executa o validador central da Nota 35",
)
require('src="core/analyzer.js"' in html, "Analisador bancário ausente no desktop")
require("SCRIPT_SRC_RE.sub(replace_script, html)" in loader_py, "Analisador bancário não será incorporado no Streamlit")
require('src="core/tax-id.js"' in html, "Validador comum de CPF/CNPJ ausente no index.html")
require(desktop_js.count("<th>Observações</th>") == 1, "Coluna Observações ausente ou duplicada")
require("<th>Picture</th>" not in desktop_js, "A coluna Picture ainda está visível")
require(desktop_js.count("<th>Tipo</th>") == 1, "Coluna Tipo ausente ou duplicada")
require(desktop_js.count("<th>Qtde</th>") == 1, "Coluna Qtde ausente ou duplicada")
require("function pictureParts" in desktop_js, "Picture não é convertido automaticamente")
require('"9":"Numérico"' in desktop_js and 'X:"Caractere"' in desktop_js, "Mapeamento de tipos incompleto")
require("${esc(f.picture)}" not in desktop_js, "A notação Picture ainda é exibida na tabela")
require("fieldObservations" in desktop_js, "Metadados não foram centralizados em Observações")
require("f.observations||[]" in desktop_js, "A interface não usa as associações explícitas por campo")
require("matchAll(/NOTA" not in desktop_js, "A interface ainda infere notas pelo texto")
require('icon:"📖"' in desktop_js, "Ícone de nota ausente")
require('icon:"📌"' in desktop_js, "Ícone de constante ausente")
require('icon:"ℹ️"' in desktop_js, "Ícone de regra geral ausente")
require(
    "${esc(f.interpreted)}</td><td>" in desktop_js,
    "A coluna Interpretado ainda mistura observações",
)

print("OK — auditoria de deploy concluída.")
