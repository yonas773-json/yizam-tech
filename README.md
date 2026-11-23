# YIZAM Tech

Next.js 14 + Prisma + PostgreSQL. Runs on Vercel and Netlify.

## Run locally
1. `cp .env.example .env` and set `DATABASE_URL`
2. `npm install`
3. `npm run db:push && npm run db:seed`
4. `npm run dev`

## Deploy (both hosts)
1. Create a free Postgres database (Neon or Supabase) and copy its connection string.
2. Push this folder to a GitHub repo.
3. **Vercel:** Add New Project, import the repo, add env var `DATABASE_URL`, Deploy.
4. **Netlify:** Add new site, import the repo, add env var `DATABASE_URL`, Deploy.
   (Netlify detects Next.js automatically; `netlify.toml` sets the build command.)
5. Once, from your machine with `DATABASE_URL` set: `npm run db:push && npm run db:seed`.

## Included
Storefront, product API, cart, stock-safe checkout (transactional), core schema.
## Next to build
Auth and email verification, admin dashboard, sellers, payment gateway, AI assistant, remaining tables.
