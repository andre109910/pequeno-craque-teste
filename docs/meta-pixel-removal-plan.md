## Meta Pixel - plano para remover código direto (manter via GTM)

Objetivo: remover qualquer instalação direta do Meta Pixel e deixar apenas via Google Tag Manager.

### Passos que já funcionaram
1) Remover (ou não carregar) o módulo `src/lib/metaPixel.ts`.
2) Remover o componente `src/components/MetaPageView.tsx`.
3) Remover a tipagem `src/types/facebook-pixel.d.ts`.
4) Garantir que não haja `fbq('init'|'track'|'trackCustom'|fbevents.js)` em nenhum arquivo (.ts/.tsx/.js/.html).
5) Não alterar GTM, dataLayer, Visitor/Stape/CAPI nem checkout externo.

### Resultado esperado
- Pixel só dispara via GTM.
- Meta Pixel Helper mostra origem: Google Tag Manager.

### Como aplicar novamente (resumo)
- Deletar os três arquivos acima.
- Confirmar com `rg "fbq\\("` que não restou código direto.
- Commitar e dar push.

Este arquivo é apenas referência; o código atual está com o Meta Pixel direto restaurado após o revert.

