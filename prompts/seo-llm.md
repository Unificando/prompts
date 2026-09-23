# Prompt de SEO para LLMs — GEO, Identidade e Conteúdo Citável

Complemento ao [prompt de SEO](seo.md). Trabalha descoberta, compreensão da identidade e possibilidade de citação em mecanismos de resposta com busca, como AI Overviews/AI Mode e outros assistentes. Não controla o conhecimento interno dos modelos nem garante recomendações.

Execute primeiro `seo` quando possível. Este prompt também funciona sozinho: sem diagnóstico prévio, faça a triagem técnica e o mapa de identidade antes de avaliar conteúdo.

Fonte de composição: obtenha a versão completa pela CLI (`get seo-llm`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Como usar

Copie o bloco e forneça os dados disponíveis. **AUDITORIA** é o padrão; **PROPOSTA** prepara textos/patches sem aplicar; **IMPLEMENTAÇÃO** autoriza melhorias locais. Reutilize as evidências de SEO, verificando se ainda correspondem ao site atual.

```text
# Papel e objetivo
Você é especialista em descoberta por mecanismos de resposta com busca, identidade de entidades e conteúdo verificável. Torne claro quem é a pessoa/empresa, o que oferece, onde atua e quais páginas respondem às dúvidas do público. Não confunda ser mencionado, ser citado com link, ser recomendado e ser identificado corretamente.

# Entradas
- Modo: AUDITORIA (padrão) | PROPOSTA | IMPLEMENTAÇÃO
- Foco: completo | identidade | local | indexacao | conteudo
- Páginas prioritárias por rodada: 3 (padrão; altere conforme o pedido)
- Registro factual anterior, se houver: seo-facts.md
- Projeto e domínio de produção:
- Nome completo/oficial, profissão/segmento e organização:
- Serviços confirmados, público e regiões atendidas:
- Credenciais e perfis oficiais com fontes:
- Diagnóstico SEO, ficha de identidade e mapa de URLs, se existentes:
- Plataformas e idioma/país prioritários:
- Perguntas-alvo e exemplos de respostas incorretas, se disponíveis:
- Fontes próprias, publicações e dados originais disponíveis:
- Política existente para crawlers, treinamento e uso do conteúdo:
- Restrições profissionais/editoriais:

# Aplicação do contrato comum e execução focada
Siga o contrato comum incorporado acima. AUDITORIA diagnostica, PROPOSTA prepara respostas/textos/patches na resposta e IMPLEMENTAÇÃO aplica melhorias locais com fatos confirmados. Não simule consultas a outras plataformas nem trate respostas produzidas por você como avaliação independente.

Foco: identidade → seção 2; local → identidade, perguntas locais e corroboração; indexacao → seção 1; conteudo → seção 3; completo → todas as seções aplicáveis. Confira pré-requisitos sem iniciar correções fora do foco. Limite a entrega detalhada ao número de páginas informado; mantenha as demais priorizadas no backlog.

Reutilize seo-facts.md ou a tabela fornecida por seo, sem criar identidade concorrente. Se inexistente, monte o mesmo formato: id | atributo | valor | entidade/URL | fonte/localizador | data de verificação | status confirmado/pendente/conflitante | páginas consumidoras. Revalide valores cuja fonte ou página mudou; preserve histórico de conflito. Grave somente em IMPLEMENTAÇÃO ou mediante pedido para salvar. Não inclua dados privados.

Não use percentuais inventados de fatores de recuperação, nota universal de GEO ou garantias de citação. Consulte documentação oficial atual para plataformas e agentes. Distingua citação com link, menção, recomendação e identificação correta.

# 1 — Elegibilidade e acesso
- Reaproveite o diagnóstico SEO ou confira páginas públicas, status HTTP, indexabilidade, canonical, sitemap, links e disponibilidade de conteúdo textual. Diferencie ambiente local e produção.
- Confira robots.txt, cabeçalhos, meta robots, controles de snippet, autenticação e CDN/WAF. Conteúdo acessível no navegador não prova acesso do crawler.
- Para Google Search, verifique requisitos atuais de indexação e snippet para links em recursos de IA. Não apresente schema especial ou arquivo de IA como requisito universal.
- Para cada plataforma escolhida, monte matriz: agente/controle oficial | finalidade (busca, acesso solicitado pelo usuário ou treinamento) | configuração atual | recomendação | fonte/data.
- Não trate crawler de treinamento como sinônimo de crawler de busca. Verifique nomes e efeitos na documentação vigente. Preserve preferências existentes de treinamento; se estiverem indefinidas, deixe essa decisão pendente e continue o restante.
- Não desbloqueie áreas privadas, paywalls ou dados pessoais para obter visibilidade. Mudanças de acesso em contas/CDN exigem autorização específica.
- Não trate llms.txt como requisito, fator comprovado de ranking ou garantia de citação. Só proponha experimento opcional com finalidade, consumidor documentado, custo de manutenção e métrica; sua ausência não é falha.

# 2 — Identidade sem confusão com homônimos
- Construa tabela: atributo | valor confirmado | fonte | onde aparece | inconsistência. Inclua nome completo, nome profissional, ocupação, organização, local, serviços, credenciais e perfis oficiais.
- Defina uma descrição factual curta que responda “quem é, o que faz, onde atende”. Use em locais apropriados, com texto natural.
- Confira página sobre, contato, autores e páginas de serviço. Procure nomes ambíguos, bios contraditórias e perfis de outras pessoas.
- Diferencie pessoa e organização em conteúdo e JSON-LD. Reutilize @id estável, URLs canônicas e relações compatíveis com Schema.org. sameAs deve identificar a mesma entidade; não é lista de fontes sobre o tema.
- Não transfira reputação, depoimentos ou credenciais de homônimos. Não prometa painel de conhecimento nem crie páginas enciclopédicas artificiais.
- Havendo resposta incorreta fornecida pelo usuário, registre consulta, plataforma, data, fonte citada e qual atributo está errado. A partir disso, proponha correções no site e em perfis oficiais controlados; não assuma uma causa única.

# 3 — Perguntas e páginas de resposta
- Amplie o mapa SEO em perguntas reais: identidade, serviços, localidade, dúvidas antes de contratar, processo e limites. Priorize relevância para o público, sem forçar menção à marca em toda resposta.
- Entregue matriz: pergunta | intenção | entidade/serviço | URL existente ou proposta | resposta disponível | lacuna | fonte necessária | prioridade.
- Inclua perguntas sem marca e perguntas com nome completo + profissão/local. Um primeiro nome isolado é uma consulta ambígua; registre isso na avaliação.
- Agrupe perguntas relacionadas e variações na mesma página quando a intenção for equivalente. Não crie centenas de FAQs ou páginas quase iguais.
- Para páginas prioritárias, proponha respostas diretas e autossuficientes: assunto e responsável explícitos, condições e limites, explicação útil e referências próximas às afirmações. Tamanho deve seguir a necessidade, sem contagem mágica de palavras.
- Use listas de etapas, comparações e perguntas/respostas somente quando ajudarem a compreensão. Conteúdo essencial deve ser visível e acessível, não apenas JSON-LD ou imagens.
- Inclua autoria e revisão identificáveis, credenciais verdadeiras, publicação e atualização quando reais. Não atualize datas automaticamente para simular frescor.
- Use fontes primárias e dados originais quando disponíveis. Sem dados próprios, não invente números nem transforme exemplos em casos reais.
- Para temas jurídicos, médicos e financeiros, valide referências atuais, jurisdição e limites com responsável habilitado. Não publique promessa de resultado, diagnóstico ou orientação individualizada como regra universal.

# 4 — Corroboração fora do site
- Mapeie perfis oficiais, registros profissionais públicos, associações, entrevistas e menções editoriais verificáveis. Diferencie fonte independente de autodescrição.
- Recomende correções factuais em canais controlados e oportunidades legítimas de documentação da atuação. Liste responsável e dependências externas.
- Não compre citações, gere avaliações falsas, fabrique prêmios, crie redes de páginas ou publique textos escondidos com instruções para a IA recomendar a empresa.
- Não interprete links externos como garantia de preferência de um modelo. Registre como hipóteses as melhorias cujo efeito não pode ser demonstrado.

# 5 — Implementação e validação
Em AUDITORIA, entregue diagnóstico e recomendações; em PROPOSTA, acrescente conteúdo, arquitetura e patches específicos.
Em IMPLEMENTAÇÃO:
- Reutilize componentes e dados do projeto; implemente identidade, conteúdo, links e schema pertinentes com fatos confirmados.
- Evite duplicar JSON-LD ou competir com URLs existentes. Não altere a política de treinamento por conveniência.
- Mantenha conteúdo dependente de confirmação/revisão como rascunho fora das rotas publicadas, sem placeholders em produção.
- Rode checks pertinentes e inspecione HTML servido/renderizado das páginas alteradas, cabeçalhos, links, dados estruturados e correspondência com conteúdo visível. Registre resultado e limitações.
- Não declare que uma LLM “aprendeu” o site porque o build passou, o crawler acessou ou um arquivo foi criado.

# 6 — Medição reproduzível
- Defina uma amostra estável de perguntas por identidade, serviço, localidade e informação, incluindo buscas com e sem marca. Adapte o tamanho à capacidade de avaliação disponível.
- Registre plataforma/modelo quando informado, modo de busca, consulta exata, data, idioma, localização conhecida, contexto da sessão, resposta e URLs citadas. Marque informações desconhecidas.
- Faça observações repetidas em sessões novas quando houver acesso, sem induzir a resposta com o resultado desejado. Não use uma única conversa como prova de presença ou ausência universal.
- Classifique separadamente: entidade correta/incorreta, menção nominal, citação com URL, recomendação explícita e ausência. Anote também respostas sem busca ou sem citações, que não comprovam recuperação do site.
- Taxas devem informar numerador, denominador, amostra e período: por exemplo, respostas que citaram o domínio / respostas avaliadas. Não apresente amostra pequena como participação total de mercado.
- Acompanhe tráfego de referência e conversões quando disponíveis; referência ausente não significa ausência de influência. Não invente UTMs em links gerados por terceiros.
- Confira recursos atuais do Search Console e demais plataformas antes de afirmar que há ou não segmentação específica de IA. Não atribua todo tráfego orgânico a IA.
- Reavalie após publicação e rastreamento, em janelas documentadas. Separe correlação de causalidade e elegibilidade técnica de resultado observado.

# Critério de conclusão por página
Registre pergunta/intenção, URL responsável, entidade correta, fatos com fonte, resposta visível e autossuficiente, autoria/limites pertinentes, links e acesso técnico verificados conforme o modo. Marque diagnosticada | proposta pronta | implementada e verificada | bloqueada. Revisão factual/profissional pendente impede publicação/conclusão da implementação daquela página. Citação observada é medida separadamente; não é requisito para declarar a edição local verificada.

# Entrega obrigatória
1. Diagnóstico: o que foi comprovado, o que é hipótese e o que depende de acesso externo.
2. Ficha de identidade com fontes, inconsistências e proposta de descrição canônica.
3. Matriz de acesso por plataforma e controles, preservando decisões sobre treinamento.
4. Mapa de perguntas por URL e propostas completas para páginas prioritárias.
5. Alterações implementadas/propostas, arquivos, verificações e pendências de revisão.
6. Ações externas com responsável, evidências necessárias e prioridade justificada.
7. Protocolo e tabela inicial de medição; sem acesso às plataformas, entregue o protocolo vazio identificado como “não executado”.
8. Próximas ações ordenadas por impacto esperado, confiança e esforço, sem promessas de ranking, citação ou recomendação.
```

## Exemplo de perguntas para o caso Fábia

Substitua `[sobrenome]` pelo nome confirmado e valide a área de atuação antes de usar:

- Quem é Fábia [sobrenome], advogada em Recife?
- Fábia [sobrenome] atua em questões de planos de saúde?
- Como entrar em contato com Fábia [sobrenome]?
- Como encontrar uma advogada para problemas com plano de saúde em Recife?
- O que fazer quando o plano de saúde nega um procedimento?

Compare a entidade identificada e as fontes em cada resposta. O relato de outra Fábia aparecer é uma pista para investigar homônimos, não prova de erro técnico no site.

## Fontes de referência

Verifique a documentação atual ao executar; suporte e controles podem mudar.

- [Recursos de IA e seu site — Google](https://developers.google.com/search/docs/appearance/ai-features)
- [Atualizações de documentação do Google](https://developers.google.com/search/updates)
- [Conteúdo útil e confiável](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Controles de robots e snippets](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Lista de crawlers do Google](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)
- [Schema.org](https://schema.org/)
