from __future__ import annotations

from pathlib import Path


PROJECT_DIR = Path(__file__).resolve().parent.parent


def _read(relative_path: str) -> str:
    return (PROJECT_DIR / relative_path).read_text(encoding="utf-8")


def build_analyzer_html() -> str:
    """Monta o componente web usando os mesmos assets e parser do desktop."""
    html = _read("index.html")
    styles = _read("styles.css")
    ux_styles = _read("ux.css")
    spec = _read("spec.js")
    note35_validator = _read("parser/note35-validator.js")
    parser = _read("parser/parser-core.js")
    interface = _read("app.js")

    html = html.replace(
        '<link rel="stylesheet" href="styles.css">',
        f"<style>{styles}</style>",
    )
    html = html.replace(
        '<link rel="stylesheet" href="ux.css">',
        f"<style>{ux_styles}</style>",
    )
    html = html.replace('<script src="spec.js"></script>', f"<script>{spec}</script>")
    html = html.replace(
        '<script src="parser/note35-validator.js"></script>',
        f"<script>{note35_validator}</script>",
    )
    html = html.replace(
        '<script src="parser/parser-core.js"></script>',
        f"<script>{parser}</script>",
    )
    html = html.replace('<script src="app.js"></script>', f"<script>{interface}</script>")

    return html
