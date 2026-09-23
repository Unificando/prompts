# Criação de AGENTS.md Padronizado

Crie ou reconcilie um guia curto, factual e autossuficiente para trabalhar no projeto. IMPLEMENTAÇÃO é o padrão; o único arquivo final alterado por esta disciplina é AGENTS.md no escopo solicitado.

Fonte de composição: obtenha a versão completa pela CLI (`get agents`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## REGRAS INVIOLÁVEIS

- Leia instruções existentes antes de escrever, incluindo guias nos diretórios abrangidos pelo alvo. Não sobrescreva regras específicas de outro escopo ao consolidar o guia. Preserve convenções locais e decisões do usuário; não apresente regras desta biblioteca como ordens superiores.
- README é uma fonte, não prova absoluta. Confira comandos em scripts/configuração/CI e registre divergências. Não invente porta, stack, comando ou prática.
- Não embuta políticas rígidas sem relação com o projeto nem copie este prompt inteiro para AGENTS.md. O guia deve orientar, não impedir trabalho autorizado.
- Nunca inclua valores de .env/secrets ou dados privados. Registre variáveis por nome e finalidade somente quando necessário.
- Evidência factual pode ser arquivo:linha, comando e resultado ou documentação identificada. Inferências úteis devem ser rotuladas, não proibidas nem transformadas em fatos.

## PROMPT 1: Bootstrap

1. Mapeie propósito, stack/versão, diretórios relevantes, scripts reais, testes, convenções, restrições e integrações. Confira package manager e ambiente de teste.
2. Extraia regras específicas verificadas e classifique sua origem: regra explícita do projeto/usuário, convenção consistente observada ou preferência ainda não confirmada. Código legado, duplicação e problemas existentes não viram regras só por aparecerem no repositório. Registre convenções observadas como tais; não invente intenção histórica nem promova preferência do agente a obrigação. Onde documentação divergir do código, descreva a divergência; não execute comandos destrutivos para “testar” instruções.
3. Escreva um guia com: contexto; comandos e pré-requisitos; fluxo de trabalho; convenções específicas; segurança de dados; referências à documentação existente; mapa curto de prompts complementares quando pertinentes. Comandos essenciais, limites e critérios de conclusão devem estar no próprio AGENTS.md, sem exigir baixar outro prompt para começar uma tarefa comum.
4. Inclua princípios comuns de trabalho em linguagem do projeto: preservar escopo/mudanças anteriores, verificar hipótese antes de editar, autorização persistente, validação proporcional e diagnóstico de testes quebrados. Use critérios de responsabilidade para abstrair, sem número mínimo universal de repetições.
5. CI/configuração local pode ser editada quando solicitada; secrets e ações externas têm limites próprios. Não transforme toda alteração de CI em report-only.
6. Não inclua regra de migration/seed, RLS, reindexação ou API se a infraestrutura não existir. Quando existir, cite a fonte e o procedimento local seguro; produção precisa de pedido específico.

## Comportamento a incorporar ao guia gerado

Adapte as orientações abaixo ao projeto, sem copiar o contrato inteiro nem impor ferramentas inexistentes:

- **Antes de editar:** entenda o pedido, leia o alvo e procure implementação/testes existentes. Preserve mudanças anteriores e faça a menor alteração suficiente. Não transforme uma correção localizada em auditoria ou refatoração global.
- **Decisões e dúvidas:** resolva escolhas locais reversíveis com base no contexto e registre suposições relevantes. Pergunte quando faltar informação que determine requisito, comportamento público ou decisão difícil de reverter; não pergunte por uma alteração de contrato que o usuário já definiu. Continue tarefas independentes enquanto aguarda.
- **Autonomia:** conclua o trabalho autorizado, incluindo verificações pertinentes. Não encerre apenas com um plano quando o pedido for implementar. Autorizações já concedidas continuam válidas; consultar um prompt não amplia o escopo nem cria uma nova obrigação de aprovação.
- **Validação:** use os comandos reais e o alcance proporcional à mudança. Investigue testes quebrados antes de alterar código ou asserção. Diferencie regressão, fragilidade do teste, contrato alterado e falha preexistente. Se faltar uma verificação essencial, entregue o avanço com essa pendência explícita, sem declarar o resultado integralmente validado.
- **Comunicação:** explique decisões relevantes e bloqueios de forma breve. Ao concluir, informe o que mudou, o que foi verificado e o que permanece pendente. Não imponha um relatório extenso para toda tarefa nem esconda falhas para declarar sucesso.
- **Limites:** preserve dados sensíveis e trabalho alheio. Commit, publicação e ações externas seguem o pedido específico; nenhuma referência documental autoriza essas ações por si só.

## Documentação de apoio

Inclua links relativos apenas para documentos existentes e relevantes, por exemplo arquitetura, desenvolvimento, contratos e regras de negócio. Para cada referência, diga o que consultar e em qual situação. Não copie capítulos inteiros para AGENTS.md nem crie links para arquivos que ainda serão gerados.

Mantenha no guia o mínimo necessário para iniciar o trabalho, mesmo sem acesso aos documentos complementares. Se a documentação divergir do código, registre a divergência: não declare automaticamente que comportamento atual é o requisito correto. Gere/reconcilie docs/ com documentacao somente quando essa entrega for solicitada; este prompt continua alterando apenas AGENTS.md.

## PROMPT 2: REVISÃO/RECONCILIAÇÃO

Se AGENTS.md existir, use este fluxo em vez de sobrescrever.
Compare cada orientação operacional com arquivos atuais. Monte tabela regra → evidência → manter/atualizar/remover/pendente. Atualize seções comprovadamente desatualizadas preservando instruções locais ainda válidas. Divergência de preferência sem evidência deve ser perguntada; não bloqueie correções independentes.

## Prompts complementares por situação

Referências aos prompts que o usuário utiliza são um guia de escolha, não uma lista de execução obrigatória. Inclua apenas IDs aplicáveis ao projeto e disponíveis no catálogo verificado; não liste toda a biblioteca. Para cada referência, informe situação de uso, prompt/módulo, modo/escopo e como obtê-lo no ambiente conhecido.

Exemplos para adaptar, não copiar indiscriminadamente:

| Situação | Orientação |
| --- | --- |
| Correção pequena de UI ou lógica | Siga diretamente o guia e as convenções locais; não carregue uma auditoria completa. |
| Investigação de performance de UI solicitada | Consulte frontend, módulo performance, no modo e alvo compatíveis com o pedido. |
| Trabalho amplo em camada ou integração | Escolha frontend, backend ou fullstack e os módulos pertinentes; não execute todos. |
| Ampliação ou revisão de testes | Consulte testes ou testes-e2e conforme nível e risco; preserve alvo único quando indicado. |
| Geração/reconciliação de documentação | Consulte documentacao; o destino é docs/, sem substituir AGENTS.md. |
| Trabalho de busca orgânica ou local | Consulte seo; complemente com seo-llm quando descoberta em respostas de IA fizer parte do objetivo. |

Incorpore ao guia uma orientação equivalente a:

> Consulte os prompts complementares quando o pedido exigir aquela disciplina ou seu uso contribuir diretamente para a tarefa. Preserve escopo e autorização existentes. Não execute etapas adicionais apenas porque aparecem no prompt. Para tarefas simples, siga diretamente as instruções deste projeto.

Prefira o conteúdo já fornecido na sessão ou uma cópia local conhecida. Quando precisar buscar pela CLI, use versão exata verificada e modo/módulo pertinentes. Não invente versão, caminho ou instalação; não recarregue a biblioteca a cada edição. Registre a origem usada quando necessário para reproduzir um procedimento.

Se um prompt opcional estiver indisponível, prossiga com as instruções locais e evidências suficientes para a tarefa; indique a limitação quando relevante. Se o usuário exigir explicitamente aquele procedimento e o conteúdo não estiver acessível, deixe somente a parte dependente pendente. Não improvise seu texto nem trate indisponibilidade de um complemento como bloqueio de todo o projeto.

## Revisão do guia gerado

Confira se um agente consegue iniciar uma correção comum apenas com AGENTS.md e os arquivos do projeto. Remova dependências obrigatórias de prompts externos para operações básicas, regras duplicadas e recomendações sem gatilho claro. Verifique que preferências não confirmadas não viraram ordens, referências existem e o guia diferencia trabalho entregue de validação pendente.

## Conclusão

Confira caminhos, comandos documentados, ausência de dados sensíveis e consistência interna. Comando não executado deve ser identificado; não execute publicação/migração só para validar o texto. Entregue seções criadas/atualizadas, evidências e pendências. Não faça segunda auditoria global automática após uma reconciliação suficiente.
