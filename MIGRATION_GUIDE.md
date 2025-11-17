# Guia de Migração para Base64

## 1. Aplicar Migration no Neon PostgreSQL

### Opção A: Via Console Neon (Recomendado)

1. Acesse: https://console.neon.tech
2. Selecione seu projeto **Galeriea Vanguard**
3. Vá em **SQL Editor** no menu lateral
4. Cole e execute o SQL abaixo:

```sql
-- Migration: Change Artwork table to store base64 images
-- Date: 2025-11-17

-- Add new columns for base64 storage
ALTER TABLE "Artwork" 
ADD COLUMN IF NOT EXISTS "imageData" TEXT,
ADD COLUMN IF NOT EXISTS "mimeType" VARCHAR(100),
ADD COLUMN IF NOT EXISTS "fileSize" INTEGER;

-- Make old columns nullable temporarily (for data migration)
ALTER TABLE "Artwork" ALTER COLUMN "imageUrl" DROP NOT NULL;
ALTER TABLE "Artwork" ALTER COLUMN "imagePublicId" DROP NOT NULL;

-- After confirming everything works, drop old columns:
ALTER TABLE "Artwork" DROP COLUMN IF EXISTS "imageUrl";
ALTER TABLE "Artwork" DROP COLUMN IF EXISTS "imagePublicId";

-- Make new columns NOT NULL
ALTER TABLE "Artwork" ALTER COLUMN "imageData" SET NOT NULL;
ALTER TABLE "Artwork" ALTER COLUMN "mimeType" SET NOT NULL;
ALTER TABLE "Artwork" ALTER COLUMN "fileSize" SET NOT NULL;
```

5. Clique em **Run** para executar

### Opção B: Via Vercel (se preferir)

1. Acesse: https://vercel.com/thyagotoledo/galeriea-vanguard/settings/environment-variables
2. Copie o valor de `POSTGRES_URL_NON_POOLING`
3. No terminal local, execute:

```bash
# Cole a URL do Neon que você copiou
export DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require"

# Execute o SQL
psql $DATABASE_URL -f prisma/migrations/change_artwork_to_base64.sql
```

## 2. Atualizar Variáveis de Ambiente no Vercel

1. Acesse: https://vercel.com/thyagotoledo/galeriea-vanguard/settings/environment-variables
2. **Remover** variáveis do Cloudinary (não são mais necessárias):
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

3. As variáveis do Neon já devem estar configuradas:
   - `POSTGRES_PRISMA_URL` ✓
   - `POSTGRES_URL_NON_POOLING` ✓

## 3. Fazer Deploy no Vercel

```bash
# O push já foi feito, mas você pode forçar um novo deploy:
git commit --allow-empty -m "chore: trigger deploy"
git push origin main
```

Ou use o webhook:
```bash
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_QB68LQVFvv2U0Oo3QDTWDjDthGbK/5zKk9z19bj
```

## 4. Testar Upload

1. Acesse: https://galeriea-vanguard.vercel.app/upload
2. Faça upload de uma imagem (máximo 5MB)
3. Verifique se aparece no feed

## Diferenças da Nova Arquitetura

### Antes (Cloudinary):
- Limite: 10MB
- Armazenamento: CDN externo
- Custo: Pago após limite gratuito
- Dependência: API externa

### Agora (Base64 no Neon):
- Limite: 5MB (melhor performance)
- Armazenamento: Banco de dados PostgreSQL
- Custo: Incluído no plano Neon
- Dependência: Zero APIs externas

## Observações

- ⚠️ Imagens já enviadas via Cloudinary **não serão migradas automaticamente**
- ⚠️ Você precisará fazer novos uploads após a migration
- ✓ O banco Neon tem 512MB grátis (suficiente para ~100 imagens de 5MB)
- ✓ Base64 adiciona ~33% de overhead, por isso o limite menor

## Troubleshooting

**Se der erro "column already exists":**
```sql
-- Apenas execute a parte final:
ALTER TABLE "Artwork" DROP COLUMN IF EXISTS "imageUrl";
ALTER TABLE "Artwork" DROP COLUMN IF EXISTS "imagePublicId";
ALTER TABLE "Artwork" ALTER COLUMN "imageData" SET NOT NULL;
```

**Se der erro "column cannot be null":**
- Significa que há artworks sem imageData
- Delete os artworks antigos: `DELETE FROM "Artwork";`
