#!/bin/bash
# Update git-pr-workflow.md with latest stats
# Called after PR merge by GitHub Action

set -e

SKILL_FILE=".claude/skills/git-pr-workflow.md"
STATS_MARKER="## 📊 Workflow Statistics"

# Get git stats
TOTAL_PRS=$(gh pr list --state merged --limit 1000 --json number | jq length)
TOTAL_BRANCHES=$(git branch -r | grep -E 'origin/(feature|fix|docs|test)/' | wc -l)
LAST_PR=$(gh pr list --state merged --limit 1 --json number,title,mergedAt | jq -r '.[0] | "#\(.number): \(.title) (merged \(.mergedAt | split("T")[0]))"')

# Current timestamp
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")

# Create stats section
STATS_SECTION="$STATS_MARKER

**Last Updated:** $TIMESTAMP

| Metric | Value |
|--------|-------|
| Total PRs Merged | $TOTAL_PRS |
| Total Feature Branches | $TOTAL_BRANCHES |
| Last PR | $LAST_PR |

---"

# Check if skill file exists
if [ ! -f "$SKILL_FILE" ]; then
  echo "Warning: $SKILL_FILE not found"
  exit 0
fi

# Check if stats section exists
if grep -q "$STATS_MARKER" "$SKILL_FILE"; then
  # Update existing stats section
  # Remove old stats section and append new one
  sed -i "/$STATS_MARKER/,/^---$/d" "$SKILL_FILE"
  echo "$STATS_SECTION" >> "$SKILL_FILE"
else
  # Add stats section at the end
  echo "" >> "$SKILL_FILE"
  echo "$STATS_SECTION" >> "$SKILL_FILE"
fi

echo "✅ Skill stats updated successfully"
echo "📊 Total PRs: $TOTAL_PRS"
echo "🌿 Total Branches: $TOTAL_BRANCHES"
