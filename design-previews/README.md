# Visual Design Exploration

Three CSS-only homepage directions were researched and rendered for xbaehr.com. Each option preserves the existing JSX, copy, links, and behavior.

## Research

Reference portfolios reviewed with Playwright:

| Reference | Useful signal |
| --- | --- |
| [Paco Coursey](https://paco.me) | Restrained navigation, quiet reading-focused layout, and compact sans typography. |
| [Lee Robinson](https://leerob.io) | Editorial serif hierarchy that makes personal perspective the page's center. |
| [Rauno Freiberg](https://rauno.me) | Strong typographic composition and confident spatial rhythm. |
| [Brian Lovin](https://brianlovin.com) | Clear scan path from personal identity to writing and supporting destinations. |

## Options

| Option | Direction | Fonts | Colors | Impeccable notes |
| --- | --- | --- | --- | --- |
| 1 | Editorial reading room | Georgia / Times | Paper, ink, terracotta, ochre | Best for foregrounding Max's writing and personality; homepage and mobile captures have no overflow. |
| 2 | Technical field notebook | System sans | Deep blue-black, seafoam, amber | Strongest technical/platform cue; intentionally the most restrained and least warm option. |
| 3 | Warm studio board | Georgia display / Arial body | Cream, ink, coral | Best-balanced default for hiring managers and collaborators: fast to scan without losing personality. |

The Impeccable finish review confirmed that the final previews are production captures with the development indicator removed, accessible text labels retained after suppressing decorative emoji, responsive display hierarchy restored, and no observed regressions. The CSS-only constraint means the typography uses explicit broadly available fallback stacks rather than added webfont assets.
