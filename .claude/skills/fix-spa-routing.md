# Skill: Fix SPA Routing / 404 on GitHub Pages

**Version:** 1.0
**Last Updated:** 2026-03-20
**Purpose:** Checklist to prevent 404 errors when adding new sections/routes to the SvelteKit SPA deployed on GitHub Pages

---

## Root Cause

This project uses `@sveltejs/adapter-static` with SPA fallback (`fallback: 'index.html'`). GitHub Pages serves `404.html` for unknown paths. All dynamic routes rely on client-side routing — there are NO prerendered HTML files except `index.html`.

The recurring 404 bug happens because **paths passed to `goto()` or `redirect()` are missing the `base` prefix** (`/2026-Smart-Quiz` in production).

---

## Mandatory Checklist — Run This When Adding Any New Route or Section

### 1. Every `goto()` call MUST include `${base}`

```typescript
// ❌ WRONG — breaks on GitHub Pages
goto('/course/n5/lesson/1');
goto(buildLessonUrl(courseId, lessonNumber));

// ✅ CORRECT
goto(`${base}/course/n5/lesson/1`);
goto(`${base}${buildLessonUrl(courseId, lessonNumber)}`);
```

**Rule:** If a utility function returns a path (like `buildLessonUrl`), it should return a path WITHOUT base (e.g., `/course/n5/lesson/1`). The caller MUST prepend `${base}` when using it with `goto()` or `<a href>`.

### 2. Every `redirect()` in `+page.ts` load functions MUST include `base`

```typescript
// ❌ WRONG
import { redirect } from '@sveltejs/kit';
throw redirect(301, '/course/n5');

// ✅ CORRECT
import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
throw redirect(301, `${base}/course/n5`);
```

**Note:** SvelteKit does NOT auto-prefix `base` on `redirect()` paths.

### 3. Every `<a href>` MUST include `{base}`

```svelte
<!-- ❌ WRONG -->
<a href="/course/n5">N5</a>

<!-- ✅ CORRECT -->
<a href="{base}/course/n5">N5</a>
```

### 4. BackButton HOME_PARENTS must include new top-level route segments

When adding a new section at `/newsection/...`, add `'newsection'` to `HOME_PARENTS` in `BackButton.svelte`:

```typescript
const HOME_PARENTS = new Set([
  'lesson', 'lessons', 'course', 'courses',
  'quiz', 'results', 'alphabet', 'counters',
  'grammar-reference', 'hsk', 'kanji'
]);
```

### 5. Header `getPageTitle()` must match new route patterns

Add regex patterns for new routes in `Header.svelte`:

```typescript
if (p.match(/^\/newroute\/\d+/)) return 'New Route Title';
```

### 6. Build script must generate 404.html

Verify `package.json` build script:
```json
"build": "vite build && cp build/index.html build/404.html"
```

### 7. Adapter config

`svelte.config.js` must have `fallback: 'index.html'` in adapter-static config. This generates the SPA shell that handles all routes client-side.

---

## Quick Grep to Find Violations

```bash
# Find goto() without base
grep -rn 'goto(' src/routes/ --include='*.svelte' | grep -v 'base'

# Find redirect() without base
grep -rn 'redirect(' src/routes/ --include='*.ts' | grep -v 'base'

# Find <a href="/  without base
grep -rn 'href="/' src/routes/ --include='*.svelte' | grep -v 'base'
```

---

## How GitHub Pages SPA Routing Works

1. User visits `victoraurelius.github.io/2026-Smart-Quiz/course/n5/lesson/8`
2. No static file at that path → GitHub Pages serves `404.html` (HTTP 404 status)
3. `404.html` is identical to `index.html` (SPA shell)
4. SvelteKit JS loads, client-side router reads URL, renders correct page
5. The HTTP 404 status doesn't matter — the browser renders the JS-generated content

**Key:** If `404.html` doesn't exist in build output, step 2 fails with a real 404 (no content).
