# Testes E2E — Jornadas e Consistência

IMPLEMENTAÇÃO é o padrão. Proteja jornadas relevantes usando a stack E2E existente; não crie uma segunda convenção.

Fonte de composição: obtenha a versão completa pela CLI (`get testes-e2e`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Reconhecimento e MODO ARQUIVO ÚNICO

Identifique runner, ambiente/baseURL, autenticação de teste, fixtures, scripts e specs existentes. Se o alvo for um componente/arquivo, restrinja a seleção a jornadas que o atravessam, sem varrer a aplicação inteira.

Se não existir runner, use setup-e2e quando a implementação do setup fizer parte do pedido. Verifique seletores no alvo: roles/nomes acessíveis, labels ou data-testid estável conforme convenção. Relatório anterior ajuda, mas não substitui verificar o DOM atual. Use auditoria-testid somente para lacunas reais; não exija um relatório global para começar um teste localizado.

## Elegibilidade e reconciliação

Escolha jornadas com regra de negócio, integração, persistência ou risco relevante. Evite E2E para detalhe puro de estilo ou transformação já bem coberta no nível inferior. Justifique exclusões.

Mapeie persona, ponto de entrada, pré-condições, passos, resultado observável, sucesso e falha aplicável. Se não houver falha significativa, documente a justificativa em vez de inventá-la. Compare specs existentes e mantenha/corrija/estenda antes de criar.

Pergunte apenas por ambiguidades de jornada que mudem o contrato. O modo IMPLEMENTAÇÃO já autoriza editar os specs pertinentes; não peça aprovação de cada reconciliação.

## Implementação confiável

- Isole dados sintéticos e sessão; crie/limpe somente recursos do teste. Nunca use banco de produção. Não dependa de execução anterior ou ordem de specs.
- Prefira seletores semânticos ou IDs estáveis do projeto. Evite cadeia CSS frágil e índices acidentais. Não introduza data-testid em toda a aplicação para um único fluxo.
- Espere por estado/evento observável, não sleep arbitrário. Retries limitados diagnosticam instabilidade; não substituem correção.
- Reutilize Page Objects/helpers quando houver responsabilidade compartilhada e menor custo de manutenção; repetição de dois passos não exige abstração automaticamente.
- Declare fronteiras reais e simuladas. Serviços externos podem usar sandbox/mock conforme contrato; não afirme integração real quando a chamada foi interceptada.
- Cubra sucesso e falha relevantes com assert final de negócio, além de URL/texto intermediário. Capture trace/screenshot/log útil para depurar, sem secrets.
- Execute specs novos/alterados e verifique isolamento/instabilidade quando houver motivo. Não repita indefinidamente até obter verde.

## Entrega

e2e-test-report.md, em IMPLEMENTAÇÃO quando útil: jornada → spec → cenário → resultado; reconciliação antes/depois; dependências simuladas/reais; comando/ambiente; falhas e pendências. Atualize somente o alvo em modo arquivo único. Nos demais modos, entregue relatório e specs propostos na resposta.
