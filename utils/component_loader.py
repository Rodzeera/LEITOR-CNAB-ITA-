from __future__ import annotations

from pathlib import Path


PROJECT_DIR = Path(__file__).resolve().parent.parent

SCRIPT_ASSETS = (
    "core/reader.js", "core/utils.js", "core/occurrences.js", "core/models.js", "core/validator.js",
    "banks/base.js",
    "banks/itau/config.js", "banks/itau/constants.js", "banks/itau/versions/v086.js",
    "banks/itau/layouts.js", "banks/itau/fields.js", "banks/itau/notes.js",
    "banks/itau/records.js", "banks/itau/interpretations.js", "banks/itau/validations.js", "banks/itau/bank.js",
    "banks/santander/config.js", "banks/santander/constants.js", "banks/santander/fields.js",
    "banks/santander/layouts.js", "banks/santander/notes.js", "banks/santander/records.js",
    "banks/santander/interpretations.js", "banks/santander/validations.js", "banks/santander/bank.js",
    "banks/bradesco/config.js", "banks/bradesco/constants.js", "banks/bradesco/fields.js",
    "banks/bradesco/layouts.js", "banks/bradesco/notes.js", "banks/bradesco/records.js",
    "banks/bradesco/interpretations.js", "banks/bradesco/validations.js", "banks/bradesco/bank.js",
    "core/registry.js", "core/analyzer.js",
    "spec.js", "parser/note35-validator.js", "parser/parser-core.js", "app.js",
)


def _read(relative_path: str) -> str:
    return (PROJECT_DIR / relative_path).read_text(encoding="utf-8")


def build_analyzer_html() -> str:
    """Monta o componente web usando os mesmos assets e parser do desktop."""
    html = _read("index.html")
    styles = _read("styles.css")
    ux_styles = _read("ux.css")
    html = html.replace(
        '<link rel="stylesheet" href="styles.css">',
        f"<style>{styles}</style>",
    )
    html = html.replace(
        '<link rel="stylesheet" href="ux.css">',
        f"<style>{ux_styles}</style>",
    )
    for asset in SCRIPT_ASSETS:
        html = html.replace(
            f'<script src="{asset}"></script>',
            f"<script>{_read(asset)}</script>",
        )

    return html
