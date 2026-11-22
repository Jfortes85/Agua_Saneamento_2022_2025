# Estatísticas oficiais e indicadores de água e saneamento em Cabo Verde

Apresentação interativa (HTML) preparada para o **Dia Africano da Estatística 2026**, conferência comemorativa do
Instituto Nacional de Estatística de Cabo Verde (Praia, 18 de novembro de 2026). É a versão web, fiel ao PowerPoint
`downloads/Apresentacao_Agua_Saneamento-animated.pptx`: mesmos 24 slides, textos, cores, ícones, gráficos e a mesma
coreografia de animações e transições.

**Ver online:** `https://<utilizador>.github.io/<repositório>/` (ver «Publicar no GitHub Pages»).
**QR code:** abra `qr.html` ou carregue na tecla **Q** dentro da apresentação.

## O que torna esta versão dinâmica

| Funcionalidade | Como usar |
|---|---|
| Animações do PowerPoint reproduzidas (entradas, atrasos, easing, pulsos) | automáticas ao mudar de slide; **R** repete |
| Navegação por teclado, clique e gesto de deslizar | **←/→**, espaço, **Home/End**; toque para avançar |
| Vista geral com miniaturas | **G** |
| Modo leitura (rolagem vertical, ideal no telemóvel; é o modo por defeito em ecrãs pequenos) | **V** ou `?modo=leitura` |
| Notas do orador com alvo de tempo por slide e cronómetro de 20 minutos | **N** e **T** |
| Gráficos interativos: valores ao passar o rato/tocar, legenda clicável, exportação CSV | passar o rato sobre o gráfico |
| Linhas das tabelas de comparação (CPLP e CEDEAO) realçadas com valores completos | passar o rato/tocar |
| Saltar entre secções | clicar nos pontos I–VII no topo de cada slide, ou botão «Secções» |
| QR code e ligação para partilhar, com descarga em SVG/PNG | **Q** |
| Descarga do PowerPoint e do Excel de dados | botão «QR code» → «Descarregar» |
| Ligação direta a um slide | `#/12` no fim do endereço |
| Ecrã inteiro, impressão/PDF (um slide por página), consulta offline (PWA), acessibilidade (tabelas de dados dos gráficos para leitores de ecrã, `prefers-reduced-motion`) | **F**; imprimir com Ctrl+P |

## Publicar no GitHub Pages

1. Crie um repositório (por exemplo `apresentacao-agua-saneamento-cv`) e envie **todo o conteúdo desta pasta** para a ramificação `main`.
2. Em **Settings → Pages → Build and deployment → Source**, escolha **GitHub Actions**. O fluxo `.github/workflows/pages.yml` publica o site em cada alteração.
   (Alternativa sem Actions: *Deploy from a branch* → `main` → `/ (root)`.)
3. Em poucos minutos a página fica em `https://<utilizador>.github.io/<repositório>/`.
4. Gere o QR estático: **Actions → «Gerar QR code» → Run workflow** (ou `python tools/make_qr.py --owner <utilizador> --repo <repositório>`). Os ficheiros ficam em `qrcode/` (`qr-apresentacao.png`, `.svg` e `qr-cartaz.png`, cartaz A4 para projetar ou imprimir).

> As versões das *actions* usadas nos fluxos (`checkout@v4`, `configure-pages@v5`, `upload-pages-artifact@v3`, `deploy-pages@v4`, `setup-python@v5`) eram as indicadas à data de preparação; confirme se há versões mais recentes recomendadas.

## Estrutura

```
index.html              apresentação (gerada a partir do PPTX; não editar à mão)
qr.html                 página de QR code em ecrã inteiro (?u=<endereço> para outro destino)
assets/css, assets/js   estilos, motor de animação/navegação (deck.js), gráficos (charts.js), QR (qrcode.js)
assets/fonts            Carlito e Caladea (substitutas métricas de Calibri e Cambria; licença OFL)
assets/img              ícones dos slides, imagem de partilha, favicon
downloads/              PowerPoint (estático e animado) e Excel com a base de dados
qrcode/                 QR code estático (gerado)
tools/                  build_html.py (PPTX → HTML), animate_plan.py (coreografia), make_qr.py
.github/workflows/      publicação no Pages e geração do QR
manifest.webmanifest, sw.js   instalação como aplicação e uso offline
```

## Regenerar o HTML a partir do PowerPoint

```bash
pip install -r tools/requirements.txt
python tools/build_html.py downloads/Apresentacao_Agua_Saneamento.pptx
```
O conversor lê as formas, textos, ícones, gráficos e notas do próprio `.pptx` (por isso o HTML acompanha qualquer alteração ao PowerPoint) e
usa `tools/animate_plan.py` para a coreografia. Depois de publicar alterações, incremente `VERSION` em `sw.js` para renovar a cache offline.

## Fontes de dados

- INE Cabo Verde, Inquérito Multiobjetivo Contínuo (IMC) 2022–2025: quadros 28 a 40 (água e saneamento).
- INE Cabo Verde, Contas Nacionais 2015–2023 (base 2015, SCN 2008).
- UN-Water, SDG 6 Data Portal, indicadores 6.1.1 e 6.2.1a (OMS/UNICEF JMP): <https://sdg6data.org/indicator/6.1.1> e <https://www.sdg6data.org/en/indicator/6.2.1a>.
- ONU, Statistical Yearbook, 68.ª edição (2025), quadro «Water and Sanitation Services».

Os níveis de serviço ODS/JMP («gerido em segurança», «básico»…) não são as variáveis do IMC e não devem ser comparados diretamente com elas.
Os dados do Excel têm uma folha «Verificações» com as ressalvas de qualidade identificadas nos dados de origem.

## Créditos e licenças de terceiros

- Fontes **Carlito** e **Caladea**: SIL Open Font License 1.1 (`assets/fonts/LICENSE-FONTS.txt`).
- **qrcode-generator** (Kazuhiko Arase): licença MIT, ficheiro `assets/js/qrcode.js`.
- **segno** (Lars Heuer): licença BSD, usado apenas em `tools/make_qr.py`.
- Falta definir a licença do conteúdo (apresentação e dados): acrescente um ficheiro `LICENSE` ao critério do INE.
