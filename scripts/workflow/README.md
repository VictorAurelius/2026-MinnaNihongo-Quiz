# Workflow Automation Scripts

**One-command Git workflow** - From feature to auto-merged PR.

## 🚀 Quick Start

```bash
npm run feature "add dark mode"
npm run fix "button not clickable"
npm run docs "update readme"
npm run test:add "component tests"
```

## 📂 Scripts

| Script | Purpose | Example |
|--------|---------|---------|
| `feature.sh` | New feature | `npm run feature "user authentication"` |
| `fix.sh` | Bug fix | `npm run fix "login timeout"` |
| `docs.sh` | Documentation | `npm run docs "API guide"` |
| `test.sh` | Add tests | `npm run test:add "store tests"` |
| `update-skill-stats.sh` | Update stats | Auto-run by GitHub Action |

## 🔄 Workflow

Each script performs:

1. ✅ Check current branch (must be main or switches to main)
2. ✅ Create feature branch (`feature/`, `fix/`, `docs/`, `test/`)
3. ✅ Stage all changes
4. ✅ Commit with conventional format
5. ✅ Push to remote
6. ✅ Create Pull Request
7. ✅ Wait for auto-merge (when tests pass)

## 🛡️ Safety Features

- **Git Hooks**: Block direct commits to main
- **Conventional Commits**: Enforced by commit-msg hook
- **Test Validation**: test.sh runs tests before committing
- **Auto-Merge**: Only when all tests pass

## ⚙️ Requirements

- Git CLI (`git`)
- GitHub CLI (`gh`)
- Node.js & npm (for test scripts)

## 🔧 Manual Override

If scripts fail, use manual workflow:

```bash
git checkout -b feature/my-branch
git add -A
git commit -m "feat: description"
git push -u origin feature/my-branch
gh pr create --title "..." --body "..."
```

## 📝 Commit Format

Scripts automatically format commits:

```
<type>: <description>

Automated commit via workflow script.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

Types: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`

## 🚨 Troubleshooting

**Permission denied:**
```bash
chmod +x scripts/workflow/*.sh
```

**Git hooks not working:**
```bash
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/commit-msg
```

**Auto-merge not triggered:**
- Check GitHub Actions logs
- Ensure tests pass: `cd svelte-app && npm test`
- Verify branch name starts with `feature/`, `fix/`, `docs/`, or `test/`

## 📊 Stats Tracking

`update-skill-stats.sh` automatically updates `.claude/skills/git-pr-workflow.md` with:
- Total PRs merged
- Total branches created
- Last PR info

Called by `.github/workflows/auto-merge.yml` after successful merge.

## 🎓 Learning Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub CLI](https://cli.github.com/)
- [Git Hooks](https://git-scm.com/docs/githooks)

---

**Version:** 2.0.0
**Last Updated:** 2026-03-19
