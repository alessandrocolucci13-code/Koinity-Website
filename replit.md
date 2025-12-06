# Koinity - Cinema On-Demand Platform

## Overview

Koinity is an Italian cinema on-demand platform that empowers communities to vote on which films they want to see in theaters, including titles not currently in distribution. The platform facilitates community-driven cinema programming through a proposal, voting, and booking system that connects audiences with local theaters.

**Core Value Proposition**: Transform passive moviegoers into active participants who shape their local cinema experience through collective decision-making.

**Key Features**:
- Film proposal submission with metadata (city, venue, dates, rights status)
- Community voting and pre-booking system with progress tracking
- Cinema partnership tools (demo requests, event coordination)
- Community engagement features (ambassador program, blog, social channels)
- Multi-page informational architecture (about, community, contact, blog)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**:
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **State Management**: TanStack Query (React Query) for server state
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite

**Design System**:
- Dark-first theme with new brand palette (Deep Blue #000050 background, Yellow #FFD600 / Orange #FF8C00 accents)
- Typography: Inter (UI), Playfair Display (headlines/titles) with blog-title class for consistency
- Card-based layouts with glassmorphism effect (white opacity layers)
- Custom CSS variables for theming in `index.css`
- Responsive breakpoints: mobile (768px), tablet (1024px), desktop (1440px+)

**New Color System** (STEP 1 - Brand Consistency):
- **Primary Blues**: --blue-900 (#000050 background), --blue-800 (#00006b sections), --blue-700 (#000085 hover)
- **Accent Colors**: --yellow-500 (#FFD600 primary), --yellow-600 (#FF8C00 gradient end)
- **Neutral Scale**: White opacity variants (90%, 80%, 70%, 50%, 30%, 15%, 10%, 5%)
- **Glassmorphism**: Cards use white-05 to white-10 with backdrop blur
- **Gradient**: 135deg linear gradient from #FFD600 to #FF8C00 for CTAs
- **Application**: Unified background (blue-900), consistent button gradients, white text hierarchy

**Spacing System** (STEP 2 - Consistent Vertical Rhythm):
- **8pt Scale**: --space-xs (8px) through --space-5xl (120px)
- **Section Padding**: Desktop 100px 40px, Tablet 80px 40px, Mobile 60px 24px
- **Component Spacing**: Card padding 32px, gaps 24px/16px
- **Applied to Home Page**: All sections use py-20, consistent mb-20 headers, mt-20 CTAs

**Typography System** (STEP 3 - Gerarchia Chiara):
- **Font Sizes**: --text-xs (12px) through --text-8xl (64px)
- **Line Heights**: tight (1.1), snug (1.3), normal (1.5), relaxed (1.7), loose (1.8)
- **Font Weights**: normal (400), medium (500), semibold (600), bold (700), extrabold (800), black (900)
- **Heading Hierarchy**: h1/h2 (56-48px, weight 900), h3 (32px, weight 800), h4 (24px, weight 800), h5/h6 (20px, weight 700)
- **Applied to Home Page**: All section titles use .h2 class for consistent 48px sizing

**Card System** (STEP 4 - Design Unificato):
- **Base Card**: .card-standard with glassmorphism (padding 32px, white-08 background, white-15 border)
- **Card Variants**: .card-large (48px padding, 28px radius), .card-small (24px padding, 20px radius)
- **Hover Effects**: -8px translateY, yellow border, 60px shadow
- **Content Spacing**: 16px gaps, internal margin spacing for hierarchy
- **Applied to Why Cards**: Perfect glassmorphism with gradient overlay, top accent line, hover animations

**Grid System** (STEP 5 - Layout Consistenza):
- **Grid Container**: .container with max-width 1400px, padding 40px desktop / 24px mobile
- **Symmetric Grids**: .grid-2 (2 columns, 32px gap), .grid-3 (3 columns, 32px gap), .grid-4 (4 columns, 24px gap)
- **Asymmetric Grid**: .grid-60-40 (1.5fr / 1fr columns, 60px gap)
- **Responsive**: 1024px breakpoint (grid-4 → 2 cols), 768px breakpoint (all grids → 1 col, 24px gap)
- **Applied**: Why section uses grid-3, community dialogs use grid-60-40

**Button System** (STEP 6 - Consistenza CTA):
- **Base Button**: .btn with 18px vertical padding, 32px horizontal, 16px font, 800 weight, uppercase, 16px radius
- **Primary Variant**: .btn-primary with yellow gradient (#FFD600 → #FF8C00), dark text, yellow shadow, -2px hover lift
- **Secondary Variant**: .btn-secondary with transparent bg, white border, blur, yellow border on hover
- **Size Variants**: .btn-small (14px font, 14px v-pad), .btn-large (18px font, 22px v-pad)
- **Full Width**: .btn-block stretches to 100% container width
- **Interactions**: Smooth 0.3s transitions, -2px translateY on hover, smooth active state

**Media & Images** (STEP 7 - Consistenza Media):
- **Image Containers**: .img-container with 24px border-radius, overflow hidden, dark blue background
- **Image Styling**: object-fit cover, scale(1.05) on hover, smooth 0.6s transition
- **Aspect Ratios**: .aspect-16-9, .aspect-4-3, .aspect-square for consistent proportions
- **Border Radius Scale**: .radius-sm (12px) through .radius-3xl (32px), .radius-full for circles
- **Applied**: All media uses consistent containers and aspect ratios for brand coherence

**Featured Section** (STEP 8 - Unified Blog Card):
- **Blog Card**: .blog-card with flex column layout, glassmorphism background, 24px border-radius
- **Card Image**: .blog-card-image with 240px fixed height, object-fit cover, scale(1.08) hover
- **Card Content**: .blog-card-content with 28px padding, flex layout for vertical stacking
- **Card Title**: .blog-card-title with 22px font, 800 weight, max 2-line truncation
- **Card Meta**: .blog-card-meta with flex layout, border-top separator, margin-top auto for spacing
- **Progress Bar**: .progress-bar + .progress-fill with yellow gradient for film progress tracking

**Component Architecture**:
- Reusable UI primitives in `components/ui/` (shadcn pattern)
- Feature components: `ProposalCard`, `Filters`, `ProgressBar`, `Stepper`
- Layout components: `Navbar`, `Footer`
- Utility components: `SEO`, `ThemeProvider`, `Toaster`
- Page components follow route-based organization

**State Management Pattern**:
- Server state via React Query with custom `queryClient` configuration
- Optimistic updates for voting/interactions
- Form state managed locally via React Hook Form
- Theme state in Context API (`ThemeProvider`)

### Backend Architecture

**Technology Stack**:
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (via Neon serverless driver)
- **Validation**: Zod schemas shared between client/server

**API Design**:
- RESTful endpoints under `/api` namespace
- Resource-based routing: `/api/proposals`, `/api/blog`, `/api/demo-request`
- Request validation using shared Zod schemas
- Standard HTTP methods (GET, POST, PATCH)

**Database Schema** (`shared/schema.ts`):
- `proposals`: Film proposals with voting/metadata
- `userVotes`: Vote tracking (user-proposal relationship)
- `blogPosts`: Content management for blog articles
- `contactForms`, `demoRequests`, `ambassadorForms`, `newsletters`: Form submissions
- UUID primary keys with auto-generation
- Timestamps for audit trails

**Storage Abstraction**:
- `IStorage` interface defines data access contract
- `MemStorage` class provides in-memory implementation (development/demo)
- Mock data seeding for proposals and blog posts
- Database implementation uses Drizzle ORM with prepared statements

**Server Structure**:
- `server/index.ts`: Express app setup, middleware, error handling
- `server/routes.ts`: Route registration and handlers
- `server/storage.ts`: Data access layer abstraction
- `server/db.ts`: Database connection singleton
- `server/vite.ts`: Development server integration with Vite HMR

### Data Flow Patterns

**Proposal Voting Flow**:
1. User clicks vote/pre-book button
2. Mutation triggered via `useMutation` hook
3. Optimistic UI update (immediate feedback)
4. API request to `PATCH /api/proposals/:id/vote`
5. Server increments vote count via storage layer
6. Query invalidation triggers refetch
7. UI updates with server data

**Form Submission Flow**:
1. Form validation on client (Zod schema)
2. POST request to appropriate endpoint
3. Server-side validation using same schema
4. Data persistence via storage layer
5. Success toast notification
6. Form reset

**Data Fetching Strategy**:
- `staleTime: Infinity` for relatively static data (proposals, blog)
- No automatic refetch on window focus
- Manual invalidation on mutations
- Loading states with skeleton components

### Build & Deployment

**Development**:
- `npm run dev`: Concurrent Vite dev server + Express backend
- Hot module replacement for client code
- TypeScript compilation without emit (`noEmit: true`)
- Path aliases: `@/` (client), `@shared/` (shared schemas)

**Production Build**:
- `npm run build`: Vite build for client + esbuild for server
- Client output: `dist/public/`
- Server bundle: `dist/index.js` (ESM format)
- Static asset serving in production mode

**Configuration Files**:
- `vite.config.ts`: Client build, aliases, plugins (React, Replit integrations)
- `tsconfig.json`: Shared TypeScript config for monorepo
- `tailwind.config.ts`: Design system tokens and theme extension
- `drizzle.config.ts`: Database migration configuration

## External Dependencies

### Third-Party Services

**Database**:
- **Neon Postgres**: Serverless PostgreSQL database
- Connection via `@neondatabase/serverless` driver
- Environment variable: `DATABASE_URL`

**Email/Newsletter** (planned):
- Integration points defined in schema (`newsletters` table)
- API endpoints ready for service integration

### NPM Packages

**UI & Styling**:
- `@radix-ui/*`: 20+ accessible UI primitives (dialogs, dropdowns, etc.)
- `tailwindcss`, `autoprefixer`: Styling utilities
- `class-variance-authority`, `clsx`, `tailwind-merge`: Dynamic class utilities
- `cmdk`: Command palette component
- `embla-carousel-react`: Image carousels
- `lucide-react`: Icon library

**Data & Forms**:
- `@tanstack/react-query`: Server state management
- `react-hook-form`: Form state management
- `@hookform/resolvers`: Zod integration for forms
- `zod`: Runtime validation
- `drizzle-orm`, `drizzle-zod`: Database ORM and schema validation
- `date-fns`: Date formatting utilities

**Server**:
- `express`: HTTP server framework
- `postgres`: PostgreSQL client
- `connect-pg-simple`: Session store (infrastructure)
- `nanoid`: Unique ID generation

**Development**:
- `vite`, `@vitejs/plugin-react`: Build tooling
- `tsx`: TypeScript execution
- `esbuild`: Server bundling
- `@replit/*`: Replit-specific dev tools (error overlay, cartographer)

### Asset Dependencies

**Images**:
- Logo: `attached_assets/Logo_Koinity-removebg-preview_1764564269821.png`
- Hero backgrounds: Cinema seats, friends imagery
- Trust logos for cinema partnership section

**Fonts**:
- Google Fonts: Inter (weights 300-800), Playfair Display (weights 400-800)
- Preconnect optimization for font loading

### API Integrations (Potential)

**Film Metadata**:
- TMDB/OMDb API integration possible for trailer links, posters
- Currently uses user-submitted URLs

**Payment Processing**:
- Not yet implemented (infrastructure in place via pre-booking system)

**Analytics**:
- No current implementation
- Structure supports future integration via custom events