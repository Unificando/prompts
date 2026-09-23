## Módulo: banco

### Persistência e consultas

Detecte banco/ORM, schema, migrations, índices, constraints e transações. Relacione a consulta a volume, seletividade, plano e comportamento; índice ausente não é automaticamente problema.
Investigue N+1, paginação, bloqueios, isolamento, integridade, cascatas, conexão e autorização/RLS quando aplicável. Não sugira EXPLAIN ANALYZE em comando mutante ou ambiente sensível sem avaliar seus efeitos.
Mudança de schema exige compatibilidade com dados existentes, backfill quando necessário e estratégia de implantação. Escreva migration local no escopo; não a aplique em produção sem pedido.
Teste constraints, transação e isolamento com fixtures sintéticas no banco de teste disponível. Não simule aprovação de plano/consulta sem execução; registre riscos de lock e dependências operacionais.
