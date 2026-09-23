# Auditoria de Segurança, Privacidade e Prontidão de Deploy

Avaliação estática e de evidências existentes. AUDITORIA é o padrão; PROPOSTA permite correções revisáveis. Nenhum modo deste prompt autoriza exploração ativa, carga, escrita no banco ou alterações de credenciais/produção.

Fonte de composição: obtenha a versão completa pela CLI (`get auditoria-seguranca`). Para uso manual, inclua o [contrato comum](shared/contract.md) no lugar do marcador abaixo.

{{CONTRACT}}

## Reconhecimento

Mapeie stack, versões, dados pessoais, autenticação, limites de confiança, endpoints públicos, integrações, persistência e infraestrutura declarada. Separe configurações no código de controles efetivamente verificados em produção.

## PROMPT 1 — Controles e prontidão

1. Frontend: XSS e contexto de saída, armazenamento de credenciais, exposição por bundle, mensagens de erro e autorização que depende apenas de UI.
2. Backend: validação de entrada, autenticação, sessão, autorização por objeto/tenant, parametrização, SSRF, uploads, CSRF quando aplicável, redirects e limites de consumo.
3. Dependências: versão instalada, advisory e condição de exploração. Consulte fonte atual; dependência desatualizada não comprova vulnerabilidade explorável.
4. Privacidade: inventário de coleta/finalidade, minimização, retenção, exclusão, logs, consentimento quando aplicável e direitos do titular. Não declare conformidade ou infração legal apenas pelo repositório; políticas e bases legais exigem contexto e revisão responsável.
5. Deploy: headers, TLS, backups/restauração, acesso, migrações, monitoramento, rollback e configuração de ambiente. Configuração não observada é não verificada, não ausente.

## PROMPT 2 — Modelagem de abuso

Faça esta segunda passada no mesmo escopo, consolidando duplicatas por referência ao primeiro achado.

- Secrets: localize referências e vazamentos sem imprimir valores. Git de leitura pode ajudar a verificar histórico; redija saídas antes de expor conteúdo. Proponha revogação/rotação quando exposição for confirmada e investigação quando incerta. Arquivo local ignorado sozinho não prova vazamento.
- Sessão: expiração, logout/invalidação, recuperação de senha, brute force, enumeração e troca de privilégio. Descreva pré-condição e caminho possível, sem executar ataques.
- Banco: visibilidade entre usuários/tenants, políticas RLS quando existentes, funções privilegiadas, buckets e consultas administrativas. Confira contexto de execução, não apenas presença da política.
- Input: SQL/NoSQL/command injection, traversal, desserialização, conteúdo de arquivos e URL controlada por usuário. Relacione origem, transformação e destino.
- Custo: IA, upload, e-mail/SMS, jobs e endpoints caros; autenticação, quotas, deduplicação, tamanho e timeout. Quantifique somente com fonte/tarifa/medição disponível; sem isso, indique vetor e limite a verificar.

## Evidência e entrega

Tabela: achado | estado da evidência | pré-condição | caminho afetado | impacto | prioridade | mitigação | teste seguro sugerido. Separe risco técnico, hipótese e questão jurídica/operacional pendente. Não trate string suspeita como exploração confirmada.

Entregue também controles não verificáveis com ferramenta/responsável necessário e patches somente em PROPOSTA. Nunca inclua secrets, dados reais de usuários ou instruções de ataque fora do escopo autorizado no relatório.
