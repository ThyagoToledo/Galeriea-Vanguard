# Galeria Vanguard

A modern, open-source art gallery platform built with Next.js 14, designed for independent artists to showcase, share, and discover creative works.

## Overview

Galeria Vanguard is a full-stack web application that provides artists with a professional platform to upload artwork, create collections, and engage with a creative community. The platform features real-time analytics, public galleries, and seamless image management powered by Cloudinary.

## Tech Stack

### Frontend
- **Next.js 14.2.13** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.6.2** - Type safety
- **Tailwind CSS 3.4.14** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma 5.20.0** - Type-safe ORM
- **PostgreSQL** - Primary database (via Neon)
- **NextAuth 4.24.7** - Authentication
- **Bcryptjs** - Password hashing
- **Zod** - Schema validation

### Infrastructure
- **Vercel** - Deployment platform
- **Cloudinary 1.41.0** - Image storage and optimization
- **Neon PostgreSQL** - Serverless Postgres database

### Development Tools
- **Vitest 2.1.4** - Unit testing
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## Features

### Core Functionality
- **User Authentication**: Secure registration and login with NextAuth
- **Artwork Upload**: Direct image uploads with Cloudinary integration
- **Public Feed**: Browse all artworks with masonry grid layout
- **Collections**: Create and manage curated artwork collections
- **Tagging System**: Organize content with custom tags
- **User Profiles**: Personal dashboard with statistics

### Technical Features
- **Server-Side Rendering**: Optimized SEO and performance
- **Dynamic Routes**: Real-time data fetching
- **Responsive Design**: Mobile-first approach
- **Type Safety**: Full TypeScript coverage
- **Database Relations**: Complex Prisma schema with many-to-many relationships
- **Image Optimization**: Automatic Cloudinary transformations

## Database Schema

### Models
- **User**: Authentication and profile data
- **Artwork**: Core content model with image URLs
- **Tag**: Taxonomy for content organization
- **ArtworkTag**: Many-to-many relationship
- **Collection**: User-created artwork groups
- **CollectionArtwork**: Many-to-many relationship
- **Download**: Analytics tracking

## Project Structure

```
galeria-vanguard/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── (dashboard)/
│   │   ├── feed/           # Main gallery feed
│   │   ├── upload/         # Artwork upload
│   │   ├── collections/    # Collections management
│   │   ├── profile/        # User profile
│   │   └── layout.tsx      # Dashboard layout
│   ├── api/
│   │   ├── artworks/       # Artwork CRUD
│   │   ├── auth/           # NextAuth endpoints
│   │   ├── collections/    # Collections API
│   │   └── upload/         # Image upload handler
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── artwork-card.tsx    # Artwork display component
│   ├── navbar.tsx          # Navigation component
│   ├── upload-modal.tsx    # Upload modal dialog
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── auth.ts             # NextAuth configuration
│   ├── cloudinary.ts       # Cloudinary setup
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Utility functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Migration history
└── tests/
    └── utils.test.ts       # Unit tests
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)
- Cloudinary account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ThyagoToledo/Galeriea-Vanguard.git
cd Galeriea-Vanguard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Configure the following variables in `.env.local`:
```env
# Database (Neon Postgres)
POSTGRES_PRISMA_URL="postgresql://..."
POSTGRES_URL_NON_POOLING="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:20777"
NEXTAUTH_SECRET="your-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:20777"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Generate Prisma client:
```bash
npx prisma generate
```

6. Start the development server:
```bash
npm run dev -- -p 20777
```

The application will be available at `http://localhost:20777`

## Development Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run test       # Run Vitest tests
```

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in Vercel settings
4. Deploy automatically on push to main branch

### Environment Variables for Production

Configure in Vercel dashboard:
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Artworks
- `GET /api/artworks` - List all artworks
- `POST /api/artworks` - Create new artwork

### Upload
- `POST /api/upload` - Upload image to Cloudinary and create artwork

### Collections
- `GET /api/collections` - List public collections

## Database Migrations

Create new migration:
```bash
npx prisma migrate dev --name migration_name
```

Apply migrations in production:
```bash
npx prisma migrate deploy
```

View database in Prisma Studio:
```bash
npx prisma studio
```

## Testing

Run tests:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is open-source and available under the MIT License.

## Contact

- GitHub: [@ThyagoToledo](https://github.com/ThyagoToledo)
- Project Repository: [Galeriea-Vanguard](https://github.com/ThyagoToledo/Galeriea-Vanguard)
- Live Demo: [galeriea-vanguard.vercel.app](https://galeriea-vanguard.vercel.app)

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- Cloudinary for image management
- Prisma for database ORM
- Neon for serverless PostgreSQL
# Build timestamp: seg 17 nov 2025 08:00:45 -05
