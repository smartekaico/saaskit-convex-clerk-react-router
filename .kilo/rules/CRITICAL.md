# CRITICAL: Agent Execution Rules

**Priority:** Security > Correctness > Reliability > Maintainability > Speed

## 0. Think Before Acting

You are probabilistic. The workflow is deterministic. Never guess if you can read, inspect, validate, or ask. If unclear after 30 seconds, stop and ask.

## 1. Source of Truth

Filesystem > chat memory. Read project files before acting.

## 2. Context Order

1. User request
2. `.agent/directives/`
3. This file
4. Domain rules
5. `.agent/plans/active.md`
6. Repository reality
7. Local skills
8. Environment tools
9. Human clarification (last resort)

Project reality beats assumptions.

## 3. Surgical Changes

- Touch only what the request demands.
- Match existing style. Don't "improve" adjacent code.
- Remove only what YOUR changes orphaned.
- Mention unrelated dead code — don't delete it.

## 4. Simplicity First

- Minimum code that solves the problem. Nothing speculative.
- No abstractions for single-use code.
- No unrequested flexibility.
- If it feels overcomplicated, it is. Rewrite.

## 5. Assumptions

- State them explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.

## 6. Goal-Driven Execution

Transform requests into verifiable goals:

- "Add validation" → "Write failing tests, then make them pass"
- "Fix bug" → "Reproduce in test, then fix"
- "Refactor X" → "Tests pass before and after"

## 7. Validation

- Prefer: local skills > project commands > environment tools > human confirmation
- Never claim a result without evidence. Never pretend a tool ran.
- Minimum: build, tests, lint/typecheck pass; no secrets; no debug artifacts.

## 8. Self-Anneal (Pre-Handoff)

Before marking complete:

- [ ]  Remove debug artifacts and YOUR orphaned dead code
- [ ]  Align with repo conventions
- [ ]  Update tests/docs if behavior changed
- [ ]  Run full validation suite
- [ ]  Review diff: every changed line traces to the request

All boxes checked, or task is not done.

## 9. Git Discipline

- Never work on `main` or protected branches.
- Branch: `feature/{scope}-{id}`, `fix/{scope}-{id}`, `chore/{scope}-{id}`
- Conventional Commits. Commit only validated changes. Record branch in `active.md`.

## 10. Safety Gates

Require approval before: production deploys, destructive ops, branch merges, infrastructure changes, secret changes, scope expansion.

Use env vars for secrets. Validate inputs. Sanitize outputs.

## 11. Done Means Done

Complete only when: scope matched, validations pass, anneal checked, no critical issues, no blocked debug loops, docs/changelog updated, branch review-ready.

## 12. Debug Loop Limit

3 failures with same error or no new evidence → stop, log to `.agent/logs/`, ask for help. No 4th attempt.

## 13. Clean State

- Dirty repo at start: stash or ask.
- Irreversible corruption: `git reset --hard` to last good commit, log, ask.
- Never force-push shared branches.

## 14. Skill Contract

Run skills by exact command (e.g., `./.agent/skills/test.sh`). Fail on non-zero. Log output, don't paraphrase.
