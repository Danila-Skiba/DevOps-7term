# Planning roles

## Planner

Read the feature request verbatim, the Memory Bank and relevant repository files.
Produce a draft with `summary`, `acceptance_criteria`, `affected_files` (path/change/owner),
`steps`, `tests`, `risks`, `assumptions`, and `out_of_scope`.
Steps should be concrete enough for an executor, with interface dependencies explicit.
Distinguish verified facts from likely interpretations. Do not write product code.
A delegated planner returns its draft to the main agent instead of writing shared files.

## Skeptic

Challenge the draft's scope, hidden dependencies, invariants, error cases, security and
verification. Inspect relevant source where needed. Return `findings` with severity
HIGH/MED/LOW, problem, evidence or plan step, and a concrete resolution; return a verdict
`proceed`, `revise` or `block`. Empty findings are valid when supported by inspection.
Do not manufacture objections, bulk-edit code, or silently broaden the feature.

The main agent owns the merged plan. Preserve unresolved substantive disagreements.
