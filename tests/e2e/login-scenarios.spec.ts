import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

// 1. Define the Data
const testData = [
  {
    role: 'Standard User',
    username: 'standard_user',
    password: 'secret_sauce',
    shouldLogin: true,
  },
  {
    role: 'Locked Out User',
    username: 'locked_out_user',
    password: 'secret_sauce',
    shouldLogin: false,
    errorMessage: 'Sorry, this user has been locked out.',
  },
  {
    role: 'Invalid Password',
    username: 'standard_user',
    password: 'wrong_password',
    shouldLogin: false,
    errorMessage: 'Username and password do not match',
  },
];

test.describe('Data-Driven Login Security', () => {
  for (const data of testData) {
    test(`Security Check: ${data.role} should handled correctly`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(data.username, data.password);

      if (data.shouldLogin) {
        // ❌ INTENTIONAL FAILURE:
        // We expect the title to be "WRONG", but the actual page says "Swag Labs".
        // This will FAIL, turning the Pipeline RED, and creating the Bug Report Ticket.
        await expect(page).toHaveTitle('WRONG TITLE TO TRIGGER BUG REPORT');
      } else {
        const errorLocator = page.locator('[data-test="error"]');
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toContainText(data.errorMessage!);
      }
    });
  }
});
