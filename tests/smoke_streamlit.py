from __future__ import annotations

import runpy
import sys
from pathlib import Path
from types import ModuleType


ROOT = Path(__file__).resolve().parent.parent
rendered: list[str] = []


class Sidebar:
    @staticmethod
    def title(*_args, **_kwargs): pass

    @staticmethod
    def radio(*_args, **_kwargs): return "🏦 CNAB240 Analyzer"

    @staticmethod
    def divider(*_args, **_kwargs): pass

    @staticmethod
    def caption(*_args, **_kwargs): pass


streamlit = ModuleType("streamlit")
streamlit.__path__ = []
streamlit.sidebar = Sidebar()
streamlit.set_page_config = lambda *_args, **_kwargs: None
streamlit.title = lambda *_args, **_kwargs: None
streamlit.caption = lambda *_args, **_kwargs: None
streamlit.info = lambda *_args, **_kwargs: None

components_package = ModuleType("streamlit.components")
components_package.__path__ = []
components_v1 = ModuleType("streamlit.components.v1")
components_v1.html = lambda body, **_kwargs: rendered.append(body)
components_package.v1 = components_v1
streamlit.components = components_package

sys.modules["streamlit"] = streamlit
sys.modules["streamlit.components"] = components_package
sys.modules["streamlit.components.v1"] = components_v1
sys.path.insert(0, str(ROOT))

runpy.run_path(str(ROOT / "interface_web.py"), run_name="__main__")

assert len(rendered) == 1
assert "CNABAnalyzer" in rendered[0]
assert "CNABBankRegistry" in rendered[0]
assert rendered[0].count('id="chooseFile"') == 1
assert 'id="uploadVisual"' in rendered[0] and "disabled" in rendered[0]
print("OK — Streamlit inicia com um único seletor de arquivo ativo.")
