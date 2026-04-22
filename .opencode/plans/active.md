# Active Plan

## Task
Build high-performance admin dashboard

## Directive
sop_admin_main.md - React Router 7, Shadcn UI, Convex, Clerk (Auth & Billing), Resend

## Branch
master

## Scope
- Phase 1: Project Initialization (RR7 scaffold, Shadcn, Convex, Clerk auth)
- Phase 2: Admin Dashboard Layout (Shadcn Sidebar, RR7 nested routes)
- Phase 3: User & Team Management
- Phase 4: Billing Integration (Clerk Billing)
- Phase 5: Marketing Emails (Resend + Convex)
- Phase 6: LLM Management

## Constraints
- Use RR7 Framework Mode
- Follow Shadcn UI patterns
- Clerk for auth and billing (not manual Stripe)

## Steps
1. [ ] Scaffold React Router 7 (if not already)
2. [ ] Initialize Shadcn UI (New York style, Slate base)
3. [ ] Set up Convex backend
4. [ ] Configure Clerk auth with RR7
5. [ ] Create admin layout with Shadcn Sidebar
6. [ ] Build user management (Data Table)
7. [ ] Integrate Clerk Billing
8. [ ] Set up Resend for emails
9. [ ] Implement LLM config management

## Validation
- Admin dashboard loads at /app/*
- Users table fetches from Convex
- Clerk auth protects routes
- Billing flow works
- Emails send via Resend

## Queries for User
- Billing model: B2C (per-user) or B2B (per-organization)?
- Which LLM providers? (OpenAI, Anthropic, etc.)
- Email templates: React Email or raw HTML?

## Rollback
None - fresh feature build