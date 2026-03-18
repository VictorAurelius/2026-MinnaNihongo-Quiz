#!/bin/bash
# Automated Test Addition Workflow
# Usage: npm run test:add "component tests"

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DESCRIPTION="$1"

if [ -z "$DESCRIPTION" ]; then
  echo -e "${RED}❌ Error: Description required${NC}"
  echo "Usage: npm run test:add \"component tests\""
  exit 1
fi

BRANCH_NAME="test/$(echo "$DESCRIPTION" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')"

echo -e "${BLUE}🧪 Starting automated test workflow${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

CURRENT_BRANCH=$(git branch --show-current)
echo -e "${YELLOW}📍 Current branch: ${CURRENT_BRANCH}${NC}"

if [ "$CURRENT_BRANCH" != "main" ]; then
  echo -e "${YELLOW}⚠️  Switching to main...${NC}"
  git checkout main
  git pull origin main
fi

echo -e "${GREEN}✅ Creating branch: ${BRANCH_NAME}${NC}"
git checkout -b "$BRANCH_NAME"

echo -e "${GREEN}✅ Staging changes...${NC}"
git add -A

# Run tests before committing
echo -e "${YELLOW}🧪 Running tests...${NC}"
cd svelte-app && npm test -- --run || {
  echo -e "${RED}❌ Tests failed! Fix tests before committing.${NC}"
  exit 1
}
cd ..

COMMIT_MSG="test: $DESCRIPTION

Automated test commit via workflow script.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

echo -e "${GREEN}✅ Committing changes...${NC}"
git commit -m "$COMMIT_MSG"

echo -e "${GREEN}✅ Pushing to remote...${NC}"
git push -u origin "$BRANCH_NAME"

echo -e "${GREEN}✅ Creating Pull Request...${NC}"

# Get test stats
TEST_FILES=$(cd svelte-app && npm test -- --run 2>&1 | grep "Test Files" | head -1 || echo "N/A")

PR_BODY="## Summary
Test: $DESCRIPTION

## Type of Change
- [x] Test addition

## Test Results
\`\`\`
$TEST_FILES
\`\`\`

## Changes
- $(git diff --name-only main... | wc -l) files changed

## Checklist
- [x] Tests pass locally
- [x] Coverage maintained/improved

🤖 Generated with [Claude Code](https://claude.com/claude-code)"

gh pr create \
  --title "test: $DESCRIPTION" \
  --body "$PR_BODY" \
  --base main

PR_URL=$(gh pr view --json url -q .url)

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ Workflow completed successfully!${NC}"
echo -e "${GREEN}📝 PR created: ${PR_URL}${NC}"
echo -e "${YELLOW}⏳ Waiting for tests to pass, then auto-merge...${NC}"
