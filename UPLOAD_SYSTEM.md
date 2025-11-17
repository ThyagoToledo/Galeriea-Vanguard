# Sistema de Upload - Galeria Vanguard

## Funcionalidades Implementadas

### 1. Upload de Imagens
- Interface drag-and-drop e clique para selecionar arquivo
- Preview da imagem antes do upload
- Validação de tipo de arquivo (apenas imagens)
- Validação de tamanho (máximo 10MB)
- Feedback visual de loading durante upload

### 2. Integração com Cloudinary
- Upload direto para Cloudinary
- Otimização automática de imagens (max 2000x2000)
- Formato e qualidade automáticos
- Armazenamento organizado em pasta 'galeria-vanguard'
- Retorna URL segura (HTTPS) da imagem

### 3. Persistência no Banco de Dados
- Criação de registro Artwork no PostgreSQL via Prisma
- Armazenamento de metadados (título, descrição)
- Sistema de tags com relacionamento many-to-many
- Tags criadas automaticamente (upsert) se não existirem
- Associação com usuário (temporariamente 'temp-user-id')

### 4. Validação de Dados
- Schema Zod para validação server-side
- Validação de campos obrigatórios (título, imagem)
- Sanitização de tags (trim, lowercase, slug)
- Mensagens de erro descritivas

### 5. Fluxo Completo
```
1. Usuário seleciona imagem → Preview local
2. Preenche formulário (título, descrição, tags)
3. Submit → Validação client-side
4. Upload para Cloudinary → URL da imagem
5. Criação de tags no banco (se necessário)
6. Criação de Artwork com relacionamentos
7. Redirect para /feed com artwork visível
```

## API Endpoint: POST /api/upload

### Request
- Content-Type: multipart/form-data
- Body:
  - image: File (obrigatório)
  - title: string (obrigatório)
  - description: string (opcional)
  - tags: string (opcional, separado por vírgula)

### Response (201 Created)
```json
{
  "success": true,
  "artwork": {
    "id": "uuid",
    "title": "Nome da Obra",
    "imageUrl": "https://res.cloudinary.com/...",
    "tags": ["digital", "abstrato"]
  }
}
```

### Erros Possíveis
- 400: Arquivo inválido / muito grande
- 400: Validação Zod falhou
- 401: Não autorizado (quando auth estiver ativo)
- 500: Erro no upload ou banco de dados

## Configuração Necessária

### Variáveis de Ambiente (Vercel)
```env
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Database (já configurado via integração Neon)
POSTGRES_PRISMA_URL="..."
POSTGRES_URL_NON_POOLING="..."

# NextAuth (já configurado)
NEXTAUTH_URL="https://galeriea-vanguard.vercel.app"
NEXTAUTH_SECRET="..."
NEXT_PUBLIC_APP_URL="https://galeriea-vanguard.vercel.app"
```

## Próximos Passos (TODO)

### 1. Autenticação Real
- Remover `temp-user-id`
- Usar `session.user.id` do NextAuth
- Adicionar proteção de rota (middleware)

### 2. Melhorias de Upload
- Suporte para múltiplos arquivos
- Crop/resize antes do upload
- Suporte para GIF animado
- Watermark opcional

### 3. Analytics
- Contador de views
- Sistema de downloads
- Estatísticas por artwork

### 4. Moderação
- Review de conteúdo antes de publicar
- Sistema de reports
- Filtros de conteúdo inapropriado

## Estrutura de Arquivos Modificados

```
app/
├── api/
│   └── upload/
│       └── route.ts          # API endpoint completo
└── (dashboard)/
    └── upload/
        └── page.tsx           # Página de upload com formulário

lib/
├── cloudinary.ts              # Configuração Cloudinary (já existia)
└── prisma.ts                  # Cliente Prisma (já existia)

prisma/
└── schema.prisma              # Schema com relacionamentos (já existia)
```

## Testando Localmente

1. Configure as credenciais do Cloudinary no `.env.local`
2. Rode `npm run dev -- -p 20777`
3. Acesse `http://localhost:20777/upload`
4. Selecione uma imagem e preencha o formulário
5. Verifique o artwork em `http://localhost:20777/feed`
6. Confira o banco de dados: `npx prisma studio`

## Considerações de Segurança

- Upload limitado a 10MB
- Validação de tipo MIME
- Cloudinary faz scan de segurança automático
- Tags sanitizadas para prevenir XSS
- TODO: Rate limiting no endpoint
- TODO: Verificação de autenticação obrigatória
