# Pipeline CI para Suíte E2E

PROPOSTA é o padrão: entregue o patch completo revisável. IMPLEMENTAÇÃO aplica arquivos locais de CI quando solicitado; não publica, altera secrets de contas ou dispara produção por conta própria.

Fonte de composição: obtenha a versão completa pela CLI (`get ci-e2e`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Reconhecimento

Identifique provedor, workflows existentes, gerenciador/lockfile, versão de runtime, comando E2E, browsers, baseURL e dependências de serviços. Confirme que a suíte é executável ou identifique seu bloqueio antes de declarar o pipeline funcional.

## Estratégia e patch

- Escolha triggers e condições coerentes com o repositório. Trate PRs de forks sem expor secrets e aplique permissões mínimas ao job.
- Prepare instalação determinística pelo lockfile, browser/dependências, servidor/health check e execução da suíte com timeout de job e testes.
- Escolha cache do gerenciador/browser conforme suporte atual, chaves e custo. Não cacheie node_modules ou binário por hábito sem verificar compatibilidade.
- Configure concorrência, cancelamento e shards/matriz apenas quando o volume justificar. Retries limitados não devem ocultar falha consistente.
- Defina artefatos úteis para diagnóstico (trace, screenshots, relatório) e retenção proporcional, sem dados sensíveis. Condição de upload deve permitir investigar falha.
- Referencie nomes de secrets; nunca forneça valor. Não invente credencial/baseURL nem copie dado real para fixture.
- Entregue o diff completo e justificativas no modo PROPOSTA sem pausa intermediária. Em IMPLEMENTAÇÃO, aplique a menor mudança ao workflow existente.

## Validação e entrega

Use validação de sintaxe/configuração disponível, confira scripts e execute suíte local quando o modo permitir. Diferencie “YAML validado”, “suíte local passou” e “job executou no provedor”. Sem execução remota autorizada, o último permanece pendente.

Informe arquivos, triggers, permissões, dependências, secrets por nome, comandos e evidências. Não prometa pipeline verde apenas pela leitura do YAML.
