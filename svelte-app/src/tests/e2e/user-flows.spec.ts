/**
 * E2E Tests: Complete User Flows
 * Tests end-to-end user journeys through the application
 */

import { test, expect } from '@playwright/test';

test.describe('User Flow: Quiz Pages Load Correctly', () => {
  test('should load flashcard quiz for lesson 1', async ({ page }) => {
    await page.goto('/quiz/flashcard?lesson=1');
    await expect(page.locator('.flashcard')).toBeVisible();
    await expect(page.locator('.progress-bar')).toBeVisible();
  });

  test('should load multiple choice quiz for lesson 1', async ({ page }) => {
    await page.goto('/quiz/multiple-choice?lesson=1');
    await expect(page.locator('.mc-option').first()).toBeVisible();
    await expect(page.locator('.quiz-question-card')).toBeVisible();
  });

  test('should load typing quiz for lesson 1', async ({ page }) => {
    await page.goto('/quiz/typing?lesson=1');
    await expect(page.getByPlaceholder('Type in Japanese...')).toBeVisible();
    await expect(page.getByText('Submit Answer')).toBeVisible();
  });

  test('should redirect to home for invalid lesson in quiz', async ({ page }) => {
    await page.goto('/quiz/flashcard?lesson=999');
    await expect(page).toHaveURL('/', { timeout: 10000 });
    await expect(page.getByText(/Choose a Lesson/i)).toBeVisible();
  });
});

test.describe('User Flow: Complete a Flashcard Quiz', () => {
  test('should complete flashcard quiz and see results', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('/quiz/flashcard?lesson=1');

    // Answer all questions by clicking Correct
    let attempts = 0;
    while (attempts < 100 && !page.url().includes('/results')) {
      attempts++;
      const correctBtn = page.getByText(/✓ Correct/);
      if (await correctBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await correctBtn.click();
        await page.waitForTimeout(500);
      } else {
        await page.waitForTimeout(300);
      }
    }

    // Should be on results page
    await expect(page).toHaveURL(/\/results/, { timeout: 10000 });
    await expect(page.getByText('Quiz Complete!')).toBeVisible();
  });

  test('results page should show score details', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('/quiz/flashcard?lesson=1');

    let attempts = 0;
    while (attempts < 100 && !page.url().includes('/results')) {
      attempts++;
      const correctBtn = page.getByText(/✓ Correct/);
      if (await correctBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await correctBtn.click();
        await page.waitForTimeout(500);
      } else {
        await page.waitForTimeout(300);
      }
    }

    await expect(page.getByText('Quiz Complete!')).toBeVisible();
    await expect(page.getByText(/Score:/)).toBeVisible();
    await expect(page.getByText(/Grade:/)).toBeVisible();
    await expect(page.getByText(/Time:/)).toBeVisible();
    await expect(page.getByText(/100%/)).toBeVisible();
  });

  test('results page should show action buttons', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('/quiz/flashcard?lesson=1');

    let attempts = 0;
    while (attempts < 100 && !page.url().includes('/results')) {
      attempts++;
      const correctBtn = page.getByText(/✓ Correct/);
      if (await correctBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await correctBtn.click();
        await page.waitForTimeout(500);
      } else {
        await page.waitForTimeout(300);
      }
    }

    await expect(page.getByText(/Retry Quiz/)).toBeVisible();
    await expect(page.getByText(/Back to Lesson/)).toBeVisible();
    await expect(page.getByText(/Home/)).toBeVisible();
  });
});

test.describe('User Flow: Different Lessons', () => {
  test('should load quiz for lesson 2', async ({ page }) => {
    await page.goto('/quiz/flashcard?lesson=2');
    await expect(page.locator('.flashcard')).toBeVisible();
  });

  test('should load quiz for lesson 5', async ({ page }) => {
    await page.goto('/quiz/multiple-choice?lesson=5');
    await expect(page.locator('.mc-option').first()).toBeVisible();
  });

  test('should show different lesson info', async ({ page }) => {
    await page.goto('/lesson/3');
    await expect(page.getByText('Bài 3')).toBeVisible();
  });
});
