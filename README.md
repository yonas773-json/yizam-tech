# YIZAM Tech

Next.js 14 + Prisma + PostgreSQL e-commerce storefront.  
Works on **Vercel** and **Netlify**.

## Quick start (local)

```bash
# 1. Clone
git clone https://github.com/yonas773-json/yizam-tech.git
cd yizam-tech

# 2. Install
npm install

# 3. Environment
cp .env.example .env
# Edit .env and set a real Postgres connection string, e.g. from Neon or Supabase:
# DATABASE_URL="postgresql://user:pass@host:5432/yizam?sslmode=require"

# 4. Database
npx prisma db push
npm run db:seed

# 5. Run
npm run dev
```

Open http://localhost:3000

## Deploy (recommended: Vercel)

1. Create a free Postgres database:
   - [Neon](https://neon.tech) or [Supabase](https://supabase.com) → copy the connection string
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** the GitHub repo `yonas773-json/yizam-tech`
3. Add Environment Variable:
   - Name: `DATABASE_URL`
   - Value: your Postgres connection string
4. Click **Deploy**
5. After the first successful deploy, run once (from your machine or Vercel CLI):

```bash
npx prisma db push
npm run db:seed
```

You will get a live URL like `https://yizam-tech-xxx.vercel.app`.

### Netlify
Same idea: import the repo, add `DATABASE_URL`, deploy.  
`netlify.toml` is already configured.

## What is included

- Storefront with product grid
- Add to cart (localStorage)
- Cart page + stock-safe checkout (Prisma transaction)
- Product API
- Core Prisma schema (User, Product, Category, Order, Payment…)

## Common errors & fixes

| Error | Fix |
|-------|-----|
| `Environment variable not found: DATABASE_URL` | Create `.env` from `.env.example` and set the value, or add it in Vercel/Netlify |
| `@prisma/client did not initialize yet` | Run `npx prisma generate` (or `npm install` which runs postinstall) |
| `Can't reach database server` | Check the connection string, SSL mode, and that the DB is not paused (Neon free tier pauses) |
| Build fails on Vercel | Make sure `DATABASE_URL` is set in the project Environment Variables |
| No products shown | Run `npm run db:seed` after `db:push` |

## Next features to build

Auth + email verification, admin dashboard, sellers, payment gateway, AI assistant.
