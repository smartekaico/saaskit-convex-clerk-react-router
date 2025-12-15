# Agentic Implementation & Management Plan

This document outlines the strategy for structuring the project to support a multi-agent development workflow. The goal is to isolate context and responsibilities so that specialized agents (Product Manager, Architect, Developer) can work autonomously and effectively.

## 1. Core Philosophy: "Documentation as Interface"

Agents should communicate primarily through structured documentation in the repository, rather than ephemeral chat context. This ensures a Single Source of Truth (SSOT) and allows agents to pick up work asynchronously.

- **PM Agent** writes to `docs/specs/`
- **Architect Aget** writes to `docs/plans/`
- **Developer Agent** reads plans and writes to `src/`

## 2. Directory Structure Enhancements

To support this, we recommend the following directory structure additions:

```text
/
├── .agent/                   # Agent-specific configuration (ignored by git usually, or committed if shared)
│   ├── personas/             # Instructions/System prompts for specific roles
│   └── memory/               # Scratchpad for agents to persist state
├── docs/
│   ├── specs/                # INPUT for Devs. Output of PM/Architect. (PRDs, User Stories)
│   ├── architecture/         # ADRs (Architecture Decision Records) and Diagrams.
│   ├── implementation_plans/ # Detailed technical steps for specific tasks.
│   └── changelog/            # Structured log of changes for QA verification.
└── scripts/
    └── agent/                # Utilities for agents (e.g., "validate-structure")
```

## 3. Agent Roles & Responsibilities

### 🎩 Product Manager (PM) Agent

- **Focus**: User Requirements, Business Logic, Scope.
- **Input**: User chat requests, raw feedback.
- **Output**: `docs/specs/feature-name.md` (PRD).
- **Directives**: "Create a comprehensive PRD for [Feature]. Focus on user flows and acceptance criteria. Do not write code."

### 🏗️ Tech Lead / Architect Agent

- **Focus**: System Design, Database Schema, Security, Feasibility.
- **Input**: `docs/specs/feature-name.md`.
- **Output**: `docs/architecture/decision-record.md`, `convex/schema.ts` (drafts), and **Implementation Plans**.
- **Directives**: "Analyze the PRD. Identify necessary schema changes in Convex. Break down the work into atomic distinct steps for the Developer Agent."

### 👨‍💻 Developer Agent

- **Focus**: Execution, Coding, Fixing.
- **Input**: `docs/implementation_plans/feature-name.md`.
- **Output**: Source code (`src/` components, logic), tests.
- **Directives**: "Execute Step 1 from the plan. Verify locally. Then move to Step 2."

### 🕵️ QA / Review Agent

- **Focus**: Verification, Edge Cases, Stress Testing.
- **Input**: `src/` (current code) vs `docs/specs/` (requirements).
- **Output**: `docs/qa_reports/report.md`.
- **Directives**: "Read the PRD. Write a Playwright test to verify the happy path. Report any discrepancies."

### 🤖 Automation / n8n Agent

- **Focus**: Integrations, Background Workflows, Webhooks.
- **Input**: `docs/workflows/request.md` or Direct Chat Triggers.
- **Output**: `n8n/workflows/*.json`, Trigger URLs.
- **Tools**: `n8n-mcp` (for creating/managing workflows).
- **Directives**: "Create an n8n workflow that listens for a Stripe webhook and updates the Convex database via HTTP mutation."

## 4. The "Agent Contract" Workflow

How a feature moves from idea to production 🚀

### 1. 📝 Drafting (Product Manager)

- **Trigger**: User provides a broad goal or feature request.
- **Action**: PM Agent interviews the user (if needed) and drafts a specification.
- **Deliverable**: `docs/specs/00X-feature-name.md` (High-level PRD).

### 2. 🏗️ Structuring (Architect)

- **Trigger**: New spec appearing in `docs/specs/`.
- **Action**:
  - Architect Agent analyzes requirements.
  - Checks `convex/schema.ts` for necessary data model changes.
  - Determines if **n8n Automation** is needed (e.g., for third-party integrations).
- **Deliverable**: `docs/implementation_plans/00X-feature-name-plan.md` (Step-by-step Technical Plan).

### 3. ⚙️ Automation Design (n8n Agent) _Optional_

- **Trigger**: Implementation Plan calls for external integration.
- **Action**:
  - n8n Agent reads the plan.
  - Mocks up the workflow using `n8n-mcp`.
  - Generates webhook URLs for the Developer to use.
- **Deliverable**: `n8n/workflows/00X-workflow.json` and active Webhook endpoints.

### 4. 🔨 Execution (Developer)

- **Trigger**: Completed Implementation Plan.
- **Action**:
  - Dev Agent iterates through the plan's checklist.
  - Implements frontend components and backend mutations.
  - Connects to n8n webhooks if specified.
- **Deliverable**: Code Commits & Pull Request.

### 5. ✅ Verification (QA)

- **Trigger**: Code changes applied.
- **Action**:
  - QA Agent scans modified files.
  - Runs `npx playright test` for critical flows.
  - Verifies n8n workflow triggers (if applicable).
- **Deliverable**: `docs/project_context.md` update (Feature Status: Live).

## 5. Agent Customization & Global Rules

To tailor agents to specific project needs and enforce global standards, we utilize a configuration-driven approach.

### 🎭 System Prompts & Personas

Define the "soul" of each agent in `.agent/personas/*.md`.

- **Global Rules**: Injected into every agent's prompt.
  - "Always prioritize TypeScript strict mode."
  - "Never modify `convex/schema.ts` without a migration plan."
  - "Communicate using concise, bulleted lists."
- **Role-Specific Rules**:
  - **PM**: "Adopt a user-centric mindset. Question assumptions."
  - **Dev**: "Follow the 'Clean Code' principles. Write meaningful variable names."

### 🛡️ Workflow Hooks & Guardrails

Enforce standards automatically during the workflow transitions.

- **Pre-Spec Hook**: Ensure user request contains minimum required context before PM starts drafting.
- **Pre-Code Hook (Architect)**: Validate that `convex/schema.ts` changes are backwards compatible.
- **Pre-Commit Hook (Dev)**: Run `npm run lint` and `npm run typecheck` before marking task as done.

### 📝 Global Documentation Standards

All agents must adhere to the **"Documentation as Interface"** protocol:

- **Format**: Markdown with clear headers.
- **Linking**: Use relative links to reference other specs or plans.
- **Versioning**: Prefix files with `00X-` to maintain order.

## 6. Next Steps for Implementation

1.  **Create Folders**: Create the `docs/specs` and `docs/implementation_plans` directories.
2.  **Define Prompts**: Write "System Prompt" files for the User to copy-paste when instantiating these specific agents.
3.  **Pilot Feature**: Pick a small feature (e.g., "User Settings Page") and run it through this pipeline strictly.
