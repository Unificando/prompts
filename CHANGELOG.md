# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/). Este projeto segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Não lançado]

## [2.0.0] - 2026-09-23

### Added

- Prompt `documentacao`: geração/reconciliação de docs/ com catálogo inicial extensível de documentos técnicos, índices de módulos, modos da biblioteca e alcance completo/incremental/documento único. Inclui rastreabilidade, preservação manual, detecção de alterações locais e baseline por documento; integrado à CLI, README, guia de agentes e pipeline.

- Contrato comum versionado para modos `AUDITORIA`, `PROPOSTA` e `IMPLEMENTAÇÃO`, evidência, escopo, autorização persistente e validação proporcional.
- Composição modular de `frontend`, `backend` e `fullstack`, com módulos compartilhados de limpeza, arquitetura, performance, erros, framework, acessibilidade, integração, segurança, banco, testes/observabilidade e contratos de API.
- CLI: `--mode`, `--module`, `--scope`, `inspect <id>` e `validate`; metadados de versão, modos suportados, entradas, saídas, dependências e hash SHA-256 por definição completa.
- Prompt `seo-llm`: identidade, tratamento de homônimos, conteúdo citável, acesso de crawlers e medição de menções/citações em respostas de IA.
- Sete cenários de avaliação comportamental com fixtures, rubrica, geração de entrada e conferência de resultados revisados. Registros sem execução permanecem pendentes; hashes invalidam avaliações quando as entradas mudam. Não há nota de qualidade de modelo presumida.
- Testes de composição, seleção, argumentos, catálogo, clipboard, fixtures e validador de avaliações; comandos `npm run validate` e `npm run evals`.

### Changed

- `agents`: guia gerado autossuficiente, com distinção entre regras explícitas, convenções observadas e preferências; critérios para decidir/perguntar, concluir e validar; documentação referenciada sem duplicação e prompts opcionais por situação, preservando escopo e autorizações existentes.

- `documentacao`: os onze documentos iniciais deixam explícito que não há limite fixo; novos documentos temáticos são descobertos a partir de evidências, com critérios de utilidade, prevenção de duplicação e integração ao índice/manifesto, respeitando o alcance selecionado.

- Frontend dedicado à interface: módulo `acessibilidade-seo` renomeado para `acessibilidade`, com remoção do checklist de SEO. SEO permanece nos prompts dedicados `seo` e `seo-llm`; catálogo e exemplos da CLI atualizados.

- Todos os prompts revisados: removidos selos “10/10”, gates repetitivos e regras absolutas baseadas apenas em contagens. Evidências seguem observação → hipótese → verificação → decisão → validação.
- Limpeza exige verificar entradas dinâmicas, rotas e consumidores externos; ausência de referência não comprova código morto. Performance exige contexto/medição, sem memoização ou TTL fixo prescritos por hábito.
- Testes quebrados passam por diagnóstico de regressão, acoplamento interno, mudança de contrato ou ambiguidade. Abstração depende de responsabilidade e benefício de manutenção; não de um número fixo de repetições.
- Prompts de testes preservam escopo de arquivo único e reconciliação, com critérios de risco em vez de cobertura artificial. E2E usa seletores estáveis existentes e exige auditoria de data-testid apenas quando houver lacuna.
- `ci-e2e` entrega proposta concreta por padrão e permite implementar arquivos locais quando solicitado. Auditorias de engenharia e segurança suportam apenas auditoria/proposta; segurança continua sem exploração ativa.
- `agents` reconcilia instruções com fontes reais, preserva decisões locais e não impõe políticas rígidas universais. `revisao-copy` mantém edições textuais pontuais, idioma e placeholders.
- `pipeline` e `refatoracao-faseada` registram versões/hash, escopo, estado do código e dependências; fases afetadas por mudanças são revalidadas. Testes acompanham mudanças de risco, sem ficar todos para o final.
- `seo` ampliado para busca local, mapa de palavras-chave por intenção e propostas por página. `seo` e `seo-llm` incluem foco, limite configurável de páginas, registro compartilhado `seo-facts.md` e critérios de conclusão por página.
- README e catálogo atualizados para a nova composição e migração. Versões de package.json e lockfile preparadas para 2.0.0.
- **Pacote renomeado** de `prompts-unificando` para `@unificando/prompts` (escopo da organização Unificando). Comando do CLI: `npx @unificando/prompts` (bin global `unificando-prompts`). Repositório movido para `github.com/Unificando/prompts`.

