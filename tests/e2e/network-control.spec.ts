import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Network Resilience & Mocking', () => {
  test('App should function correctly even if Image CDN crashes', async ({ page }) => {
    // 1. GOD MODE: Intercept network traffic
    // We tell the browser: "If you see a request for a .jpg image, KILL IT."
    await page.route('**/*.jpg', (route) => route.abort());

    // 2. Login normally
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // 3. Verify the "Chaos"
    // The images should be broken, but the buttons should still be visible.
    // We check that the "Backpack" image is NOT visible (because we killed it)

    // In a real browser, the image is still "there" in the DOM but has 0 natural width.
    // We verify the "Add to Cart" button is still clickable.
    const addToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

    // 4. Verify the App Logic survived the "Network Crash"
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });
});
