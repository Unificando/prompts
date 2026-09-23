## Módulo: seguranca

### Segurança de aplicação

Mapeie superfícies e limites de confiança: entrada, autenticação, sessão, autorização por objeto/tenant, uploads, banco, saída e integrações. Confira abuso de custo, limites de payload e rate limiting contextual.
Busque caminhos exploráveis, não apenas nomes de APIs. Verifique parametrização, sanitização no contexto adequado, CSRF quando aplicável, XSS, SSRF, redirects, cookies e exposição de secrets.
Não confunda autenticação com autorização. Verifique que consultas e mutações restringem o recurso ao usuário/tenant correto; acesso negado também precisa de teste.
Não execute ataque, carga, rotação ou consulta em produção incidentalmente. Corrija localmente apenas escopo autorizado e use dados sintéticos em ambiente de teste. Relate localização de secret sem mostrar seu valor.
Dependência suspeita requer versão instalada e advisory verificado; sem ferramenta atual, mantenha como não verificado.
