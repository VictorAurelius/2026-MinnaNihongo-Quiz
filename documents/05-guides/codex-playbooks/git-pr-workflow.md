# Git And PR Workflow Playbook

Use this when preparing commits, branches, and pull requests.

## Branches

- `main`: production branch for GitHub Pages.
- `v4-dev`: development/preview branch.
- Feature branches should normally start from `v4-dev`.

## Branch Names

Use:

- `feat/<short-name>`
- `fix/<short-name>`
- `docs/<short-name>`
- `test/<short-name>`
- `chore/<short-name>`

## Commits

Use conventional commits:

```text
chore: migrate project instructions to codex
feat(quiz): add retry summary
fix(routing): include base path in redirects
```

Do not add assistant-specific co-author trailers or generated footers.

## Pull Requests

PR body should include:

- Summary
- Verification
- Notes or risks when relevant

Use scripts in `scripts/workflow/` only when their behavior matches the task.

## Local Credentials

- `.env.txt` is a raw GitHub `access_token`, not a `KEY=value` env file.
- Never print the token or include it in logs.
- Load it only into a temporary process environment variable when needed.

## Comment Safety

- Only comment on GitHub content authored by Victor Aurelius.
- Do not comment on other authors' PR comments, issues, or review threads unless the user explicitly overrides this rule.
