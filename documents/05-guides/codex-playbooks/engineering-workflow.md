# Engineering Workflow Playbook

Use this for non-trivial implementation, debugging, test, and review work.

## Default Sequence

1. Clarify the requested behavior and inspect the relevant files.
2. Break the work into small steps with one clear next action.
3. For behavior changes, add or update tests first when practical.
4. Implement the smallest scoped change that satisfies the request.
5. Run the relevant project script.
6. Review the diff for unrelated churn before committing.

## Debugging

- Reproduce the issue before changing code when possible.
- Identify the narrowest failing layer: data, store, component, route, build, deploy.
- Prefer targeted tests for regressions.
- State assumptions when the failure cannot be reproduced locally.

## Code Review

Use a review stance when asked for review:

- Findings first, ordered by severity.
- Include file and line references.
- Focus on bugs, regressions, missing tests, and maintainability risks.
- Keep summaries secondary.

## TDD

Use TDD for logic and shared behavior changes:

- Write or update the failing test.
- Make it pass with a focused implementation.
- Refactor only after behavior is covered.

## Verification

Use the scripts in `AGENTS.md`. If a script cannot run, record the reason and the fallback check.
