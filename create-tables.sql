                                                                                                                                                                                -- ============================================
                                                                                                                                                                                -- SCRIPT SQL PARA CRIAR TABELAS NO NEON
                                                                                                                                                                                -- Execute este SQL diretamente no SQL Editor do Neon
                                                                                                                                                                                -- ============================================

                                                                                                                                                                                -- 1. Criar tabela User
                                                                                                                                                                                CREATE TABLE IF NOT EXISTS "User" (
                                                                                                                                                                                    "id" TEXT NOT NULL,
                                                                                                                                                                                    "name" TEXT NOT NULL,
                                                                                                                                                                                    "email" TEXT NOT NULL,
                                                                                                                                                                                    "password" TEXT NOT NULL,
                                                                                                                                                                                    "avatar" TEXT,
                                                                                                                                                                                    "bio" TEXT,
                                                                                                                                                                                    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                                                                                                                                    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
                                                                                                                                                                                );

                                                                                                                                                                                -- 2. Criar índice único para email
                                                                                                                                                                                CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- 3. Criar tabela Artwork
CREATE TABLE IF NOT EXISTS "Artwork" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageData" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);                                                                                                                                                                                -- 4. Criar foreign key Artwork -> User
                                                                                                                                                                                ALTER TABLE "Artwork" 
                                                                                                                                                                                DROP CONSTRAINT IF EXISTS "Artwork_userId_fkey";

                                                                                                                                                                                ALTER TABLE "Artwork" 
                                                                                                                                                                                ADD CONSTRAINT "Artwork_userId_fkey" 
                                                                                                                                                                                FOREIGN KEY ("userId") REFERENCES "User"("id") 
                                                                                                                                                                                ON DELETE RESTRICT ON UPDATE CASCADE;

                                                                                                                                                                                -- 5. Criar tabela Tag
                                                                                                                                                                                CREATE TABLE IF NOT EXISTS "Tag" (
                                                                                                                                                                                    "id" TEXT NOT NULL,
                                                                                                                                                                                    "name" TEXT NOT NULL,
                                                                                                                                                                                    "slug" TEXT NOT NULL,
                                                                                                                                                                                    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
                                                                                                                                                                                );

                                                                                                                                                                                -- 6. Criar índices únicos para Tag
                                                                                                                                                                                CREATE UNIQUE INDEX IF NOT EXISTS "Tag_name_key" ON "Tag"("name");
                                                                                                                                                                                CREATE UNIQUE INDEX IF NOT EXISTS "Tag_slug_key" ON "Tag"("slug");

                                                                                                                                                                                -- 7. Criar tabela ArtworkTag (relacionamento N:N)
                                                                                                                                                                                CREATE TABLE IF NOT EXISTS "ArtworkTag" (
                                                                                                                                                                                    "artworkId" TEXT NOT NULL,
                                                                                                                                                                                    "tagId" TEXT NOT NULL,
                                                                                                                                                                                    CONSTRAINT "ArtworkTag_pkey" PRIMARY KEY ("artworkId","tagId")
                                                                                                                                                                                );

                                                                                                                                                                                -- 8. Criar foreign keys ArtworkTag
                                                                                                                                                                                ALTER TABLE "ArtworkTag" 
                                                                                                                                                                                DROP CONSTRAINT IF EXISTS "ArtworkTag_artworkId_fkey";

                                                                                                                                                                                ALTER TABLE "ArtworkTag" 
                                                                                                                                                                                ADD CONSTRAINT "ArtworkTag_artworkId_fkey" 
                                                                                                                                                                                FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") 
                                                                                                                                                                                ON DELETE RESTRICT ON UPDATE CASCADE;

                                                                                                                                                                                ALTER TABLE "ArtworkTag" 
                                                                                                                                                                                DROP CONSTRAINT IF EXISTS "ArtworkTag_tagId_fkey";

                                                                                                                                                                                ALTER TABLE "ArtworkTag" 
                                                                                                                                                                                ADD CONSTRAINT "ArtworkTag_tagId_fkey" 
                                                                                                                                                                                FOREIGN KEY ("tagId") REFERENCES "Tag"("id") 
                                                                                                                                                                                ON DELETE RESTRICT ON UPDATE CASCADE;

                                                                                                                                                                                -- 9. Criar tabela Collection
                                                                                                                                                                                CREATE TABLE IF NOT EXISTS "Collection" (
                                                                                                                                                                                    "id" TEXT NOT NULL,
                                                                                                                                                                                    "name" TEXT NOT NULL,
                                                                                                                                                                                    "description" TEXT,
                                                                                                                                                                                    "userId" TEXT NOT NULL,
                                                                                                                                                                                    "isPublic" BOOLEAN NOT NULL DEFAULT true,
                                                                                                                                                                                    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                                                                                                                                    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
                                                                                                                                                                                );

                                                                                                                                                                                -- 10. Criar foreign key Collection -> User
                                                                                                                                                                                ALTER TABLE "Collection" 
                                                                                                                                                                                DROP CONSTRAINT IF EXISTS "Collection_userId_fkey";

                                                                                                                                                                                ALTER TABLE "Collection" 
                                                                                                                                                                                ADD CONSTRAINT "Collection_userId_fkey" 
                                                                                                                                                                                FOREIGN KEY ("userId") REFERENCES "User"("id") 
                                                                                                                                                                                ON DELETE RESTRICT ON UPDATE CASCADE;

                                                                                                                                                                                -- 11. Criar tabela CollectionArtwork (relacionamento N:N)
                                                                                                                                                                                CREATE TABLE IF NOT EXISTS "CollectionArtwork" (
                                                                                                                                                                                    "collectionId" TEXT NOT NULL,
                                                                                                                                                                                    "artworkId" TEXT NOT NULL,
                                                                                                                                                                                    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                                                                                                                                    CONSTRAINT "CollectionArtwork_pkey" PRIMARY KEY ("collectionId","artworkId")
                                                                                                                                                                                );

                                                                                                                                                                                -- 12. Criar foreign keys CollectionArtwork
                                                                                                                                                                                ALTER TABLE "CollectionArtwork" 
                                                                                                                                                                                DROP CONSTRAINT IF EXISTS "CollectionArtwork_collectionId_fkey";

                                                                                                                                                                                ALTER TABLE "CollectionArtwork" 
                                                                                                                                                                                ADD CONSTRAINT "CollectionArtwork_collectionId_fkey" 
                                                                                                                                                                                FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") 
                                                                                                                                                                                ON DELETE RESTRICT ON UPDATE CASCADE;

                                                                                                                                                                                ALTER TABLE "CollectionArtwork" 
                                                                                                                                                                                DROP CONSTRAINT IF EXISTS "CollectionArtwork_artworkId_fkey";

                                                                                                                                                                                ALTER TABLE "CollectionArtwork" 
                                                                                                                                                                                ADD CONSTRAINT "CollectionArtwork_artworkId_fkey" 
                                                                                                                                                                                FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") 
                                                                                                                                                                                ON DELETE RESTRICT ON UPDATE CASCADE;

                                                                                                                                                                                -- 13. Criar tabela Download
                                                                                                                                                                                CREATE TABLE IF NOT EXISTS "Download" (
                                                                                                                                                                                    "id" TEXT NOT NULL,
                                                                                                                                                                                    "userId" TEXT NOT NULL,
                                                                                                                                                                                    "artworkId" TEXT NOT NULL,
                                                                                                                                                                                    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                                                                                                                                    CONSTRAINT "Download_pkey" PRIMARY KEY ("id")
                                                                                                                                                                                );

                                                                                                                                                                                -- 14. Criar foreign keys Download
                                                                                                                                                                                ALTER TABLE "Download" 
                                                                                                                                                                                DROP CONSTRAINT IF EXISTS "Download_userId_fkey";

                                                                                                                                                                                ALTER TABLE "Download" 
                                                                                                                                                                                ADD CONSTRAINT "Download_userId_fkey" 
                                                                                                                                                                                FOREIGN KEY ("userId") REFERENCES "User"("id") 
                                                                                                                                                                                ON DELETE RESTRICT ON UPDATE CASCADE;

                                                                                                                                                                                ALTER TABLE "Download" 
                                                                                                                                                                                DROP CONSTRAINT IF EXISTS "Download_artworkId_fkey";

                                                                                                                                                                                ALTER TABLE "Download" 
                                                                                                                                                                                ADD CONSTRAINT "Download_artworkId_fkey" 
                                                                                                                                                                                FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") 
                                                                                                                                                                                ON DELETE RESTRICT ON UPDATE CASCADE;

-- ============================================
-- VERIFICAÇÃO (Execute após criar as tabelas)
-- ============================================

-- IMPORTANTE: Criar usuário temporário para desenvolvimento
INSERT INTO "User" (id, email, name, password, "createdAt")
VALUES (
    'temp-user-galeria-vanguard',
    'temp@galeriavanguard.com',
    'Galeria Vanguard',
    'temp-hash-development',
    NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Verificar se usuário foi criado
SELECT id, email, name FROM "User" WHERE id = 'temp-user-galeria-vanguard';

-- Listar todas as tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;                                                                                                                                                                                -- Deve mostrar:
                                                                                                                                                                                -- Artwork
                                                                                                                                                                                -- ArtworkTag
                                                                                                                                                                                -- Collection
                                                                                                                                                                                -- CollectionArtwork
                                                                                                                                                                                -- Download
                                                                                                                                                                                -- Tag
                                                                                                                                                                                -- User
