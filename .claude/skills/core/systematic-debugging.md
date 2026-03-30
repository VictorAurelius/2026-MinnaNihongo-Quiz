# Debugging — Smart Quiz Gotchas

Claude already knows systematic debugging. This file lists **common failure points** specific to this project.

## Common Bugs & Root Causes

1. **404 on GitHub Pages** → forgot `${base}` in `goto()`, `redirect()`, or `<a href>`
2. **TTS reads twice** → used `item.japanese` instead of `item.kana`
3. **Quiz state not resetting** → Svelte reuses component instances; need reactive `$:` reset when props change
4. **`window is not defined`** → accessing browser APIs without `typeof window` guard in SSR/test
5. **VocabItem type error `"kaiwa"`** → not in union type, use `"supplementary"` instead
6. **Dark mode not applying** → localStorage `ui-store` key must have `{ darkMode: true }` before page renders
7. **Test crash `speechSynthesis`** → mock missing `cancel: vi.fn()`

## Debug Workflow for This Project

```bash
# 1. Reproduce
cd svelte-app && npm run dev   # Check browser console

# 2. Check tests
npx vitest run --reporter verbose 2>&1 | grep FAIL

# 3. Check build
npx vite build 2>&1 | grep -i error

# 4. Check types
npx svelte-check --threshold error

# 5. Check routing
grep -rn 'goto(' src/routes/ --include='*.svelte' | grep -v 'base'
```
