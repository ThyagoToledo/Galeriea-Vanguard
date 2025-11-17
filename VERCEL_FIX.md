# 🚨 CORREÇÃO URGENTE - Erro 500 no Vercel

## Problema Identificado
O erro está acontecendo em **produção** (galeriea-vanguard.vercel.app), não localmente.
As variáveis de ambiente não estão configuradas no Vercel.

## ✅ Solução (5 minutos)

### 1. Acesse o Vercel Dashboard
```
https://vercel.com/dashboard
```

### 2. Vá no seu projeto
- Clique em "galeriea-vanguard" (ou nome do seu projeto)

### 3. Acesse Settings → Environment Variables
```
https://vercel.com/[seu-usuario]/galeriea-vanguard/settings/environment-variables
```

### 4. Adicione TODAS estas variáveis:

#### 📦 Banco de Dados (Neon)
Se você já tem integração com Neon no Vercel:
- Vercel cria automaticamente estas variáveis
- Verifique se existem: `POSTGRES_PRISMA_URL` e `POSTGRES_URL_NON_POOLING`
- Se não existirem, pegue em: https://console.neon.tech

**Adicionar no Vercel:**
```
Nome: POSTGRES_PRISMA_URL
Valor: postgresql://user:pass@ep-xxx.aws.neon.tech/db?sslmode=require&pgbouncer=true
Environments: Production, Preview, Development (marcar todos)
```

```
Nome: POSTGRES_URL_NON_POOLING
Valor: postgresql://user:pass@ep-xxx.aws.neon.tech/db?sslmode=require
Environments: Production, Preview, Development (marcar todos)
```

#### ☁️ Cloudinary
Acesse: https://cloudinary.com/console e copie as credenciais

```
Nome: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
Valor: seu-cloud-name
Environments: Production, Preview, Development
```

```
Nome: CLOUDINARY_API_KEY
Valor: 123456789012345
Environments: Production, Preview, Development
```

```
Nome: CLOUDINARY_API_SECRET
Valor: seu-api-secret-aqui
Environments: Production, Preview, Development
```

#### 🔐 NextAuth
```
Nome: NEXTAUTH_URL
Valor: https://galeriea-vanguard.vercel.app
Environments: Production, Preview, Development
```

```
Nome: NEXTAUTH_SECRET
Valor: nYqumQJFawJ7KD4sKPE1AajaaHkpYiyNLucbiJm7Rvs=
Environments: Production, Preview, Development
```

```
Nome: NEXT_PUBLIC_APP_URL
Valor: https://galeriea-vanguard.vercel.app
Environments: Production, Preview, Development
```

### 5. Redeploar (Opcional)
Após adicionar as variáveis, o Vercel pode pedir um redeploy:
- Vá em "Deployments"
- Clique nos 3 pontinhos do último deploy
- Clique em "Redeploy"

Ou espere o próximo push no GitHub (deploy automático).

## 🔍 Como Verificar se Funcionou

### Método 1: Pelo Browser
Acesse: https://galeriea-vanguard.vercel.app/api/debug
- Deve mostrar status de cada serviço

### Método 2: Logs do Vercel
- Vá em "Deployments" → último deploy
- Clique em "View Function Logs"
- Tente fazer upload e veja os erros específicos

## 📱 Atalho Rápido

Se você tem Vercel CLI instalado:
```bash
vercel env add POSTGRES_PRISMA_URL
vercel env add POSTGRES_URL_NON_POOLING
vercel env add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXT_PUBLIC_APP_URL
```

## ⚠️ Importante

1. **Marque TODOS os ambientes** (Production, Preview, Development)
2. **Use URLs completas** para NEXTAUTH_URL (https://...)
3. **Não use valores de placeholder** (COLE_AQUI não funciona)
4. **Sincronize o banco** após configurar (se necessário)

## 🎯 Checklist

- [ ] Acessei Vercel Dashboard
- [ ] Abri Settings → Environment Variables
- [ ] Adicionei POSTGRES_PRISMA_URL
- [ ] Adicionei POSTGRES_URL_NON_POOLING
- [ ] Adicionei NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- [ ] Adicionei CLOUDINARY_API_KEY
- [ ] Adicionei CLOUDINARY_API_SECRET
- [ ] Adicionei NEXTAUTH_URL (com https://)
- [ ] Adicionei NEXTAUTH_SECRET
- [ ] Adicionei NEXT_PUBLIC_APP_URL (com https://)
- [ ] Marquei todos os ambientes (Prod/Preview/Dev)
- [ ] Salvei todas as variáveis
- [ ] Fiz redeploy (se necessário)
- [ ] Testei o upload em produção

---

**Depois de configurar, o erro 500 será resolvido!** 🚀
