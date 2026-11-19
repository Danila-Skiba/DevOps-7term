---
name: review
description: Review repository changes against a saved development plan or an explicitly requested diff, checking correctness, acceptance criteria and verification quality. Write severity-tagged findings and a ship/rework verdict to swarm-report/. Does not fix product code.
license: MIT; see ../mini-harness-LICENSE.txt
---

# Review

Invoke: `$review <slug>` for `swarm-report/<slug>-plan.md`, or explicitly describe the
change/base to review. Read `AGENTS.md`, `.memory-bank/index.md` and
[reviewer duties](references/reviewer.md).

1. Gather the plan and build/debug reports if present. For a missing plan, distinguish
   an intentionally requested standalone review from a mistaken slug. State unavailable
   acceptance context; do not invent criteria or claim a plan was satisfied.
2. Establish the review scope explicitly: staged and unstaged edits plus relevant untracked
   files, or committed changes against an agreed base. An empty `git diff` does not prove
   there are no changes. Record the base/range and inspect the actual changed content.
3. Use a permitted Codex reviewer subagent when available, passing request, plan, scoped
   diff, relevant context paths and test evidence. Allow targeted source inspection; do
   not forbid reading code needed to verify a finding. Otherwise perform a separate
   review pass yourself and label it self-review.
4. Check each acceptance criterion and test quality. Run focused, non-mutating checks
   where practical; distinguish observed results from reported or unavailable results.
   Do not modify product code or fix findings under this skill.
5. Write `swarm-report/<slug>-review.md` (choose a descriptive slug for standalone review):
   reviewed scope and execution mode, verdict `ship`/`rework`, severity-tagged findings
   with file/line, impact and fix direction, unmet criteria, test evidence and limitations.
   Append a dated pass when a prior report exists.
6. Return findings first, verdict, evidence limitations and report path. `rework` feeds a
   later `$build <slug>` or `$debug <symptom>`; do not silently start repairs.
