# Skill: Automated Git & PR Workflow

**Version:** 2.0 (Fully Automated)
**Last Updated:** 2026-03-19
**Purpose:** One-command automated Git workflow with auto-merge

---

## 🎯 Quick Start

**Everything in one command:**

```bash
# Feature
npm run feature "add dark mode"

# Bug fix
npm run fix "button not clickable"

# Documentation
npm run docs "update readme"

# Tests
npm run test:add "component tests"
```

**What happens automatically:**
1. ✅ Creates feature branch
2. ✅ Commits changes
3. ✅ Pushes to remote
4. ✅ Creates Pull Request
5. ✅ Runs tests
6. ✅ **Auto-merges when tests pass**

---

## 🚀 Usage Examples

### Adding a Feature

```bash
npm run feature "implement user authentication"

# Output:
# 🚀 Starting automated feature workflow
# ✅ Creating branch: feature/implement-user-authentication
# ✅ Staging changes...
# ✅ Committing changes...
# ✅ Pushing to remote...
# ✅ Creating Pull Request...
# ✨ Workflow completed!
# 📝 PR created: https://github.com/.../pull/123
# ⏳ Waiting for tests to pass, then auto-merge...
```

### Fixing a Bug

```bash
npm run fix "resolve login timeout issue"
```

### Updating Documentation

```bash
npm run docs "add API documentation"
```

### Adding Tests

```bash
npm run test:add "add store unit tests"
# Runs tests before committing to ensure they pass
```

---

## 🛡️ Safety Features

### Git Hooks (Automatic)

**Pre-Commit Hook** - Blocks direct commits to main:
```bash
# If you try to commit to main:
❌ ERROR: Direct commits to main branch are forbidden!

Please use the automated workflow:
  npm run feature "description"  - for new features
  npm run fix "description"      - for bug fixes
  ...
```

**Commit-Msg Hook** - Enforces conventional commits:
```
✅ feat: add dark mode
✅ fix: resolve button issue
✅ docs: update README
❌ Added some stuff  (rejected)
```

### Auto-Merge Conditions

PR is auto-merged when:
- ✅ All tests pass
- ✅ No merge conflicts
- ✅ Branch is from: `feature/`, `fix/`, `docs/`, or `test/`

---

## 📋 Commit Message Format

**Automated by scripts**, but follow this format if committing manually:

```
<type>: <description>

<optional body>

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `test`: Adding tests
- `chore`: Maintenance
- `refactor`: Code refactoring

---

## 🔧 Manual Workflow (if needed)

If automation scripts don't work, fall back to manual:

```bash
# 1. Create branch
git checkout -b feature/my-feature

# 2. Make changes, then commit
git add -A
git commit -m "feat: my feature

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 3. Push and create PR
git push -u origin feature/my-feature
gh pr create --title "My Feature" --body "Description"

# 4. Wait for auto-merge
```

---

## ⚙️ Configuration

### Scripts Location
```
scripts/workflow/
├── feature.sh      # Feature workflow
├── fix.sh          # Bugfix workflow
├── docs.sh         # Documentation workflow
├── test.sh         # Test workflow
└── update-skill-stats.sh  # Updates this file
```

### GitHub Action
`.github/workflows/auto-merge.yml`
- Runs tests on every PR
- Auto-merges when tests pass
- Updates skill stats after merge

---

## 🚨 Troubleshooting

**Problem:** "Permission denied" when running npm script
```bash
chmod +x scripts/workflow/*.sh
```

**Problem:** Git hook not working
```bash
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/commit-msg
```

**Problem:** Auto-merge not working
- Check GitHub Actions logs
- Ensure tests pass
- Check if branch name starts with `feature/`, `fix/`, `docs/`, or `test/`

---

## 📊 Workflow Statistics

*Auto-updated after each merge*

**Last Updated:** TBD

| Metric | Value |
|--------|-------|
| Total PRs Merged | TBD |
| Total Feature Branches | TBD |
| Last PR | TBD |

---

## 💡 Best Practices

1. **Use automation scripts** - Reduces errors
2. **Trust the auto-merge** - Tests validate everything
3. **Write good descriptions** - Clear PR titles & descriptions
4. **Let CI run** - Don't manually merge unless necessary

---

**Version:** 2.0.0 (Automated Workflow)
**Author:** VictorAurelius + Claude Sonnet 4.5
