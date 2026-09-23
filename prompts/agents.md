# Criação de AGENTS.md Padronizado

Crie ou reconcilie um guia curto e factual para trabalhar no projeto. IMPLEMENTAÇÃO é o padrão; o único arquivo final alterado por esta disciplina é AGENTS.md no escopo solicitado.

Fonte de composição: obtenha a versão completa pela CLI (`get agents`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## REGRAS INVIOLÁVEIS

- Leia instruções existentes antes de escrever. Preserve convenções locais e decisões do usuário; não apresente regras desta biblioteca como ordens superiores.
- README é uma fonte, não prova absoluta. Confira comandos em scripts/configuração/CI e registre divergências. Não invente porta, stack, comando ou prática.
- Não embuta políticas rígidas sem relação com o projeto nem copie este prompt inteiro para AGENTS.md. O guia deve orientar, não impedir trabalho autorizado.
- Nunca inclua valores de .env/secrets ou dados privados. Registre variáveis por nome e finalidade somente quando necessário.
- Evidência factual pode ser arquivo:linha, comando e resultado ou documentação identificada. Inferências úteis devem ser rotuladas, não proibidas nem transformadas em fatos.

## PROMPT 1: Bootstrap

1. Mapeie propósito, stack/versão, diretórios relevantes, scripts reais, testes, convenções, restrições e integrações. Confira package manager e ambiente de teste.
2. Extraia regras específicas verificadas. Onde documentação divergir do código, descreva a divergência; não execute comandos destrutivos para “testar” instruções.
3. Escreva um guia com: contexto; comandos e pré-requisitos; fluxo de trabalho; convenções específicas; segurança de dados; mapa curto de prompts aplicáveis.
4. Inclua princípios comuns de trabalho em linguagem do projeto: preservar escopo/mudanças anteriores, verificar hipótese antes de editar, autorização persistente, validação proporcional e diagnóstico de testes quebrados. Use critérios de responsabilidade para abstrair, sem número mínimo universal de repetições.
5. CI/configuração local pode ser editada quando solicitada; secrets e ações externas têm limites próprios. Não transforme toda alteração de CI em report-only.
6. Não inclua regra de migration/seed, RLS, reindexação ou API se a infraestrutura não existir. Quando existir, cite a fonte e o procedimento local seguro; produção precisa de pedido específico.

## PROMPT 2: REVISÃO/RECONCILIAÇÃO

Se AGENTS.md existir, use este fluxo em vez de sobrescrever.
Compare cada orientação operacional com arquivos atuais. Monte tabela regra → evidência → manter/atualizar/remover/pendente. Atualize seções comprovadamente desatualizadas preservando instruções locais ainda válidas. Divergência de preferência sem evidência deve ser perguntada; não bloqueie correções independentes.

## Guia de prompts

Liste apenas IDs relevantes a partir do catálogo da biblioteca, indicando modo e escopo. frontend/backend/fullstack permitem módulos; testes/testes-e2e aceitam alvo único; seo → seo-llm compartilham fatos. Não incorpore toda a biblioteca ao guia.

## Conclusão

Confira caminhos, comandos documentados, ausência de dados sensíveis e consistência interna. Comando não executado deve ser identificado; não execute publicação/migração só para validar o texto. Entregue seções criadas/atualizadas, evidências e pendências. Não faça segunda auditoria global automática após uma reconciliação suficiente.
