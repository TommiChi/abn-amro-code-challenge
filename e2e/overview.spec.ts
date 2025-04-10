import { test, expect } from '@playwright/test';

test('logs in with a Google account and goes to the overview page', async ({ page }) => {
  await page.goto('/login');
  await page.click('button');

  await page.waitForURL('**/browse');

  expect(page.url()).toContain('/browse');

  await expect(page.locator('input')).toHaveAttribute('placeholder');

  const placeholderText = page.locator('input');
  await expect(placeholderText).toHaveAttribute('placeholder', 'Search for a show...');
});
