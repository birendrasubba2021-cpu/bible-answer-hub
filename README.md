# Bible Answer Hub

**Biblical Answers for Every Question of Faith, Theology, and Life.**

A modern, professional, highly searchable theological knowledge platform focused
on biblical questions and answers. Built to scale toward 50,000+ questions, plus
articles, videos, and resources, with excellent SEO and performance.

Founder: **Apologist Birendra Subba** (B.Th., M.Div., M.Th. New Testament)

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **lucide-react** icons
- **Prisma + PostgreSQL** (production database — see `prisma/schema.prisma`)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/                 # Routes (App Router)
    page.tsx           # Homepage (hero + search, trending, departments)
    questions/         # All questions + question detail pages
    departments/       # Departments listing + detail pages
    search/            # Search results
    about, contact     # Static pages
    articles, videos, resources  # Coming soon (later phases)
    sitemap.ts, robots.ts        # SEO
  components/          # Header, footer, cards, search, explorer
  lib/                 # Content layer (types, departments, questions, helpers)
prisma/
  schema.prisma       # Production database blueprint (PostgreSQL)
```

## Content layer (Phase 1)

The site currently runs on a **TypeScript content layer** in `src/lib` so it
works with zero external setup. The data shape matches `prisma/schema.prisma`,
so migrating to PostgreSQL later is straightforward:

1. Provision PostgreSQL (Supabase / Neon / local).
2. Set `DATABASE_URL` in `.env`.
3. `npx prisma migrate dev --name init`
4. Seed from the existing `src/lib` content.

## Roadmap

- **Phase 1 (done):** Foundation, departments, sample Q&A, homepage, search, SEO.
- **Phase 2:** PostgreSQL + Prisma, real search (Meilisearch/Typesense).
- **Phase 3:** Admin dashboard, draft→review→publish workflow.
- **Phase 4:** Bulk content (50,000+ questions), articles, videos, resources.
- **Phase 5:** Nepali / multi-language support.
