#!/bin/bash
# Automated Feature Branch Workflow
# Usage: npm run feature "description"

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get description from argument
DESCRIPTION="$1"

if [ -z "$DESCRIPTION" ]; then
  echo -e "${RED}❌ Error: Description required${NC}"
  echo "Usage: npm run feature \"add dark mode\""
  exit 1
fi

# Convert description to branch name (lowercase, replace spaces with hyphens)
BRANCH_NAME="feature/$(echo "$DESCRIPTION" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')"

echo -e "${BLUE}🚀 Starting automated feature workflow${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Step 1: Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${YELLOW}📍 Current branch: ${CURRENT_BRANCH}${NC}"

if [ "$CURRENT_BRANCH" != "main" ]; then
  echo -e "${YELLOW}⚠️  Not on main branch. Switching...${NC}"
  git checkout main
  git pull origin main
fi

# Step 2: Create feature branch
echo -e "${GREEN}✅ Creating branch: ${BRANCH_NAME}${NC}"
git checkout -b "$BRANCH_NAME"

# Step 3: Stage all changes
echo -e "${GREEN}✅ Staging changes...${NC}"
git add -A

# Step 4: Create commit message
COMMIT_MSG="feat: $DESCRIPTION

Automated commit via workflow script.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

echo -e "${GREEN}✅ Committing changes...${NC}"
git commit -m "$COMMIT_MSG"

# Step 5: Push to remote
echo -e "${GREEN}✅ Pushing to remote...${NC}"
git push -u origin "$BRANCH_NAME"

# Step 6: Create Pull Request
echo -e "${GREEN}✅ Creating Pull Request...${NC}"

PR_BODY="## Summary
$DESCRIPTION

## Type of Change
- [x] New feature

## Changes
- $(git diff --name-only main... | wc -l) files changed

## Checklist
- [x] Follows project conventions
- [x] Tested locally

🤖 Generated with [Claude Code](https://claude.com/claude-code)"

gh pr create \
  --title "feat: $DESCRIPTION" \
  --body "$PR_BODY" \
  --base main

# Get PR URL
PR_URL=$(gh pr view --json url -q .url)

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ Workflow completed successfully!${NC}"
echo -e "${GREEN}📝 PR created: ${PR_URL}${NC}"
echo -e "${YELLOW}⏳ Waiting for tests to pass, then auto-merge...${NC}"
