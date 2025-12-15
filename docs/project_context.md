# Project Context & PRD

## 1. Project Overview

**Name:** SaaS Kit React Convex Clerk
**Description:** A reusable SaaS starter kit designed for modern web applications. It provides a foundation for building scalable, high-performance SaaS products with a focus on developer experience and UI excellence.

## 2. Tech Stack

### Frontend

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:**
  - [Shadcn UI](https://ui.shadcn.com/) (Headless accessibility + Tailwind)
  - [Magic UI](https://magicui.design/) (Visual effects & animations) - _Requires `framer-motion`_
- **Routing:** [TanStack Router](https://tanstack.com/router/latest)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend & Data

- **Database / Backend-as-a-Service:** [Convex](https://convex.dev/)
  - Real-time updates
  - Typesafe backend functions

### Authentication & Billing

- **Auth:** [Clerk](https://clerk.com/)
- **Billing:** [Clerk Billing](https://clerk.com/docs/billing/overview) (Invoices, Subscriptions, Customer Portal).

## 5. Roadmap & Recommendations

### Feature Enhancements

#### Analytics & Monitoring

- **[PostHog](https://posthog.com/)**: Comprehensive product analytics, session recording, and feature flags. Open-source friendly.
- **[Sentry](https://sentry.io/)**: Real-time error tracking and performance monitoring. Critical for production apps.

#### Security (Free Tier Friendly)

- **[Arcjet](https://arcjet.com/)**: Application security for JS developers. Includes Rate Limiting, Bot Protection, and Email Validation. Has a generous free tier.
- **[Snyk](https://snyk.io/)** or **GitHub Dependabot**: Automated dependency scanning to find vulnerabilities in `node_modules`.

#### Communications

- **[Resend](https://resend.com/)**: Modern email API for transactional emails (welcome sequences, notifications).
- **[React Email](https://react.email/)**: Build email templates using React components.

#### Internationalization (i18n)

- **[LinguiJS](https://lingui.dev/)** or **[react-i18next](https://react.i18next.com/)**: Essential for targeting global markets. Lingui is often lighter and has great extraction tooling.

#### Testing

- **[Vitest](https://vitest.dev/)**: Fast unit testing (replace Jest).
- **[Playwright](https://playwright.dev/)**: Reliable End-to-End (E2E) testing. Recommended for verifying critical user flows like Authentication and Billing.

### Tech Stack Alternatives

#### Framework Options

- **To Next.js**: If **Server Side Rendering (SSR)** is required for SEO or initial load performance.
  - _Trade-off_: More complex deployment (requires Node.js runtime or Vercel) vs. Vite's static output.
- **To Remix**: Strong focus on web standards and progressive enhancement.

#### Backend Alternatives

- **[Supabase](https://supabase.com/)**:
  - _Why_: If you prefer a traditional SQL (PostgreSQL) relational model over Convex's document model.
  - _Includes_: Auth, Realtime, Storage, Edge Functions.

### SEO & Performance

- **Meta Tags**: Leverage **TanStack Router's** built-in meta tag management for dynamic titles and descriptions.
- **Sitemap**: Script generation of `sitemap.xml` for indexability.
- **Image Optimization**: If staying on Vite, use modern formats (WebP/AVIF) manually or via plugins like `vite-plugin-image-optimizer`.

## 3. Architecture

### Pages & Routing

- **Landing Page (`/`)**:
  - Public facing.
  - Sections: Hero (Main features), Pricing Table, Contact/Footer.
- **Authenticated Dashboard (`/dashboard`)**:
  - Protected route (requires login).
  - Layout: Sidebar navigation (Shadcn), Topbar (User profile).
  - Sub-pages:
    - `_layout` (Dashboard Shell)
    - `index` (Overview)
    - `projects`
    - `settings`

### Directory Structure (Key Paths)

- `src/components`: Reusable UI components (Shadcn UI, Custom).
- `src/pages`: Route component definitions.
  - `src/pages/auth`: Auth-related pages (Sign-in/up).
  - `src/pages/landing.tsx`: Main landing page.
  - `src/pages/dashboard.tsx`: Dashboard layout and sub-views.
- `convex/`: Backend functions (queries, mutations).

## 4. Development Guidelines

### Coding Standards

- **Functional Components:** Use React Functional Components with Hooks.
- **Strict TypeScript:** Maintain strict type safety. Avoid `any`.
- **Tailwind First:** Use utility classes for styling. Use `cn()` utility for merging classes.
- **Shadcn Convention:** Components installed via CLI are in `src/components/ui`. Don't modify them heavily unless necessary; wrap or compose them.

### Agentic Workflow

- Refer to this document for project context.
- When adding features, ensure compatibility with Convex real-time nature.
- Updates to schema must be reflected in `convex/schema.ts`.
