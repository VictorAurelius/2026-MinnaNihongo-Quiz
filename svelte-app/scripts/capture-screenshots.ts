/**
 * Capture audit screenshots for quality reports.
 * Usage: npx playwright test scripts/capture-screenshots.ts
 * Or:    npx tsx scripts/capture-screenshots.ts
 */

import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const OUT_DIR = path.resolve(__dirname, '../../documents/04-quality/screenshots');

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

  const browser = await chromium.launch();

  for (const theme of THEMES) {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        colorScheme: theme,
      });
      const page = await context.newPage();

      // Set dark mode via localStorage
      await page.addInitScript((isDark: boolean) => {
        localStorage.setItem('ui-store', JSON.stringify({ darkMode: isDark }));
      }, theme === 'dark');

      for (const p of PAGES) {
        const url = `${BASE_URL}${p.path}`;
        try {
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
          await page.waitForTimeout(500); // let animations settle

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
  console.log(`\nScreenshots saved to ${OUT_DIR}`);
}

main().catch(console.error);