### Fixed

- CLI rejeita argumentos/opções desconhecidos, valores ausentes e seleções inválidas antes de imprimir um prompt.
- Falha do clipboard com status diferente de zero não é mais reportada como cópia bem-sucedida; o conteúdo fica disponível na saída.

### Breaking changes

- Seleção de módulo do frontend: use `--module acessibilidade` no lugar de `--module acessibilidade-seo`.

- `get <id>` entrega conteúdo composto com contrato e metadados, não uma cópia literal do arquivo Markdown. Fontes usam marcadores resolvidos pela CLI.
- Estrutura interna e títulos dos prompts foram reorganizados; integrações que dependem desses textos precisam ser revisadas. IDs e comandos básicos foram preservados.
- Argumentos antes ignorados agora falham explicitamente. A política de autorização usa modo e escopo, eliminando confirmações fixas por fase.

## [1.8.0] - 2026-09-09

### Changed
- Prompt `testes`: adicionado modo arquivo único (nova Etapa 0.1) — quando o pedido cita um arquivo (caminho) ou componente (nome) como alvo exclusivo, o pipeline completo (mapear → reconciliar → gerar/atualizar → relatório) roda restrito ao alvo, com leitura escopada (arquivo alvo + dependências diretas como contexto de contrato + testes existentes dele), guarda contra nome ambíguo/inexistente, gates de confirmação preservados e artefatos incrementais: `business-rules.md`/`test-report.md` ganham ou atualizam apenas as seções do alvo (nunca regeneram seções de outros módulos — nova Regra Inviolável 20) e `test-plan.md` não é criado (mutuamente exclusivo com o modo projeto extenso).
- Prompt `testes-e2e`: adicionado modo arquivo único (nova Etapa 0.1, gatilho idêntico ao do `testes`) — elegibilidade, jornada, reconciliação e specs restritos aos fluxos que atravessam o componente/tela alvo (nova Regra Inviolável 15). A dependência do `auditoria-testid` ganhou exceção carimbada: sem `testid-changes-report.md`, o modo arquivo único permite verificação escopada de `data-testid` em leitura apenas, restrita ao alvo (novo item 4.6 do relatório); seletor ausente/ambíguo direciona ao `auditoria-testid` e a proibição de aplicar testid vale em qualquer modo — a varredura do app inteiro continua proibida no modo padrão (Regra 11 reescrita sem enfraquecê-la).
- README, `prompts/manifest.json` e testes do CLI atualizados: tabela e bullets de escolha mencionam o modo arquivo único, descrições do manifest idem, e os testes de `get testes`/`get testes-e2e` agora assertam o marcador `MODO ARQUIVO ÚNICO`.

## [1.7.0] - 2026-09-07

### Added
- Prompt `agents`: criação do AGENTS.md padronizado do projeto — PROMPT 1 gera o guia de trabalho para agentes de IA a partir do README.md (fonte primária das regras), com contexto do repositório, tabela de comandos reais verificados nos scripts/compose, particularidades que quebram com evidência, regras de trabalho universais destiladas da biblioteca (evidência obrigatória, sem commit sem pedido, contrato de testes, gates, report-only), regras condicionais ativadas pelo contexto detectado (migration+seed, reprocessamento de índice, contrato de API/MCP/CLI) e guia dos prompts aplicáveis à stack. PROMPT 2 reconcilia um AGENTS.md existente contra README/docs/scripts atuais, editando somente o AGENTS.md, com tabela de divergências e divergências ambíguas reportadas em vez de resolvidas.

## [1.6.0] - 2026-09-07

### Added
- Prompt `pipeline` (orquestrador): conduz a execução fase a fase de todos os prompts aplicáveis ao projeto em IDEs agênticas — detecção de contexto e plano personalizado (gate de aplicabilidade no nível do pipeline), cadeia de fases na ordem do fluxo recomendado (diagnóstico → triagem → refatoração → testes → E2E → copy → fechamento), gate de triagem obrigatório pós-diagnóstico, arquivo de estado `pipeline-state.md` para retomar entre sessões e fallback manual para ambientes sem terminal. O orquestrador conduz, não duplica: cada fase é executada pelo prompt filho buscado via `npx @unificando/prompts get <id>`.

