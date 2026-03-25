# CLAUDE.md

D&D Dungeon Master toolkit built with SvelteKit 5 (Svelte 5 runes), Tailwind CSS 4 + DaisyUI, deployed to Vercel Edge Runtime.

## Commands

```sh
pnpm run dev       # dev server
pnpm run check     # type check
pnpm run lint      # ESLint
pnpm run format    # Prettier
pnpm run test      # Playwright E2E
pnpm run ci        # lint → check → build → test
```

## Stack

- **SvelteKit 5** with Svelte 5 runes (use `$state`, `$derived`, `$effect`)
- **Tailwind CSS 4** + DaisyUI components
- **Dexie** (IndexedDB) for client-side persistence
- **Vercel AI SDK** + `@ai-sdk/gateway` for AI generation (server-side only)
- **TypeScript** strict mode

## Structure

```
src/
  routes/
    (tools)/          # sidebar layout group
      initiative/     # initiative tracker
      gold/           # gold calculator
      warfare/        # warfare tool
      generator/      # AI generators (NPC, tavern, shop)
  lib/
    modules/          # feature modules
    components/       # reusable UI
    data/             # Dexie DB setup
    ai.server.ts      # server-side AI helpers
e2e/                  # Playwright tests
```

## Key Conventions

- AI generation is server-side only (keeps API keys secure via `VERCEL_OIDC_TOKEN`)
- `ClientOnly` wrapper for browser-only components (Dexie/IndexedDB)
- Optional `PASSWORD` env var gates access via login route
- AI output: Zod schemas + markdown templates → sanitized HTML via Showdown
