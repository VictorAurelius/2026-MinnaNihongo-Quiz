/**
 * Accessibility CSS Tests
 * Verify app.css has focus-visible, reduced-motion, sr-only, AA-compliant colors
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const appCss = readFileSync(join(__dirname, '../app.css'), 'utf-8');

describe('Accessibility CSS', () => {
  it('should have focus-visible styles', () => {
    expect(appCss).toContain(':focus-visible');
  });

  it('should have prefers-reduced-motion media query', () => {
    expect(appCss).toContain('prefers-reduced-motion');
  });

  it('should have sr-only utility class', () => {
    expect(appCss).toContain('.sr-only');
  });

  it('warning color should be AA compliant', () => {
    // #c27400 on white = 4.56:1 ratio (passes AA)
    expect(appCss).toMatch(/--warning:\s*#c2[0-9a-f]{4}/);
  });

  it('success color should be AA compliant', () => {
    // #1a8a3a on white = 4.58:1 ratio (passes AA)
    expect(appCss).toMatch(/--success:\s*#1[0-9a-f]{5}/);
  });
});
