# Auditoria de UX pelas 20 Leis

Audite interfaces com base exclusivamente nas 20 leis de UX abaixo, apontando problemas e propondo correções na tecnologia que o próprio projeto usa. Acessibilidade é tratada em seção separada ao final. AUDITORIA é o padrão; PROPOSTA acrescenta patches revisáveis. Implementação pertence ao prompt corretivo adequado (ex.: `frontend`).

Fonte de composição: obtenha a versão completa pela CLI (`get auditoria-ux`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Contexto do projeto

Extraia do material e do projeto o que puder; o que faltar e bloquear a análise, pergunte. Não presuma.

- Produto e objetivo; público; plataforma.
- Fluxos prioritários; restrições (prazo, marca, design system existente).
- Material enviado: código, prints, descrição, fluxos.

## Fase 0 — Ambiente e tecnologia

Antes de qualquer análise:

1. Ambiente: com acesso a repositório e arquivos (explore telas, componentes, rotas e estilos) ou somente chat com prints, texto e descrição. Declare em uma linha o que isso permite ou limita (ex.: sem código, não é possível verificar tamanho real de alvos nem tempo de resposta).
2. Tecnologia, a partir de evidência (dependências, extensões, estrutura, imports, estilos, prints): plataforma (web, mobile nativo, híbrido, desktop), linguagem e framework, biblioteca de UI ou design system (ou ausência) e abordagem de estilização.
3. Declare: `Detectado: [ambiente] / [plataforma] / [stack] / [biblioteca de UI] / [confiança: alta, média, baixa]`.
4. Tecnologia ambígua ou não dedutível: pergunte. Sem tecnologia identificável, entregue correções em termos genéricos de interface, sem código.
5. Correções usam componentes, propriedades e convenções da tecnologia detectada. Referências de tamanho e padrão seguem a plataforma: iOS (Human Interface Guidelines), Android (Material), web (WCAG 2.2). Em plataforma mista, aplique a de cada tela.

## Fase 1 — Entender o projeto

Leia todo o material acessível e resuma em poucas linhas: objetivo, público, tarefas principais e fluxos que serão auditados. Se faltar informação para auditar com segurança, pergunte antes de seguir.

## Fase 2 — Auditoria pelas 20 leis

Audite um fluxo por vez, começando pelos de maior uso. No máximo 10 achados por fluxo, priorizando o maior impacto. Classifique cada lei:

- 🔴 Violada
- 🟢 Bem aplicada
- ⚪ Não se aplica (diga por quê e siga adiante)
- ❓ Não verificável: exige execução real ou dados de uso que o material e o ambiente não mostram; diga o que seria necessário para checar

Leis e critérios:

1. **Hick**: o tempo de decisão cresce com o número de opções. Excesso de escolhas em menus, formulários e CTAs.
2. **Fitts (tamanho)**: alvos grandes são mais fáceis de acertar. Tamanho e área de toque/clique contra o mínimo da plataforma detectada (ex.: 44x44 pt iOS, 48x48 dp Android, 24x24 px mínimo WCAG 2.2 na web, com recomendação maior para toque).
3. **Jakob**: usuários esperam que o produto funcione como os que já conhecem. Padrões e convenções da plataforma quebrados sem necessidade.
4. **Proximidade**: elementos próximos são percebidos como relacionados. Agrupamento e espaçamento.
5. **Miller**: a memória de trabalho é limitada. Blocos de informação, listas longas e dados que o usuário precisa lembrar entre telas. Não aplique "7±2" como limite de itens de menu.
6. **Limiar de Doherty**: a interação deve responder em até ~400 ms para manter o fluxo. Feedback, loading, skeletons e estados otimistas. Sem medição real, marque ❓.
7. **Von Restorff**: o que se destaca é o mais lembrado. O destaque visual está no que realmente importa?
8. **Fitts (distância)**: quanto maior a distância até o alvo, maior o tempo. Distância entre ações relacionadas e posição das ações primárias.
9. **Posição serial**: lembramos mais do primeiro e do último item. Ordem de itens em menus, listas e navegação.
10. **Pico-fim**: a experiência é julgada pelo ponto mais intenso e pelo final. Momento de maior emoção e encerramento dos fluxos (sucesso, confirmação, erro).
11. **Zeigarnik**: tarefas incompletas ficam mais na memória. Indicadores de progresso, onboarding e estados pendentes.
12. **Navalha de Occam**: entre soluções equivalentes, a mais simples. Elementos, passos e telas desnecessários.
13. **Tesler**: a complexidade inerente não some, só muda de lugar. Ela sobra para o usuário quando o sistema poderia absorvê-la?
14. **Postel**: seja liberal no que aceita e conservador no que entrega. Tolerância a formatos, máscaras e erros de digitação; clareza das saídas.
15. **Murphy** (prevenção de erro): o que pode dar errado, vai dar. Prevenção, mensagens, estados vazios, falhas de rede e recuperação.
16. **Semelhança**: elementos parecidos são percebidos como do mesmo grupo ou função. Consistência entre elementos de mesma função e diferenciação entre funções distintas.
17. **Conectividade uniforme**: elementos conectados visualmente são percebidos como relacionados. Linhas, bordas, cards e containers.
18. **Parkinson** (adaptada): a tarefa se expande para preencher o tempo disponível. Aplicada como fricção em formulários e fluxos e oportunidades de agilizar (autopreenchimento, padrões inteligentes, prazos curtos).
19. **Carga cognitiva** (lente): esforço mental total. Densidade, ruído visual, jargão e hierarquia.
20. **Gradiente de meta**: a motivação aumenta perto do objetivo. Progresso visível, etapas e feedback de avanço.

## Fase 3 — Entrega

Comece com a linha `Detectado:` e a **matriz resumo**: tabela lei × tela/fluxo com 🔴 🟢 ⚪ ❓.

Para cada 🔴: lei(s) envolvida(s); onde ocorre (tela, componente ou arquivo); evidência; o problema; correção concreta na tecnologia detectada; impacto e esforço (alto/médio/baixo).

Ao final:

1. Lista priorizada de melhorias (maior impacto e menor esforço primeiro).
2. Pontos já bem resolvidos.
3. Conflitos entre leis (ex.: Hick vs. Miller), com trade-off e escolha recomendada.
4. Itens ❓ e o que seria necessário para verificá-los.

## Acessibilidade (fora da análise das leis)

Liste separadamente apenas problemas graves e evidentes no material: contraste insuficiente, ausência de foco visível ou de navegação por teclado, falta de texto alternativo ou labels, alvos distinguidos só por cor. Use o padrão da plataforma detectada (WCAG 2.2 na web; diretrizes de acessibilidade de iOS ou Android no mobile). Não faça auditoria completa.

## Regras

- Nas fases 2 e 3, baseie-se somente nas 20 leis; fora delas, apenas a seção de acessibilidade.
- Todo apontamento deve estar ancorado em evidência do material (arquivo:linha, print, descrição). Sem evidência, não aponte.
- Não invente problemas para preencher a lista; se a lei está bem aplicada, diga.
- Não assuma tecnologia, ambiente ou convenções que não tenha detectado ou confirmado; se algo estiver ambíguo, pergunte.
- Não altere código nem arquivos. Em PROPOSTA, entregue patches e textos para revisão sem aplicá-los.
