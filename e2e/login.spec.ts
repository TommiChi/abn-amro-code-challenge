import { test, expect } from '@playwright/test';

test('visits the login page', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('h1')).toHaveText('Sign in with:');
  await expect(page.locator('button')).toHaveText('Fake User');
});
