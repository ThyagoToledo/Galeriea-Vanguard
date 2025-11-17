# Galeria Vanguard – Plataforma de Artes Livres

<div align="center">
  <img src="https://via.placeholder.com/800x300/6366f1/ffffff?text=Galeria+Vanguard" alt="Galeria Vanguard Banner" />
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue?logo=postgresql)](https://www.postgresql.org/)
  [![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)](https://vercel.com/)
</div>

## Visão Geral

A **Galeria Vanguard** é uma plataforma web onde artistas e amantes da arte podem **compartilhar, organizar e baixar obras visuais** com inspiração livre e sem comércio envolvido. Inspirada no formato do **Pinterest**, ela funciona como uma galeria digital colaborativa, com foco em facilidade de uso, compartilhamento e descoberta de novos estilos e artistas.

**Versão:** 1.0.0 | **Status:** Em Desenvolvimento | **Deploy:** Em breve

---

## Principais Funcionalidades

### Planejadas para v1.0
- Upload de imagens como obras (Cloudinary)
- Sistema de tags para organização
- Coleções públicas personalizadas
- Busca inteligente (nome, tags, categorias)
- Download de imagens em alta resolução
- Perfis de artistas com bio e portfólio
- Estatísticas (visualizações e downloads)
- Design responsivo (mobile-first)

### Futuras (v2.0+)
- Sistema de curtidas e favoritos
- Comentários em obras
- Notificações de novos uploads
- Editor de imagens integrado
- Compartilhamento em redes sociais
- Progressive Web App (PWA)

---

## Arquitetura do Projeto

### Stack Tecnológico

| Camada         | Tecnologia                          | Versão |
|----------------|-------------------------------------|--------|
| **Frontend**   | Next.js (App Router)                | 15.0+  |
| **UI/Styling** | Tailwind CSS + shadcn/ui            | 3.4+   |
| **Backend**    | Next.js API Routes                  | 15.0+  |
| **Database**   | PostgreSQL (Neon Serverless)        | 15+    |
| **ORM**        | Prisma                              | 5.0+   |
| **Storage**    | Cloudinary                          | -      |
| **Auth**       | NextAuth.js (Auth.js)               | 5.0+   |
| **Deploy**     | Vercel                              | -      |

### Por que Next.js?

**Server-Side Rendering (SSR)** - Melhor SEO para galerias  
**Image Optimization** - Component `<Image>` automático  
**API Routes integradas** - Backend no mesmo projeto  
**App Router** - Roteamento moderno e eficiente  
**Deploy simplificado** - Vercel native support  
**TypeScript nativo** - Type-safety completo  

---

## Estrutura do Banco de Dados

### Schema Prisma

```prisma
model User {
  id            String      @id @default(cuid())
  name          String
  email         String      @unique
  password      String
  avatar        String?
  bio           String?
  createdAt     DateTime    @default(now())
  artworks      Artwork[]
  collections   Collection[]
  downloads     Download[]
}

model Artwork {
  id            String      @id @default(cuid())
  title         String
  description   String?
  imageUrl      String
  imagePublicId String
  userId        String
  user          User        @relation(fields: [userId], references: [id])
  tags          ArtworkTag[]
  collections   CollectionArtwork[]
  downloads     Download[]
  views         Int         @default(0)
  createdAt     DateTime    @default(now())
}

model Tag {
  id        String      @id @default(cuid())
  name      String      @unique
  slug      String      @unique
  artworks  ArtworkTag[]
}

model ArtworkTag {
  artworkId String
  tagId     String
  artwork   Artwork @relation(fields: [artworkId], references: [id])
  tag       Tag     @relation(fields: [tagId], references: [id])
  @@id([artworkId, tagId])
}

model Collection {
  id          String              @id @default(cuid())
  name        String
  description String?
  userId      String
  user        User                @relation(fields: [userId], references: [id])
  artworks    CollectionArtwork[]
  isPublic    Boolean             @default(true)
  createdAt   DateTime            @default(now())
}

model CollectionArtwork {
  collectionId String
  artworkId    String
  collection   Collection @relation(fields: [collectionId], references: [id])
  artwork      Artwork    @relation(fields: [artworkId], references: [id])
  addedAt      DateTime   @default(now())
  @@id([collectionId, artworkId])
}

model Download {
  id        String   @id @default(cuid())
  userId    String
  artworkId String
  user      User     @relation(fields: [userId], references: [id])
  artwork   Artwork  @relation(fields: [artworkId], references: [id])
  createdAt DateTime @default(now())
}
```

---

## Setup Local

### Pré-requisitos

- Node.js >= 18.0
- npm ou yarn
- Conta no [Neon](https://neon.tech/) (PostgreSQL)
- Conta no [Cloudinary](https://cloudinary.com/)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/ThyagoToledo/Galeriea-Vanguard.git
cd Galeriea-Vanguard

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local

# 4. Configure o Prisma
npx prisma generate
npx prisma db push

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

**Acesso:** http://localhost:3000

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# NextAuth.js (porta padrão usada no VS Code)
NEXTAUTH_URL="http://localhost:20777"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"  # node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_API_KEY="sua-api-key"
CLOUDINARY_API_SECRET="seu-api-secret"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:20777"
```

**Gerar NEXTAUTH_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> Se precisar usar outra porta (por exemplo, 3000 em produção local), não esqueça de atualizar `NEXTAUTH_URL` e `NEXT_PUBLIC_APP_URL` para manter os fluxos de autenticação consistentes.

---

## Estrutura de Pastas

```bash
galeria-vanguard/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Rotas de autenticação
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/          # Rotas protegidas
│   │   ├── feed/             # Feed de obras
│   │   ├── upload/           # Upload de obras
│   │   ├── collections/      # Gerenciar coleções
│   │   └── profile/          # Perfil do usuário
│   ├── api/                  # API Routes
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── artworks/route.ts
│   │   ├── upload/route.ts
│   │   └── collections/route.ts
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Landing page
│
├── components/               # Componentes React
│   ├── ui/                   # shadcn/ui components
│   ├── artwork-card.tsx      # Card de obra
│   ├── masonry-grid.tsx      # Grid estilo Pinterest
│   ├── upload-modal.tsx      # Modal de upload
│   └── navbar.tsx            # Barra de navegação
│
├── lib/                      # Utilitários
│   ├── prisma.ts             # Cliente Prisma
│   ├── cloudinary.ts         # Config Cloudinary
│   ├── auth.ts               # NextAuth config
│   └── utils.ts              # Funções auxiliares
│
├── prisma/
│   └── schema.prisma         # Schema do banco
│
├── public/                   # Assets estáticos
│   └── logo.svg
│
├── styles/
│   └── globals.css           # Estilos globais
│
├── .env.local                # Variáveis de ambiente
├── next.config.js            # Configuração Next.js
├── tailwind.config.ts        # Configuração Tailwind
├── tsconfig.json             # Configuração TypeScript
└── package.json              # Dependências
```

---

## Design System

### Paleta de Cores (Tailwind)

```javascript
// tailwind.config.ts
{
  colors: {
    primary: {
      50: '#f0f9ff',
      500: '#6366f1',   // Indigo principal
      600: '#4f46e5',
      700: '#4338ca',
    },
    secondary: {
      500: '#8b5cf6',   // Roxo
      600: '#7c3aed',
    }
  }
}
```

### Componentes UI (shadcn/ui)

```bash
# Instalar componentes shadcn
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add input
npx shadcn-ui@latest add avatar
```

---

## Fluxo de Upload de Imagens

```mermaid
sequenceDiagram
    Usuario->>Frontend: Seleciona imagem
    Frontend->>Frontend: Valida arquivo (tipo, tamanho)
    Frontend->>API Route: POST /api/upload (FormData)
    API Route->>Cloudinary: Upload imagem
    Cloudinary-->>API Route: URL + public_id
    API Route->>Prisma: Salva artwork no DB
    Prisma-->>API Route: Retorna artwork criado
    API Route-->>Frontend: JSON com dados
    Frontend->>Usuario: Mostra artwork na galeria
```

**Exemplo de código:**

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File;
  
  // Upload para Cloudinary
  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await cloudinary.uploader.upload(
    `data:${file.type};base64,${buffer.toString('base64')}`,
    { folder: 'galeria-vanguard' }
  );
  
  // Salvar no banco
  const artwork = await prisma.artwork.create({
    data: {
      title: formData.get('title') as string,
      imageUrl: result.secure_url,
      imagePublicId: result.public_id,
      userId: session.user.id,
    }
  });
  
  return NextResponse.json(artwork);
}
```

---

## Responsividade

### Breakpoints

```css
/* Tailwind Breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Grid Responsivo (Masonry)

```tsx
// components/masonry-grid.tsx
<div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
  {artworks.map(artwork => (
    <ArtworkCard key={artwork.id} artwork={artwork} />
  ))}
</div>
```

---

## Deploy

### Deploy no Vercel (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Vincular o projeto local (usa dev na porta 20777)
vercel link

# 4. Adicionar variáveis de ambiente (uma a uma)
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
# ... repita para cada variável listada abaixo

# 5. Deploy
vercel --prod
```

**Ou via GitHub:**
1. Faça push para o GitHub
2. Conecte no [Vercel Dashboard](https://vercel.com/dashboard)
3. Importe o repositório (o arquivo `vercel.json` já define build/dev commands)
4. Adicione as variáveis na aba **Settings → Environment Variables**
5. Deploy automático!

### Variáveis obrigatórias no Vercel

| Nome | Descrição | Dica |
|------|-----------|------|
| `DATABASE_URL` | URL do banco (Neon/Postgres com connection pooling) | Use `?sslmode=require` e preferencialmente a URL de pool do Neon |
| `NEXTAUTH_SECRET` | Chave randômica para JWT NextAuth | Gere com `openssl rand -hex 32` ou comando Node indicado acima |
| `NEXTAUTH_URL` | URL pública da aplicação | `https://seu-projeto.vercel.app` ou domínio custom |
| `NEXT_PUBLIC_APP_URL` | Mesma URL pública usada no frontend | Mantém links e callbacks corretos |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloud name público | Vem do dashboard Cloudinary |
| `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Credenciais privadas | Nunca commitar |

> Depois do primeiro deploy, ajuste `NEXTAUTH_URL`/`NEXT_PUBLIC_APP_URL` sempre que apontar o projeto para um domínio customizado.

### Configurar no Vercel

1. **Build Settings:**
  - Framework Preset: Next.js (detectado automaticamente)
  - Build Command: `npm run build`
  - Output Directory: `.next`
  - Install Command: `npm install` (o script `postinstall` roda `prisma generate`)

2. **Domains:**
  - Configure seu domínio customizado (opcional)

---

## Performance

### Otimizações Implementadas

- Next.js Image Optimization (automático)
- Static Site Generation (SSG) para páginas públicas
- Incremental Static Regeneration (ISR)
- Lazy loading de componentes
- Cloudinary image transformations
- Prisma connection pooling (Neon)
- Debounce em buscas

### Métricas Alvo

| Métrica | Alvo |
|---------|------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Lighthouse Score | > 90 |

---

## Segurança

### Implementado

- NextAuth.js para autenticação
- Senha hasheada (bcrypt via NextAuth)
- CSRF protection (NextAuth built-in)
- API Routes protegidas com middleware
- Validação de tipos (Zod schemas)
- Rate limiting (Vercel Edge Config)
- Sanitização de inputs
- Cloudinary signed uploads

### Recomendações Produção

- [ ] Implementar 2FA (two-factor authentication)
- [ ] Adicionar captcha em registro
- [ ] Configurar Content Security Policy (CSP)
- [ ] Logs de auditoria
- [ ] Backup automático do banco

---

## Testes

### Setup de Testes (Futuro)

```bash
# Instalar dependências de teste
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

---

## 📚 API Reference

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/auth/register | Registrar usuário |
| POST | /api/auth/signin | Login |
| POST | /api/auth/signout | Logout |

### Obras (Artworks)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/artworks | Listar obras (paginado) |
| GET | /api/artworks/:id | Detalhes de obra |
| POST | /api/artworks | Criar obra |
| PUT | /api/artworks/:id | Atualizar obra |
| DELETE | /api/artworks/:id | Deletar obra |

### Coleções

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/collections | Listar coleções |
| POST | /api/collections | Criar coleção |
| POST | /api/collections/:id/artworks | Adicionar obra |
| DELETE | /api/collections/:id/artworks/:artworkId | Remover obra |

### Tags

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/tags | Listar tags populares |
| GET | /api/artworks?tag=:slug | Filtrar por tag |

---

## Roadmap

### v1.0.0 (MVP) - Em Desenvolvimento
- [ ] Setup Next.js + Prisma
- [ ] Autenticação com NextAuth
- [ ] Upload de imagens (Cloudinary)
- [ ] CRUD de obras
- [ ] Sistema de tags
- [ ] Busca básica
- [ ] Perfil de usuário
- [ ] Deploy no Vercel

### v1.1.0
- [ ] Sistema de coleções
- [ ] Download de imagens
- [ ] Estatísticas de visualizações
- [ ] Filtros avançados

### v2.0.0
- [ ] Sistema de curtidas
- [ ] Comentários em obras
- [ ] Notificações em tempo real
- [ ] Feed personalizado
- [ ] PWA (Progressive Web App)

### v3.0.0
- [ ] Editor de imagens integrado
- [ ] Watermark automático
- [ ] API pública para desenvolvedores
- [ ] Integração com redes sociais
- [ ] App mobile (React Native)

---

## Contribuindo

### Como Contribuir

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'feat: adicionar nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

### Padrão de Commits (Conventional Commits)

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação (não afeta código)
refactor: refatoração
test: testes
chore: tarefas de manutenção
perf: melhorias de performance
```

---

## Troubleshooting

### Erro: "Prisma Client not found"

```bash
npx prisma generate
```

### Erro: "Module not found: Can't resolve 'X'"

```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Erro: "Cloudinary upload failed"

- Verifique suas credenciais no `.env.local`
- Confirme que o `CLOUDINARY_API_KEY` e `SECRET` estão corretos

---

## Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Autor

**Alerandre**  
Repositório: [Galeriea-Vanguard](https://github.com/ThyagoToledo/Galeriea-Vanguard)

---

## Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Vercel](https://vercel.com/) - Hospedagem e deploy
- [Neon](https://neon.tech/) - PostgreSQL serverless
- [Cloudinary](https://cloudinary.com/) - Gerenciamento de imagens
- [Prisma](https://www.prisma.io/) - ORM TypeScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI

---

**Última atualização:** 17 de Novembro de 2025  
**Versão:** 1.0.0 (Em Desenvolvimento)  
**Status:** MVP em construção

---

**Se este projeto te interessou, deixe uma estrela no GitHub!**