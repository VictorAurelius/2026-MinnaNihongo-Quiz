/**
 * E2E Tests: Lesson Menu Page
 * Tests lesson info display, quiz mode buttons, and page rendering
 */

import { test, expect } from '@playwright/test';

test.describe('Lesson Menu Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/lesson/1');
  });

  test('should display lesson header with lesson number', async ({ page }) => {
    await expect(page.getByText('Bài 1')).toBeVisible();
  });

  test('should display lesson title', async ({ page }) => {
    const title = page.locator('h2');
    await expect(title.first()).toBeVisible();
  });

  test('should display vocab and grammar counts', async ({ page }) => {
    await expect(page.getByText(/từ vựng/)).toBeVisible();
    await expect(page.getByText(/ngữ pháp/)).toBeVisible();
  });

  test('should display three quiz mode buttons', async ({ page }) => {
    await expect(page.getByText('Flashcard Quiz')).toBeVisible();
    await expect(page.getByText('Multiple Choice')).toBeVisible();
    await expect(page.getByText('Typing Quiz')).toBeVisible();
  });

  test('should display study material buttons', async ({ page }) => {
    await expect(page.getByText('View Vocabulary List')).toBeVisible();
    await expect(page.getByText('View Grammar Patterns')).toBeVisible();
  });

  test('should display Quiz Modes section title', async ({ page }) => {
    await expect(page.getByText('Quiz Modes')).toBeVisible();
  });

  test('should display Study Materials divider', async ({ page }) => {
    await expect(page.getByText('Study Materials')).toBeVisible();
  });

  test('should show error for invalid lesson', async ({ page }) => {
    await page.goto('/lesson/999');
    await expect(page.getByText(/Lesson Not Found/i)).toBeVisible();
  });

  test('should display Back to Home button on error page', async ({ page }) => {
    await page.goto('/lesson/999');
    await expect(page.getByText('Back to Home')).toBeVisible();
  });

  test('should load different lessons via URL', async ({ page }) => {
    await page.goto('/lesson/2');
    await expect(page.getByText('Bài 2')).toBeVisible();
  });

  test('should navigate to flashcard quiz via URL', async ({ page }) => {
    await page.goto('/quiz/flashcard?lesson=1');
    await expect(page.locator('.flashcard')).toBeVisible();
  });

  test('should navigate to multiple choice quiz via URL', async ({ page }) => {
    await page.goto('/quiz/multiple-choice?lesson=1');
    await expect(page.locator('.mc-option').first()).toBeVisible();
  });

  test('should navigate to typing quiz via URL', async ({ page }) => {
    await page.goto('/quiz/typing?lesson=1');
    await expect(page.getByPlaceholder('Type in Japanese...')).toBeVisible();
  });
});
