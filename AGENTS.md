# Project working agreement

## Context and artifacts

- Read `.memory-bank/index.md` first, then only the relevant linked context. Verify it
  against the repository; record unknown facts as unknown rather than inventing them.
- Store durable project context and decisions in `.memory-bank/`. Keep its index small
  and link only existing files. Never store credentials or sensitive command output.
- Store task plans and reports in `swarm-report/`: `<slug>-plan.md`, `<slug>-build.md`,
  `<slug>-review.md`, `<slug>-debug.md`. Use short kebab-case slugs. Preserve existing
  reports; append a dated attempt or choose a distinct slug for an unrelated task.

## Development loop

Project skills live in `.agents/skills/`. Invoke them as `$plan`, `$build`, `$review`,
and `$debug` (the arguments are ordinary prompt text). `$plan` is a skill; Codex's
built-in `/plan` command selects a collaboration mode and is a different mechanism.

1. `$plan <feature>` investigates and writes a plan with acceptance criteria. It does
   not edit product code or begin implementation by itself.
2. `$build <slug>` implements that plan within the user's authorized scope and records
   verification. An explicit build request authorizes that plan unless the user narrows
   it; do not add a second approval step. Resolve material blockers before dependent work.
3. `$review <slug>` examines the change against the plan, writes findings and a
   `ship`/`rework` verdict. It does not repair product code.
4. `$debug <symptom or slug>` reproduces, isolates the cause, applies a narrow authorized
   fix and verifies it. A repaired feature can return to build or review.

Small direct fixes need not create a plan unless the user requests this loop. A skill
invocation does not authorize deployment, publishing, commits or other unrelated actions.

## Codex roles and delegation

Roles are task instructions, not registered custom agent types. Their definitions live
in each skill's `references/`. Do not use Claude `Task`, `subagent_type`, `.claude/`
paths, or assume that copying role Markdown registers Codex agents.

- Planning: `planner` drafts; `skeptic` challenges the concrete draft; the main agent merges.
- Building: choose executors by the actual stack and affected files, using the routing
  table in `.agents/skills/build/references/executors.md`.
- Reviewing: `reviewer` assesses behavior and evidence independently of implementation.
- Debugging: `debugger` owns reproduction, hypothesis testing and the minimal fix.

These skills permit delegation when the session exposes and allows it. Use the actual
Codex tools provided in that session (for example `spawn_agent`, `send_message`, and
`wait_agent`), not invented APIs. Inherit the session model and reasoning settings.
If delegation is unavailable or restricted, perform the same roles sequentially in the
main session and disclose that review was a self-review. Never claim independent review
when none occurred. Do not enable features or change configuration to force delegation.

Give each delegated agent the user request, relevant context, plan or draft, precise file
ownership, dependencies and expected return fields. Parallelize only independent tasks
with disjoint write ownership. Agree shared contracts first; run dependent tasks in order.
Agents share the workspace: preserve others' edits. Agents return results to the main
agent; the main agent integrates, verifies and writes shared reports and context.

## Working rules

- Accuracy before speed: inspect the actual repository, installed versions and commands.
  Follow existing architecture; do not infer a stack from the project name or a role.
- State flawed assumptions or scope problems plainly and propose a concrete alternative.
  Continue independent authorized work while clarifying a real blocker.
- Prefer focused edits. Preserve user changes, existing settings and unrelated files.
  New files should have a concrete purpose in the requested change.
- Keep role ownership narrow; coordinate cross-layer contracts before changing them.
- Comments explain non-obvious reasons or invariants, rather than narrating code.
- Validate external input at real boundaries; avoid injection and hardcoded secrets.
- Follow session permissions and existing authorization. Seek approval only when required
  for an unauthorized destructive action, external side effect, or permission escalation.
- Run checks appropriate to the change, using commands established by project files or CI.
  Add meaningful behavior or regression tests when warranted; avoid tautological tests.
  Record command, working directory, exit code and a short real output excerpt.
- A failed or unavailable check is not a pass. Explain missing tooling or absent tests;
  do not invent output or silently replace the project's test command with a weaker check.
- No hooks are installed by this harness. Verification is an instruction, not an enforced
  Stop gate. No design workflow or design-specific agents are installed.
- Be concise in progress updates and reports; preserve the evidence needed to assess them.

Adapted from mini-harness (Arseniy Savin); license: `.agents/skills/mini-harness-LICENSE.txt`.
