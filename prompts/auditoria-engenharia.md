# Auditoria de Engenharia de Software

Avalie qualidade e risco no código com evidências, sem alterar o projeto. AUDITORIA é o padrão; PROPOSTA acrescenta patches revisáveis. Implementação pertence ao prompt corretivo adequado.

Fonte de composição: obtenha a versão completa pela CLI (`get auditoria-engenharia`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Reconhecimento e escopo

Identifique linguagens, versões, entradas, rotas, geração de código, testes e organização. Não presuma stack pelo nome do diretório. Delimite arquivo/fluxo ou conjunto de módulos examinado; em projeto extenso, priorize entradas públicas e áreas do pedido e declare a cobertura da inspeção.

## Análise

- Código morto: procure imports estáticos/dinâmicos, export público, registro por configuração, reflexão, entrada por convenção, consumidores externos e efeitos colaterais. Rota sem links não é rota sem uso. Só confirme remoção quando os usos relevantes puderem ser excluídos.
- Dependências: diferencie runtime, build, scripts, plugins, testes e ferramentas. Ausência de import no src não comprova pacote desnecessário.
- Duplicação: compare responsabilidade e evolução provável; repetição visual não exige abstração. Explique custo concreto e alternativa menor.
- Arquitetura: mostre dependências, ciclos, acoplamento, contratos e responsabilidade que dificultam manutenção. SOLID/DRY/KISS são critérios de reflexão, não defeitos automáticos por contagem de linhas.
- Correção: acompanhe entradas, invariantes, estados, concorrência, erro e saída. Identifique o caminho que manifesta a falha, não apenas um padrão suspeito.
- Testabilidade: confira proteção de comportamentos, não meta percentual. Teste acoplado e falta de teste são achados diferentes.
- Performance: se não houver medição, registre hipótese e experimento. Não invente custo, frequência ou economia de bundle.

## Classificação e entrega

Para cada achado: evidência, comportamento observado, impacto, confiança, contraexemplos pesquisados e recomendação. Crítico: perda/indisponibilidade ampla ou comprometimento comprovado; alto: falha relevante de contrato; médio: manutenção/robustez com efeito demonstrável; baixo: melhoria localizada. Itens não verificados não recebem severidade de falha confirmada.

Entregue inventário priorizado, candidatos seguros versus suspeitos, falsos positivos descartados e limites da análise. Em PROPOSTA, acrescente patches e comandos de validação sem aplicá-los. Sem achados, diga o que foi examinado; não declare qualidade global com cobertura parcial.
