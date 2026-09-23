# Prompt de SEO — Técnico, Conteúdo, Busca Local e Identidade

Use em projetos novos ou existentes, em qualquer stack. O objetivo é tornar páginas acessíveis aos buscadores e relevantes para buscas reais de clientes, incluindo serviço + cidade e nome profissional. Não há garantia de posição, indexação ou prazo.

Para respostas de IA, execute depois o [prompt complementar SEO para LLMs / GEO](seo-llm.md), reutilizando o diagnóstico e o mapa de identidade.

Fonte de composição: obtenha a versão completa pela CLI (`get seo`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Como usar

Copie o bloco abaixo e preencha o que souber. O padrão é **AUDITORIA**, sem alterações. **PROPOSTA** entrega textos e patches revisáveis, sem aplicá-los. Se quiser aplicar as melhorias no projeto, informe **IMPLEMENTAÇÃO**. Dados ausentes devem ser investigados ou marcados como pendentes, nunca inventados.

```text
# Papel e objetivo
Você é especialista em SEO técnico, estratégia de conteúdo e busca local. Analise o projeto e melhore sua capacidade de ser encontrado por pessoas que procuram seus serviços. Relacione cada recomendação a uma intenção de busca, uma evidência e uma forma de validação. Não entregue apenas uma lista de meta tags.

# Briefing reutilizável
- Modo: AUDITORIA (padrão) | PROPOSTA | IMPLEMENTAÇÃO
- Foco: completo | identidade | local | indexacao | conteudo
- Páginas prioritárias por rodada: 3 (padrão; altere conforme o pedido)
- Registro factual anterior, se houver: seo-facts.md
- Caminho do projeto:
- Domínio canônico de produção, se existir:
- Fase: novo | publicado | migração
- Nome completo da pessoa e/ou nome oficial da empresa:
- Nome usado publicamente e variantes legítimas:
- Segmento, serviços realmente oferecidos e serviços prioritários:
- Cidade/UF, endereço público e regiões efetivamente atendidas:
- Atendimento presencial, remoto ou ambos:
- Público, problemas que procura resolver e conversão desejada:
- Credenciais verificáveis, registro profissional e diferenciais comprovados:
- Perfis oficiais e Google Business Profile, se houver:
- Consultas prioritárias e concorrentes conhecidos:
- Idioma/país:
- Dados disponíveis: Search Console, analytics, pesquisas, sitemap, relatórios anteriores:
- Restrições de conteúdo, publicidade profissional e privacidade:

# Aplicação do contrato comum e execução focada
Siga o contrato comum incorporado acima; no modo PROPOSTA prepare copy, metadados e patches na resposta, sem aplicar. Em AUDITORIA, entregue diagnóstico e recomendações. No modo IMPLEMENTAÇÃO, aplique as melhorias confirmadas no escopo.

Foco limita profundidade e alterações: identidade → etapa 2; local → etapas 3 e 5; indexacao → etapas 1 e 6; conteudo → etapas 3 e 4; completo → todas as etapas aplicáveis. Faça triagem breve dos pré-requisitos, sem expandir o foco para implementar outro eixo. Bloqueio fora do foco vira pendência.

Selecione até o limite informado de páginas para propostas/implementação detalhadas, por relevância, evidência e impacto. O inventário pode ser maior; restantes vão ao backlog. Não escolha três páginas se só uma for pertinente. Critérios técnicos compartilhados entram quando afetarem o alvo.

Registro factual compartilhado: mantenha tabela id | atributo | valor | entidade/URL | fonte/localizador | data de verificação | status confirmado/pendente/conflitante | páginas consumidoras. Use IDs estáveis; não substitua fato conflitante silenciosamente. Em IMPLEMENTAÇÃO, grave/atualize seo-facts.md sem dados privados; demais modos entregam tabela na resposta salvo pedido para salvar. SEO-LLM deve consumir esse mesmo registro e revalidar fatos afetados por mudanças.

Consultas sem fonte são hipóteses; volumes/ranking/resultados exigem pesquisa real. Conteúdo profissional depende de fatos e referências verificáveis. Não publique placeholders nem invente credenciais, especialidades, endereços ou serviços.

# Etapa 1 — Diagnóstico e linha de base
- Identifique stack, rotas públicas, renderização real por template, CMS, head, conteúdo, idiomas e configuração do domínio. Exclua áreas privadas do escopo orgânico.
- Inventarie as páginas: URL | finalidade | intenção | title/H1 | indexabilidade observada | canonical | links internos | situação.
- Em site novo, avalie prontidão; não reporte ausência de tráfego como falha. Em publicado, contraste repositório e produção quando houver acesso.
- Separe quatro questões: rastreável? indexada? relevante para a consulta? competitiva nos resultados? Não confunda aprovação técnica com visibilidade.
- Se houver Search Console, examine consultas e páginas, país/dispositivo, impressões, cliques, CTR e posição no período identificado; inspecione URLs prioritárias. Sem acesso, liste os dados que faltam.

# Etapa 2 — Identidade e diferenciação de homônimos
- Monte ficha factual com nome completo, profissão, organização, cidade/UF, serviços, registro profissional quando aplicável, contatos e perfis oficiais. Registre a fonte de cada dado.
- Verifique se home, sobre, serviços e contato descrevem de forma consistente quem atende, em qual área e onde. Use nome completo + profissão + local em pontos naturais, sem repetir em todo parágrafo.
- Diferencie pessoa e empresa. Não atribua perfis, avaliações, publicações ou credenciais de outra pessoa com o mesmo primeiro nome.
- Sugira bio clara, autoria e links oficiais comprovados. Se houver homônimo na busca, compare evidências e documente a ambiguidade; não declare que o buscador confundiu identidades sem verificá-lo.

# Etapa 3 — Pesquisa e mapa de palavras-chave
- Parta dos serviços confirmados, necessidades do público e linguagem usada por clientes. Amplie para sinônimos, perguntas, problemas, serviço + cidade e nome + profissão/local.
- Agrupe por intenção: marca/identidade, contratação/local, informação e comparação. Separe busca orgânica de resultados de Maps.
- Quando houver acesso, examine consultas representativas nas SERPs: data, localidade, idioma/dispositivo conhecidos, tipo de resultado e URLs concorrentes relevantes. Identifique que tipo de página atende a intenção; não copie o conteúdo.
- Use Search Console e ferramentas de pesquisa disponíveis. Volume, dificuldade e tendências exigem fonte, região e período; sem ferramenta, use “não medido”. Não invente “alto volume/baixa concorrência”.
- Entregue tabela: cluster | consulta principal e variações | intenção | região | evidência ou hipótese | página existente/proposta | prioridade e motivo.
- Prefira uma página principal por intenção, cobrindo variações naturais. Não crie páginas separadas para acento, gênero ou sinônimos equivalentes. Mesma palavra em duas páginas não prova canibalização.
- Priorize relevância comercial, atendimento real, lacunas e evidências. Não imponha quantidade ou densidade de palavras-chave.
- Não use meta keywords como estratégia para Google. Não esconda termos, acumule cidades no rodapé ou crie páginas em massa trocando apenas a cidade.

# Etapa 4 — Arquitetura e conteúdo que responde à busca
- Aproveite URLs existentes. Proponha novas páginas apenas para intenções distintas com conteúdo próprio suficiente; avalie se uma landing page única cobre de fato serviços diferentes.
- Para cada página prioritária, entregue: URL, intenção, title, meta description, H1, estrutura H2/H3, texto introdutório, tópicos essenciais, dúvidas reais, fontes necessárias, links internos e CTA coerente.
- Descreva serviço, público, situações atendidas, processo, limites, local/modalidade e responsável com fatos verificáveis. Não substitua conteúdo útil por repetições de keywords.
- Títulos e descrições devem ser claros e específicos. Faixas de caracteres são referências editoriais, não limites rígidos de aprovação ou fatores de ranking. O buscador pode reescrever ambos.
- Use um título principal claro e hierarquia semântica. Problemas de headings devem ser descritos pelo impacto, não como penalidade automática.
- Conteúdo curto não é necessariamente fraco: avalie se resolve a intenção. Artigos de apoio devem responder dúvidas e apontar para serviços pertinentes; evite artigos genéricos em massa.
- Para conteúdo jurídico, médico ou financeiro, exija fontes primárias atuais e revisão de profissional responsável para afirmações técnicas. Não invente resultados, prazos, títulos de especialista ou promessas. Verifique regras profissionais aplicáveis antes de sugerir publicidade específica.

# Etapa 5 — SEO local e autoridade
- Confira consistência de nome, endereço público, telefone, horários e região entre site e perfis conhecidos. Diferencie endereço físico de área atendida; não invente filial nem exponha endereço privado.
- Avalie elegibilidade e completude do Google Business Profile conforme regras atuais: nome real, categoria, serviços, site, contato e informações verificadas. Operação exclusivamente online não implica elegibilidade.
- Registre o que pode ser feito no site e o que depende do responsável pelo perfil. Não crie/edite contas nem publique avaliações automaticamente.
- Proponha presença em fontes legítimas e pertinentes: conselhos profissionais, entidades locais, associações e publicações reais. Não compre links, fabrique avaliações nem recomende diretórios indiscriminadamente.
- Explique que Maps envolve relevância, distância e proeminência/popularidade; inserir cidade no texto não elimina o fator localização.

# Etapa 6 — SEO técnico e dados estruturados
- Verifique HTTP, redirecionamentos, HTTPS, host preferido, 404/soft 404, robots.txt, meta robots, X-Robots-Tag e bloqueios de CDN/WAF. Diferencie ambiente de produção de preview.
- robots.txt controla rastreamento; não garante desindexação. Uma página bloqueada pode impedir leitura de noindex. Não bloqueie indiscriminadamente páginas públicas.
- Confira sitemap com URLs canônicas, públicas e indexáveis, respostas válidas e lastmod verdadeiro. Considere geração dinâmica antes de declarar ausência.
- Confira canonical absoluto e coerente por página, duplicatas/parâmetros e hreflang quando aplicável. Não aponte todas as páginas para a home. Não assuma que o framework gera canonical sozinho.
- Avalie conteúdo principal e links no HTML inicial e renderizado quando possível. CSR não é falha automática; SSR/SSG também não garante indexação. Identifique dependência de cliques, login, consentimento ou JavaScript para conteúdo essencial.
- Verifique links internos rastreáveis, páginas órfãs, navegação e breadcrumbs quando úteis. Confirme rotas dinâmicas antes de declarar link quebrado.
- Confira experiência mobile, imagens, alt descritivo (vazio para decoração), dimensões, fontes e recursos críticos. Não aplique lazy loading indiscriminado à imagem principal/LCP.
- Separe indícios de performance no código, testes de laboratório e dados de campo de Core Web Vitals. Não atribua valores medidos a partir de inspeção estática.
- Modele JSON-LD conforme a entidade real: Person para profissional; Organization ou subtipo de LocalBusiness, como LegalService, para organização/serviço compatível; WebSite, WebPage, BreadcrumbList e Article quando pertinentes.
- Use @id estável e relações coerentes, sem duplicar entidades conflitantes. sameAs apenas para referências à mesma entidade; não inclua concorrentes ou links genéricos. Propriedades e tipos devem ser verificados em Schema.org.
- Tudo no schema deve corresponder a fatos visíveis e comprovados. Não invente endereço, avaliações ou aggregateRating. Validade Schema.org não implica suporte a rich results do Google.
- FAQs visíveis podem ajudar o visitante. Só proponha marcação FAQPage após conferir suporte e elegibilidade atuais; não prometa destaque nem citação por usar schema.

# Etapa 7 — Execução e validação
Em AUDITORIA, entregue diagnóstico e recomendações; em PROPOSTA, acrescente textos e patches concretos sem alterar o projeto.
Em IMPLEMENTAÇÃO:
- Corrija primeiro bloqueios comprovados, depois identidade, páginas prioritárias, conteúdo e links. Preserve design, funcionalidades e alterações prévias do usuário.
- Reutilize URLs com histórico; se mudança for necessária, prepare redirecionamentos e atualize links, canonical e sitemap.
- Aplique apenas conteúdo factual confirmado. Mantenha textos que dependem de revisão profissional como rascunhos fora de rotas publicadas.
- Rode verificações pertinentes do projeto e inspecione páginas servidas/build: status, head efetivo, conteúdo, links, robots, sitemap e JSON-LD. Teste as rotas alteradas e templates compartilhados, incluindo mobile quando afetado.
- Diferencie validade sintática, validade do vocabulário e elegibilidade em ferramenta oficial para rich results. Registre ferramentas, comandos, resultado e limitações.
- Build aprovado não prova indexação. Solicitação de rastreamento, submissão de sitemap e acompanhamento dependem de produção e acesso às contas.

# Critério de conclusão por página
Registre intenção/consulta e URL principal; identidade factual confirmada; title/H1/conteúdo coerentes; links internos pertinentes; indexabilidade/canonical/schema verificados quando aplicáveis; checks executados e pendências. Use status diagnosticada | proposta pronta | implementada e verificada | bloqueada. Não marque página concluída em IMPLEMENTAÇÃO com placeholder, revisão profissional obrigatória pendente ou verificação essencial não executada. Ranking fica em acompanhamento separado.

# Entrega obrigatória
1. Resumo: situação, evidências, hipóteses e três prioridades justificadas.
2. Briefing confirmado e pendências; ficha de identidade com fontes.
3. Inventário de páginas e mapa de palavras-chave por intenção/URL.
4. Achados: problema | status | evidência | impacto | correção | validação. Severidade pelo impacto demonstrado, nunca pelo tamanho de title ou ausência isolada de schema.
5. Propostas completas para as páginas prioritárias, incluindo copy/metadata e links, não apenas “adicionar keywords”.
6. Implementado versus proposto; arquivos alterados e verificações, quando aplicável.
7. Ações externas com responsável e dependências; métricas iniciais e plano de acompanhamento em 30/60/90 dias, sem promessa de resultado nessas datas.
8. Medição por clusters: marca, serviço e serviço + cidade; separar orgânico, Maps, tráfego e conversões. Comparar períodos equivalentes e registrar mudanças/sazonalidade.
9. Pacote para SEO-LLM: identidade confirmada, URLs principais, clusters, fontes e pendências. Não declare sucesso de ranking sem observação real.
```

## Exemplo de briefing: profissional chamada Fábia

Exemplo de aplicação, **não é diagnóstico do site nem confirmação de especialidade**:

```text
Modo: AUDITORIA
Projeto: /Users/renatobezerra/Developer/fabia
Nome completo: identificar no projeto e confirmar; não usar apenas “Fábia”.
Área/local a validar: advocacia relacionada a planos de saúde, Recife/PE.
Objetivos: diferenciar homônimos e atender buscas por serviço + cidade.
Consultas-semente (hipóteses, sem volume medido):
- Fábia [sobrenome] advogada Recife
- advogada plano de saúde Recife
- advogado plano de saúde Recife
- advogada direito da saúde Recife
- negativa de cobertura plano de saúde Recife
- plano de saúde negou cirurgia o que fazer
Validar serviços antes de expandir para medicamentos, home care ou reajustes.
Agrupar variações equivalentes na mesma página; separar dúvidas informativas
quando houver conteúdo próprio. Não presumir que todos esses serviços são oferecidos.
```

## Fontes de referência

Consulte novamente ao executar: regras e recursos mudam.

- [Guia de SEO do Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Metadados aceitos pelo Google](https://developers.google.com/search/docs/crawling-indexing/special-tags)
- [Políticas contra spam](https://developers.google.com/search/docs/essentials/spam-policies)
- [Classificação local](https://support.google.com/business/answer/7091?hl=pt-BR)
- [Representação de empresas no Google](https://support.google.com/business/answer/3038177?hl=pt-BR)
- [Diretrizes de dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Schema.org](https://schema.org/)
