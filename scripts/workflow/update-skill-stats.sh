#!/bin/bash
# Update Codex workflow stats with latest PR data
# Called after PR merge by GitHub Action

set -e

STATS_FILE="documents/05-guides/CODEX_WORKFLOW_STATS.md"
STATS_MARKER="## Workflow Statistics"

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

# Check if stats file exists
if [ ! -f "$STATS_FILE" ]; then
  echo "Warning: $STATS_FILE not found"
  exit 0
fi

# Check if stats section exists
if grep -q "$STATS_MARKER" "$STATS_FILE"; then
  # Update existing stats section
  # Remove old stats section and append new one
  sed -i "/$STATS_MARKER/,/^---$/d" "$STATS_FILE"
  echo "$STATS_SECTION" >> "$STATS_FILE"
else
  # Add stats section at the end
  echo "" >> "$STATS_FILE"
  echo "$STATS_SECTION" >> "$STATS_FILE"
fi

echo "✅ Workflow stats updated successfully"
echo "📊 Total PRs: $TOTAL_PRS"
echo "🌿 Total Branches: $TOTAL_BRANCHES"
