import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Visual Regression', () => {
  
  test('Login Page should match the Golden Master', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // The Magic Line:
    // Takes a screenshot and compares it to the saved "Golden Master".
    // If pixels differ, the test FAILS.
    await expect(page).toHaveScreenshot('login-page-baseline.png', {
      maxDiffPixels: 100, // Allow tiny rendering differences (e.g., anti-aliasing)
    });
  });

});