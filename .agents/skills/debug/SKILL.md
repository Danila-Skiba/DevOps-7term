---
name: debug
description: Diagnose a reproducible bug, failing test or blocked build through evidence and hypothesis testing, apply a minimal authorized fix and verify the same reproduction. Save the investigation in swarm-report/. Use for failures, not new feature design.
license: MIT; see ../mini-harness-LICENSE.txt
---

# Debug

Invoke: `$debug <error, failing test, symptom or feature slug>`.
Read `AGENTS.md`, `.memory-bank/index.md`, relevant plan/build/review reports, and
[debugger duties](references/debugger.md).

1. Capture the symptom and environment. Treat input as a slug only when a matching task
   report exists; otherwise use it as a symptom and derive a descriptive report slug.
2. Run a permitted Codex debugger subagent or execute its role yourself when delegation
   is unavailable. Supply the verbatim error, context, relevant reports and fix scope.
   A diagnosis-only request does not authorize code changes.
3. Reproduce before fixing. If reproduction fails, gather available evidence, record
   `cannot_reproduce` and ask for the missing reproduction detail; do not guess-patch.
4. Test competing hypotheses, isolate the root cause, make the smallest authorized fix
   and rerun the same reproduction plus appropriate regression checks. Preserve a useful
   regression test when warranted; record why one is impractical if applicable.
5. Write or append `swarm-report/<slug>-debug.md`: status `fixed`, `root_cause_found`,
   `cannot_reproduce` or `stuck`; exact symptom, command/cwd/exit code/output excerpts,
   hypotheses and probes, root cause and evidence, changed files, regression coverage,
   rerun results, limitations and next action. Redact secrets from captured output.
6. Return cause, fix, verification and report path. Suggest `$review <slug>` for a repaired
   planned feature. When blocked, expose evidence and the next decision; do not claim fixed
   or launch a broader redesign without authorization.
