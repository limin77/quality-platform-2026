import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('Login Page should match the Golden Master image', async ({ page }) => {
    // 1. Go to the site
    await page.goto('https://www.saucedemo.com/');

    // 2. Wait for the page to settle (critical for visual tests)
    await page.waitForLoadState('networkidle');

    // 3. Compare with the baseline
    // The first time you run this, it will FAIL (because no baseline exists yet).
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixels: 100, // Allow tiny rendering differences (optional)
    });
  });
});
