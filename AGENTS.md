# AGENTS.md - saas-kit-react-convex-clerk

## Workflow Reference
Follow [AGENT.md](./AGENT.md) "Antigravity Protocol" for agent workflow (planning, git discipline, logging, response format, validation).

## Commands
- `bun run dev` - Start dev server (http://localhost:5173)
- `bun run build` - Build (runs tsc -b first)
- `bun run lint` - ESLint
- `npx convex dev` - Initialize/start Convex backend
- `npx shadcn-ui@latest add <component>` - Add Shadcn UI components
- `npx convex deploy` - Deploy Convex backend

## Key Facts
- React Router 7 for routing (file-based in `src/routes/`)
- Convex for backend (functions in `convex/functions/`, schema in `convex/schema.ts`)
- Clerk for auth (set `VITE_CLERK_PUBLISHABLE_KEY` in `.env`)
- Tailwind v4 with `@tailwindcss/vite` plugin
- Shadcn/ui components in `src/components/ui/`
- Pages in `src/pages/`

## Setup Required
1. Copy `.env.example` to `.env` and fill in Clerk + Convex keys
2. Run `bun install`
3. Run `npx convex dev` to set up backend

## Validation Order
`bun run lint` -> `bun run build` -> test