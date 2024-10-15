// import { test, expect } from '@playwright/test';
// import { Locators } from '../utils/locators';
// import { Helpers } from '../utils/helpers';

// test.describe('Form tests', () => {
//   let locators: Locators;
//   let helpers: Helpers;

//   test.beforeEach(async ({ page }) => {
//     locators = new Locators(page);
//     helpers = new Helpers();

//     await page.goto('/'); // Przejdź na stronę główną formularza
//   });

//   // Test 1: Poprawne wypełnienie formularza
//   test('should fill the form correctly and submit', async () => {
//     await locators.fullNameField().fill(helpers.generateFullName());
//     await locators.lastFourDigitsField().fill(helpers.generateFourDigits());
//     await locators.expiryMonthField().fill(helpers.generateMonth());
//     await locators.expiryYearField().fill(helpers.generateYear());

//     await locators.submitButton().click();

//     // Oczekujemy, że po poprawnym wypełnieniu nie będzie widocznych błędów
//     const errors = await locators.customError().count();
//     expect(errors).toBe(0);
//   });

//   // Test 2: Próba wysłania pustego formularza
//   test('should display correct number of errors when submitting empty form', async () => {
//     await locators.submitButton().click();

//     // Oczekujemy, że zobaczymy wszystkie błędy
//     const errors = await locators.customError().count();
//     expect(errors).toBe(3); // Sprawdź, że są 3 błędy: full-name, last-four-digits, expiry-date
//   });

//   // Test 3: Próba wpisania za małej liczby cyfr do pola 4 digits
//   test('should display error for last four digits when not enough digits are entered', async () => {
//     await locators.fullNameField().fill(helpers.generateFullName());
//     await locators.lastFourDigitsField().fill('12'); // Za mało cyfr
//     await locators.expiryMonthField().fill(helpers.generateMonth());
//     await locators.expiryYearField().fill(helpers.generateYear());

//     await locators.submitButton().click();

//     // Sprawdzamy, czy wyświetli się błąd dla "Last Four Digits"
//     const errors = await locators.customError().count();
//     expect(errors).toBeGreaterThan(0);
//   });
// });

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
