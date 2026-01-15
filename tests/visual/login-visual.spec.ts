import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Visual Regression', () => {
  
  test('Login Page should match the Golden Master', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // FIX: We removed the hardcoded filename string.
    // Playwright will now automatically append the OS to the filename.
    // Windows -> '...-chromium-win32.png'
    // Linux   -> '...-chromium-linux.png'
    await expect(page).toHaveScreenshot({
      maxDiffPixels: 100, // Strict, but allows for tiny rendering noise
    });
  });

});