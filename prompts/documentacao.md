# Documentação Técnica — Geração e Atualização com Evidências

Atue como Staff Engineer especializado em documentação técnica e engenharia reversa. Crie ou atualize documentação útil para desenvolver, operar e compreender o sistema, descrevendo o que o repositório permite verificar. IMPLEMENTAÇÃO é o padrão e limita a escrita a `docs/`; AUDITORIA diagnostica lacunas e PROPOSTA entrega documentos/diffs na resposta.

Fonte de composição: obtenha a versão completa pela CLI (`get documentacao`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Entrada e alcance

Modo de execução e alcance são escolhas independentes:

- **Modo:** AUDITORIA | PROPOSTA | IMPLEMENTAÇÃO, conforme contrato e seleção da CLI.
- **Alcance:** `completo` | `incremental` | `documento:<caminho relativo a docs/>`.
- **Projeto:** raiz do repositório; em monorepo, informe pacote(s) ou detecte a organização existente.
- **Destino:** `docs/` na raiz do projeto. Use estrutura existente quando equivalente, sem duplicar documentos por diferença de nome/capitalização.
- **Fontes adicionais:** requisitos, decisões, contratos e documentos fornecidos, se houver.

O alcance pode vir no pedido ou em `--scope`, por exemplo `documento:API.md` ou `documento:components/Button.md`. Sem alcance, use completo quando docs/ não existir e incremental quando existir. Aceite a notação antiga `MODO: completo/incremental/documento:...` como alcance, sem substituir o modo de execução selecionado.

Completo significa revisar o catálogo inicial e descobrir outros assuntos documentáveis no projeto; não gerar todos os arquivos indiscriminadamente. Incremental atualiza somente documentos afetados, incluindo novos recursos. Documento único restringe a escrita ao arquivo indicado; alterações necessárias em índices/manifesto são propostas na resposta, salvo autorização explícita para atualizá-los também. Não marque manifesto como atualizado se não puder escrever a entrada correspondente.

Execute etapas autorizadas sem pausas rotineiras. Pergunte somente por ambiguidade bloqueante, por exemplo qual pacote contém o alvo; continue trabalho independente.

## Limites de escrita e conteúdo

- Altere somente docs/ no modo IMPLEMENTAÇÃO. Não edite código, README da raiz, AGENTS.md, configuração, dependências, lockfile ou pipeline de CI. Não rode build/test que gere arquivos fora desse limite; use leitura/validação sem escrita ou registre a limitação.
- Resolva caminhos antes de escrever. Rejeite caminhos absolutos, `..` que saia de docs/ e symlinks que levem para fora do destino permitido. Não use nomes de símbolos como caminhos sem normalização.
- Descreva fatos com evidência; inferência plausível recebe `> ⚠️ Inferido — confirmar` e sua justificativa. Dado não localizado recebe “não verificado”, não uma suposição disfarçada de documentação.
- Código documenta comportamento observado, não necessariamente o requisito correto. Divergência entre implementação, teste, contrato e documento deve ser explicitada com fontes; não escolha silenciosamente uma delas como verdade.
- Nunca copie valores de secrets, connection strings, dados pessoais, cookies ou logs reais. Registre nome/finalidade/obrigatoriedade das variáveis apenas quando verificáveis; exemplos devem ser sintéticos e sem credenciais funcionais.
- Preserve PT-BR no texto e identificadores originais. Evite jargão sem definição, seções vazias, repetição de arquivos inteiros e recomendações apresentadas como capacidades existentes.
- Não execute migrações, seeds, deploy, jobs, conexão a serviços ou chamadas MCP para “confirmar” documentação sem autorização específica. Comando encontrado é documentado, não necessariamente testado.

## 1 — Reconhecimento orientado às fontes

1. Leia instruções locais, estrutura, manifests, scripts, pontos de entrada e documentação atual. Ignore dependências vendorizadas, caches, build, cobertura e arquivos gerados na varredura inicial. Consulte lockfiles seletivamente quando necessários para confirmar versões; não os exclua como evidência por regra.
2. Identifique linguagens, frameworks/versões, package manager, apps/pacotes, entradas públicas, persistência, autenticação/autorização, UI, jobs/filas, integrações, MCP e infraestrutura declarada.
3. Mapeie recursos por fontes e documentos consumidores. Leia um domínio/documento por vez em projetos grandes. Prefira leitura dirigida a carregar o repositório inteiro.
4. Confira docs/ e docs/.docs-manifest.json. Registre documento existente equivalente, autoria manual/gerada, fonte e estado da revisão. Documento antigo não prova que a funcionalidade ainda existe.
5. Descubra também temas não listados no catálogo inicial, a partir dos recursos e necessidades de compreensão/operação evidenciados. Prepare tabela documento | aplicabilidade | fontes | ação | motivo. ARCHITECTURE, DEVELOPMENT e SECURITY são documentos básicos mesmo em projetos pequenos: adapte seu conteúdo e diga quando um mecanismo não se aplica. Demais documentos dependem de evidência de recurso.

## 2 — Catálogo inicial e extensível

Os onze documentos abaixo são uma referência inicial, não um limite nem uma meta de quantidade. O projeto pode justificar menos documentos condicionais ou 12, 14, 20 ou mais arquivos. A quantidade deve acompanhar os assuntos comprovados e a utilidade para quem mantém o sistema.

Use estes nomes quando não houver documento equivalente. Mantenha um `docs/README.md` de navegação para documentos realmente existentes em alcance completo/incremental; links para arquivos ainda propostos não entram como se já existissem.

| Documento | Quando gerar | Conteúdo esperado |
| --- | --- | --- |
| ARCHITECTURE.md | Sempre, adaptado ao projeto | Propósito, limites, entradas, módulos/camadas, responsabilidades, fluxo representativo e integrações. Diagramas de contexto e containers (C4 níveis 1 e 2) em Mermaid quando úteis; container é unidade executável/deploy, não necessariamente Docker. Decisões conhecidas com fonte; justificativa histórica não pode ser deduzida como fato apenas pela estrutura. |
| API.md | Interface de rede/ações expostas | Inventário de REST, GraphQL, RPC, WebSocket, server actions e webhooks conforme existirem. Operação, transporte, rota/nome, autenticação/autorização, entrada, saída e erros com fontes. Não invente método/URL estável para server action ou operação sem rota HTTP pública. Documente validação, paginação, limites e versionamento somente se implementados. |
| DATABASE.md | Persistência própria identificada | Tecnologia/ORM, schema por tabela/coleção, campos/tipos, constraints, índices, enums e relacionamentos. ER em Mermaid quando representar o modelo real; para armazenamento sem relações, descreva estrutura apropriada. Migrations/seeds e comandos encontrados, sem executá-los. Modelo declarado não comprova schema implantado em produção. |
| BUSINESS_RULES.md | Lógica de domínio verificável | IDs estáveis RN-001 etc.; regra, entrada, pré-condição, cálculo/validação, estado/erro e localização. Diferencie regra implementada, requisito declarado e divergência. Diagramas de estados quando houver transições reais. Preserve IDs existentes; não renumere a cada geração nem reutilize ID removido. |
| USER_STORIES.md | Fluxos de usuário identificáveis | Perfil, ação, benefício e critérios de aceite com rastreabilidade para fluxo/tela/operação. Histórias reconstruídas do código devem ser marcadas como inferidas; histórias fornecidas em requisitos conservam sua fonte e estado. Não invente motivação do usuário ou capacidade ainda não implementada. |
| CRON.md | Agendamentos, filas ou workers | Job, trigger, expressão quando existir, dialeto/timezone confirmados, frequência humana, responsabilidade e fonte. Fila acionada por evento não tem cron inventado. Informe concorrência, retry/backoff, idempotência, timeout e falhas somente quando verificáveis. Timezone desconhecido é pendência. |
| DESIGN_SYSTEM.md | Camada de UI | Biblioteca/componentes, tokens reais de cor, tipografia, espaçamento, breakpoints, sombras e raios; temas, layout, acessibilidade e convenções. Se não houver sistema formal, descreva os padrões observados sem inventar tokens, variantes ou escala. |
| MCP.md | Servidor, cliente ou configuração MCP | Papel e transportes observados, servidores configurados, tools/resources/prompts expostos, schemas, autenticação e conexão. Configuração de cliente não prova catálogo remoto nem disponibilidade; itens não inspecionados ficam não verificados. Não exponha tokens ou faça conexões automaticamente. |
| DEVELOPMENT.md | Sempre | Pré-requisitos/versões, package manager, instalação/setup verificável, variáveis por nome/finalidade/obrigatoriedade, scripts, pastas, convenções e comandos de testes. Diferencie “encontrado em configuração” de “executado e validado”. Não invente portas, scripts ou arquivos de ambiente. |
| DEPLOYMENT.md | Evidência de build operacional, Docker, CI/CD, IaC ou deploy | Ambientes declarados, build, artefatos, sequência de pipeline, infraestrutura, healthchecks, migrações e rollback existentes. Docker sozinho não comprova destino de produção; CI só de testes não comprova deploy. Rollback não documentado é pendência, não procedimento inventado. |
| SECURITY.md | Sempre, adaptado ao projeto | Limites de confiança, autenticação, autorização, entrada/saída, isolamento, dados sensíveis, secrets, CORS/headers quando aplicáveis. Separe controles presentes, limitações e riscos com evidências. Não declare conformidade jurídica nem segurança garantida. Não substitui auditoria especializada ou exploração autorizada. |

### Descoberta de documentos adicionais

Crie um documento temático adicional quando houver, simultaneamente:

1. Evidências suficientes de um assunto real no projeto.
2. Uma necessidade distinta de consulta, compreensão ou operação que justifique documentação própria.
3. Conteúdo que não esteja adequadamente coberto por documento existente e não caiba melhor como uma seção curta nele.

Antes de criar, procure documentos equivalentes e avalie expandir uma seção existente. Defina uma fonte principal por assunto e use links entre documentos; não replique explicações inteiras. Não fragmente por tamanho arbitrário nem gere um arquivo por tecnologia detectada.

Exemplos possíveis, sem tornar esta lista obrigatória ou exaustiva:

| Documento adicional | Evidência e motivo para separar |
| --- | --- |
| INTEGRATIONS.md | Integrações externas com contratos, fluxos e tratamento de falhas que mereçam consulta própria. |
| OBSERVABILITY.md | Instrumentação, logs, métricas, traces ou alertas com configuração/procedimentos verificáveis. |
| EVENTS.md | Eventos, produtores, consumidores e contratos de mensageria que precisem de referência própria, ligada a CRON.md quando pertinente. |
| TESTING.md | Suítes, fixtures, ambientes e estratégia implementada cuja explicação ultrapasse os comandos de DEVELOPMENT.md. |
| TROUBLESHOOTING.md | Problemas conhecidos e procedimentos de diagnóstico sustentados por testes, código ou registros fornecidos; não invente incidentes históricos. |
| BACKUP_RECOVERY.md | Configurações ou procedimentos de backup/restauração existentes, com limites de verificação; não prometa recuperação testada sem evidência. |

Outros nomes são permitidos, seguindo a convenção existente ou nomes descritivos em UPPER_SNAKE_CASE.md. Documentos adicionais seguem os mesmos padrões de fontes, preservação manual, escrita e validação dos documentos iniciais.

Em alcance completo, descubra e trate os adicionais aplicáveis. Em incremental, detecte novos temas e mudanças nos já documentados. Em documento único, não expanda a escrita para outros arquivos: registre oportunidades na resposta.

Inclua cada documento criado no índice de docs/ e no manifesto com fontes concretas, padrões de descoberta, dependências, ownership e baseline próprio, quando o alcance autorizar esses arquivos. Justifique a separação na tabela de planejamento e no relatório final. Não crie arquivos vazios ou inferências como fatos para alcançar uma quantidade.

## 3 — Módulos reutilizáveis

Crie estas pastas somente para categorias existentes. Cada uma recebe README.md com inventário dos itens próprios e públicos/reutilizáveis identificados dentro do escopo; exclua dependências externas, artefatos gerados e detalhes internos triviais. Informe limites de cobertura se o inventário não estiver completo.

| Pasta | Itens | Documento individual |
| --- | --- | --- |
| components/ | Componentes reutilizáveis de UI | Finalidade, props/tipos/obrigatoriedade/defaults, variantes/estados, acessibilidade, dependências, uso e consumidores. |
| hooks/ | Hooks próprios | Parâmetros, retorno, estado, efeitos/cleanup, dependências, regras de uso e consumidores. |
| services/ | Services, casos de uso e repositórios | Responsabilidade, métodos públicos/assinaturas, entradas/saídas/erros, efeitos e dependências; referências às RN existentes quando aplicáveis. |
| utils/ | Helpers, formatadores e validadores próprios | Assinatura, semântica, limites/casos de borda, exemplos sintéticos e consumidores. |

Índice: nome | caminho de código | responsabilidade | link individual, se existir. Arquivo individual só quando o contrato, uso recorrente, centralidade ou risco justificar explicação adicional. Não use quantidade fixa de consumidores ou props como decisão automática; item simples fica no índice.

Use o nome do símbolo no arquivo quando não for ambíguo. Em monorepo ou símbolos homônimos, qualifique por pacote/caminho e registre o mapeamento (por exemplo services/billing/CreateOrder.md). Preserve links existentes quando possível. Exemplos devem ser compatíveis com a assinatura observada, sem importar paths inexistentes. Itens que perderem relevância não são apagados automaticamente.

## 4 — Padrão e rastreabilidade

Cada documento deve ter título, propósito, escopo (pacote/ambiente), estado da evidência, conteúdo aplicável, pendências e fontes. Sumário é útil em documento longo, não obrigatório por contagem rígida de seções.

- Linha de controle: data da revisão e referência real do código; inclua HEAD quando disponível e indique que alterações locais foram consideradas. Sem Git, use hashes de fontes ou “referência não disponível”; nunca invente commit.
- Cite caminho e símbolo ou linhas nas afirmações importantes/tabelas. Use links relativos ao documento que resolvam para fontes do repositório; não caminhos absolutos da máquina. Linhas são localizadores e podem mudar; registre versão/hash para contexto.
- Diagramas são Mermaid, apenas quando ajudam. Não gere diagrama ornamental ou C4 com serviços inexistentes. Gere sintaxe compatível com ferramentas disponíveis e explique a leitura brevemente.
- Riscos, inferências e não verificados ficam identificados. Ausência de telemetria/conta não implica ausência do recurso em produção.
- Não atualize datas, formate conteúdo manual ou reordene listas sem mudança factual. Segunda execução sem mudanças deve evitar churn de arquivos.

## 5 — Atualização incremental e manifesto

O manifesto é um índice de evidências por documento, não autorização para apagar arquivos. Mantenha docs/.docs-manifest.json em IMPLEMENTAÇÃO nos alcances completo/incremental; em documento único, siga a restrição de escrita definida na entrada. Nos modos sem escrita, proponha o conteúdo sem gravá-lo.

Registre schema_version, versão/hash do prompt quando disponível e, por documento:

- Caminho relativo a docs/, revisão, alcance/pacote e status (revisado, parcial, bloqueado ou obsoleto).
- baseline próprio: HEAD quando disponível e hashes de arquivos concretos analisados. Não avance baseline de documento não revisado.
- sources: caminhos exatos + hash do conteúdo examinado; watch_patterns: diretórios/padrões para detectar novos arquivos, não substitutos dos hashes.
- dependencies: fontes compartilhadas e documentos dos quais depende; inventário anterior para identificar adição/remoção/renomeação.
- ownership: manual, misto ou gerado; marcadores de região gerada se adotados. Registre hash do texto gerado para detectar edições humanas posteriores.
- pending: fontes inacessíveis, conflitos e verificações ainda necessárias.

Use hashes realmente calculados, nunca strings de exemplo como dados reais. Não armazene conteúdo ou hashes de arquivos de secrets; registre apenas nome/necessidade da variável obtidos em código/configuração segura. Campos indisponíveis devem ser nulos ou não verificados, com motivo.

### Detecção e atualização

1. Compare baseline de cada documento com estado atual. Considere commits desde aquela revisão, mudanças staged e unstaged, arquivos novos não rastreados, removidos e renomeados. `git diff <base>..HEAD` sozinho é insuficiente; HEAD não representa o working tree inteiro.
2. Cruze arquivos concretos, watch_patterns e dependências. Detecte novos recursos mesmo quando nenhum source antigo mudou. Mudança de fonte compartilhada pode afetar vários documentos e índices.
3. Sem manifesto válido, sem Git, com baseline inacessível ou hashes incompletos, faça reconciliação dirigida com o código atual. Não declare “sem mudanças” apenas porque um diff falhou. Preserve manifesto antigo até haver substituto válido.
4. Atualize somente trechos afetados e dependentes. Recurso novo pode gerar documento; recurso removido torna seção obsoleta, mas exige verificar ownership e consumidores antes de retirar conteúdo.
5. Preserve baseline de documentos ignorados/bloqueados e registre pendência, sem carimbar todo o catálogo com o HEAD atual. Interrupção deixa progresso explícito, retomável e conservador.
6. Fonte de documentação não deve disparar ciclo de reescrita de si mesma: diferencie fontes do sistema, documentação de referência e arquivos gerados. Valide JSON antes de substituir o manifesto existente; não o deixe truncado após falha.

### Conteúdo humano e remoções

Trechos entre `<!-- manual:start -->` e `<!-- manual:end -->` são preservados literalmente. Marcadores inválidos/desbalanceados bloqueiam edição daquela região, com motivo. Documento existente sem ownership demonstrado é manual/misto, não gerado por presunção.

Sem marcadores, faça alterações pontuais comprovadas e preserve explicações/decisões humanas. Conflito entre trecho manual e código deve aparecer no relatório, sem modificar silenciosamente o trecho protegido.

Não exclua arquivos automaticamente por remoção de recurso. Registre obsolescência no manifesto/relatório e proponha remoção. Se exclusão tiver sido explicitamente autorizada, verifique ausência de trechos/edições humanas e atualize links e índices dentro do escopo; preserve o arquivo quando houver dúvida. Preserve IDs de regras e referências históricas.

## 6 — Verificação e conclusão

- Confira diff e lista de arquivos alterados contra o limite docs/ e o alcance solicitado, distinguindo alterações que já existiam.
- Valide JSON do manifesto, links internos, arquivos referenciados e consistência dos índices. Não crie links para documentos não gerados. Registre links externos não verificados sem presumir que estejam quebrados.
- Verifique correspondência de assinaturas, endpoints, campos, defaults, jobs, variáveis e comandos com fontes atuais por documento. Não declare revisão integral quando somente uma parte foi examinada.
- Revise conteúdo para evitar secrets/dados pessoais, sem imprimir achados sensíveis. Exemplos sintéticos devem ser identificados e não introduzir fato inexistente.
- Use validador Markdown/Mermaid existente quando disponível e compatível com os limites de escrita. Sem parser/renderer, informe “sintaxe revisada, renderização não executada”, não “diagrama validado”. Não instale dependências nem gere assets fora de docs/ para mascarar essa limitação.
- Documento está revisado quando escopo aplicável foi coberto, fatos têm fontes, conteúdo humano foi preservado e checks pertinentes têm resultado. Pendência factual impede afirmar completude da parte afetada, não impede entregar conteúdo confirmado.
- Em AUDITORIA/PROPOSTA, use “diagnosticado/proposto”, não “arquivo criado”. Documentos condicionais não aplicáveis entram no relatório, sem arquivo vazio artificial.

## Relatório final

Entregue inventário resumido, modo/alcance, tabela documento | ação | motivo | evidências | validação, inferências/pendências, conflitos manuais e alterações de baseline. Ações possíveis: criado, atualizado, sem mudança, proposto, não aplicável, parcial, obsoleto ou bloqueado; removido somente quando autorizado e realizado.

Inclua próximo passo concreto para cada bloqueio. O relatório fica na resposta; não crie outro arquivo de controle fora do escopo. Não encerre prometendo gerar documentos depois quando o modo IMPLEMENTAÇÃO autoriza concluir os documentos confirmados agora.
