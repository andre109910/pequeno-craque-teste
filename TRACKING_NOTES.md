# Notas sobre Tracking do Meta Pixel

## ⚠️ IMPORTANTE: Eventos e Conversões

### Eventos Implementados no Site

1. **PageView** - Disparado automaticamente no carregamento da página
   - Localização: `index.html` (linha 34)
   - Não conta como conversão

2. **ViewContent** - Disparado quando a seção de preços é visualizada
   - Localização: `src/components/landing/PricingSection.tsx` (linha 23)
   - Não conta como conversão
   - Proteção: Dispara apenas uma vez por sessão

3. **InitiateCheckout** - Disparado quando o usuário clica no botão de checkout
   - Localização: `src/components/landing/PricingSection.tsx` (linha 141)
   - ⚠️ **ATENÇÃO**: Este evento NÃO é uma conversão/venda
   - Proteção implementada:
     - Bloqueio de múltiplos cliques (2 segundos entre cliques)
     - Estado de processamento para evitar duplicatas
     - Verificação de timestamp

### Eventos de Conversão (Purchase)

O evento **Purchase** (venda real) deve ser disparado na página de confirmação do checkout externo (`pay.cakto.com.br`), **NÃO no site**.

Se o Facebook está contando mais vendas do que o normal, verifique:

1. **No Facebook Events Manager:**
   - Qual evento está configurado como "Conversão"?
   - Se `InitiateCheckout` está marcado como conversão, isso está ERRADO
   - Apenas `Purchase` deve ser marcado como conversão

2. **Na página de confirmação do checkout:**
   - O evento `Purchase` está sendo disparado corretamente?
   - O evento está sendo disparado apenas uma vez por compra?
   - O valor está correto?

3. **Possíveis problemas:**
   - Múltiplos disparos de `InitiateCheckout` (corrigido com proteção de cliques)
   - `InitiateCheckout` configurado como conversão no Facebook (configuração incorreta)
   - Evento `Purchase` sendo disparado múltiplas vezes na página de confirmação

## Proteções Implementadas

✅ Proteção contra múltiplos cliques no botão de checkout
✅ Debounce de 2 segundos entre cliques
✅ Estado de processamento para evitar duplicatas
✅ Feedback visual quando o botão está processando

## Como Verificar

1. Abra o **Facebook Events Manager**
2. Vá em **Test Events** ou **Eventos de Teste**
3. Teste o fluxo completo:
   - Carregar a página → Deve disparar `PageView`
   - Ver seção de preços → Deve disparar `ViewContent` (apenas uma vez)
   - Clicar no botão → Deve disparar `InitiateCheckout` (apenas uma vez por clique)
   - Completar compra → Deve disparar `Purchase` na página de confirmação

4. Verifique se `InitiateCheckout` está marcado como conversão:
   - Se sim, DESMARQUE (apenas `Purchase` deve ser conversão)

