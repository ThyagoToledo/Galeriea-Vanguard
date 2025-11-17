# 🚨 GUIA DEFINITIVO - Resolver Erro 500 no Upload

## Status Atual
✅ Código melhorado e enviado para GitHub
✅ Vercel com variáveis de ambiente configuradas
❌ **Erro 500 persistindo no upload**

## 🎯 Causa Mais Provável

Baseado na análise completa, o erro acontece porque:

### **O BANCO DE DADOS NÃO ESTÁ SINCRONIZADO**

O Neon está conectado mas as **tabelas não existem**. Quando você tenta fazer upload:
1. ✅ Cloudinary recebe a imagem
2. ✅ Imagem é processada
3. ❌ Prisma tenta salvar no banco → **ERRO: tabela 'Artwork' não existe**

## ✅ SOLUÇÃO COMPLETA (Passo a Passo)

### **Etapa 1: Configurar .env Local**

1. Edite o arquivo `.env` na raiz do projeto
2. Cole as URLs do Neon (pegue do Vercel):
   ```env
   POSTGRES_PRISMA_URL="postgresql://usuario:senha@ep-xxx.neon.tech/neondb?sslmode=require&pgbouncer=true"
   POSTGRES_URL_NON_POOLING="postgresql://usuario:senha@ep-xxx.neon.tech/neondb?sslmode=require"
   ```

**Como pegar do Vercel:**
- Acesse: https://vercel.com/dashboard
- Seu projeto → Settings → Environment Variables
- Clique em `POSTGRES_PRISMA_URL` → Copie o valor
- Clique em `POSTGRES_URL_NON_POOLING` → Copie o valor

### **Etapa 2: Sincronizar Banco de Dados**

```bash
bash sync-database.sh
```

Este script vai:
- ✅ Gerar Prisma Client
- ✅ Criar todas as tabelas no Neon (User, Artwork, Tag, etc.)
- ✅ Aplicar relacionamentos e índices

**OU execute manualmente:**
```bash
npx prisma generate
npx prisma db push
```

### **Etapa 3: Verificar Sincronização**

```bash
npx prisma studio
```

Isso abre interface web. Verifique se as tabelas foram criadas:
- ✅ User
- ✅ Artwork
- ✅ Tag
- ✅ ArtworkTag
- ✅ Collection
- ✅ CollectionArtwork
- ✅ Download

### **Etapa 4: Forçar Redeploy no Vercel**

Mesmo com banco sincronizado, o Vercel precisa reiniciar:

1. Acesse: https://vercel.com/dashboard
2. Clique no seu projeto
3. Vá em **Deployments**
4. No último deploy (o mais recente)
5. Clique nos **3 pontinhos** (⋯)
6. Clique em **"Redeploy"**
7. Marque **"Use existing Build Cache"** (mais rápido)
8. Clique em **"Redeploy"**

**Aguarde 1-2 minutos** para o deploy finalizar.

### **Etapa 5: Testar Novamente**

```bash
bash test-upload-production.sh
```

**OU acesse:**
https://galeriea-vanguard.vercel.app/upload

## 🔍 Se Ainda Der Erro

### **1. Verificar Logs do Vercel**

Com o código melhorado, os logs agora mostram o erro exato:

1. Acesse: https://vercel.com/dashboard
2. Seu projeto → **Deployments**
3. Último deploy → **"View Function Logs"**
4. Clique em **"Runtime Logs"**
5. Tente fazer upload novamente
6. Procure por linhas com:
   - `❌ Upload error:`
   - `Error message:`
   - Stack trace completo

### **2. Verificar Configuração do Prisma**

```bash
node diagnose.js
```

Deve mostrar:
- ✅ POSTGRES_PRISMA_URL configurado
- ✅ POSTGRES_URL_NON_POOLING configurado
- ✅ Conexão com banco estabelecida
- ✅ X artworks no banco

### **3. Testar Conexão Manual**

```bash
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.\$connect();
    console.log('✅ Conectado!');
    
    const count = await prisma.artwork.count();
    console.log('📊 Artworks:', count);
    
    await prisma.\$disconnect();
  } catch (e) {
    console.error('❌ Erro:', e.message);
  }
})();
"
```

## 📋 Checklist Final

- [ ] `.env` local com URLs do Neon configuradas
- [ ] Executei `npx prisma db push` com sucesso
- [ ] Verifiquei tabelas no `prisma studio`
- [ ] Variáveis de ambiente no Vercel (ALL environments):
  - [ ] POSTGRES_PRISMA_URL
  - [ ] POSTGRES_URL_NON_POOLING
  - [ ] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  - [ ] CLOUDINARY_API_KEY
  - [ ] CLOUDINARY_API_SECRET
  - [ ] NEXTAUTH_URL (https://...)
  - [ ] NEXTAUTH_SECRET
  - [ ] NEXT_PUBLIC_APP_URL (https://...)
- [ ] Fiz redeploy no Vercel
- [ ] Aguardei deploy finalizar
- [ ] Testei upload em produção

## 🆘 Se Nada Funcionar

### Problema: Não consigo sincronizar banco local

**Solução:** Use o Vercel CLI para sincronizar direto na produção:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Executar comando remoto
vercel run -- npx prisma db push
```

### Problema: Erro "relation does not exist"

**Causa:** Tabelas não foram criadas

**Solução:**
1. Delete o banco no Neon e crie novo
2. Atualize URLs no Vercel
3. Execute `npx prisma db push` novamente
4. Redeploy no Vercel

### Problema: Erro de permissões no Neon

**Solução:**
1. Acesse https://console.neon.tech
2. Seu projeto → Settings
3. Verifique se o usuário tem permissões de WRITE
4. Se não, crie novo database role com permissões completas

## 📞 Logs Úteis

Depois do deploy, compartilhe os logs do Vercel. Procure por:

```
❌ Upload error: ...
Error name: ...
Error message: ...
```

Isso vai nos dizer exatamente o que está falhando!

---

**RESUMO:** O erro 500 é quase certamente porque o banco não tem as tabelas. Execute `npx prisma db push` com as URLs corretas do Neon! 🚀
