# Revisão Ortográfica e UX Copy

Revise texto visível preservando significado, tom e idioma do produto. IMPLEMENTAÇÃO é o padrão e limita-se ao conteúdo, sem alterações de lógica.

Fonte de composição: obtenha a versão completa pela CLI (`get revisao-copy`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Escopo e inventário

Identifique textos em UI, arquivos de tradução, conteúdo e metadados do alvo. Exclua código, IDs, enum values, rotas e chaves de tradução do escopo de reescrita. Não transforme correção textual em redesign ou estratégia de marketing.

## Revisão

1. Corrija ortografia, gramática, concordância, pontuação e consistência terminológica com edições pontuais.
2. Melhore rótulos, instruções, estados vazios/erros e CTAs quando isso esclarecer uma ação real. Preserve voz da marca e precisão; não imponha sinônimos ou tamanho por gosto.
3. Remova redundância e frases genéricas somente se não perderem conteúdo útil. Não use percentual arbitrário de reescrita como critério de qualidade.
4. Preserve placeholders/interpolação, ICU plural/select, escapes, links, marcação e acessibilidade. Considere espaço disponível e gênero/plural; não traduza valores técnicos por acidente.
5. Conteúdo incompleto: preencha somente fatos confirmados no contexto. Informação ausente vira pendência; não invente benefícios, preço, depoimento, prazo, especialidade ou regra de negócio.
6. Conteúdo novo fora do pedido pode ser proposto separado. Se o usuário já solicitou criar/completar aquele conteúdo, essa autorização vale; não peça confirmação repetida.

## Verificação e entrega

Confira diff, sintaxe dos arquivos afetados, preservação de placeholders e renderização quando o comprimento/markup afetar UI. Rode checks proporcionais, sem exigir toda suíte para pontuação simples.

Entregue alterações relevantes com antes/depois, pendências factuais e validações. Não exponha longas listas de correções triviais quando um resumo bastar.
