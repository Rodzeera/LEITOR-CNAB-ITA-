from __future__ import annotations

import streamlit as st
import streamlit.components.v1 as components

from utils.component_loader import build_analyzer_html


st.set_page_config(
    page_title="CNAB240 Analyzer",
    page_icon="🏦",
    layout="wide",
    initial_sidebar_state="expanded",
)

st.sidebar.title("Ferramentas bancárias")
module = st.sidebar.radio(
    "Módulos",
    (
        "🏦 CNAB240 Analyzer",
        "📄 CNAB400 (em breve)",
        "💳 Extrato FEBRABAN (em breve)",
        "🔍 Comparador de Arquivos (em breve)",
        "⚙ Configurações",
    ),
    label_visibility="collapsed",
)
st.sidebar.divider()
st.sidebar.caption("CNAB240 · identificação automática do banco")

if module == "🏦 CNAB240 Analyzer":
    st.title("🏦 CNAB240 Analyzer")
    st.caption(
        "Importe um arquivo .REM ou .TXT. O processamento utiliza o mesmo "
        "parser da versão desktop."
    )
    html = build_analyzer_html()
    components.html(html, height=1050, scrolling=True)
elif module == "⚙ Configurações":
    st.title("⚙ Configurações")
    st.info("As configurações adicionais serão disponibilizadas em uma versão futura.")
else:
    st.title(module.rsplit(" (", 1)[0])
    st.info("Em breve.")
