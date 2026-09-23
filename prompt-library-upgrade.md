# Evolução da biblioteca de prompts

Objetivo: contratos coerentes, módulos selecionáveis e qualidade verificável, preservando os IDs existentes.

- [x] Definir contrato comum e metadados de versão, modos, entradas, saídas e dependências.
- [x] Criar testes da composição, seleção, validação de argumentos e catálogo antes da CLI.
- [x] Reescrever prompts antigos, modularizar frontend/backend/fullstack e eliminar regras contraditórias.
- [x] Adicionar foco, limite de páginas, registro factual e critérios de conclusão a SEO/GEO.
- [x] Atualizar pipeline com versões fixadas, evidências e invalidação de fases.
- [x] Criar cenários de avaliação comportamental, rubrica e ferramenta de conferência de resultados.
- [x] Atualizar README, changelog e distribuição; executar testes e verificar pacote instalado isoladamente.

Conclusão: todos os IDs funcionam, seleções inválidas falham sem saída parcial, prompts compostos são autossuficientes e nenhum resultado de avaliação de modelo é alegado sem execução documentada.

## Verificação realizada

- 36 testes passaram em Node.js v24.14.0.
- `npm run validate`: 16 prompts válidos; sintaxe dos três arquivos da CLI conferida.
- `git diff --check`: sem erros de whitespace.
- Pacote 2.0.0 gerado e instalado offline em pasta temporária; composição de módulo, catálogo e cenários conferidos na instalação.
- Avaliações de respostas de modelos: infraestrutura pronta, nenhuma execução registrada; não há alegação de ganho comportamental medido.
- Publicação não executada.
