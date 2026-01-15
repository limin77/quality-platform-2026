import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';

test.describe('E2E Transaction Flow', () => {

  test('User should be able to purchase a Backpack', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Buy the Product (The Complex Part)
    await checkoutPage.performCheckout('John', 'Doe', '12345');

    // 3. Verify Success (The "Money" Check)
    await expect(checkoutPage.successMessage).toBeVisible();
    await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
  });

});