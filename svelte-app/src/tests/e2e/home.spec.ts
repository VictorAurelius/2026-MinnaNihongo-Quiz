/**
 * E2E Tests: Home Page
 * Tests lesson grid, course tabs, and page rendering
 */

import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Smart Quiz/);
  });

  test('should display the hero heading', async ({ page }) => {
    // Home redesigned into a landing page; hero h1 = "Learn 日本語 & 中文"
    await expect(page.getByRole('heading', { level: 1, name: /Learn/i })).toBeVisible();
  });

  test('should display Courses and Quiz Modes sections', async ({ page }) => {
    // Tab UI removed; home now surfaces section headings
    await expect(page.getByRole('heading', { name: 'Courses' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Quiz Modes/i })).toBeVisible();
  });

  test('should show course cards', async ({ page }) => {
    // Lesson grid replaced by course cards (Minna no Nihongo = JLPT N5)
    await expect(page.getByText('Minna no Nihongo').first()).toBeVisible();
  });

  test('should display reference & tools cards', async ({ page }) => {
    // Lesson grid replaced by reference/tools cards
    await expect(page.getByText('Kanji').first()).toBeVisible();
    await expect(page.getByText('Alphabet').first()).toBeVisible();
  });

  test('should show lesson metadata (vocab and grammar count)', async ({ page }) => {
    await expect(page.getByText(/từ .* ngữ pháp/).first()).toBeVisible();
  });

  test('should display hero description text', async ({ page }) => {
    await expect(page.getByText(/Interactive flashcards/i)).toBeVisible();
  });

  test('should navigate to lesson page via direct URL', async ({ page }) => {
    // /lesson/1 now 301-redirects to /course/n5/lesson/1 — "Bài 1" shows in badge + breadcrumb
    await page.goto('/lesson/1');
    await expect(page.getByText('Bài 1').first()).toBeVisible();
    await expect(page.getByText('Flashcard Quiz')).toBeVisible();
  });
});
