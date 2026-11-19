---
name: build
description: Implement a requested development plan from swarm-report/ by affected file scope, run appropriate checks and write a build report. Use for $build with a plan slug or execution of a saved plan; not for merely running a compiler.
license: MIT; see ../mini-harness-LICENSE.txt
---

# Build

Invoke: `$build <slug>`; the plan is `swarm-report/<slug>-plan.md`.

Read `AGENTS.md`, `.memory-bank/index.md`, the plan and any existing review or debug
report for the task. Follow [executor routing and duties](references/executors.md).

1. If the plan is absent, explain the missing path and suggest `$plan <feature>`; do not
   invent an approved plan. Check current instructions authorize implementation. A direct
   `$build <slug>` request is authorization for its described repository changes.
2. Identify unresolved HIGH blockers. Resolve from evidence or obtain the specific user
   decision needed before dependent work. Continue unrelated authorized tasks where useful.
3. Inspect the current Git state, real manifests, existing checks and affected files.
   Check whether the plan still fits the code; surface material drift before implementing
   affected steps. Preserve pre-existing edits and record the baseline.
4. Map tasks to stack-specific roles first, generic fallbacks second. Unmatched files can
   be owned by a general executor; clarify only when ownership changes the task's meaning.
5. Execute with Codex delegation only when available and allowed by the session. Otherwise
   implement each role sequentially yourself. Delegate disjoint file sets; resolve shared
   interfaces before consumers run. The main agent owns integration and shared reports.
6. Implement the plan and address relevant review findings within its scope. Run required
   checks and meaningful behavior tests. Inspect actual output and integration behavior;
   agent claims and passing tests alone do not prove all acceptance criteria are met.
7. Write or append an attempt to `swarm-report/<slug>-build.md`: status `complete` or
   `blocked`, baseline, execution mode, per-role changed files, acceptance evidence,
   commands with cwd/exit code/output excerpt, failures or missing checks, contract changes
   and remaining work. Report external actions separately from repository edits.
8. Return changed behavior, report path and actual verification outcome. A failure is not
   success; diagnose and fix within authorized scope or record a concrete blocker. Use
   `$debug` when root-cause investigation is needed, and `$review` to assess the result.
