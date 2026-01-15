import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly cartIcon: Locator;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Locators (The addresses of the elements)
    this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.successMessage = page.locator('.complete-header');
  }

  async performCheckout(firstName: string, lastName: string, zip: string) {
    // 1. Add Item to Cart
    await this.addToCartButton.click();

    // 2. Go to Cart & Start Checkout
    await this.cartIcon.click();
    await this.checkoutButton.click();

    // 3. Fill User Details
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipInput.fill(zip);
    await this.continueButton.click();

    // 4. Finalize
    await this.finishButton.click();
  }
}
