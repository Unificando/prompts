# Pipeline Completo — Orquestrador

Execute somente as disciplinas necessárias ao objetivo. IMPLEMENTAÇÃO é o padrão para o orquestrador; cada filho respeita seus modos suportados. AUDITORIA e PROPOSTA do pipeline não autorizam escrita por filhos.

Fonte de composição: obtenha a versão completa pela CLI (`get pipeline`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Planejamento e autorização

Identifique pedido, alvo, stack, scripts, relatórios e dependências. Monte plano curto com fase, prompt, módulos, modo e critério de conclusão. Continue dentro do escopo já autorizado; não peça “posso continuar?” ao fim de cada fase.

Se o pedido for apenas diagnóstico, não converta achados em autorização para corrigir. Se for correção/implementação, a triagem prioriza o escopo autorizado; novas funcionalidades e ações externas ficam separadas. Ambiguidades relevantes pedem esclarecimento, sem bloquear tarefas independentes.

## Composição e versões

1. Escolha uma versão exata da biblioteca instalada/disponível e registre-a. Nos exemplos abaixo, substitua <versão> por esse valor; não execute placeholder literalmente.
2. Leia `npx @unificando/prompts@<versão> inspect <id>` e registre versão do prompt, contrato, SHA-256 e dependências.
3. Busque `npx @unificando/prompts@<versão> get <id> --mode <modo> --module <módulos> --scope "<alvo>"`. Omita --module para disciplinas sem módulos. Use o modo suportado adequado; auditorias de segurança/engenharia permanecem sem implementação.
4. Não misture versões silenciosamente entre fases. Se não houver rede, use cópia local verificada da mesma versão; sem conteúdo disponível, deixe só essa dependência bloqueada. Não improvise o prompt ausente.

## Disciplinas disponíveis

- Diagnóstico de engenharia/segurança quando necessário; relatórios anteriores só valem após verificar evidências e estado do código.
- frontend/backend/fullstack: escolha camada e módulos pertinentes, evitando duplicação. refatoracao-faseada é alternativa para trabalho amplo, não obrigação adicional.
- testes: prepare proteção do comportamento antes/junto das correções arriscadas; execute depois. Não adie todos os testes para o fim.
- E2E: setup-e2e se faltar runner; auditoria-testid se faltarem seletores estáveis; testes-e2e para jornadas elegíveis; ci-e2e quando integração CI estiver no escopo. Ausência de CI não impede propor sua criação se solicitada.
- revisao-copy para texto; agents para guia de trabalho quando pedido.
- seo e depois seo-llm para presença orgânica/IA quando pertinente, com registro factual e URLs compartilhados. Não execute todas as disciplinas por padrão.

## Estado e retomada

Em IMPLEMENTAÇÃO, crie/atualize pipeline-state.md. Nos demais modos, apresente estado na resposta salvo pedido para salvá-lo. Campos mínimos:

- Objetivo, modo, escopo e autorizações relevantes (incluindo quais ações externas, se houver).
- Versão exata do pacote, prompt/contrato, hash de inspect, módulos e opções de cada fase.
- Identidade do código: HEAD quando houver Git, diff do trabalho local e hashes dos arquivos relevantes incluindo não rastreados; não grave secrets no estado.
- Fases com dependências e status: pendente, em andamento, concluída, bloqueada ou desatualizada.
- Entrada/saída de cada fase, evidências, comandos, resultados, limitações, arquivos e relatórios.
- Decisões e pendências com responsável; etapa seguinte concreta.

Na retomada, compare versões/opções, código e pré-condições. Mudança em arquivo relevante, contrato, prompt ou dependência invalida a evidência afetada e suas fases dependentes. Marque desatualizada e revalide o necessário sem refazer fases independentes. Apenas HEAD não detecta alterações não commitadas; data do relatório não comprova validade.

Uma fase com verificação essencial bloqueada não fica “concluída e validada”: registre entregue com validação pendente ou mantenha bloqueada conforme o critério. Não invente hashes/comandos executados.

## Fechamento

Consolide entregas, checks, pendências e risco residual. Separe resultado local de ações externas/produção. Sem terminal, forneça comandos e artefatos propostos para execução manual e identifique a limitação; não alegue execução.
