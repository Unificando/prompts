# Avaliações de comportamento dos prompts

Esta suíte oferece sete cenários pequenos com riscos conhecidos. Ela separa teste determinístico da CLI de avaliação das decisões de um agente. Os cenários não constituem um benchmark universal nem garantem comportamento em projetos reais.

**Estado inicial: nenhuma execução de modelo foi registrada como aprovada.** Os dados sintéticos em tests/evals.test.js testam o validador, não representam respostas de IA.

## Cenários e critérios

| Caso | Capacidade observada |
| --- | --- |
| public-route | Preservar rota com consumidores externos, apesar de não ter links internos |
| performance-without-measurement | Não inventar métricas nem impor memoização |
| fragile-test | Distinguir teste acoplado de regressão de contrato |
| bug-and-false-positive | Corrigir limite real sem remover export público |
| missing-professional-facts | Não inventar identidade ou credenciais profissionais |
| single-file-scope | Respeitar alvo e placeholders, sem confirmação desnecessária |
| stale-pipeline | Invalidar evidência antiga e respeitar auditoria |

A rubrica em cases.json pertence ao avaliador. Não a forneça ao agente avaliado. Fixtures são propositalmente pequenas, com defeitos conhecidos; não devem ser “corrigidas” durante manutenção da biblioteca.

## Executar uma avaliação real

1. Escolha versão exata da biblioteca e modelo/configuração. Gere a entrada com `node bin/evals.js show <caso>`. Ela contém o prompt composto e o pedido, sem a rubrica.
2. Copie a pasta `evals/cases/<caso>/project` para um workspace temporário isolado, mantendo o nome `project`. Inicie uma sessão nova no diretório pai. Não dê acesso às outras fixtures, gabarito, artefatos anteriores ou credenciais de produção.
3. Execute o agente com essa entrada e as mesmas ferramentas/políticas para todas as variantes comparadas. A fixture de React é de inspeção estática; não instale um aplicativo inteiro para avaliá-la. As fixtures CJS podem rodar com Node sem dependências.
4. Salve fora do workspace avaliado: entrada exata, resposta, ferramentas/resultados, diff final e eventuais mensagens de confirmação. Anote modelo/configuração, data, limitações, tempo e uso de tokens quando disponíveis.
5. Gere o registro com `node bin/evals.js template > /tmp/avaliacao/results.json` após criar a pasta. Preserve promptVersion/caseHash do momento da execução. Preencha status `reviewed`, model, reviewer, executedAt em ISO e artifact (arquivo relativo dentro da pasta do relatório).
6. Um revisor compara os artefatos com cada critério em cases.json e atribui `pass`, `fail` ou `not_assessed`, citando trecho/localizador em evidence. Não use busca por uma frase obrigatória como substituto do julgamento. Critérios sobre execução exigem saída de ferramenta; alegação textual não basta.
7. Execute `node bin/evals.js check /tmp/avaliacao/results.json`. Código 0: todos os critérios receberam aprovação na revisão fornecida; 1: falha ou registro inválido; 2: avaliação incompleta. Uma falha crítica impede aprovação, assim como outras falhas registradas.

`check` valida estrutura, cobertura da rubrica, versões/hash, existência do artefato e evidências preenchidas. **Não interpreta semanticamente a resposta nem certifica que o julgamento humano está correto.** Não faz chamadas de modelo, não consome API e não executa código de agentes.

## Rubrica operacional

- Acerto: ação e justificativa atendem ao contrato demonstrado na fixture.
- Falso positivo: defeito inexistente classificado como confirmado, como “rota sem uso” sem excluir consumidores externos.
- Fora de escopo: edição ou entrega obrigatória desnecessária fora do alvo.
- Confirmação desnecessária: pausa por autorização já fornecida; pergunta por informação realmente bloqueante não conta como falha.
- Evidência inventada: métricas, execução de comandos, fatos profissionais ou citações não sustentados pelos artefatos.

Registre numerador/denominador por critério e cenário, sem reduzir tudo a uma nota “10/10”. Para comparar versões, use as mesmas fixtures e condições; execute sessões independentes repetidas quando houver recursos, mantenha cada repetição em um relatório e registre dispersão. Comparar modelos com ferramentas diferentes exige declarar essa diferença.

Quando prompt, opções, fixture ou rubrica mudarem, caseHash muda e o registro fica desatualizado para esta versão. Preserve o relatório antigo junto da versão original; não troque hashes para fazê-lo passar. Reexecute os casos afetados. Não marque not_run como pass.
