import { Page } from '@playwright/test';

export class Locators {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  fullNameField() {
    return this.page.getByTestId('full-name-input');
  }

  lastFourDigitsField() {
    return this.page.getByTestId('last-four-digits-input');
  }

  expiryMonthField() {
    return this.page.getByTestId('expiry-month-input');
  }

  expiryYearField() {
    return this.page.getByTestId('expiry-year-input');
  }

  submitButton() {
    return this.page.getByRole('button', { name: 'Continue' });
  }

  customError() {
    return this.page.locator('custom-error:not(.hidden)');
  }
}
