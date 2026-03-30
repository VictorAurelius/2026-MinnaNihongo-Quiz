#!/bin/bash
# publish.sh — Release new kit version
#
# Handles: test → bump version → changelog → tag → push → create release
# Run from kit repo root.
#
# Usage:
#   ./publish.sh patch "Fix manifest parsing"     # 1.2.0 → 1.2.1
#   ./publish.sh minor "Add UI template guide"    # 1.2.0 → 1.3.0
#   ./publish.sh major "Restructure skills"        # 1.2.0 → 2.0.0
#   ./publish.sh --dry-run minor "Preview only"    # Preview, no changes
#   ./publish.sh --status                          # Show current version + pending changes

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

DRY_RUN=false

# Parse flags
case "${1:-}" in
    --status)
        echo "═══════════════════════════════════════════════"
        echo "  Kit Status"
        echo "═══════════════════════════════════════════════"
        echo "  Version:  v$(cat VERSION)"
        echo "  Branch:   $(git branch --show-current)"
        echo "  Changes:  $(git diff --stat HEAD | tail -1)"
        echo ""
        echo "  Latest tags:"
        git tag -l --sort=-v:refname | head -5
        echo ""
        echo "  Unpushed commits:"
        git log origin/main..HEAD --oneline 2>/dev/null || echo "  (none)"
        exit 0
        ;;
    --dry-run)
        DRY_RUN=true
        shift
        ;;
esac

BUMP_TYPE="${1:?Usage: $0 [--dry-run] <patch|minor|major> \"description\"}"
DESCRIPTION="${2:?Usage: $0 [--dry-run] <patch|minor|major> \"description\"}"

# Validate bump type
case "$BUMP_TYPE" in
    patch|minor|major) ;;
    *) echo "❌ Invalid bump type: $BUMP_TYPE (use patch/minor/major)"; exit 1 ;;
esac

# Read current version
CURRENT=$(cat VERSION | tr -d '[:space:]')
IFS='.' read -r major minor patch <<< "$CURRENT"

# Calculate new version
case "$BUMP_TYPE" in
    patch) NEW_VERSION="$major.$minor.$((patch + 1))" ;;
    minor) NEW_VERSION="$major.$((minor + 1)).0" ;;
    major) NEW_VERSION="$((major + 1)).0.0" ;;
esac

echo "═══════════════════════════════════════════════"
echo "  Publish Kit: v$CURRENT → v$NEW_VERSION"
echo "═══════════════════════════════════════════════"
echo "  Type:        $BUMP_TYPE"
echo "  Description: $DESCRIPTION"
$DRY_RUN && echo "  Mode:        DRY RUN"
echo ""

# Step 1: Run tests
echo "1/5 Running smoke test..."
if bash test-kit.sh 2>&1 | tail -3; then
    echo ""
else
    echo "❌ Smoke test failed. Fix before publishing."
    exit 1
fi

# Step 2: Check clean working tree
if [ -n "$(git status --porcelain)" ] && ! $DRY_RUN; then
    echo "⚠️  Uncommitted changes detected."
    echo "   Commit or stash before publishing."
    git status --short
    exit 1
fi

# Step 3: Bump version
echo "2/5 Bumping version..."
if ! $DRY_RUN; then
    echo "$NEW_VERSION" > VERSION
fi
echo "  VERSION: $CURRENT → $NEW_VERSION"

# Step 4: Update changelog
echo "3/5 Updating CHANGELOG..."
DATE=$(date +%Y-%m-%d)
ENTRY="## [$NEW_VERSION] — $DATE

### ${BUMP_TYPE^}
- $DESCRIPTION
"

if ! $DRY_RUN; then
    # Insert after the --- separator (line 8 typically)
    TEMP=$(mktemp)
    awk -v entry="$ENTRY" '/^---$/ && !done { print; print ""; print entry; done=1; next } 1' CHANGELOG.md > "$TEMP"
    mv "$TEMP" CHANGELOG.md
fi
echo "  Added: [$NEW_VERSION] — $DATE"

# Step 5: Commit + tag + push
echo "4/5 Committing..."
if ! $DRY_RUN; then
    git add VERSION CHANGELOG.md
    git commit -m "release: v$NEW_VERSION — $DESCRIPTION"
    git tag "v$NEW_VERSION"
    echo "  Committed + tagged v$NEW_VERSION"
fi

echo "5/5 Pushing..."
if ! $DRY_RUN; then
    git push origin "$(git branch --show-current)" --tags
    echo "  Pushed to origin"

    # Update release/v{major}.x branch
    RELEASE_BRANCH="release/v${major}.x"
    if git rev-parse --verify "origin/$RELEASE_BRANCH" >/dev/null 2>&1; then
        echo "  Updating $RELEASE_BRANCH..."
        git checkout "$RELEASE_BRANCH"
        git merge main --no-edit
        git push origin "$RELEASE_BRANCH"
        git checkout main
    fi
fi

echo ""
echo "═══════════════════════════════════════════════"
if $DRY_RUN; then
    echo "  DRY RUN: v$CURRENT → v$NEW_VERSION"
    echo "  Run without --dry-run to publish"
else
    echo "  ✅ Published v$NEW_VERSION"
    echo ""
    echo "  Projects can update:"
    echo "    git clone https://github.com/VictorAurelius/claude-starter-kit.git /tmp/kit"
    echo "    bash /tmp/kit/install-remote.sh /path/to/project"
fi
echo "═══════════════════════════════════════════════"
