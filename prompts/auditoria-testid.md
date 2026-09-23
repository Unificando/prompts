# Auditoria e Aplicação de data-testid

Estabilize os seletores necessários às jornadas no escopo. IMPLEMENTAÇÃO é o padrão; alterações devem ser aditivas e preservar comportamento e apresentação.

Fonte de composição: obtenha a versão completa pela CLI (`get auditoria-testid`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Reconhecimento

Leia convenções, testes e elementos do alvo. Priorize seletores semânticos estáveis (role/nome, label) quando adequados e compatíveis com o projeto. Use data-testid quando houver necessidade de identidade técnica estável, não como obrigação para cada nó do DOM.

Se um arquivo/fluxo foi nomeado, limite a ele. Em projeto extenso, divida por domínio e registre progresso sem exigir aprovação de cada lote autorizado.

## Aplicação

- Reutilize convenção de nomes existente; se ausente, defina nomes pelo domínio/ação, sem índices instáveis, timestamp, aleatoriedade, secrets ou dados pessoais.
- Detecte duplicação ambígua no mesmo contexto. IDs repetidos em coleções podem ser consultados com escopo estável; não force unicidade global sem necessidade.
- Confira componentes intermediários e forwarding de atributos. Não mude API pública, lógica, layout ou acessibilidade apenas para inserir seletor.
- Preserve seletores já usados. Renomeação necessária exige atualizar consumidores no escopo e validar os testes afetados.
- Verifique o atributo no DOM renderizado quando possível, além de sintaxe/build pertinente. Inspeção estática isolada não comprova forwarding em runtime.

## Entrega

Tabela componente/elemento → seletor → consumidor → ação → verificação. Em IMPLEMENTAÇÃO, grave testid-changes-report.md quando houver cadeia E2E dependente; atualize somente o alvo. Relatório inclui estado do código e limitações para que outro prompt possa verificar sua validade.
