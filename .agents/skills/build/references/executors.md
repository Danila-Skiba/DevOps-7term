# Executor routing

These are role prompts, not named Codex agent registrations. Confirm the stack from
manifests and source; file extensions alone do not establish a framework. Match specific
roles before generic ones. Read only the relevant role guidance below.

| Role | Repository signals / scope | Focus |
| --- | --- | --- |
| react-ts | React dependency plus `.tsx`/`.jsx` | Hooks and state ownership, accessible UI, user behavior tests |
| node-ts | Node server manifest plus `.ts` | Typed boundaries, awaited I/O, transactions, error handling |
| python-fastapi | FastAPI dependency plus Python | Request schemas, session lifetime, async boundaries, migrations |
| flutter | `pubspec.yaml` plus Dart | Existing state architecture, widget lifecycle, async states |
| ios | Swift, Xcode project or `Package.swift` | Isolation, lifecycle, deployment target compatibility |
| android | Kotlin plus Android Gradle configuration | Lifecycle-aware state, coroutine ownership, platform compatibility |
| terraform-yandex | Terraform with Yandex provider | State safety, least privilege, secrets references, reviewed resource changes |
| frontend | Other client/UI code | Existing component patterns, input boundaries, accessibility |
| backend | Other APIs/server code | Stable contracts, business invariants, persistence and authorization |
| devops | Dockerfiles, CI, deployment, build tooling | Reproducibility, config validation, local dry runs, secrets wiring |
| mobile | Other mobile code | Platform APIs, navigation, lifecycle and safe local storage |
| general | Files unmatched above | Follow their actual purpose and repository conventions |

## Shared executor contract

Input: original request, plan, relevant context, owned file paths and dependencies.
Read existing versions, lockfiles, architecture, CI and commands before editing. Do not
install a preferred stack, assume a particular year's versions, or migrate frameworks
because a role recommends them. Follow the user's authorization and existing settings.

Stay within assigned ownership. Coordinate contract changes via the main agent; do not
edit a sibling's files or revert their work. Implement intended behavior with narrow
changes, validate real input boundaries, keep secrets out of code/logs and exercise
important failure paths. Use project tests and linters where they exist. No made-up
passing results; unavailable checks are reported as such.

Return: `status` (`complete`/`blocked`), `scope`, `changed_files`, `tests_run` (command,
cwd, exit code), `tests_result` (short actual output), `api_changes` or other contract
changes, `notes`, and `blocked_reason` when relevant. The main agent writes the report.

## Infrastructure-specific constraints

For DevOps and Terraform, local validation does not authorize deployment or apply.
Protect existing state, lockfiles and credentials. Inspect any plan for resource
destroy/replace and explain it. Run format/validation and configured static checks;
remote planning, initialization, builds and scanners may need network or credentials.
Use the session's permission flow where necessary. Never apply changes to a live service
or alter production configuration without authorization for that action. Do not mandate
a cloud provider, backend, tool version or migration absent project evidence.
