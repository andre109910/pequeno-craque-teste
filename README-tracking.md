# 📊 Relatório de Auditoria de Tracking - Meta Pixel

**Data:** 2024  
**Projeto:** Pequeno Craque em Casa  
**Domínio:** pequeno-craque.vercel.app  
**Checkout:** Externo (pay.cakto.com.br)

---

## A) AUDITORIA - Onde o Pixel é Carregado

### 1. Carregamento do Pixel

**Localização:** `index.html` (linha 23-35)
- **Método:** Script direto no `<head>`
- **Pixel ID:** `845934771662991`
- **Status:** ✅ Único ponto de carregamento (após refatoração)

**Antes da refatoração:**
- Script carregava e inicializava automaticamente
- Disparava `PageView` no carregamento inicial
- **Problema:** Em SPA, não disparava PageView em mudanças de rota

**Depois da refatoração:**
- Script apenas carrega `fbevents.js` (sem inicializar)
- Inicialização feita via módulo React (`src/lib/metaPixel.ts`)
- PageView disparado via componente `MetaPageView` em mudanças de rota

### 2. Outros Scripts de Tracking

**UTMify** (`index.html` linha 38-55):
- Pixel ID: `693f3b6a44ff38fb120d64c9`
- **Status:** ✅ Separado, não interfere com Meta Pixel

**GTM (Google Tag Manager):**
- **Status:** ❌ Não encontrado no código

---

## B) Onde Cada Evento é Disparado

### 1. PageView

**Antes:**
- `index.html:34` - Disparado no carregamento inicial apenas

**Depois:**
- `src/components/MetaPageView.tsx` - Dispara em mudanças de rota (SPA)
- `src/lib/metaPixel.ts:trackPageView()` - Usa `trackOnce` para evitar duplicatas
- **Proteção:** Uma vez por rota/pathname

### 2. ViewContent

**Localização:** `src/components/landing/PricingSection.tsx:27-53`
- **Método:** IntersectionObserver quando seção de preços é visualizada
- **Refatorado para:** `trackViewContent()` do módulo centralizado
- **Proteção:** Uma vez por conteúdo (usando `trackOnce`)

### 3. InitiateCheckout

**Localização:** `src/components/landing/PricingSection.tsx:166-249` (onClick do botão)
- **Refatorado para:** `trackInitiateCheckout()` do módulo centralizado
- **Proteção:** 
  - `trackOnce` por rota (sessionStorage)
  - EventID único para deduplicação no Facebook
  - Estado local do componente para evitar múltiplos cliques

### 4. Purchase

**Status:** ❌ **NÃO DISPARADO NO SITE**
- **Motivo:** Checkout é externo (pay.cakto.com.br)
- **Implementação:** `trackPurchase()` bloqueia se `CHECKOUT_EXTERNO=true` e sem `orderId` válido
- **Comportamento:** Apenas dispara se houver rota interna de confirmação com `order_id` na URL

---

## C) Suspeitas de Duplicidade (RESOLVIDAS)

### ✅ Problemas Identificados e Corrigidos:

1. **PageView duplicado em SPA**
   - **Problema:** Disparava apenas no carregamento inicial, não em mudanças de rota
   - **Solução:** Componente `MetaPageView` rastreia mudanças de rota

2. **InitiateCheckout com proteções complexas**
   - **Problema:** Múltiplas camadas de proteção manuais, código duplicado
   - **Solução:** Centralizado em `trackInitiateCheckout()` com `trackOnce`

3. **Falta de módulo centralizado**
   - **Problema:** Código de tracking espalhado, difícil de manter
   - **Solução:** Módulo único `src/lib/metaPixel.ts`

4. **Purchase não bloqueado**
   - **Problema:** Não havia proteção explícita contra Purchase no site
   - **Solução:** `trackPurchase()` bloqueia por padrão quando checkout é externo

---

## D) Arquivos Alterados

