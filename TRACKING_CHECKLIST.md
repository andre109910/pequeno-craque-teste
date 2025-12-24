# ✅ Checklist de Tracking - Meta Pixel

**Data:** 2024  
**Status:** ✅ Implementado

---

## 1. Onde o Pixel Está Carregado

### ✅ Único Ponto de Carregamento

- **Arquivo:** `index.html` (linha 23-35)
- **Método:** Script direto no `<head>`
- **Comportamento:** Apenas carrega `fbevents.js`, não inicializa
- **Inicialização:** Via módulo React (`src/lib/metaPixel.ts`)

### ✅ Módulo Centralizado

- **Arquivo:** `src/lib/metaPixel.ts`
- **Funções principais:**
  - `initMetaPixel()` - Inicializa o pixel
  - `track()` - Dispara evento genérico
  - `trackOnce()` - Dispara evento apenas uma vez (sessionStorage)
  - `trackPageView()` - PageView por rota
  - `trackViewContent()` - ViewContent por conteúdo
  - `trackInitiateCheckout()` - InitiateCheckout por rota
  - `trackPurchase()` - Purchase bloqueado se checkout externo

---

## 2. Como Validar no Browser

### Meta Pixel Helper

1. **Instalar extensão:** [Meta Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)

2. **Testar PageView:**
   - ✅ Abrir o site → Deve aparecer 1x `PageView`
   - ✅ Recarregar a página → Deve aparecer 1x `PageView` (não duplicado)
   - ✅ Navegar para outra rota (se houver) → Deve aparecer 1x `PageView` por rota

3. **Testar ViewContent:**
   - ✅ Scroll até seção de preços → Deve aparecer 1x `ViewContent`
   - ✅ Scroll novamente → Não deve aparecer duplicado

4. **Testar InitiateCheckout:**
   - ✅ Clicar no botão de checkout → Deve aparecer 1x `InitiateCheckout`
   - ✅ Clicar novamente rapidamente → Não deve aparecer duplicado
   - ✅ Verificar no console: `[MetaPixel] Evento disparado: InitiateCheckout`

5. **Testar Purchase:**
   - ✅ **NÃO deve aparecer no site** (checkout externo)
   - ✅ Se aparecer, há problema no código

### Console do Browser (DevTools)

**Logs esperados (apenas em desenvolvimento):**
```
[MetaPixel] Script carregado com sucesso
[MetaPixel] Pixel inicializado: 845934771662991
[MetaPixel] Evento disparado: PageView
[MetaPixel] Evento disparado: ViewContent
[MetaPixel] Evento disparado: InitiateCheckout
```

**Se evento já foi disparado:**
```
[MetaPixel] Evento já foi disparado, pulando: InitiateCheckout key: ic_/
```

---

## 3. Lista de Arquivos Alterados

### ✅ Criados:

1. `src/lib/metaPixel.ts`
   - Módulo centralizado de tracking
   - Todas as funções de tracking
   - Proteções contra duplicidade

2. `src/components/MetaPageView.tsx`
   - Componente para rastrear PageView em mudanças de rota
   - Usa React Router `useLocation()`

3. `README-tracking.md`
   - Relatório completo de auditoria
   - Documentação de onde cada evento é disparado

4. `TRACKING_CHECKLIST.md`
   - Este arquivo (checklist de validação)

### ✅ Modificados:

1. `index.html`
   - Script do Pixel apenas carrega `fbevents.js`
   - Removido `fbq('init')` e `fbq('track', 'PageView')`

2. `src/main.tsx`
   - Adicionado `initMetaPixel()` na inicialização

3. `src/App.tsx`
   - Adicionado componente `<MetaPageView />`

4. `src/components/landing/PricingSection.tsx`
   - Refatorado para usar `trackViewContent()` e `trackInitiateCheckout()`
   - Removido código manual de tracking
   - Simplificado onClick do botão

### ❌ Removidos:

- Nenhum arquivo removido (apenas refatorado)

---

## 4. TODOs Pendentes

### 🔴 Críticos (Fazer antes de produção):

- [ ] **Verificar checkout externo:**
  - [ ] Abrir DevTools → Network → Filtrar "facebook" ou "tr"
  - [ ] Clicar no botão de checkout
  - [ ] Verificar se `pay.cakto.com.br` está disparando eventos
  - [ ] Se sim, verificar se está duplicando `InitiateCheckout` ou `Purchase`

