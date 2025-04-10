/* eslint-disable playwright/no-networkidle */

import { test } from '@playwright/test';
import { expectNoA11yViolations } from './axe';

test('checks the accessibility of the home page', async ({ page }) => {
  await page.goto('/');

  await page.waitForLoadState('networkidle');

  await expectNoA11yViolations(page);
});

test('checks the accessibility of the login page', async ({ page }) => {
  await page.goto('/login');

  await page.waitForLoadState('networkidle');

  await expectNoA11yViolations(page);
});

test('checks the accessibility of the overview page', async ({ page, context }) => {
  await context.addCookies([
    {
      name: 'abnFlixUser',
      value: 'FakeUser',
      domain: 'localhost',
      path: '/browse',
      httpOnly: false,
      secure: false,
    },
  ]);

  await page.goto('/browse');

  await page.waitForLoadState('networkidle');

  await expectNoA11yViolations(page);
});

test('checks the accessibility of the product detail page', async ({ page, context }) => {
  await context.addCookies([
    {
      name: 'abnFlixUser',
      value: 'FakeUser',
      domain: 'localhost',
      path: '/shows/1',
      httpOnly: false,
      secure: false,
    },
  ]);

  await page.goto('/shows/1');

  await page.waitForLoadState('networkidle');

  await expectNoA11yViolations(page);
});

test('checks the accessibility of the category page', async ({ page, context }) => {
  await context.addCookies([
    {
      name: 'abnFlixUser',
      value: 'FakeUser',
      domain: 'localhost',
      path: '/browse/Action',
      httpOnly: false,
      secure: false,
    },
  ]);

  await page.goto('/browse/Action');

  await page.waitForLoadState('networkidle');

  await expectNoA11yViolations(page);
});
