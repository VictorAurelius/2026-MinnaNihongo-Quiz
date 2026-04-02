/**
 * Capture screenshots from LIVE production site.
 * Usage: npx tsx scripts/capture-prod-screenshots.ts
 */

import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://victoraurelius.github.io/2026-Smart-Quiz';
const OUT_DIR = path.resolve(__dirname, '../../documents/04-quality/screenshots-prod');

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'courses', path: '/courses' },
  { name: 'course-detail', path: '/course/n5' },
  { name: 'lesson-menu', path: '/course/n5/lesson/1' },
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

      await page.addInitScript((isDark: boolean) => {
        localStorage.setItem('ui-store', JSON.stringify({ darkMode: isDark }));
      }, theme === 'dark');

      for (const p of PAGES) {
        const url = `${BASE_URL}${p.path}`;
        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
          // Re-inject dark mode and reload for SPA
          await page.evaluate((isDark: boolean) => {
            localStorage.setItem('ui-store', JSON.stringify({ darkMode: isDark }));
          }, theme === 'dark');
          await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
          await page.waitForTimeout(1500); // extra settle for animations

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
  console.log(`\nProduction screenshots saved to ${OUT_DIR}`);
}

main().catch(console.error);
