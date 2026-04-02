/**
 * Capture screenshots for quality reports.
 *
 * Usage:
 *   npx tsx scripts/capture-screenshots.ts                    → saves to screenshots/latest/
 *   npx tsx scripts/capture-screenshots.ts --label pr-123     → saves to screenshots/pr-123/
 *   npx tsx scripts/capture-screenshots.ts --label before-fix → saves to screenshots/before-fix/
 *   BASE_URL=http://... npx tsx scripts/capture-screenshots.ts --label prod → production capture
 */

import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse --label arg
const labelArg = process.argv.find(a => a.startsWith('--label'));
const labelIdx = process.argv.indexOf('--label');
const label = labelIdx >= 0 ? process.argv[labelIdx + 1] : 'latest';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const SCREENSHOTS_ROOT = path.resolve(__dirname, '../../documents/04-quality/screenshots');
const OUT_DIR = path.join(SCREENSHOTS_ROOT, label);

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'courses', path: '/courses' },
  { name: 'course-detail', path: '/course/n5' },
  { name: 'lesson-menu', path: '/course/n5/lesson/1' },
  { name: 'vocabulary', path: '/course/n5/lesson/1/vocabulary' },
  { name: 'kanji', path: '/kanji' },
  { name: 'hsk', path: '/hsk' },
  { name: 'settings', path: '/settings' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 375, height: 812 },
];

const THEMES = ['light', 'dark'] as const;

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Capturing to: ${label}/`);
  console.log(`Source: ${BASE_URL}\n`);

  const browser = await chromium.launch();
  const isProd = BASE_URL.includes('github.io');

  for (const theme of THEMES) {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        colorScheme: theme,
      });
      const page = await context.newPage();

      await page.addInitScript((isDark: boolean) => {
        localStorage.setItem('ui-store', JSON.stringify({ darkMode: isDark }));
      }, theme === 'dark');

      for (const p of PAGES) {
        const url = `${BASE_URL}${p.path}`;
        try {
          const waitUntil = isProd ? 'networkidle' : 'domcontentloaded';
          const timeout = isProd ? 30000 : 15000;

          await page.goto(url, { waitUntil, timeout });
          await page.evaluate((isDark: boolean) => {
            localStorage.setItem('ui-store', JSON.stringify({ darkMode: isDark }));
          }, theme === 'dark');
          await page.reload({ waitUntil, timeout });
          await page.waitForTimeout(isProd ? 1500 : 800);

          const filename = `${p.name}-${theme}-${viewport.name}.png`;
          await page.screenshot({
            path: path.join(OUT_DIR, filename),
            fullPage: true,
          });
          console.log(`  ✓ ${filename}`);
        } catch (e) {
          console.log(`  ✗ ${p.name}-${theme}-${viewport.name}: ${(e as Error).message}`);
        }
      }

      await context.close();
    }
  }

  await browser.close();
  console.log(`\nScreenshots saved to screenshots/${label}/`);
}

main().catch(console.error);
