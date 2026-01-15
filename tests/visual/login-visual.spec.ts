import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Visual Regression', () => {
  
  test('Login Page should match the Golden Master', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // The Magic Line (Updated for Cross-Platform):
    await expect(page).toHaveScreenshot('login-page-baseline.png', {
      maxDiffPixels: 2000, // Allow up to 2000 pixels of difference (Fonts/Anti-aliasing)
      threshold: 0.2,      // Allow 20% color shift tolerance
    });
  });

});