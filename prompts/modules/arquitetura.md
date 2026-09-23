## Módulo: arquitetura

### Responsabilidades e reutilização

Mapeie responsabilidades, fronteiras, dependências e fontes de verdade. Identifique acoplamento que dificulta uma mudança concreta, ciclos e regras de negócio dispersas.
Compare custo de manter duplicação com o de abstrair: significado compartilhado, probabilidade de evolução conjunta, legibilidade e consumidores. Não imponha mínimo de ocorrências, máximo de linhas ou quantidade de flags como regra automática.
Preserve APIs públicas e comportamento. Extraia funções/componentes/serviços apenas quando simplificar; não introduza camada, interface, padrão ou biblioteca para satisfazer checklist.
Em NestJS, confira módulos, providers, exports, DI e escopos reais; em UI, separe estado, efeitos e apresentação quando houver benefício. Documente antes/depois e valide fronteiras afetadas.
