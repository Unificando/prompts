# Refatoração Faseada Autônoma

Conduza mudanças locais em lotes verificáveis, preservando comportamento público salvo alteração explicitamente solicitada. IMPLEMENTAÇÃO é o padrão; AUDITORIA e PROPOSTA não escrevem arquivos.

Fonte de composição: obtenha a versão completa pela CLI (`get refatoracao-faseada`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Entrada e preparação

Leia objetivo/alvo, instruções, git status/diff, stack, scripts e testes. Registre linha de base proporcional antes de refatoração ampla. Não exija varredura do repositório inteiro para alvo único.

Prepare plano por risco/dependência com critérios de aceitação. Continue no modo autorizado; pergunte somente por contrato ambíguo ou expansão necessária que não foi autorizada. CI/configuração local não é proibida quando fizer parte do pedido.

## Lotes possíveis

Selecione apenas os aplicáveis e ordene conforme dependências:

1. Limpeza de código comprovadamente sem uso; preserve rotas/exports/entrada dinâmica.
2. Duplicação com responsabilidade compartilhada; abstração precisa simplificar manutenção.
3. Separação de responsabilidades e dependências; preserve interfaces.
4. Integração e contratos entre camadas; valide entrada/saída e consumidores.
5. Segurança local: autorização, isolamento, validação e exposição de dados.
6. Performance com cenário e métrica; sem cache/TTL ou memoização prescritos por hábito.
7. Estados de erro, recuperação, cancelamento e feedback.
8. Ajustes compatíveis com versão do framework realmente utilizada.
9. Acessibilidade e descoberta de páginas públicas quando afetadas.
10. Testes/observabilidade e documentação dos contratos alterados.

Para detalhes de uma disciplina, obtenha o módulo correspondente de frontend/backend/fullstack com versão fixada; não carregue todos para uma mudança pequena. A versão utilizada deve constar do estado. Não é obrigatório executar dez lotes.

## Ciclo por lote

Observação → hipótese → verificação → mudança mínima → teste do comportamento → registro. Crie/ajuste proteção do comportamento junto da mudança, não apenas na última fase.

Se teste falhar, diferencie regressão, teste acoplado, novo contrato ou falha anterior. Corrija a causa; não reverta automaticamente uma mudança correta nem enfraqueça asserção. Se precisar reverter, remova apenas seu trecho do lote, preservando alterações anteriores e do usuário.

Em IMPLEMENTAÇÃO, registre em refactor-state.md: modo, escopo, versões/hash dos prompts usados, estado do código (HEAD + diff/arquivos relevantes), lotes, dependências, verificações e pendências. Sem Git, registre hashes dos arquivos relevantes. Se o código/prompt mudar, reavalie lotes afetados e dependentes; “concluído” não torna evidência permanente.

## Entrega

Resumo do comportamento preservado/alterado, lotes aplicados/propostos, evidências, checks e riscos residuais. Registre o que ficou fora do escopo com motivo. Nenhuma ação de deploy, publicação ou modificação de histórico está implícita.
