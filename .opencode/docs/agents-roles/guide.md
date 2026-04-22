---
To execute this project efficiently using your specific tech stack, here is the team assembly. Each agent is tailored to the nuances of **Convex’s** real-time nature, **React Router 7’s** framework capabilities, and **Clerk’s** unified Auth/Billing ecosystem.

### 1. The Architect (System & Integration Lead)
*   **Role:** Designs the data flow between Clerk, Convex, and the LLM providers.
*   **Skills:** Distributed systems, Clerk JWT verification, Convex Schema design, Stripe/Clerk Billing logic.
*   **Responsibilities:**
    *   Define the **Convex Schema** (Relational mapping for Users, Teams, and LLM Configs).
    *   Design the **Webhook Strategy**: Ensuring Clerk user/billing events sync perfectly with the Convex database.
    *   Architect the **LLM Orchestration**: Deciding how Convex Actions will handle long-running LLM calls and streaming.

### 2. Frontend Engineer (UI/UX Specialist)
*   **Role:** Builds the "Single Page Application" experience using React Router 7 and Shadcn UI.
*   **Skills:** React Router 7 (Loaders/Actions), Tailwind CSS, Shadcn UI, Lucide Icons, React Hook Form + Zod.
*   **Responsibilities:**
    *   Implement the **Layout System**: Sidebar navigation, breadcrumbs, and responsive dashboard shells.
    *   Build **Data Tables**: Using Shadcn’s table components to manage users and view billing history.
    *   **State Management:** Utilizing Convex `useQuery` and `useMutation` hooks for real-time UI updates without needing Redux/Zustand.

### 3. Backend & Integration Engineer (The "Glue")
*   **Role:** Develops the server-side logic and third-party API integrations.
*   **Skills:** TypeScript, Convex Actions/Functions, Resend SDK, OpenAI/Anthropic SDKs.
*   **Responsibilities:**
    *   **Email Workflows:** Coding the Convex Actions that trigger Resend for transactional and marketing emails.
    *   **LLM Implementation:** Writing the logic for LLM prompt management and streaming responses back to the frontend.
    *   **Billing Logic:** Integrating Clerk’s `<PricingTable />` and handling entitlement checks (e.g., "Does this user have the 'Pro' role to access GPT-4?").

### 4. DevOps & Security Engineer
*   **Role:** Ensures environment stability, security, and deployment pipelines.
*   **Skills:** Convex CLI, Clerk Security (RBAC), Environment Variable Management, GitHub Actions.
*   **Responsibilities:**
    *   **Environment Management:** Setting up `prod` vs `dev` deployments in Convex and Clerk.
    *   **Security Gating:** Implementing Clerk middleware and Convex query protection to ensure admins only see admin data.
    *   **Secret Management:** Securely storing Resend and LLM API keys within the Convex dashboard.

### 5. Marketing & Product Agent
*   **Role:** Owns the user communication experience and onboarding flow.
*   **Skills:** React Email, Copywriting, Marketing Automation, Resend Analytics.
*   **Responsibilities:**
    *   **Email Templates:** Designing beautiful, responsive emails using **React Email** to be sent via Resend.
    *   **Onboarding Flow:** Defining the "Team Invitation" experience (what happens from the moment an invite is sent to the moment the user joins).
    *   **Analytics:** Monitoring Resend open rates and Clerk billing conversion rates to suggest dashboard improvements.

---

### Agent Collaboration Workflow (Example: Team Invitation)

1.  **Marketing Agent** designs the "Join our Team" email template using React Email.
2.  **Architect** defines the `invitations` table in Convex.
3.  **Frontend Engineer** builds the "Invite Member" modal using Shadcn UI and React Router 7 `Action`.
4.  **Backend Engineer** writes the Convex `action` that:
    *   Calls Clerk to create an organization invitation.
    *   Triggers Resend to send the Marketing Agent's template.
5.  **DevOps Engineer** ensures the Webhook endpoint is live to catch when the user clicks "Accept."

**Do you want me to provide a specific file structure for this team to follow, or should we dive into the Convex Schema design first?**