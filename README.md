# VeriAttend Marketing Website

Official public-facing marketing website for **VeriAttend** — an AI-powered attendance management platform for universities and higher education institutions.

> Attendance. Verified. Smarter. Simpler.

![VeriAttend marketing website preview](public/images/marketing-site-preview.png)

![VeriAttend features section — role-based portals](public/images/features-section-preview.png)

![VeriAttend platform showcase — dashboards and analytics](public/images/platform-showcase-preview.png)

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Shadcn UI** (custom components)
- **Framer Motion**
- **Lucide Icons**
- **next-themes** (dark/light mode)
- **Prisma** + **Neon Postgres** (roadmap, votes, stats)

## Getting Started

```bash
npm install
cp .env.example .env
# Add your Neon connection strings to .env (see Database below)
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database (Neon Postgres)

The roadmap, community feedback, and live stats use **Neon** as the hosted Postgres database.

### 1. Create a Neon project

1. Go to [neon.tech](https://neon.tech) and create a free project.
2. In the Neon dashboard, open **Connect** and copy both connection strings:
   - **Pooled** → `DATABASE_URL` (for the app on Vercel/serverless)
   - **Direct** → `DIRECT_URL` (for migrations and Prisma Studio)

### 2. Configure environment variables

Create `.env` from `.env.example`:

```bash
DATABASE_URL="postgresql://...@ep-xxx-pooler....neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://...@ep-xxx....neon.tech/neondb?sslmode=require"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ROADMAP_ADMIN_KEY="your-secret-admin-key"
```

### 3. Run migrations and seed

```bash
npm run db:setup
```

This applies migrations and seeds roadmap features, stats, and sample data.

### Vercel deployment

1. In Vercel → **Storage** → **Connect Neon** (or add env vars manually).
2. Set `DATABASE_URL` (pooled), `DIRECT_URL` (direct), `NEXT_PUBLIC_SITE_URL`, and `ROADMAP_ADMIN_KEY`.
3. Deploy — `npm run build` runs `prisma migrate deploy` automatically.
4. After first deploy, seed production once from your machine:

```bash
DATABASE_URL="your-pooled-url" DIRECT_URL="your-direct-url" npm run db:seed
```

Without a database, the site still works using built-in fallback data, but voting and submissions won't persist.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Migrate DB, generate client, production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Create/apply dev migrations |
| `npm run db:deploy` | Apply migrations (production) |
| `npm run db:seed` | Seed roadmap and stats data |
| `npm run db:setup` | Deploy migrations + seed |
| `npm run db:studio` | Open Prisma Studio |

## Sections

- Sticky navigation with blur & scroll shrink
- Hero with animated dashboard mockup
- Trusted By (placeholder institutions)
- Problem statement
- Feature cards (Student, Lecturer, Admin, Super Admin)
- AI Features (Coming Soon)
- How VeriAttend Works workflow
- Platform screenshot showcase
- Product roadmap timeline
- About the developer
- Technology stack
- Testimonials (demo content)
- FAQ accordion
- Contact form
- Footer

## Deploy

Deploy to [Vercel](https://vercel.com) with one click, or run `npm run build && npm run start` for self-hosting.

---

Built with passion by **Patricia Shiloh Kanneh**
