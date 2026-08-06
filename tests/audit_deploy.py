from __future__ import annotations

import ast
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
    "spec.js",
    "parser/parser-core.js",
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
standard_library = {"__future__", "base64", "json", "pathlib"}
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

require(
    "parser/parser-core.js"
    in (ROOT / "utils/component_loader.py").read_text(encoding="utf-8"),
    "A interface web não carrega o parser compartilhado",
)
require(
    "CNABParser.create"
    in (ROOT / "app.js").read_text(encoding="utf-8"),
    "A interface desktop não carrega o parser compartilhado",
)

print("OK — auditoria de deploy concluída.")
