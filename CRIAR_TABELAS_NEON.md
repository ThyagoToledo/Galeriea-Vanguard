# 🗄️ CRIAR TABELAS DIRETAMENTE NO NEON

## Opção 1: SQL Query no Console Neon (RECOMENDADO)

### Passo 1: Acessar o Neon Console

1. Acesse: https://console.neon.tech
2. Faça login
3. Selecione seu projeto (o que está vinculado ao Vercel)
4. Na barra lateral, clique em **"SQL Editor"** ou **"Tables"**

### Passo 2: Copiar o SQL Abaixo

Copie TODO o SQL abaixo e cole no SQL Editor do Neon:

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artwork" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "imagePublicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtworkTag" (
    "artworkId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ArtworkTag_pkey" PRIMARY KEY ("artworkId","tagId")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionArtwork" (
    "collectionId" TEXT NOT NULL,
    "artworkId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectionArtwork_pkey" PRIMARY KEY ("collectionId","artworkId")
);

-- CreateTable
CREATE TABLE "Download" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "artworkId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Download_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtworkTag" ADD CONSTRAINT "ArtworkTag_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtworkTag" ADD CONSTRAINT "ArtworkTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionArtwork" ADD CONSTRAINT "CollectionArtwork_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionArtwork" ADD CONSTRAINT "CollectionArtwork_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Download" ADD CONSTRAINT "Download_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Download" ADD CONSTRAINT "Download_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
```

### Passo 3: Executar o SQL

1. Clique em **"Run"** ou pressione **Ctrl+Enter**
2. Aguarde a execução (deve levar 1-2 segundos)
3. Você deve ver mensagens de sucesso:
   ```
   CREATE TABLE
   CREATE TABLE
   CREATE TABLE
   ...
   ALTER TABLE
   ```

### Passo 4: Verificar Tabelas Criadas

No Neon Console:
1. Vá em **"Tables"** na barra lateral
2. Você deve ver 7 tabelas:
   - ✅ User
   - ✅ Artwork
   - ✅ Tag
   - ✅ ArtworkTag
   - ✅ Collection
   - ✅ CollectionArtwork
   - ✅ Download

### Passo 5: Redeploy no Vercel

Mesmo que o banco esteja criado, force um redeploy:

1. https://vercel.com/dashboard
2. Seu projeto → Deployments
3. Último deploy → ⋯ → Redeploy

### Passo 6: Testar Upload! 🚀

Acesse: https://galeriea-vanguard.vercel.app/upload

---

## Opção 2: Via psql (Se preferir CLI)

Se você tem `psql` instalado:

```bash
# Copiar a URL do Neon (POSTGRES_URL_NON_POOLING do Vercel)
export DATABASE_URL="postgresql://..."

# Executar SQL
psql $DATABASE_URL < prisma/migrations/20251117074732_init/migration.sql
```

---

## Opção 3: API do Neon (Avançado)

Você também pode usar a API do Neon:

```bash
curl -X POST https://console.neon.tech/api/v2/projects/YOUR_PROJECT_ID/branches/YOUR_BRANCH_ID/databases/YOUR_DATABASE_ID/query \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "CREATE TABLE ..."}'
```

Mas o SQL Editor (Opção 1) é MUITO mais simples! 😉

---

## ✅ Depois de Criar as Tabelas

### Verificar se funcionou:

```bash
bash test-upload-production.sh
```

Ou acesse diretamente:
https://galeriea-vanguard.vercel.app/upload

### Se ainda der erro:

Compartilhe os **logs do Vercel**:
- Dashboard → Deployments → Function Logs
- Procure por linhas com `❌ Upload error:`

---

## 🎯 Resumo Rápido

1. ✅ Acesse https://console.neon.tech
2. ✅ Vá em SQL Editor
3. ✅ Cole o SQL acima
4. ✅ Execute (Run)
5. ✅ Verifique tabelas criadas
6. ✅ Redeploy no Vercel
7. ✅ Teste o upload!

**PRONTO!** As tabelas estarão criadas e o upload funcionará! 🎉
