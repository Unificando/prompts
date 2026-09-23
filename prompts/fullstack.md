# Full-Stack (Next.js)

Fonte modular: use `get fullstack` para receber contrato e módulos completos; `--module <id>` restringe a seleção. Para leitura manual, consulte [contrato comum](shared/contract.md) e os módulos listados abaixo.

{{CONTRACT}}

## Objetivo e reconhecimento

Fluxos entre UI, servidor e persistência. Priorize falhas que atravessam camadas, sem duplicar auditorias de cada camada.
Identifique stack, versão, convenções, alvo e comandos disponíveis. Apresente um plano curto e continue no modo escolhido. Priorize o problema solicitado; módulos não pertinentes são não aplicáveis, não novas obrigações.

## Módulos disponíveis

- [integracao](modules/integracao.md)
- [seguranca](modules/seguranca.md)
- [performance](modules/performance.md)
- [erros](modules/erros.md)
- [framework](modules/framework.md)
- [observabilidade-testes](modules/observabilidade-testes.md)

{{MODULES}}

## Entrega específica

Para cada mudança: sintoma, evidência, hipótese verificada, decisão e validação. Separe removido/corrigido de apenas recomendado. No modo PROPOSTA, entregue patches revisáveis. No modo IMPLEMENTAÇÃO, execute as correções autorizadas e conclua com checks pertinentes; não entregue só um plano.