### Criados:
- ✅ `src/lib/metaPixel.ts` - Módulo centralizado de tracking
- ✅ `src/components/MetaPageView.tsx` - Componente para PageView em SPA
- ✅ `README-tracking.md` - Este arquivo (auditoria)

### Modificados:
- ✅ `index.html` - Script do Pixel apenas carrega, não inicializa
- ✅ `src/main.tsx` - Inicializa Pixel via módulo
- ✅ `src/App.tsx` - Adiciona componente MetaPageView
- ✅ `src/components/landing/PricingSection.tsx` - Usa módulo centralizado

### Removidos:
- ❌ Nenhum arquivo removido (apenas refatorado)

---

## E) Configuração

### Constantes no Módulo (`src/lib/metaPixel.ts`):

```typescript
const META_PIXEL_ID = '845934771662991';
const CHECKOUT_EXTERNO = true;
const ROTA_THANKYOU_INTERNA = false; // Não existe
```

### EventID para Deduplicação:

Todos os eventos importantes incluem `eventID` único:
- `InitiateCheckout`: `ic_{timestamp}_{random}`
- `Purchase`: `purchase_{orderId}_{timestamp}` (se houver)

---

## F) Validação no Browser

### Meta Pixel Helper:

1. **PageView:**
   - ✅ Deve aparecer 1x ao carregar a página
   - ✅ Deve aparecer 1x ao mudar de rota (se houver rotas)

2. **ViewContent:**
   - ✅ Deve aparecer 1x ao visualizar seção de preços

3. **InitiateCheckout:**
   - ✅ Deve aparecer 1x por clique no botão
   - ✅ Não deve aparecer em múltiplos cliques rápidos

4. **Purchase:**
   - ✅ **NÃO deve aparecer no site** (checkout externo)

---

## G) TODOs Pendentes

1. **Verificar checkout externo:**
   - [ ] Confirmar se `pay.cakto.com.br` está disparando Purchase corretamente
   - [ ] Verificar se checkout externo também dispara InitiateCheckout (pode causar duplicidade)

2. **Se houver rota interna de confirmação no futuro:**
   - [ ] Criar rota `/obrigado` ou `/thankyou`
   - [ ] Implementar `trackPurchase()` com `order_id` da URL
   - [ ] Atualizar `ROTA_THANKYOU_INTERNA = true` no módulo

3. **Monitoramento:**
   - [ ] Configurar deduplicação no Facebook Events Manager usando `eventID`
   - [ ] Verificar se `InitiateCheckout` está marcado como conversão (deve ser desmarcado)
   - [ ] Apenas `Purchase` deve estar marcado como conversão

---

## H) Resumo das Mudanças

### O que foi REMOVIDO/NEUTRALIZADO:

1. **Inicialização automática do Pixel no HTML:**
   - Removido `fbq('init', ...)` e `fbq('track', 'PageView')` do `index.html`
   - Script agora apenas carrega `fbevents.js` (sem inicializar)

2. **Código duplicado de tracking:**
   - Removido código manual de `window.fbq('track', ...)` espalhado
   - Centralizado em módulo único

3. **Proteções manuais complexas:**
   - Removidas flags globais e sessionStorage manuais
   - Substituídas por `trackOnce()` do módulo

### O que foi ADICIONADO:

1. **Módulo centralizado:** `src/lib/metaPixel.ts`
2. **Componente de PageView:** `src/components/MetaPageView.tsx`
3. **Proteção contra Purchase:** Bloqueio automático quando checkout é externo
4. **EventID único:** Para deduplicação no Facebook

### O que foi MANTIDO (sem alterações visuais):

- ✅ Layout e animações
- ✅ Copy e textos
- ✅ Estrutura do funil
- ✅ UX e interações

---

## I) Próximos Passos

1. ✅ Testar no ambiente de desenvolvimento
2. ✅ Verificar eventos no Meta Pixel Helper
3. ⏳ Verificar se checkout externo está disparando eventos duplicados
4. ⏳ Configurar deduplicação no Facebook Events Manager
5. ⏳ Monitorar por 24-48h após deploy

