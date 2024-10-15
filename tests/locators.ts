import { Page } from 'playwright';

export class Locators {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getFullNameInput() {
    return this.page.locator('input[name="full-name"]');
  }

  getLastFourDigitsInput() {
    return this.page.locator('input[name="last-four-digits"]');
  }

  getExpiryMonthInput() {
    return this.page.locator('input[placeholder="MM"]');
  }

  getExpiryYearInput() {
    return this.page.locator('input[placeholder="YYYY"]');
  }

  getCardTypeRadioButton(cardType: string) {
    return this.page.locator(`input[value="${cardType}"]`);
  }

  getItemDropdown() {
    return this.page.locator('select[name="item-dropdown"]');
  }

  getTermsCheckbox() {
    return this.page.locator('input[name="terms"]');
  }

  getSubmitButton() {
    return this.page.locator('button[type="submit"]');
  }

  getErrorMessageForField(field: string) {
    return this.page.locator(`#${field}-error`);
  }
}
