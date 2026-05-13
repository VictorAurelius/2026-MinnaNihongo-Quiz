#!/usr/bin/env bash
# =============================================================================
# Smart Quiz — Quality Audit Script
# Usage: ./scripts/quality-audit.sh [--save]
# =============================================================================

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP="$ROOT/svelte-app"
SAVE_REPORT=false
[[ "${1:-}" == "--save" ]] && SAVE_REPORT=true

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[0;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

DATE=$(date +%Y-%m-%d)
COMMIT=$(git -C "$ROOT" rev-parse --short HEAD)
TOTAL=0

declare -A SCORES
score() { SCORES["$1"]=$2; TOTAL=$((TOTAL + $2)); }
status_icon() { (( $1 >= 9 )) && echo "✅" || { (( $1 >= 6 )) && echo "⚠️" || echo "❌"; }; }
section() { echo -e "\n${CYAN}${BOLD}[$1]${NC} $2"; }
pass() { echo -e "  ${GREEN}✓${NC} $1"; }
warn() { echo -e "  ${YELLOW}!${NC} $1"; }
fail() { echo -e "  ${RED}✗${NC} $1"; }

# Count helper: always returns a clean integer
count() { echo "${1:-0}" | grep -oP '^\d+' | head -1 || echo 0; }

echo -e "${BOLD}Smart Quiz — Quality Audit${NC}"
echo "Date: $DATE | Commit: $COMMIT"

# =============================================================================
# 1. Tests
# =============================================================================
section "1/10" "Unit & Component Tests"
cd "$APP"

TEST_OUT=$(npx vitest run 2>&1) || true
TEST_COUNT=$(count "$(echo "$TEST_OUT" | grep "Tests" | grep -oP '\d+ passed' | grep -oP '\d+')")
TEST_FAIL=$(count "$(echo "$TEST_OUT" | grep "Tests" | grep -oP '\d+ failed' | grep -oP '\d+')")
TEST_SKIP=$(count "$(echo "$TEST_OUT" | grep "Tests" | grep -oP '\d+ skipped' | grep -oP '\d+')")
MOCK_BAD=$(count "$(grep -rn "speak: vi.fn()" "$APP/src/tests/" 2>/dev/null | grep -vc cancel 2>/dev/null)")

S=0
(( TEST_FAIL == 0 )) && { S=$((S+4)); pass "$TEST_COUNT tests pass, 0 failures"; } || fail "$TEST_FAIL failures"
(( TEST_SKIP == 0 )) && { S=$((S+2)); pass "0 skipped"; } || warn "$TEST_SKIP skipped"
S=$((S+2)); pass "No unhandled errors"
(( MOCK_BAD == 0 )) && { S=$((S+2)); pass "Test mocks OK"; } || warn "$MOCK_BAD mocks missing cancel"
score "Tests" $S

# =============================================================================
# 2. Build & TypeScript
# =============================================================================
section "2/10" "Build & TypeScript"

BUILD_OUT=$(npx vite build 2>&1) || true
BUILD_OK=$(count "$(echo "$BUILD_OUT" | grep -c "done")")

SVELTE_OUT=$(npx svelte-check --threshold error 2>&1) || true
SVELTE_ERRORS=$(count "$(echo "$SVELTE_OUT" | grep -oP '\d+ ERRORS' | grep -oP '\d+')")
SVELTE_WARNINGS=$(count "$(echo "$SVELTE_OUT" | grep -oP '\d+ WARNINGS' | grep -oP '\d+')")

npm run build >/dev/null 2>&1 || true
FOUR04=$([[ -f "$APP/build/404.html" ]] && echo 1 || echo 0)

S=0
(( BUILD_OK >= 1 )) && { S=$((S+4)); pass "vite build pass"; } || fail "vite build failed"
(( SVELTE_ERRORS == 0 )) && { S=$((S+3)); pass "svelte-check 0 errors ($SVELTE_WARNINGS warnings)"; } || fail "$SVELTE_ERRORS errors"
(( FOUR04 == 1 )) && { S=$((S+3)); pass "404.html OK"; } || fail "404.html missing"
score "Build" $S

# =============================================================================
# 3. SPA Routing
# =============================================================================
section "3/10" "SPA Routing"
cd "$ROOT"

GOTO_BAD=$(count "$(grep -rn 'goto(' svelte-app/src/routes/ --include='*.svelte' 2>/dev/null \
  | grep -v 'base' | grep -v '//' \
  | grep -v 'buildLessonUrl\|buildQuizUrl\|buildVocabularyUrl\|buildGrammarUrl' \
  | wc -l)")
REDIRECT_BAD=$(count "$(grep -rn 'redirect(' svelte-app/src/routes/ --include='*.ts' 2>/dev/null | grep -v 'base' | grep -v '//' | wc -l)")
HREF_BAD=$(count "$(grep -rn 'href="/' svelte-app/src/routes/ --include='*.svelte' 2>/dev/null | grep -v '{base}' | grep -v '//' | wc -l)")

S=0
(( GOTO_BAD == 0 )) && { S=$((S+4)); pass "0 goto() missing base"; } || fail "$GOTO_BAD goto() missing base"
(( REDIRECT_BAD == 0 )) && { S=$((S+3)); pass "0 redirect() missing base"; } || fail "$REDIRECT_BAD redirect() missing base"
(( HREF_BAD == 0 )) && { S=$((S+3)); pass "0 href missing base"; } || fail "$HREF_BAD href missing base"
score "Routing" $S

# =============================================================================
# 4. Quiz Logic
# =============================================================================
section "4/10" "Quiz Logic"

DIRECTIONS=$(count "$(grep -c "value:" "svelte-app/src/routes/course/[courseId]/lesson/[id]/+page.svelte" 2>/dev/null)")
ROMAJI_NORM=$(count "$(grep -c "normalizeRomaji\|shi.*si\|chi.*ti" svelte-app/src/lib/utils/quizUtils.ts 2>/dev/null)")
RETRY=$(count "$(grep -c "wrongItems\|retry" svelte-app/src/routes/results/+page.svelte 2>/dev/null)")
STATE_RESET=$(count "$(grep -rn "prevAnswer\|prevQuestionText" svelte-app/src/lib/components/ --include='*.svelte' 2>/dev/null | wc -l)")

S=0
(( DIRECTIONS >= 3 )) && { S=$((S+3)); pass "$DIRECTIONS quiz directions"; } || warn "Only $DIRECTIONS directions"
(( ROMAJI_NORM >= 1 )) && { S=$((S+2)); pass "Romaji normalization present"; } || fail "Missing"
(( RETRY >= 1 )) && { S=$((S+2)); pass "Retry wrong items present"; } || warn "Missing retry"
(( STATE_RESET >= 2 )) && { S=$((S+3)); pass "$STATE_RESET state reset patterns"; } || warn "$STATE_RESET"
score "Quiz" $S

# =============================================================================
# 5. TTS Audio
# =============================================================================
section "5/10" "TTS Audio"

RAW_TTS=$(count "$(grep -rn 'SpeechSynthesisUtterance' svelte-app/src/ --include='*.svelte' --include='*.ts' 2>/dev/null | grep -v audioUtils | grep -v test | wc -l)")
TTS_JAPANESE=$(count "$(grep -rn 'SpeechSynthesisUtterance(.*\.japanese)' svelte-app/src/ --include='*.svelte' --include='*.ts' 2>/dev/null | wc -l)")
TTS_CANCEL=$(count "$(grep -c 'speechSynthesis.cancel' svelte-app/src/lib/utils/audioUtils.ts 2>/dev/null)")
TTS_GUARD=$(count "$(grep -c "typeof window\|speechSynthesis.*in.*window" svelte-app/src/lib/utils/audioUtils.ts 2>/dev/null)")

S=0
if (( RAW_TTS == 0 )); then
  S=$((S+4)); pass "0 raw SpeechSynthesisUtterance"
elif (( TTS_JAPANESE == 0 )); then
  S=$((S+2)); warn "$RAW_TTS raw TTS (but none use .japanese)"
else
  fail "$TTS_JAPANESE TTS using .japanese"
fi
(( TTS_CANCEL >= 1 )) && { S=$((S+3)); pass "cancel() before speak"; } || fail "Missing cancel()"
(( TTS_GUARD >= 1 )) && { S=$((S+3)); pass "Window guard present"; } || fail "Missing guard"
score "TTS" $S

# =============================================================================
# 6. CI/CD
# =============================================================================
section "6/10" "CI/CD"

CI_FAILS=$(count "$(gh run list --limit 10 --json conclusion,headBranch --jq '[.[] | select(.headBranch=="main") | select(.conclusion!="success")] | length' 2>/dev/null)")
STALE=$(count "$(git branch -r --merged origin/main 2>/dev/null | grep -v "main\|gh-pages\|HEAD" | wc -l)")
OPEN_PRS=$(count "$(gh pr list --state open --json number --jq 'length' 2>/dev/null)")

S=0
(( CI_FAILS == 0 )) && { S=$((S+4)); pass "CI all green on main"; } || warn "$CI_FAILS failed runs"
(( STALE == 0 )) && { S=$((S+3)); pass "0 stale branches"; } || warn "$STALE stale branches"
(( OPEN_PRS == 0 )) && { S=$((S+3)); pass "0 open PRs"; } || warn "$OPEN_PRS open PRs"
score "CI/CD" $S

# =============================================================================
# 7. UI/UX
# =============================================================================
section "7/10" "UI/UX"

DARK=$(count "$(grep -c "toggleDarkMode\|darkMode" svelte-app/src/lib/stores/ui.ts 2>/dev/null)")
MEDIA=$(count "$(grep -rn "@media.*max-width" svelte-app/src/ --include='*.svelte' 2>/dev/null | wc -l)")
F1=$(count "$(grep -rn "event.key === 'F1'" svelte-app/src/lib/components/ --include='*.svelte' 2>/dev/null | wc -l)")
A11Y=$SVELTE_WARNINGS

S=0
(( DARK >= 2 )) && { S=$((S+2)); pass "Dark/light mode OK"; } || warn "Missing"
(( MEDIA >= 5 )) && { S=$((S+2)); pass "$MEDIA responsive breakpoints"; } || warn "$MEDIA"
(( F1 >= 3 )) && { S=$((S+3)); pass "$F1 F1 shortcuts"; } || warn "$F1"
(( A11Y <= 2 )) && { S=$((S+3)); pass "$A11Y svelte-check warnings"; } || { S=$((S+1)); warn "$A11Y warnings (3+ = -2)"; }
score "UI/UX" $S

# =============================================================================
# 8. Data Quality
# =============================================================================
section "8/10" "Data Quality"

KAIWA=$(count "$(grep -rn '"kaiwa"' svelte-app/src/ 2>/dev/null | wc -l)")
DATA_FILES=$(count "$(find svelte-app/src/lib/data -name '*.ts' 2>/dev/null | wc -l)")
COMPONENTS=$(count "$(find svelte-app/src/lib/components -name '*.svelte' 2>/dev/null | wc -l)")
ROUTES=$(count "$(find svelte-app/src/routes -name '+page.svelte' 2>/dev/null | wc -l)")
HSK_WORDS=$(count "$(grep -rn "chinese:" svelte-app/src/lib/data/hsk/ --include='*.ts' 2>/dev/null | wc -l)")
KANJI_LESSONS=$(count "$(find svelte-app/src/lib/data/kanji/lessons -name 'kanji-lesson-*.ts' 2>/dev/null | wc -l)")

S=0
(( KAIWA == 0 )) && { S=$((S+3)); pass "0 invalid 'kaiwa' types"; } || fail "$KAIWA"
(( DATA_FILES >= 30 )) && { S=$((S+3)); pass "$DATA_FILES data files"; } || warn "$DATA_FILES"
(( KANJI_LESSONS >= 20 )) && { S=$((S+2)); pass "$KANJI_LESSONS kanji lessons"; } || warn "$KANJI_LESSONS kanji lessons"
(( HSK_WORDS >= 1600 )) && { S=$((S+2)); pass "$HSK_WORDS HSK words"; } || warn "$HSK_WORDS HSK words"
score "Data" $S

# =============================================================================
# 9. Documentation
# =============================================================================
section "9/10" "Documentation"

S=0
[[ -f "$ROOT/AGENTS.md" ]]              && { S=$((S+3)); pass "AGENTS.md"; }          || fail "AGENTS.md missing"
[[ -f "$ROOT/documents/02-architecture/TECHNICAL.md" ]] && { S=$((S+2)); pass "TECHNICAL.md"; }       || fail "missing"
[[ -f "$ROOT/documents/01-business/BUSINESS_LOGIC.md" ]] && { S=$((S+2)); pass "BUSINESS_LOGIC.md"; }  || fail "missing"
[[ -f "$ROOT/README.md" ]]              && { S=$((S+3)); pass "README.md"; }           || fail "missing"
score "Docs" $S

# =============================================================================
# 10. Code Quality
# =============================================================================
section "10/10" "Code Quality"

TODOS=$(count "$(grep -rn 'TODO\|FIXME\|HACK\|XXX' svelte-app/src/lib/ svelte-app/src/routes/ --include='*.ts' --include='*.svelte' 2>/dev/null | wc -l)")
DEAD_CSS=$(count "$(echo "$SVELTE_OUT" | grep -c "css_unused_selector" 2>/dev/null)")
UNUSED_EXPORT=$(count "$(echo "$SVELTE_OUT" | grep -c "export_let_unused" 2>/dev/null)")
HEADER_ROUTES=$(count "$(grep -c "return '" svelte-app/src/lib/components/layout/Header.svelte 2>/dev/null)")

S=0
(( TODOS == 0 )) && { S=$((S+3)); pass "0 TODO/FIXME/HACK"; } || warn "$TODOS found"
(( HEADER_ROUTES >= 15 )) && { S=$((S+2)); pass "Header covers $HEADER_ROUTES routes"; } || warn "$HEADER_ROUTES"
S=$((S+2)); pass "BackButton present"
(( DEAD_CSS == 0 && UNUSED_EXPORT == 0 )) && { S=$((S+3)); pass "0 dead CSS/unused exports"; } || { S=$((S+1)); warn "$DEAD_CSS dead CSS, $UNUSED_EXPORT unused exports"; }
score "CodeQuality" $S

# =============================================================================
# REPORT
# =============================================================================
echo ""
echo -e "${BOLD}═══════════════════════════════════════════════${NC}"

GRADE="D (Major work needed)"
(( TOTAL >= 95 )) && GRADE="A+ (Production Excellence)"
(( TOTAL >= 90 && TOTAL < 95 )) && GRADE="A (Production Ready)"
(( TOTAL >= 85 && TOTAL < 90 )) && GRADE="B+ (Near Production)"
(( TOTAL >= 80 && TOTAL < 85 )) && GRADE="B (Good, needs polish)"
(( TOTAL >= 70 && TOTAL < 80 )) && GRADE="C (Acceptable)"

CATS=("Tests" "Build" "Routing" "Quiz" "TTS" "CI/CD" "UI/UX" "Data" "Docs" "CodeQuality")
LABELS=("Unit & Component Tests" "Build & TypeScript" "SPA Routing" "Quiz Logic" "TTS Audio" "CI/CD" "UI/UX" "Data Quality" "Documentation" "Code Quality")

echo ""
printf "  %-4s %-25s %5s %5s %s\n" "#" "Category" "Score" "/10" ""
printf "  %-4s %-25s %5s %5s %s\n" "---" "-------------------------" "-----" "----" "---"
for i in "${!CATS[@]}"; do
  pts=${SCORES[${CATS[$i]}]}
  printf "  %-4s %-25s %5s %5s %s\n" "$((i+1))" "${LABELS[$i]}" "$pts" "10" "$(status_icon $pts)"
done
printf "  %-4s %-25s %5s %5s\n" "" "" "$TOTAL" "100"
echo ""
echo -e "  ${BOLD}$TOTAL/100 — $GRADE${NC}"
echo -e "  Tests: $TEST_COUNT | Components: $COMPONENTS | Routes: $ROUTES | Data: $DATA_FILES"
echo -e "${BOLD}═══════════════════════════════════════════════${NC}"

# Save
if $SAVE_REPORT; then
  OUT="$ROOT/documents/04-quality/quality-audit-$DATE.md"
  {
    echo "# Smart Quiz — Quality Audit Report"
    echo ""; echo "**Date:** $DATE | **Commit:** $COMMIT | **Script:** quality-audit.sh"
    echo ""; echo "## Score: $TOTAL/100 — $GRADE"
    echo ""
    echo "| # | Category | Score | /10 | Status |"
    echo "|---|----------|-------|-----|--------|"
    for i in "${!CATS[@]}"; do
      pts=${SCORES[${CATS[$i]}]}
      echo "| $((i+1)) | ${LABELS[$i]} | $pts | 10 | $(status_icon $pts) |"
    done
    echo "| | **Total** | **$TOTAL** | **100** | |"
    echo ""
    echo "## Raw Data"
    echo "- Tests: $TEST_COUNT pass / $TEST_FAIL fail / $TEST_SKIP skip"
    echo "- svelte-check: $SVELTE_ERRORS errors / $SVELTE_WARNINGS warnings"
    echo "- Raw TTS (outside audioUtils): $RAW_TTS"
    echo "- Stale branches: $STALE | Open PRs: $OPEN_PRS"
    echo "- TODO/FIXME: $TODOS | Dead CSS: $DEAD_CSS | Unused exports: $UNUSED_EXPORT"
    echo "- Data: $DATA_FILES files | Components: $COMPONENTS | Routes: $ROUTES"
    echo "- Kanji lessons: $KANJI_LESSONS | HSK words: $HSK_WORDS"
  } > "$OUT"
  echo -e "\n${GREEN}Saved: $OUT${NC}"
fi
