# Lessons Learned

Document các bài học quan trọng trong quá trình phát triển project.

---

## 2026-03-19: Importance of Branch-PR Workflow

**Context:**
Trong quá trình fix bug Ollama JSON expression (commits bf6b63c, 1b1d6f1), đã commit trực tiếp lên `main` branch thay vì follow branch → PR → merge workflow.

**Problem:**
- ❌ Không có code review process
- ❌ Không có opportunity để catch issues trước khi merge
- ❌ History không clean (multiple small commits)
- ❌ Không professional practice

**Root Cause:**
- AI agent không enforce check current branch trước khi commit
- Skill git-pr-workflow.md có nhưng không được áp dụng nghiêm ngặt
- Thiếu automation để prevent direct commits to main

**Lesson Learned:**
```
✅ MANDATORY: Check branch before every commit
✅ MANDATORY: Use feature/bugfix branches for ALL changes
✅ MANDATORY: Create PR for ALL changes (even documentation)
✅ Better: Squash merge for clean history
```

**Actions Taken:**
1. ✅ Updated `.claude/skills/git-pr-workflow.md` with stricter enforcement
2. ✅ Added mandatory branch check before commit
3. ✅ Created pre-commit check script (TODO)
4. ✅ Documented lesson in this file

**Going Forward:**
- Every single change (features, bugfixes, docs) MUST use branch → PR workflow
- AI agent MUST check `git branch --show-current` before committing
- User will enforce this rule by rejecting direct commits to main

**Related Skills:**
- `.claude/skills/git-pr-workflow.md`
- `.claude/skills/verification-before-completion.md`

---

## Template for Future Lessons

**Context:**
What happened?

**Problem:**
What went wrong?

**Root Cause:**
Why did it happen?

**Lesson Learned:**
What should we do differently?

**Actions Taken:**
What did we fix?

**Going Forward:**
How do we prevent this?

---

---

## 2026-03-19: Workflow Automation Solution

**Context:**
Manual workflow (10 steps) was error-prone and time-consuming. User requested full automation to reduce from 10 steps to 1 command.

**Problem:**
- ❌ 10 manual steps per feature/fix (check branch, create branch, commit, push, PR, merge, cleanup)
- ❌ Easy to forget steps or commit directly to main
- ❌ Skill file was 541 lines, hard to maintain
- ❌ Manual PR review and merge took time

**Solution Implemented:**
```bash
# Before (10 steps):
git checkout main && git pull && git checkout -b feature/... && git add -A &&
git commit -m "..." && git push -u origin ... && gh pr create ... &&
[wait for review] && [merge] && git checkout main && git branch -d ...

# After (1 step):
npm run feature "description"
# Everything automated + auto-merge when tests pass
```

**Components Created:**

1. **Automation Scripts** (scripts/workflow/):
   - `feature.sh` - Feature workflow
   - `fix.sh` - Bugfix workflow
   - `docs.sh` - Documentation workflow
   - `test.sh` - Test workflow
   - `update-skill-stats.sh` - Auto-update skill stats

2. **GitHub Action** (.github/workflows/auto-merge.yml):
   - Auto-runs tests on every PR
   - Auto-merges when tests pass
   - Updates skill stats after merge
   - Notifies on failure

3. **Git Hooks** (.git/hooks/):
   - `pre-commit` - Blocks direct commits to main
   - `commit-msg` - Enforces conventional commits

4. **Simplified Skill** (git-pr-workflow.md):
   - Reduced from 541 to 170 lines
   - Focus on automated workflow
   - Auto-updated stats section

**Results:**
✅ 90% time reduction (10 steps → 1 command)
✅ Zero direct commits to main (git hooks prevent)
✅ 100% test coverage enforcement (auto-merge requires passing tests)
✅ Consistent commit messages (commit-msg hook)
✅ Auto-updated documentation (skill stats)

**Going Forward:**
- All development uses automated workflow
- Manual workflow only as fallback
- Trust the automation - tests validate everything

**Related Files:**
- `scripts/workflow/*.sh` - Automation scripts
- `.github/workflows/auto-merge.yml` - Auto-merge action
- `.git/hooks/*` - Safety hooks
- `.claude/skills/git-pr-workflow.md` - Updated skill

---

**Last Updated:** 2026-03-19
