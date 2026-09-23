# Setup de Stack E2E

Configure uma base mínima executável para E2E. IMPLEMENTAÇÃO é o padrão; outros modos entregam análise ou patch.

Fonte de composição: obtenha a versão completa pela CLI (`get setup-e2e`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Descobrir antes de instalar

Verifique package manager/lockfile, versões, scripts, configuração E2E existente e aplicação que será servida. Se já houver runner funcional, ajuste somente a lacuna; não instale uma segunda stack.

Sem runner e sem preferência, proponha Playwright para aplicação web compatível e implemente no escopo autorizado. Consulte documentação da versão escolhida para comandos/configuração. Não instale browser/ferramenta global incidentalmente.

## Configurar e verificar

- Use diretórios/convenções do projeto; se ausentes, escolha estrutura pequena com specs, fixtures e helpers apenas quando necessários.
- Configure baseURL e webServer compatíveis com porta/script reais, timeout limitado e reutilização de servidor de desenvolvimento quando segura. Não sobrescreva processo de outra tarefa.
- Defina isolamento, dados sintéticos e trace em falha. Configure projetos/browser necessários ao público, sem multiplicar matriz sem propósito.
- Integre scripts de execução e lockfile. Instale dependências/browser necessários conforme permissões do ambiente; se bloqueado, registre comando e etapa pendente.
- Escreva um smoke test de uma rota pública com critério observável de carregamento. Execute realmente; servidor indisponível não é sucesso.
- Não adicione CI automaticamente: ci-e2e trata a integração quando solicitada. Ferramenta de exploração de browser é opcional, não dependência obrigatória da suíte.

## Entrega

Arquivos/scripts, versão escolhida, comando de execução, resultado do smoke test e próximos requisitos de fixtures/autenticação. Em IMPLEMENTAÇÃO, setup-e2e-report.md se necessário para continuidade; demais modos entregam na resposta.
