// Cross-platform SPA fallback for GitHub Pages.
// Copies build/index.html -> build/404.html so client-side routing works on
// deep links / refresh. Replaces the shell-specific `cp build/index.html
// build/404.html` which failed on Windows (audit 2026-05-13, Wave 0 PR 0.2).
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const src = resolve('build', 'index.html');
const dest = resolve('build', '404.html');

if (!existsSync(src)) {
  console.error(`[postbuild] ${src} not found — did "vite build" run first?`);
  process.exit(1);
}

copyFileSync(src, dest);
console.log('[postbuild] build/404.html SPA fallback created');
