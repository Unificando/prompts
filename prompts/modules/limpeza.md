## Módulo: limpeza

### Código morto e referências

Inventarie símbolos, imports, dependências, estilos, rotas e exports candidatos. Antes de remover, confira entrada por convenção do framework, import dinâmico, registries, reflexão, scripts, testes, Storybook, consumidores externos e APIs públicas.
Uma rota sem links internos pode receber acesso direto, indexado ou externo. Não declare página “nunca acessada” sem telemetria. Endpoint não precisa ser importado pelo cliente para existir. CSS dinâmico e side effects também exigem verificação.
Classifique confirmado sem uso / suspeito / necessário. Remova apenas o primeiro grupo em IMPLEMENTAÇÃO, preservando contratos; dependência removida pede lockfile coerente e verificação do build/caminho afetado.
Entregue evidência dos consumidores pesquisados, limites da busca e teste da remoção. Linhas removidas não equivalem a bytes economizados no bundle.
