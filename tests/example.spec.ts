import { test, expect } from '@playwright/test';
import { Locators } from './locators';
import { Helpers } from './helpers';

test.describe('Payment Form Tests', () => {
  let locators: Locators;

  test.beforeEach(async ({ page }) => {
    await page.goto(''); // Point to your local server
    locators = new Locators(page);
  });

  test('Should submit form with valid data', async ({ page }) => {
    // Fill in full name with first and last name
    await locators.getFullNameInput().fill(Helpers.generateRandomFullName());
    await locators.getLastFourDigitsInput().fill(Helpers.generateRandomLastFourDigits());
    await locators.getExpiryMonthInput().fill(Helpers.generateRandomMonth());
    await locators.getExpiryYearInput().fill(Helpers.generateRandomYear());
    await locators.getCardTypeRadioButton('visa').check();
    await locators.getItemDropdown().selectOption('item1');
    await locators.getTermsCheckbox().check();
    await locators.getSubmitButton().click();

    // Expect no errors to be displayed, assuming successful submission would navigate or change the page
    expect(await page.url()).not.toContain('/error');
  });

  test('Should show error messages for empty required fields', async ({ page }) => {
    await locators.getSubmitButton().click();

    // Validate that all required field errors are displayed
    expect(await locators.getErrorMessageForField('name').isVisible()).toBeTruthy();
    expect(await locators.getErrorMessageForField('digits').isVisible()).toBeTruthy();
    expect(await locators.getErrorMessageForField('expiry').isVisible()).toBeTruthy();
    expect(await locators.getErrorMessageForField('card-type').isVisible()).toBeTruthy();
    expect(await locators.getErrorMessageForField('item').isVisible()).toBeTruthy();
    expect(await locators.getErrorMessageForField('terms').isVisible()).toBeTruthy();
  });

  test('Should show error when last 4 digits are less than 4 digits', async ({ page }) => {
    await locators.getFullNameInput().fill(Helpers.generateRandomFullName());
    await locators.getLastFourDigitsInput().fill('12'); // Invalid input: only 2 digits
    await locators.getExpiryMonthInput().fill(Helpers.generateRandomMonth());
    await locators.getExpiryYearInput().fill(Helpers.generateRandomYear());
    await locators.getCardTypeRadioButton('visa').check();
    await locators.getItemDropdown().selectOption('item1');
    await locators.getTermsCheckbox().check();
    await locators.getSubmitButton().click();

    // Validate that error is shown for last 4 digits
    expect(await locators.getErrorMessageForField('digits').isVisible()).toBeTruthy();
  });

  test('Should clear terms error after checkbox is checked', async ({ page }) => {
    await locators.getFullNameInput().fill(Helpers.generateRandomFullName());
    await locators.getLastFourDigitsInput().fill(Helpers.generateRandomLastFourDigits());
    await locators.getExpiryMonthInput().fill(Helpers.generateRandomMonth());
    await locators.getExpiryYearInput().fill(Helpers.generateRandomYear());
    await locators.getCardTypeRadioButton('visa').check();
    await locators.getItemDropdown().selectOption('item1');
    await locators.getSubmitButton().click();

    // Expect error for unchecked terms
    expect(await locators.getErrorMessageForField('terms').isVisible()).toBeTruthy();

    // Check the checkbox and click continue again
    await locators.getTermsCheckbox().check();
    await locators.getSubmitButton().click();

    // Expect the terms error to be cleared
    expect(await locators.getErrorMessageForField('terms').isVisible()).toBeFalsy();
  });
});
