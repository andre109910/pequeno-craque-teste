# 🔧 Guia: Configurar evento `begin_checkout` no GTM

## ✅ O QUE O CÓDIGO ESTÁ FAZENDO

O código dispara no `dataLayer`:
```javascript
{
  event: 'begin_checkout',
  sck: 'valor_do_sck',
  checkout_url: 'https://pay.cakto.com.br/vavodjb_676370?...'
}
```

## 📋 PASSO A PASSO NO GTM

### 1️⃣ VERIFICAR SE EXISTE UMA TRIGGER PARA `begin_checkout`

**Como fazer:**
1. No GTM, clique em **"Acionadores"** (Triggers) no menu lateral esquerdo
2. Procure por uma trigger chamada algo como:
   - `begin_checkout`
   - `InitiateCheckout`
   - `Checkout`
   - Ou qualquer trigger que escute eventos customizados

**Se NÃO existir, você precisa criar:**

#### Criar Trigger para `begin_checkout`:
1. Clique em **"Acionadores"** → **"Novo"** (ou botão "+")
2. Configure:
   - **Nome:** `begin_checkout` (ou `Trigger - begin_checkout`)
   - **Tipo:** **Evento personalizado** (Custom Event)
   - **Nome do evento:** `begin_checkout` (EXATAMENTE como está no código)
   - **Esta trigger é acionada em:** Todos os eventos personalizados
3. Clique em **"Salvar"**

---

### 2️⃣ VERIFICAR SE AS TAGS ESTÃO VINCULADAS À TRIGGER

**Como fazer:**
1. No GTM, clique em **"Tags"** no menu lateral esquerdo
2. Para cada tag que deve disparar no checkout (ex: Facebook, Stape, etc.):
   - Clique na tag
   - Verifique a seção **"Acionamento"** (Triggering)
   - Confirme se a trigger `begin_checkout` está selecionada

**Exemplo das tags que você viu no debug:**
- `01 | FB | InitiateCheckout` → Deve ter trigger `begin_checkout`
- `01 | SSW | InitiateCheckout` → Deve ter trigger `begin_checkout`
- `02 | FB | Purchase` → NÃO deve disparar em `begin_checkout` (só em Purchase)

**Se a tag NÃO estiver vinculada:**
1. Clique na tag
2. Na seção **"Acionamento"**, clique em **"+"** ou selecione a trigger `begin_checkout`
3. Clique em **"Salvar"**

---

### 3️⃣ TESTAR NO GTM PREVIEW

**Como fazer:**
1. No GTM, clique no botão **"Visualizar"** (Preview) no topo
2. Uma nova aba/janela abrirá
3. Digite a URL do seu site: `https://pequenocraqueemcasa.com.br`
4. Clique em **"Conectar"**
5. No site, clique no botão de checkout
6. **AGUARDE** (não feche a página imediatamente)
7. No GTM Preview, verifique:
   - **Eventos:** Deve aparecer `begin_checkout` na lista
   - **Tags:** Deve mostrar quais tags foram disparadas

**O que você deve ver:**
- ✅ Evento `begin_checkout` aparece na lista de eventos
- ✅ Tags vinculadas aparecem como "Disparadas" (Fired)
- ❌ Se aparecer como "Não disparadas", a trigger não está configurada corretamente

---

### 4️⃣ VERIFICAR VARIÁVEIS (OPCIONAL, MAS RECOMENDADO)

Se você quiser capturar o `sck` e `checkout_url` nas tags:

1. No GTM, clique em **"Variáveis"** no menu lateral
2. Verifique se existem variáveis para:
   - `sck` (do dataLayer)
   - `checkout_url` (do dataLayer)

**Se não existir, criar:**
1. Clique em **"Variáveis"** → **"Novo"** (ou botão "+")
2. Configure:
   - **Nome:** `sck` (ou `DLV - sck`)
   - **Tipo:** **Variável de camada de dados** (Data Layer Variable)
   - **Nome da variável da camada de dados:** `sck`
3. Repita para `checkout_url`

---

## ⚠️ PROBLEMAS COMUNS

### Problema 1: Evento não aparece no Preview
**Solução:**
- Verifique se o GTM está carregado na página (veja no console do navegador)
- Verifique se o evento está sendo disparado (abra o console e digite: `window.dataLayer`)
- Confirme que o nome do evento está EXATAMENTE como `begin_checkout` (case-sensitive)

### Problema 2: Tags não disparam mesmo com trigger configurada
**Solução:**
- Verifique se a tag está publicada (não apenas salva)
- Verifique se há condições adicionais na trigger que não estão sendo atendidas
- Verifique se a tag está em uma pasta que não está sendo processada

### Problema 3: Evento dispara mas tags não aparecem no Preview
**Solução:**
- Verifique se você está usando o GTM Preview na mesma página onde o evento foi disparado
- Aguarde alguns segundos após o clique (o GTM pode demorar para processar)
- Verifique se não há erros no console do navegador

---

## 🎯 CHECKLIST FINAL

Antes de testar, confirme:
- [ ] Trigger `begin_checkout` existe e está configurada como "Evento personalizado"
- [ ] Nome do evento na trigger é EXATAMENTE `begin_checkout`
- [ ] Tags que devem disparar estão vinculadas à trigger `begin_checkout`
- [ ] GTM Preview está conectado ao site
- [ ] Você clicou no botão de checkout e aguardou alguns segundos
- [ ] Evento `begin_checkout` aparece na lista de eventos no Preview

---

## 📞 SE AINDA NÃO FUNCIONAR

1. **Abra o console do navegador** (F12)
2. **Digite:** `window.dataLayer`
3. **Verifique** se o último item do array contém `event: 'begin_checkout'`
4. **Se não aparecer:** O problema está no código (me avise)
5. **Se aparecer mas não disparar no GTM:** O problema está na configuração do GTM (siga os passos acima)

