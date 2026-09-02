# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/). Este projeto segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

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