## [1.5.0] - 2026-09-07

### Changed
- Prompt `auditoria-seguranca`: adicionado PROMPT 2 — Módulos de Ataque (read-only), executado na sequência do PROMPT 1, com cinco módulos ofensivos: varredura de secrets e credenciais (com lista de rotação e verificações manuais de histórico do git), teste de autenticação como um invasor (matriz de sessão por rota, invalidação, abuso de reset), interrogatório adversarial do banco de dados (RLS tabela a tabela, policies de escrita, buckets), auditoria de input (injeção SQL/NoSQL, execução de código, uploads, XSS) e checagem de bomba de custo (rotas de IA, brute force, e-mail/SMS, queries sem teto, medição fail-closed). Gate de aplicabilidade do PROMPT 1 reescrito sem contagem fixa de itens; README e manifest atualizados.

## [1.4.0] - 2026-09-02

### Changed
- Prompt `revisao-copy`: reforma no padrão `refatoracao-faseada` — bloco de regras invioláveis R1–R11 no topo, gate de mapeamento automático (sem pausa para confirmação), prioridade corretiva sobre UX copy com critério anti-over-rewrite (~30%), proteção de i18n/pluralização/placeholders, anti-alucinação ao completar itens inconclusos, template estruturado de relatório e validação ampliada.

## [1.3.0] - 2026-09-02

### Changed
- Prompt `testes`: incorporadas melhores práticas de testes unitários dos artigos da Microsoft e da Testim na Etapa 3.5 (F.I.R.S.T., duplos stub/mock/fake, sem infra real em unit, uma asserção lógica por método, não duplicar lógica de implementação no teste, não acoplar teste a detalhes de implementação) e na regra de cobertura comportamental (percentual de linha é referência, não meta; teste artificial só para subir métrica é proibido).

## [1.2.0] - 2026-09-02

### Added
- Cadeia de prompts para testes E2E (complementar ao `testes`):
  - `setup-e2e`: bootstrap de stack E2E (Playwright) para projeto novo — instalação, configuração, estrutura de pastas e smoke test inicial.
  - `auditoria-testid`: auditoria/aplicação de `data-testid` — convenção única e seletor estável em todo o app (pré-requisito da cadeia).
  - `testes-e2e`: geração/expansão disciplinada da suíte E2E — critério de elegibilidade, jornadas (happy path + falha obrigatória), reconciliação de specs e regras anti-flakiness.
  - `ci-e2e`: pipeline CI para a suíte E2E existente — estratégia de execução, cache, artefatos de falha e patch proposto (read-only).

## [1.1.1] - 2026-08-21

### Fixed
- Prompts `auditoria-seguranca` e `seo`: removido o gate que pausava a execução e aguardava confirmação explícita antes da análise detalhada. Agora o resumo de aplicabilidade/escopo é registrado no relatório e a análise prossegue automaticamente, sem exigir aprovação intermediária.

## [1.1.0] - 2026-08-21

### Added
- Prompt `refatoracao-faseada`: pipeline autônomo de 10 fases (agnóstico de stack), com detecção automática de stack, gates de build/lint/test e patch reversível por fase.
- Prompt `seo`: auditoria de SEO técnico e de conteúdo (read-only) — crawlability, indexação, Core Web Vitals (sinais estruturais), marcação estruturada e plano de ação priorizado.

## [1.0.2] - 2026-08-21

### Added
- Testes automatizados do CLI (`npm test`).
- GitHub Action que publica no npm automaticamente ao criar uma tag `v*`.
- Badges de versão, downloads e licença no README.

## [1.0.1] - 2026-08-21

### Fixed
- Caminho do binário no `package.json` (`bin/cli.js` em vez de `./bin/cli.js`).

### Changed
- README reescrito em tom profissional e objetivo, sem redundância entre seções.
- Adicionado arquivo `LICENSE` (MIT).

## [1.0.0] - 2026-08-21

### Added
- Primeira versão publicada no npm.
- CLI (`list`, `get <id>`, `get <id> --copy`) sem dependências externas.
- 7 prompts: `frontend`, `fullstack`, `backend`, `testes`, `auditoria-engenharia`, `auditoria-seguranca`, `revisao-copy`.
