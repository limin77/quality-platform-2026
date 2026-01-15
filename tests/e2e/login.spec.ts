import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Authentication Reliability', () => {
  test('Standard user can log in successfully', async ({ page }) => {
    // 1. Arrange (Setup)
    const loginPage = new LoginPage(page);

    // 2. Act (Perform Action)
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // 3. Assert (Verification)
    // We check the URL to ensure redirection happened
    await expect(page).toHaveURL(/inventory.html/);

    // We check a visual element (The title) to ensure page loaded
    await expect(page.locator('.title')).toHaveText('Products');
  });
});