- [ ] **Configurar deduplicação no Facebook:**
  - [ ] Acessar Facebook Events Manager
  - [ ] Configurações → Eventos → Ativar deduplicação
  - [ ] Configurar para usar `eventID` como chave de deduplicação

- [ ] **Verificar conversões no Facebook:**
  - [ ] Configurações → Conversões
  - [ ] **DESMARCAR** `InitiateCheckout` como conversão (se estiver marcado)
  - [ ] **MARCAR APENAS** `Purchase` como conversão

### 🟡 Importantes (Fazer após deploy):

- [ ] **Monitorar eventos por 24-48h:**
  - [ ] Verificar se há eventos duplicados no Events Manager
  - [ ] Comparar número de `InitiateCheckout` vs `Purchase`
  - [ ] Se `Purchase` estiver dobrado, verificar checkout externo

- [ ] **Testar em produção:**
  - [ ] Fazer compra de teste
  - [ ] Verificar eventos no Meta Pixel Helper
  - [ ] Confirmar que Purchase não aparece no site

### 🟢 Opcionais (Melhorias futuras):

- [ ] **Se criar rota interna de confirmação:**
  - [ ] Criar rota `/obrigado` ou `/thankyou`
  - [ ] Implementar `trackPurchase()` com `order_id` da URL
  - [ ] Atualizar `ROTA_THANKYOU_INTERNA = true` no módulo

- [ ] **Adicionar testes automatizados:**
  - [ ] Testes unitários para `metaPixel.ts`
  - [ ] Testes de integração para eventos

---

## 5. Validação Rápida

### ✅ Checklist Rápido (5 minutos):

1. **Abrir site em modo anônimo**
2. **Abrir Meta Pixel Helper**
3. **Verificar:**
   - [ ] PageView aparece 1x
   - [ ] ViewContent aparece 1x ao scroll
   - [ ] InitiateCheckout aparece 1x ao clicar
   - [ ] Purchase NÃO aparece

4. **Abrir Console (F12)**
5. **Verificar logs:**
   - [ ] `[MetaPixel] Script carregado`
   - [ ] `[MetaPixel] Pixel inicializado`
   - [ ] `[MetaPixel] Evento disparado: ...`

6. **Clicar no botão 2x rapidamente**
7. **Verificar:**
   - [ ] InitiateCheckout aparece apenas 1x
   - [ ] Console mostra "Evento já foi disparado" na segunda vez

---

## 6. Problemas Conhecidos e Soluções

### ❌ Problema: Purchase duplicado

**Causa provável:** Checkout externo também dispara Purchase

**Solução:**
1. Verificar se `pay.cakto.com.br` está disparando Purchase
2. Se sim, contatar suporte do Cakto para:
   - Desabilitar tracking do Meta Pixel no checkout
   - OU configurar para usar mesmo `eventID` para deduplicação

### ❌ Problema: InitiateCheckout duplicado

**Causa provável:** Checkout externo também dispara InitiateCheckout

**Solução:**
1. Verificar se `pay.cakto.com.br` está disparando InitiateCheckout
2. Se sim, contatar suporte do Cakto para desabilitar

### ❌ Problema: PageView não aparece em mudanças de rota

**Causa provável:** Componente `MetaPageView` não está funcionando

**Solução:**
1. Verificar se `MetaPageView` está no `App.tsx`
2. Verificar se React Router está configurado corretamente
3. Verificar logs no console

---

## 7. Contatos e Recursos

### Documentação:

- **README-tracking.md** - Relatório completo de auditoria
- **src/lib/metaPixel.ts** - Código do módulo (comentado)

### Recursos Externos:

- [Meta Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
- [Facebook Events Manager](https://business.facebook.com/events_manager2)
- [Documentação Meta Pixel](https://developers.facebook.com/docs/meta-pixel)

---

## 8. Status Final

- ✅ Módulo centralizado implementado
- ✅ Proteções contra duplicidade implementadas
- ✅ PageView em mudanças de rota implementado
- ✅ Purchase bloqueado no site (checkout externo)
- ✅ EventID único para deduplicação
- ⏳ Validação no browser (pendente)
- ⏳ Configuração no Facebook (pendente)
- ⏳ Monitoramento pós-deploy (pendente)

**Próximo passo:** Validar no browser usando Meta Pixel Helper

