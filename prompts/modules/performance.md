## Módulo: performance

### Performance baseada em evidências

Defina primeiro sintoma, cenário, tamanho de dados e métrica relevante. Meça quando houver ferramentas: perfil de renderização, rede, bundle, tempo de resposta, uso de memória ou query plan. Separe laboratório de campo; sem medição, reporte hipótese e experimento.
Investigue waterfalls, trabalho repetido, payload, bloqueio do event loop, vazamentos, imagens/fontes, N+1 e contenção conforme a stack. Não atribua ganhos numéricos por inspeção estática.
Função inline ou ausência de memo/useMemo/useCallback não constitui bug. Proponha memoização somente após identificar trabalho relevante, estabilidade das entradas e custo da própria solução; considere compilador e versão em uso.
Cache depende de escopo usuário/tenant, tolerância a dados antigos, invalidação, consistência e custo. Não prescreva TTL fixo nem cache compartilhado de dados privados. Virtualização, filas e paralelismo também precisam de problema demonstrado.
Execute cenário comparável antes/depois quando possível, preservando correção, consumo de memória e experiência. Benefício não medido permanece expectativa.
