# 🔧 Correção: Eventos Duplicados do Meta Pixel

## Problema Identificado

Múltiplos eventos `InitiateCheckout` sendo disparados em poucos segundos, causando contagem duplicada de "vendas" no Facebook.

## Solução Implementada

### Proteção Multicamadas

Implementei **4 camadas de proteção** para garantir que o evento seja disparado apenas uma vez:

1. **Estado Local do Componente** (`isProcessingCheckout`)
   - Bloqueia cliques enquanto processa

2. **Timestamp Local** (`lastCheckoutTime`)
   - Cooldown de 5 segundos entre cliques

3. **Flag Global no Window** (`window.__fbqCheckoutTracked`)
   - Persiste entre re-renders do React
   - Não é resetado quando o componente re-renderiza

4. **SessionStorage** (`fbq_checkout_tracked`)
   - Persiste mesmo com refresh da página
   - Cooldown de 5 segundos

### EventID Único

Cada evento agora inclui um `eventID` único para deduplicação no Facebook:
```javascript
window.fbq('track', 'InitiateCheckout', {
  // ... outros parâmetros
  eventID: 'checkout_1234567890_abc123', // ID único
});
```

O Facebook usa esse `eventID` para deduplicar eventos automaticamente.

## ⚠️ IMPORTANTE: Verificar Checkout Externo

O problema pode estar vindo do **checkout externo** (`pay.cakto.com.br`), não do seu site!

### Como Verificar

1. **Abra o DevTools do navegador** (F12)
2. **Vá na aba Network**
3. **Filtre por "facebook" ou "tr"**
4. **Clique no botão de checkout**
5. **Observe se há requisições para `facebook.com/tr` vindas de:**
   - `pequeno-craque.vercel.app` (seu site) ✅
   - `pay.cakto.com.br` (checkout externo) ⚠️

### Se o Checkout Externo Está Disparando Eventos

Se `pay.cakto.com.br` também está disparando `InitiateCheckout`, você precisa:

1. **Entrar em contato com o suporte do Cakto**
2. **Pedir para desabilitar o tracking do Meta Pixel no checkout**
3. **OU configurar para usar o mesmo `eventID` para deduplicação**

## Como Testar

1. Abra o site em modo anônimo
2. Abra o DevTools (F12) → Console
3. Clique no botão de checkout
4. Você deve ver no console:
   ```
   [Pixel] Disparando InitiateCheckout (proteções passaram)
   ```
5. Tente clicar novamente rapidamente
6. Você deve ver:
   ```
   [Pixel] Bloqueado: flag global ativa
   ```

## Configuração no Facebook

### 1. Verificar Eventos de Teste

1. Vá em **Facebook Events Manager**
2. Clique em **Eventos de teste**
3. Faça um teste de compra
4. Verifique se há apenas **1 evento `InitiateCheckout`** por clique

### 2. Configurar Deduplicação

1. Vá em **Configurações** → **Eventos**
2. Ative **Deduplicação de eventos**
3. Configure para usar `eventID` como chave de deduplicação

### 3. Verificar Conversões

1. Vá em **Configurações** → **Conversões**
2. **DESMARQUE** `InitiateCheckout` como conversão (se estiver marcado)
3. **MARQUE APENAS** `Purchase` como conversão

## Logs de Debug

Os logs no console ajudam a identificar qual proteção está bloqueando:

- `[Pixel] Bloqueado: já processando checkout` → Estado local
- `[Pixel] Bloqueado: muito rápido` → Timestamp local
- `[Pixel] Bloqueado: flag global ativa` → Flag global
- `[Pixel] Bloqueado: sessionStorage ativo` → SessionStorage

## Próximos Passos

1. ✅ Testar no ambiente de desenvolvimento
2. ✅ Verificar se o checkout externo está disparando eventos
3. ✅ Configurar deduplicação no Facebook
4. ✅ Desmarcar `InitiateCheckout` como conversão
5. ✅ Monitorar eventos de teste por 24h

