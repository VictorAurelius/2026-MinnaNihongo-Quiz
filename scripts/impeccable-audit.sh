#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DETECTOR="$ROOT/.github/skills/impeccable/scripts/detect.mjs"
BASELINE="$ROOT/.impeccable/baseline.json"
TARGET="$ROOT/svelte-app/src"

if [[ ! -f "$DETECTOR" ]]; then
  echo "Impeccable detector is not installed at $DETECTOR" >&2
  exit 1
fi

if [[ ! -f "$BASELINE" ]]; then
  echo "Impeccable baseline is missing at $BASELINE" >&2
  exit 1
fi

set +e
OUTPUT=$(node "$DETECTOR" --json "$TARGET" 2>&1)
DETECT_RC=$?
set -e

if ! COUNTS=$(printf '%s' "$OUTPUT" | node -e '
let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", chunk => input += chunk);
process.stdin.on("end", () => {
  let findings;
  try { findings = JSON.parse(input); }
  catch { process.exit(2); }
  const warnings = findings.filter(item => item.severity === "warning").length;
  process.stdout.write(`${findings.length} ${warnings}`);
});
'); then
  echo "$OUTPUT" >&2
  echo "Impeccable detector did not return valid JSON (rc=$DETECT_RC)." >&2
  exit 1
fi

read -r TOTAL WARNINGS <<< "$COUNTS"
BASE_TOTAL=$(grep -m1 '"total"' "$BASELINE" | grep -oE '[0-9]+')
BASE_WARNINGS=$(grep -m1 '"warning"' "$BASELINE" | grep -oE '[0-9]+')

echo "Impeccable: $TOTAL findings ($WARNINGS warnings)"
echo "Baseline:   $BASE_TOTAL findings ($BASE_WARNINGS warnings)"

if (( TOTAL > BASE_TOTAL || WARNINGS > BASE_WARNINGS )); then
  echo "Impeccable design debt regressed above the accepted baseline." >&2
  exit 1
fi

if (( TOTAL < BASE_TOTAL || WARNINGS < BASE_WARNINGS )); then
  echo "Design debt improved. Update .impeccable/baseline.json in the same change."
fi
