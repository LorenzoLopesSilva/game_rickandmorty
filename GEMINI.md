# 🧬 GEMINI.md — Diretrizes do Projeto "Rick e Morty: O Paradoxo do Portal Quebrado"

Este documento orienta o agente na geração de código, estilização e arquitetura dos componentes do jogo web interativo desenvolvido em React.

---

## 🎯 1. Visão Geral e Contexto
* **Tema:** Rick e Morty — Aventura investigativa interativa para consertar a Arma de Portais.
* **Público-alvo & Plataforma:** Foco estrito em **Desktop** e **Tablet** (formato Widescreen/16:9). Não implementar layouts mobile/smartphones.
* **Persistência de Dados:** Uso de `localStorage` para salvar pontos desbloqueados, pistas, tesouros e progresso do jogador.

---

## 🎨 2. Design System & Identidade Visual
* **Estética Geral:** Cartoon cósmico, estilo Rick & Morty (linhas nítidas, contrastes vibrantes, visual tech sci-fi caótico/desgastado).
* **Paleta de Cores Primária:**
  * Verde Portal (Glow/Neon): `#39FF14` / `#55FF33` / `#00FFA3`
  * Amarelo Camiseta Morty: `#FFE135` / `#F8E71C`
  * Azul Camisa Rick: `#A0E7E5` / `#87CEEB`
  * Roxo / Espaço Cósmico: `#1C0F2B` / `#0D0221`
  * Cinza Metal / Laboratório: `#2A2D34` / `#3E4451`
* **Tipografia:**
  * Títulos: Estilo Display Sci-Fi / Cartoon com contorno ou relevo.
  * Textos e diálogos: Fontes sans-serif legíveis e geométricas (ex: *Inter*, *Roboto*, *Space Grotesk*). SEM EMOJIS
* **Efeitos Visuais:** Sombras com brilho néon (`box-shadow: 0 0 15px rgba(57, 255, 20, 0.4)`), transições suaves de hover e bordas pretas definidas (`border: 3px solid #111`).

---

## 🖼️ 3. Regras de Assets e Imagens
1. **Curadoria de Expressões:** Ao receber opções de imagens de Rick e Morty, selecionar sempre a variante cuja expressão combine com o tom dramático/cômico da cena (ex: sarcástico na tela inicial, assustado em perigo, eufórico em vitórias).
2. **Camadas (Layers):**
   * **Plano de Fundo (Background):** Imagens completas, sem recorte, preenchendo a janela com `object-fit: cover`.
   * **Personagens e Objetos Interativos:** Devem possuir fundo transparente (`.png`), posicionados por coordenadas absolutas/flexíveis em camadas superiores (`z-index: 10+`).
   * **Interface e Diálogos (HUD):** Camada superior (`z-index: 50+`), com caixas translúcidas e botões contrastantes.

---

## ⚙️ 4. Padrões Técnicos e Arquitetura React
* **Componentização:** Modularizar cada tela em sua respectiva pasta dentro de `src/components/screens/`.
* **Gerenciamento de Estado:**
  * Utilizar Context API ou hooks dedicados (`useGameProgress`, `useInventory`) desacoplados da camada de exibição.
  * Schema do estado persistido no `localStorage`:
    ```json
    {
      "pontoAtual": 1,
      "pontosConcluidos": [],
      "tesouros": [],
      "pistas": [],
      "inventarioOrdem": []
    }
    ```
* **Acessibilidade e Usabilidade:**
  * Interações navegáveis por teclado (`Tab`, `Enter`, `Espaço`).
  * Atributos semânticos `aria-label`, `role="button"` e contrastes em conformidade com as diretrizes WCAG AA.
* **Drag and Drop:** Utilizar APIs padronizadas (HTML5 Drag and Drop ou libs leves como `@dnd-kit/core`), sempre mantendo feedback visual ao arrastar e soltar.

---

## 📋 5. Manifesto de Telas
1. **Tela Inicial:** Garagem do Rick, arma com defeito, opções de iniciar ou carregar progresso salvo.
2. **Tela de Tutorial:** Sala de estar dos Smith com orientação do Sr. Meeseeks.
3. **Tela do Mapa Multiversal:** Portal verde conectando a trilha de dimensões (bloqueado, disponível, concluído).
4. **Telas de Quizzes / Desafios:** Apresentação do guardião da dimensão, pergunta de múltipla escolha e recompensa (tesouro + pista).
5. **Tela de Drag and Drop (Cofre da Nave):** Encaixe mecânico de itens nos slots de calibração.
6. **Tela do Inventário (Mochila):** Reorganização e inspeção de fragmentos e tesouros.
7. **Tela do Enigma Final:** Montagem do código alfanumérico da frequência dimensional.
8. **Tela de Conclusão:** Celebração espacial e tela de estatísticas/recomeço.