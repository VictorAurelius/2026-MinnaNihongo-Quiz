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

  test('should display "Choose a Lesson" heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Choose a Lesson/i })).toBeVisible();
  });

  test('should display JLPT and HSK course tabs', async ({ page }) => {
    await expect(page.getByText('JLPT')).toBeVisible();
    await expect(page.getByText('HSK')).toBeVisible();
  });

  test('should show JLPT lessons by default', async ({ page }) => {
    await expect(page.getByText('Bài 1').first()).toBeVisible();
  });

  test('should display lesson grid with lesson cards', async ({ page }) => {
    // Should have lesson text visible
    await expect(page.getByText('Bài 1').first()).toBeVisible();
    await expect(page.getByText('Bài 2').first()).toBeVisible();
  });

  test('should show lesson metadata (vocab and grammar count)', async ({ page }) => {
    await expect(page.getByText(/từ .* ngữ pháp/).first()).toBeVisible();
  });

  test('should display description text', async ({ page }) => {
    await expect(page.getByText(/Select a lesson to practice/)).toBeVisible();
  });

  test('should navigate to lesson page via direct URL', async ({ page }) => {
    await page.goto('/lesson/1');
    await expect(page.getByText('Bài 1')).toBeVisible();
    await expect(page.getByText('Flashcard Quiz')).toBeVisible();
  });
});
