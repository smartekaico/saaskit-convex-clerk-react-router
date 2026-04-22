This SOP (Standard Operating Procedure) outlines the architectural steps to build a high-performance admin dashboard using **React Router 7** (Framework Mode), **Shadcn UI**, **Convex**, **Clerk** (Auth & native Billing), and **Resend**.

---

### Phase 1: Project Initialization
1.  **Scaffold React Router 7:**
    *   Use the RR7 framework template: `npx create-react-router@latest my-admin-dash`.
    *   Initialize Shadcn UI: `npx shadcn-ui@latest init`. Choose the "New York" style and "Slate" base color for a professional admin look.
2.  **Backend Setup (Convex):**
    *   Install Convex: `npm install convex`.
    *   Run `npx convex dev` to initialize your project and environment.
3.  **Auth Integration (Clerk):**
    *   Install Clerk for RR7: `npm install @clerk/react-router`.
    *   Configure `clerkMiddleware` in `app/entry.server.tsx` (or `middleware.ts` if using Vercel).
    *   **Sync Clerk to Convex:** Create a `convex/auth.config.ts` to validate Clerk JWTs and a `convex/users.ts` mutation to sync user data (via Clerk Webhooks) into your Convex `users` table.

---

### Phase 2: Admin Dashboard Layout (Shadcn + RR7)
1.  **Shared Layout:** Create a `routes/_admin.tsx` layout file.
    *   Use the **Shadcn Sidebar** component (`npx shadcn@latest add sidebar`).
    *   In RR7, use the `<Outlet />` component to render nested child routes (Users, Billing, LLM).
2.  **Navigation Logic:**
    *   Define a `navItems` array with labels, icons (Lucide), and paths.
    *   Use RR7 `NavLink` to handle active states automatically.
3.  **Protected Routes:** Use Clerk's `Protect` component or RR7 `loader` functions to redirect non-admin users.

---

### Phase 3: User & Team Management
1.  **User Table:**
    *   In Convex, define a `users` schema: `clerkId`, `email`, `name`, `role`.
    *   Use Shadcn’s **Data Table** (`npx shadcn@latest add data-table`) to list users.
    *   Implement a Convex `query` to fetch users with pagination.
2.  **Team Invitations:**
    *   Enable **Clerk Organizations**.
    *   Use Clerk’s `<OrganizationProfile />` or `<CreateOrganization />` components for team management.
    *   **Logic:** When an admin invites a user via Clerk, Clerk handles the email. Sync the membership status to Convex using the `organizationMembership.created` webhook.

---

### Phase 4: Billing Integration (Clerk Billing)
*Note: Clerk Billing is currently in Beta and integrates directly with Stripe without manual webhook plumbing.*
1.  **Configure Clerk Dashboard:**
    *   Go to **Billing** in Clerk settings and connect your Stripe account.
    *   Define **Plans** (e.g., Free, Pro, Enterprise) and **Features** (e.g., `llm_access`, `team_seats`).
2.  **Frontend Implementation:**
    *   Drop in the `<PricingTable />` component from `@clerk/react` on a `/billing` route.
    *   Use the `has()` helper from Clerk’s `useAuth()` or `useOrganization()` to gate features:
        ```typescript
        const { has } = useAuth();
        const canAccessLLM = has({ permission: "org:llm_management:access" });
        ```
3.  **Billing Portal:** Use Clerk’s pre-built `<UserProfile />` or a direct link to the Stripe Customer Portal managed by Clerk.

---

### Phase 5: Marketing Emails (Resend + Convex)
1.  **Setup Resend Component:**
    *   Install the official component: `npm install @convex-dev/resend`.
    *   Register it in `convex/convex.config.ts`.
2.  **Email Workflows:**
    *   **Transactional:** Send welcome emails via a Convex `action` triggered by the user creation webhook.
    *   **Marketing/Broadcast:** Create a Convex `action` that iterates through your `users` table and uses `resend.batch.send()` to send bulk updates.
    *   **Tracking:** Set up a Resend webhook pointing to a Convex **HTTP Action** to track `delivered`, `opened`, and `clicked` events back into a `sent_emails` table.

---

### Phase 6: LLM Management
1.  **Configuration Table:**
    *   Create a `llm_configs` table in Convex to store model names, system prompts, and temperature settings.
    *   Build an admin UI to edit these values (Shadcn Forms + Zod).
2.  **API Key Management:**
    *   Store provider keys (OpenAI, Anthropic) in **Convex Environment Variables**. *Never* expose these to the frontend.
3.  **Streaming Implementation:**
    *   Use **Convex Actions** to call LLMs.
    *   For streaming, use the **Convex "Agent" pattern** or save message "deltas" to a `messages` table. The frontend `useQuery` will reactively update the UI as tokens arrive.

---

### Queries for You:
1.  **Organization Model:** Do you want billing to be per-user (B2C) or per-team/organization (B2B)? Clerk Billing supports both, but the setup differs slightly.
2.  **LLM Providers:** Which LLM providers are you planning to manage? (This affects whether we use the Vercel AI SDK or direct provider SDKs inside Convex Actions).
3.  **Email Templates:** Do you want to use React-based templates (React Email) with Resend, or raw HTML?