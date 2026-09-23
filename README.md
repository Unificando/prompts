# Prompts Unificando

[![npm version](https://img.shields.io/npm/v/@unificando/prompts.svg)](https://www.npmjs.com/package/@unificando/prompts)
[![license](https://img.shields.io/npm/l/@unificando/prompts.svg)](./LICENSE)

Biblioteca de prompts para auditoria, implementação, testes, segurança, conteúdo e SEO. Cada disciplina declara seus modos, entradas, saídas e dependências. Os prompts orientam agentes com acesso a código; quando uma ferramenta ou evidência não estiver disponível, a entrega deve explicitar a limitação.

## Uso

Requer Node.js 18+. Para a versão publicada:

```bash
npx @unificando/prompts list
npx @unificando/prompts get seo --copy
npx @unificando/prompts get frontend --mode proposta --module performance --scope "src/Cart.tsx"
npx @unificando/prompts inspect frontend
```

Para usar as alterações deste checkout antes da publicação:

```bash
node bin/cli.js list
node bin/cli.js get frontend --module limpeza,performance --mode implementacao
node bin/cli.js get seo-llm --mode proposta --scope "identidade da página inicial"
node bin/cli.js validate
```

`get` entrega contrato comum, disciplina e módulos selecionados em um único texto. `--copy` copia esse mesmo conteúdo; se o clipboard falhar, o texto é impresso para cópia manual. `--scope` descreve o alvo, não verifica sua existência: o agente confirma isso no projeto de destino. A CLI compõe instruções; ela não executa o trabalho do agente.

`list` informa módulos e modos padrão. `inspect <id>` entrega JSON com versão do pacote/prompt/contrato, modos, entradas, saídas, dependências e SHA-256 da definição completa. Esse hash inclui metadados e conteúdo de contrato/módulos; registre também opções selecionadas quando precisar reproduzir uma execução.

A CLI rejeita opções, modos e módulos desconhecidos, seleções duplicadas e argumentos sem valor. Use IDs de módulos separados por vírgula, sem espaços. Modo aceita português com ou sem acento.

## Modos

| Modo | Comportamento |
| --- | --- |
| `auditoria` | Diagnóstico com evidências; sem escrita nem comandos que gerem artefatos |
| `proposta` | Análise e patches/textos revisáveis na resposta; sem aplicar |
| `implementacao` | Alterações locais no escopo e verificações pertinentes |

Autorizações já dadas valem durante a execução; não há pausa obrigatória a cada fase. Perguntas ficam para dados bloqueantes, decisões relevantes ou ações ainda não autorizadas. Commit, publicação, deploy e alterações de contas não estão implícitos.

`auditoria-engenharia` e `auditoria-seguranca` suportam apenas auditoria e proposta. Segurança é análise estática, sem exploração ativa. Os demais suportam os três modos; respeitam a restrição de disciplina, como editar somente texto em `revisao-copy` ou somente AGENTS.md em `agents`.

## Catálogo

| ID | Escopo | Padrão |
| --- | --- | --- |
| `frontend` | UI, limpeza, arquitetura, performance, erros, framework, acessibilidade | Implementação |
| `backend` | NestJS, banco, segurança, performance, erros, testes e contratos | Implementação |
| `fullstack` | Integração entre UI/servidor, segurança, performance, erros e testes | Implementação |
| `testes` | Comportamentos, reconciliação, risco e alvo único | Implementação |
| `setup-e2e` | Base E2E mínima com smoke test executado | Implementação |
| `auditoria-testid` | Seletores estáveis no alvo; data-testid quando necessário | Implementação |
| `testes-e2e` | Jornadas relevantes, isolamento e falhas aplicáveis | Implementação |
| `ci-e2e` | Pipeline CI revisável; implementação local opcional | Proposta |
| `auditoria-engenharia` | Qualidade e riscos com evidências e contraexemplos | Auditoria |
| `auditoria-seguranca` | Controles, privacidade, deploy e modelagem de abuso | Auditoria |
| `revisao-copy` | Texto, preservando significado, idioma, placeholders e lógica | Implementação |
| `refatoracao-faseada` | Lotes verificáveis e reversão localizada | Implementação |
| `seo` | Identidade, palavras-chave, conteúdo, indexação e busca local | Auditoria |
| `seo-llm` | Identificação correta e conteúdo citável em respostas de IA | Auditoria |
| `agents` | Criação ou reconciliação factual de AGENTS.md | Implementação |
| `pipeline` | Orquestração por objetivo, com versões e estado verificável | Implementação |

## Módulos e escopo

`frontend`, `backend` e `fullstack` têm núcleo curto e módulos compartilhados. Sem `--module`, `get` inclui todos os módulos daquela disciplina; o agente deve aplicar somente os pertinentes. A seleção explícita reduz o texto recebido.

```bash
node bin/cli.js get backend --module banco,contratos-api --mode proposta
node bin/cli.js get frontend --module acessibilidade --scope "src/Checkout.tsx"
```

O modo arquivo único vale também para testes e relatórios: examine dependências necessárias, mas preserve arquivos e seções fora do alvo. O usuário pode delimitar isso no pedido mesmo sem `--scope`.

## SEO e respostas de IA

SEO é tratado pelos prompts dedicados, separadamente do frontend. Execute `seo` e reutilize suas evidências em `seo-llm`. Ambos aceitam no briefing:

- Foco: `completo`, `identidade`, `local`, `indexacao` ou `conteudo`.
- Limite de páginas prioritárias: três por padrão, ajustável ao pedido.
- Registro factual compartilhado: `seo-facts.md`, com fonte, data, estado e páginas consumidoras.
- Critérios de conclusão por página e separação entre diagnóstico, proposta, implementação verificada e bloqueio.

Exemplo de pedido após colar o prompt:

```text
Modo: PROPOSTA
Foco: local
Páginas prioritárias: 2
Projeto: [caminho]
Objetivo: atender buscas por serviço + cidade.
Use apenas serviços e credenciais confirmados no projeto.
```

As melhorias não garantem ranking, indexação ou recomendação por IA. Uma consulta isolada não comprova causa técnica. Resultados de busca exigem observação real e acompanhamento.

## Pipeline e retomada

O pipeline seleciona disciplinas pelo objetivo, não executa automaticamente toda a biblioteca. Testes de comportamento acompanham alterações arriscadas, em vez de começar somente no final. Setup E2E, seletores, CI e SEO entram quando pertinentes.

O estado registra versões exatas, hashes, modos, módulos, escopo, código/alterações locais, dependências e evidências. Uma fase concluída pode ficar desatualizada se seus arquivos, contrato ou dependências mudarem; revalide o necessário e preserve fases independentes.

Para reprodução, use `npx @unificando/prompts@<versão-exata> ...` com uma versão realmente disponível. Não misture o prompt de uma versão com módulos de outra. Sem rede, uma cópia local verificada pode ser utilizada.

## Fontes, manutenção e avaliação

- [Contrato comum](prompts/shared/contract.md): evidência, modos, autorização, escopo e validação.
- [Catálogo versionado](prompts/manifest.json): metadados e módulos.
- [Avaliações comportamentais](evals/README.md): fixtures, rubrica e registro reproduzível de respostas reais.
- [Changelog](CHANGELOG.md): alterações e migração.

Os arquivos Markdown em `prompts/` são fontes de composição. `{{CONTRACT}}` e `{{MODULES}}` são substituídos pela CLI. Para copiar manualmente, inclua o contrato e os módulos referenciados; prefira `get` para não perder instruções. Não cole apenas um bloco interno de SEO sem o contrato.

Ao alterar um módulo compartilhado, revise todos os prompts consumidores, seus critérios e versões. Preserve IDs públicos; mudanças de contrato/modo incompatíveis pedem versão principal. Não use selos de qualidade sem avaliação.

```bash
npm test
npm run validate
npm run evals -- list
node bin/evals.js show public-route
node bin/evals.js template > /tmp/prompt-eval-results.json
node bin/evals.js check /tmp/prompt-eval-results.json
```

`npm test` verifica CLI, composição, metadados, consistência estrutural e ferramenta de avaliações. **Não mede sozinho a qualidade das respostas de uma IA.** O último comando retorna código 2 enquanto a avaliação não tiver sido executada/revisada; isso evita aprovar um relatório vazio.

## Migração da biblioteca 1.x

IDs, `list`, `get <id>` e `--copy` continuam disponíveis. A saída de `get` passa a ser composta e inclui metadados; não é uma cópia byte a byte do arquivo fonte. Os três prompts maiores agora têm módulos. Foram removidos gates repetitivos e regras absolutas sem contexto; `ci-e2e` permite implementação local quando explicitamente escolhida. Scripts que dependiam de títulos internos ou toleravam opções desconhecidas devem ser atualizados.

A versão 2.0.0 deste checkout está preparada localmente; a publicação é uma ação separada.

## Instalação alternativa

```bash
npm install -g @unificando/prompts
unificando-prompts list
```

O projeto também possui workflow de publicação no GitHub Packages. Para usar esse registry, configure o escopo `@unificando` e autenticação de leitura conforme as permissões da sua conta, sem versionar credenciais. Publicação só ocorre mediante ação de release.

## Licença

MIT
