#!/bin/bash
# install-remote.sh — Install/upgrade starter-kit from remote git repo
#
# SAFE BY DEFAULT:
#   - New project (no .starter-kit-version) → init-project.sh (copy all)
#   - Existing project → upgrade-project.sh --plan (review before apply)
#   - NEVER --force unless user explicitly passes it
#
# Usage:
#   bash /tmp/kit/install-remote.sh /path/to/project              # Safe default
#   bash /tmp/kit/install-remote.sh /path/to/project --force      # Overwrite all (DANGEROUS)
#   bash /tmp/kit/install-remote.sh /path/to/project --version 1.1.2  # Pin version

set -uo pipefail

TARGET="${1:?Usage: $0 /path/to/project [--force] [--version X.Y.Z]}"
FORCE=false
VERSION_PIN=""

for arg in "${@:2}"; do
    case "$arg" in
        --force) FORCE=true ;;
        --version) ;; # next arg handled below
        *) [ "${prev:-}" = "--version" ] && VERSION_PIN="$arg" ;;
    esac
    prev="$arg"
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_URL="https://github.com/VictorAurelius/claude-starter-kit.git"

echo "═══════════════════════════════════════════════"
echo "  Starter Kit Remote Install"
echo "═══════════════════════════════════════════════"

# If running from curl pipe, clone first
if [ ! -f "$SCRIPT_DIR/VERSION" ]; then
    echo "Cloning starter-kit from $REPO_URL..."
    TEMP_DIR=$(mktemp -d)
    if [ -n "$VERSION_PIN" ]; then
        git clone --depth 1 --branch "v$VERSION_PIN" "$REPO_URL" "$TEMP_DIR" 2>/dev/null || \
        git clone --depth 1 "$REPO_URL" "$TEMP_DIR"
    else
        git clone --depth 1 "$REPO_URL" "$TEMP_DIR"
    fi
    SCRIPT_DIR="$TEMP_DIR"
    trap "rm -rf $TEMP_DIR" EXIT
fi

KIT_VERSION=$(cat "$SCRIPT_DIR/VERSION" 2>/dev/null | tr -d '[:space:]')
echo "  Kit version: v$KIT_VERSION"
echo "  Target: $TARGET"

# Check if target has existing kit
INSTALLED_VERSION="none"
if [ -f "$TARGET/.claude/.starter-kit-version" ]; then
    INSTALLED_VERSION=$(cat "$TARGET/.claude/.starter-kit-version" | tr -d '[:space:]')
fi
echo "  Installed: v$INSTALLED_VERSION"
echo ""

# Same version → skip
if [ "$INSTALLED_VERSION" = "$KIT_VERSION" ] && ! $FORCE; then
    echo "Already on latest version (v$KIT_VERSION). Nothing to do."
    echo "Use --force to re-apply."
    exit 0
fi

# ─── New project → init ───
if [ "$INSTALLED_VERSION" = "none" ]; then
    echo "New project detected → running init..."
    bash "$SCRIPT_DIR/init-project.sh" "$TARGET"
    exit $?
fi

# ─── Existing project → safe upgrade ───
if $FORCE; then
    echo "⚠️  WARNING: --force will overwrite ALL files including your customizations!"
    echo "  Consider using without --force to get a review plan first."
    echo ""
    bash "$SCRIPT_DIR/upgrade-project.sh" "$TARGET" --force
else
    echo "Existing project detected → generating upgrade plan..."
    echo "(Your custom files will NOT be overwritten)"
    echo ""
    bash "$SCRIPT_DIR/upgrade-project.sh" "$TARGET" --plan
    echo ""
    echo "═══════════════════════════════════════════════"
    echo "  Review the plan, then apply:"
    echo "  bash $SCRIPT_DIR/upgrade-project.sh $TARGET --apply"
    echo "═══════════════════════════════════════════════"
fi
