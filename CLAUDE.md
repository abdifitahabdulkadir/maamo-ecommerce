# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Common Commands

All tasks are run through Nx using pnpm. Project names match the `name` field in each app's `package.json` (`web`, `api`, `@org/lib`).

```bash
# Development servers
pnpm nx run web:dev        # Next.js frontend on localhost:3000
pnpm nx run api:dev        # NestJS backend (watch mode)

# Build
pnpm nx run web:build
pnpm nx run api:build
pnpm nx build @org/lib     # Must build before web/api can consume compiled output

# Lint
pnpm nx run web:lint
pnpm nx run api:lint

# TypeScript project references sync (run after changing inter-project imports)
pnpm nx sync
```

## Architecture

This is a pnpm Nx monorepo with two apps and one shared library:

- **`apps/web`** — Next.js 16 (App Router, React 19) frontend
- **`apps/api`** — NestJS 11 backend
- **`lib/`** — `@org/lib` shared library containing Zod validation schemas used by both apps

### Shared Library (`@org/lib`)

`lib/\*' is the file that exports all resuable interfaces, types, enums an so on for both web and api. check this file for the latest list of exports before you proceed with creating any types/shared interfaces.

### Web App (`apps/web`)

**Route structure** (Next.js App Router with route groups):

- `app/(auth)/login` and `app/(auth)/register` — unauthenticated pages
- `app/(root)/` — authenticated/main app shell (has its own layout)

**UI layer:**

- shadcn/ui components live in `components/ui/` (style: `radix-nova`, Tailwind v4 CSS variables)
- Feature components (e.g. auth forms) live in `components/<feature>/`
- The `@/` path alias resolves to `apps/web/` (components, lib/utils, hooks)

**Form pattern:** Auth forms use `react-hook-form` + `@hookform/resolvers/zod` with schemas imported from `@org/lib`.

**Fonts:** Geist Sans, Geist Mono, and Roboto (as `--font-heading`) loaded via `next/font/google` in the root layout.

### Next.js Version Note

This project uses Next.js 16, which has breaking changes from earlier versions. Before writing Next.js-specific code, check `node_modules/next/dist/docs/` for the relevant guide (per `apps/web/AGENTS.md`).

---

## Feature Development Guidelines

### Adding a Feature — Web (`apps/web`)

Follow these steps in order when adding any new feature to the web app:

1. **Check `@org/lib` first.** Before creating any types, interfaces, enums, or Zod schemas, read `lib/` exports. Reuse what exists; add new shared types to `@org/lib` (not locally) so the API can share them.
2. **Plan the route.** Place pages under the correct route group: `(auth)/` for unauthenticated, `(root)/` for authenticated.
3. **Use shadcn/ui for all UI.** Every UI primitive (button, input, dialog, card, table, form, etc.) must come from shadcn/ui. If the component is not yet installed, install it with `pnpm dlx shadcn@latest add <component>` — do this automatically without asking, unless the user explicitly rejects it.
4. **CSS goes in `global.css` only.** Do not write inline styles, `style` props, or component-scoped CSS files. All custom CSS classes, CSS variables, and overrides belong in `apps/web/app/global.css`. Use Tailwind v4 utility classes in JSX where possible; extract a class to `global.css` when a pattern repeats or Tailwind alone cannot express it.
5. **No hardcoded values.** Never hardcode strings (labels, messages, URLs, limits, keys, IDs, magic numbers). Ask the user to confirm the correct value before using it. Exceptions: structural JSX (e.g. layout `className` utilities) and values the user has explicitly approved in this conversation.
6. **Forms.** Use `react-hook-form` + `@hookform/resolvers/zod`. The Zod schema must come from (or be added to) `@org/lib`.
7. **Feature component location.** Place feature-level components in `components/<feature>/`. Shared primitives go in `components/ui/` (shadcn-managed).
8. **After coding:** run `pnpm nx run web:lint` and fix any errors before reporting done.

### Adding a Feature — API (`apps/api`)

Follow these steps in order when adding any feature to the NestJS backend:

1. **Check `@org/lib` first.** Reuse existing Zod schemas and types. Add shared validation schemas to `@org/lib` so the web app can import them too.
2. **Module structure.** Each feature gets its own NestJS module folder: `module/`, `controller/`, `service/`, `dto/`, `entity/` . Wire the module into `AppModule`.
3. **DTOs.** Derive DTOs from `@org/lib` Zod schemas using `createZodDto` (or equivalent) — do not duplicate validation logic.
4. **No hardcoded values.** Configuration (ports, secrets, connection strings, feature flags) must come from environment variables via NestJS `ConfigModule`. Never hardcode these. Ask the user for the correct env var name if unknown.
5. **After coding:** run `pnpm nx run api:lint` and fix any errors before reporting done.

### Shared changes (both apps)

- When adding or changing anything in `@org/lib`, rebuild it first (`pnpm nx build @org/lib`) before running the web or API app.
- Run `pnpm nx sync` after any inter-project import changes.
- Never duplicate a type or schema that already exists in `@org/lib`.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
