# Cobertura de Testes por Comportamento

Mapeie regras, reconcilie testes existentes e proteja os riscos relevantes. IMPLEMENTAÇÃO é o padrão; AUDITORIA diagnostica e PROPOSTA apresenta specs/diffs sem escrever.

Fonte de composição: obtenha a versão completa pela CLI (`get testes`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Reconhecimento e MODO ARQUIVO ÚNICO

Identifique runner, comandos, convenções, fixtures, estado externo e suítes existentes. Se o pedido nomear um arquivo/componente como alvo exclusivo, leia esse alvo, dependências diretas e testes pertinentes. Não varra nem reescreva o restante da suíte. Se houver múltiplos nomes compatíveis, esclareça antes da parte dependente.

## Mapear contrato e risco

Construa uma tabela por comportamento: entrada, pré-condição, resultado esperado, estado/erro, evidência e testes atuais. Diferencie comportamento observado de requisito desejado. Código pode conter bug; não promova automaticamente sua implementação a regra de negócio.

Use requisitos, contratos públicos, consumidores e documentação para dirimir divergências. Se ainda houver ambiguidade que muda o resultado esperado, pergunte só por ela e continue casos independentes. Não interrompa para confirmar todo o inventário já sustentado por evidência.

## Reconciliação

Classifique testes: manter, corrigir fragilidade, atualizar por mudança de contrato, remover redundância justificada ou adicionar lacuna. Um teste quebrado pode indicar regressão, detalhe interno ou contrato alterado; investigue antes de decidir. Não exclua teste só para tornar a suíte verde.

Escolha o nível mais barato que detecta a falha real: unitário para regra isolada, integração para fronteiras/persistência e E2E para jornada crítica. Não imponha proporções fixas nem cobertura de 100%.

## Escrever e executar

- Respeite nomes/idioma/convenções do projeto. Cubra sucesso, erro aplicável, limites e mudanças de estado com entradas mínimas e dados sintéticos.
- Assert deve observar comportamento público. Não replique o algoritmo para calcular expectativa nem dependa de internals, ordem de chamadas incidental ou snapshot enorme.
- Um teste pode ter várias asserções para o mesmo comportamento. Parametrize variações equivalentes. Use helpers/fixtures quando melhorarem isolamento e clareza, sem proibição genérica de setup/teardown.
- Use fake para implementação simplificada, stub para resposta controlada e mock de interação somente quando a interação for o contrato. Controle tempo/aleatoriedade/rede quando necessário.
- Em correção de bug, reproduza a falha antes da correção e execute depois. Se o objetivo for apenas testar e o bug exigir produção fora do escopo, apresente a evidência e mantenha a correção pendente.
- Execute os testes afetados e checks pertinentes. Diferencie falha preexistente, introduzida e ambiente indisponível. Não alegue cobertura sem coletar métrica.

## Artefatos e conclusão

Em IMPLEMENTAÇÃO, mantenha business-rules.md e test-report.md quando úteis ao tamanho da tarefa; em alvo único, atualize somente suas seções. Em projetos extensos, use test-plan.md por domínio com estado do código, dependências e pendências, continuando lotes autorizados sem gate repetido.

Entregue rastreabilidade comportamento → teste → resultado, o que foi mantido/corrigido/adicionado e lacunas justificadas. Nos modos sem escrita, apresente esses artefatos na resposta. Conclua com evidência de que os testes detectam o comportamento, não apenas de que arquivos existem.
