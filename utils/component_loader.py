from __future__ import annotations

import base64
import json
from pathlib import Path


PROJECT_DIR = Path(__file__).resolve().parent.parent


def _read(relative_path: str) -> str:
    return (PROJECT_DIR / relative_path).read_text(encoding="utf-8")


def build_analyzer_html(file_bytes: bytes, file_name: str) -> str:
    """Monta o componente web usando os mesmos assets e parser do desktop."""
    html = _read("index.html")
    styles = _read("styles.css")
    spec = _read("spec.js")
    parser = _read("parser/parser-core.js")
    interface = _read("app.js")

    html = html.replace(
        '<link rel="stylesheet" href="styles.css">',
        f"<style>{styles}</style>",
    )
    html = html.replace('<script src="spec.js"></script>', f"<script>{spec}</script>")
    html = html.replace(
        '<script src="parser/parser-core.js"></script>',
        f"<script>{parser}</script>",
    )
    html = html.replace('<script src="app.js"></script>', f"<script>{interface}</script>")

    encoded = base64.b64encode(file_bytes).decode("ascii")
    # Mantém o nome como dado, sem permitir que caracteres especiais encerrem
    # a tag <script> do componente.
    safe_name = (
        json.dumps(file_name, ensure_ascii=False)
        .replace("<", "\\u003c")
        .replace(">", "\\u003e")
        .replace("&", "\\u0026")
        .replace("\u2028", "\\u2028")
        .replace("\u2029", "\\u2029")
    )
    bootstrap = f"""
    <script>
      (() => {{
        const binary = atob({json.dumps(encoded)});
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
        const text = new TextDecoder("windows-1252").decode(bytes);
        window.CNAB_UI.loadText(text, {safe_name});
      }})();
    </script>
    """
    return html.replace("</body>", bootstrap + "</body>")
