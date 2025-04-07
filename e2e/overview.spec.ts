import { test, expect } from '@playwright/test';

test('logs in with a Google account and goes to the overview page', async ({ page }) => {
  await page.goto('/login');



  const [popup] = await Promise.all([
    page.context().waitForEvent('page'),
    page.click('button:has-text("Google")'),
  ]);

  // Interact with the Google login popup
  await popup.fill('input[type="email"]', 'magic.pptest@gmail.com');
  await popup.click('button:has-text("Next")');
  await popup.fill('input[type="password"]', 'Pa$5ionatepeople');
  await popup.click('button:has-text("Next")');

  await page.waitForURL('**/browse');

  expect(page.url()).toContain('/browse');

  await expect(page.locator('input')).toHaveAttribute('placeholder');

  const placeholderText = page.locator('input');
  await await expect(placeholderText).toHaveAttribute('placeholder', 'Search for a show...');
});
