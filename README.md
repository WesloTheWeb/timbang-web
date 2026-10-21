# Timbang

**Timbang finds the cheapest mix of real foods that hits your exact nutrition targets.**

*Timbang* is Filipino for weight and balance, which is exactly what the app does: it weighs ingredients against your goals and finds the balance.

> Status: early development. Items marked *(planned)* don't exist yet.

---

## What it does

You state a goal, for example "at least 20g protein, under 250 calories, no peanuts, 50 to 70g per serving." Timbang:

1. Looks up real nutrition data from the USDA FoodData Central database.
2. Uses the ingredients and prices in your pantry.
3. Solves for the exact grams of each ingredient that meet every target at the lowest cost.
4. Shows the result's cost and nutrition per serving, and saves it.

No typing in nutrition facts and no guessing.

Goals are entered through a simple form, and food search runs entirely on Postgres, so the core app needs no AI and no paid services. Typing a goal as a sentence ("a snack bar with 20g protein, no peanuts") is a planned AI feature.

## Use cases

- **Cut cost, keep macros.** A small food maker re-solves her snack bar to be 15% cheaper with the same protein.
- **Hit a meal target on a budget.** A meal-prepper sets 40g protein, under 600 kcal and under $4, and gets the cheapest mix from his pantry.
- **Know your true cost.** Enter an existing recipe as a formula and see its real cost and nutrition per serving.
- **Track price changes.** Update an ingredient's price; every formula that uses it reflects the new cost.
- **Search real foods.** Find "rolled oats" across the USDA database, typos included, and add it to your pantry with your price.

## Planned features

Not in v1. Each one is designed to fit the current architecture.

- **Teams:** shared pantries and formulas, with tenant-scoped Row Level Security
- **Chat channels:** a Node.js + socket.io microservice for team and topic channels
- **AI goal entry:** describe a goal in plain English; an LLM converts it to targets you confirm
- **AI substitutions:** suggested ingredient swaps, re-solved for cost and macros
- **Price sync:** a microservice pulling live grocery prices
- **Price alerts, formula history and cost trends**

---

## Repositories

| Repo | Contains |
| --- | --- |
| `timbang-web` (this repo) | Next.js frontend |
| [`timbang-api`](#) | FastAPI backend, solver, USDA data loader, Supabase migrations |

## Tech stack

### Frontend

| Tool | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org/) (App Router) + TypeScript | App framework, pages and dynamic routes. Bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) |
| SCSS Modules | Component-scoped styles |
| [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) | Optimized font loading ([Geist](https://vercel.com/font)) |
| [TanStack React Query](https://tanstack.com/query) | Server state: fetching, caching, refetching |
| [Redux Toolkit](https://redux-toolkit.js.org/) | UI-only client state |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Config-driven form builder and validation |
| [@supabase/supabase-js](https://supabase.com/docs/reference/javascript) | Sign-in and session handling |
| [openapi-typescript](https://openapi-ts.dev/) | TypeScript types generated from the API's OpenAPI spec |

### Backend

| Tool | Purpose |
| --- | --- |
| [FastAPI](https://fastapi.tiangolo.com/) + Pydantic | API endpoints and validation; Swagger UI at `/docs` |
| [asyncpg](https://magicstack.github.io/asyncpg/) | Raw Postgres SQL from Python |
| [SciPy](https://scipy.org/) | Linear-programming solver (`linprog`) |
| [PyJWT](https://pyjwt.readthedocs.io/) | Verifies Supabase JWTs via JWKS |
| [Supabase](https://supabase.com/) | Postgres, Auth, Row Level Security, CLI migrations |
| Postgres full-text search + `pg_trgm` | Food search with ranking and typo tolerance |

### Testing

| Layer | Tools |
| --- | --- |
| Frontend unit and component | [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |
| API mocking | [MSW](https://mswjs.io/) |
| End to end | [Playwright](https://playwright.dev/) |
| Backend | [pytest](https://docs.pytest.org/), [httpx](https://www.python-httpx.org/) |
| Database (RLS, constraints) | [pgTAP](https://pgtap.org/) via `supabase test db` |
| CI | GitHub Actions |

### Data

- [USDA FoodData Central](https://fdc.nal.usda.gov/): SR Legacy, Foundation Foods and Branded Foods, loaded in bulk. Public domain.

---

## Getting started

### Prerequisites

- Node.js (LTS) and npm
- For the full stack only:
  - Python 3.11+
  - [Docker Desktop](https://www.docker.com/products/docker-desktop/), running
  - [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started)
    - Mac: `brew install supabase/tap/supabase`
    - Windows: `scoop bucket add supabase https://github.com/supabase/scoop-bucket.git` then `scoop install supabase`

### Frontend only

```bash
git clone https://github.com/<your-username>/timbang-web.git
cd timbang-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app's entry page is `app/page.tsx`, and the page auto-updates as you edit.

npm is the package manager for this repo. `yarn dev`, `pnpm dev` and `bun dev` also work, but stick to one so there's only one lockfile.

Once environment variables are added, copy the example file first *(planned)*:

```bash
cp .env.example .env.local      # Windows (PowerShell): copy .env.example .env.local
```

The frontend will run against mocked API responses (MSW) so the UI can be built before the backend exists *(planned)*.

### Full stack (local)

**1. Start the database and API** (in `timbang-api`):

```bash
supabase start                  # local Postgres, Auth and Studio in Docker
supabase db reset               # applies all migrations and seed.sql

python -m venv .venv
source .venv/bin/activate       # Windows (PowerShell): .venv\Scripts\Activate.ps1
pip install -r requirements.txt

python -m worker.load_usda --target local   # (planned) bulk-loads USDA data
uvicorn app.main:app --reload --port 8000
```

- API: [http://localhost:8000](http://localhost:8000)
- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- Supabase Studio: [http://127.0.0.1:54323](http://127.0.0.1:54323)

**2. Point the frontend at it** (in `timbang-web`, `.env.local`):

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable key printed by `supabase start`>
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_MOCKING=disabled
```

Then `npm run dev`.

**3. Generate API types** (whenever the API changes):

```bash
npx openapi-typescript http://localhost:8000/openapi.json -o types/api.ts
```

### Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint |
| `npm test` | Unit and component tests (Vitest) *(planned)* |
| `npm run test:e2e` | End-to-end tests (Playwright) *(planned)* |

---

## Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (anon) key. Safe in the browser because RLS is enabled on every user table |
| `NEXT_PUBLIC_API_URL` | Base URL of `timbang-api` |
| `NEXT_PUBLIC_API_MOCKING` | `enabled` to use MSW mocks, `disabled` to call the real API |

Never commit `.env.local`. The Supabase secret key lives only in `timbang-api`.

---

## Deployment

The frontend deploys to [Vercel](https://vercel.com/new). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying). Set the environment variables above in the Vercel project settings, pointing at the hosted Supabase project and API.

`timbang-api` deploys separately (Render, Railway or Fly.io).

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn), an interactive tutorial
- [Supabase local development](https://supabase.com/docs/guides/local-development)
- [FastAPI documentation](https://fastapi.tiangolo.com/)

## License

MIT *(or your choice)*
