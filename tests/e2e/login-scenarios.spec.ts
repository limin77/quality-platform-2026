import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

// 1. Define the Data (The "Inputs")
// In a real company, this might come from a JSON file or a Database
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
    errorMessage: 'Sorry, this user has been locked out.'
  },
  {
    role: 'Invalid Password',
    username: 'standard_user',
    password: 'wrong_password',
    shouldLogin: false,
    errorMessage: 'Username and password do not match'
  }
];

test.describe('Data-Driven Login Security', () => {

  // 2. The Loop (The "Engine")
  // We iterate through every item in 'testData' and create a dynamic test for it
  for (const data of testData) {
    
    test(`Security Check: ${data.role} should handled correctly`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      
      // Act
      await loginPage.login(data.username, data.password);

      // Assert (Conditional Logic)
      if (data.shouldLogin) {
        // Scenario A: Expect Success
        await expect(page).toHaveURL(/inventory.html/);
      } else {
        // Scenario B: Expect Failure & Check Error Message
        const errorLocator = page.locator('[data-test="error"]');
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toContainText(data.errorMessage!); // '!' tells TS we know it exists
      }
    });

  }
});