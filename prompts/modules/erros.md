## Módulo: erros

### Erros e estados observáveis

Rastreie falhas da origem ao consumidor: validação, timeout, indisponibilidade, cancelamento, conflito, autorização e exceção inesperada. Verifique loading, vazio, sucesso e recuperação.
Não engula erros nem mostre stack/secrets ao cliente. Preserve código/status e contexto útil em logs com correlação e sem dados sensíveis. Mensagens devem indicar ação possível.
Revise transações, atualização otimista, cleanup de efeitos e abort de requisições. Retries devem ser limitados e adequados à idempotência; diferencie falha de negócio de transporte.
Confirmação de ação destrutiva depende da reversibilidade e do contexto da interface, não de adicionar modais em toda interação. Valide falha representativa, recuperação e estado final.
