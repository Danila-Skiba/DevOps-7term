---
name: plan
description: Plan a feature or substantial refactor before implementation, using planner and skeptic roles. Write acceptance criteria, affected files, checks and blockers to swarm-report/. Use for a development plan or $plan; skip trivial direct fixes.
license: MIT; see ../mini-harness-LICENSE.txt
---

# Plan

Invoke: `$plan <feature description>`.

Read the repository `AGENTS.md` and `.memory-bank/index.md`. Follow their artifact and
delegation rules. Read [planning roles](references/roles.md) for planner and skeptic duties.

1. Derive a short kebab-case slug; avoid overwriting another task's plan. Inspect relevant
   source and manifests. Missing context means explicit assumptions, not invented facts.
2. Run the planner role to draft observable acceptance criteria, affected files, ordered
   steps, checks, risks and scope boundaries. No product code edits.
3. Run the skeptic role against that concrete draft. With permitted Codex delegation,
   give the skeptic the draft and relevant source references; otherwise do a distinct
   critical pass yourself. Do not describe the latter as an independent review.
4. Merge supported HIGH and MED findings. Record remaining uncertainties and unresolved
   HIGH issues under Blockers with the decision needed. Do not silently waive them.
5. Write `swarm-report/<slug>-plan.md` with these sections:
   - Summary and original request
   - Acceptance criteria (observable, independently checkable)
   - Affected files (path, intended change, owning executor role)
   - Ordered steps and cross-layer dependencies
   - Verification (commands or behavior to check, derived from the repository)
   - Risks and skeptic findings, including how each was resolved
   - Blockers (`None` when empty), assumptions and out of scope
6. Return the plan path, short summary, and any decision needed before implementation.
   Stop after planning unless the user already requested subsequent implementation.

Planning alone does not authorize implementation or external actions. Honor a request
for an interactive discussion rather than imposing an unrequested implementation phase.
