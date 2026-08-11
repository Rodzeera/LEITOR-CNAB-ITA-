from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import urlsplit


PROJECT_DIR = Path(__file__).resolve().parent.parent

SCRIPT_SRC_RE = re.compile(
    r"<script\b[^>]*?\bsrc\s*=\s*(?P<quote>['\"])(?P<src>[^'\"]+)(?P=quote)[^>]*>\s*</script\s*>",
    re.IGNORECASE,
)


def _read(relative_path: str) -> str:
    return (PROJECT_DIR / relative_path).read_text(encoding="utf-8")


def _inline_local_scripts(html: str) -> str:
    """Incorpora os scripts locais na mesma ordem em que aparecem no HTML."""

    def replace_script(match: re.Match[str]) -> str:
        source = match.group("src")
        parsed = urlsplit(source)
        if parsed.scheme or parsed.netloc or parsed.query or parsed.fragment:
            return match.group(0)

        relative_path = Path(parsed.path)
        if relative_path.is_absolute():
            return match.group(0)

        script_path = (PROJECT_DIR / relative_path).resolve()
        try:
            script_path.relative_to(PROJECT_DIR)
        except ValueError:
            return match.group(0)

        if script_path.suffix.lower() != ".js":
            return match.group(0)
        if not script_path.is_file():
            raise RuntimeError(f"Script local não encontrado: {source}")

        content = script_path.read_text(encoding="utf-8")
        return f"<script>\n{content}\n</script>"

    return SCRIPT_SRC_RE.sub(replace_script, html)


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
    html = _inline_local_scripts(html)

    if SCRIPT_SRC_RE.search(html):
        raise RuntimeError(
            "O componente Streamlit contém scripts externos não incorporados."
        )

    return html
