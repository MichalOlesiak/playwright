
# Playwright Test Automation Project

This project uses **Playwright** and **TypeScript** to automate the testing of a web application. It includes tests for form validation and interactions, and generates detailed test reports using **Allure**.

## Table of Contents

- [Project Setup](#project-setup)
- [Running Tests](#running-tests)
- [Generating and Viewing Test Reports](#generating-and-viewing-test-reports)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## Project Setup

Before you can run the tests, you need to set up the project environment on your local machine. Follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/YourGitHubUsername/playwright-project.git
cd playwright-project
```

### 2. Install Dependencies

Ensure you have **Node.js** installed (recommended version: `14.x` or higher). Then, install all required project dependencies:

```bash
npm install
```

### 3. Install Playwright Browsers

Playwright requires its own set of browser binaries. Install them by running the following command:

```bash
npx playwright install
```

This will install the necessary browsers (**Chromium**, **Firefox**, and **WebKit**) for running tests.

### 4. Install Allure Commandline (Optional)

To generate test reports using **Allure**, you'll need to install the Allure Commandline tool. You can install it globally using npm:

```bash
npm install -g allure-commandline --save-dev
```

Alternatively, you can download and install Allure manually from [Allure's GitHub releases](https://github.com/allure-framework/allure2/releases).

## Running Tests

Once everything is set up, you can run the tests using **Playwright**. By default, tests will run across all configured browsers (Chromium, Firefox, and WebKit).

### 1. Run All Tests

To run all tests across all browsers, use the following command:

```bash
npx playwright test
```

This will execute the tests in headless mode (i.e., without a browser window). If you'd like to see the tests run in a visible browser, you can run them in headed mode:

```bash
npx playwright test --headed
```

### 2. Run Tests in a Specific Browser

To run tests in a specific browser (e.g., Chromium), use the `--project` option:

```bash
npx playwright test --project=Chromium
```

You can replace `Chromium` with `Firefox` or `WebKit` to run tests in other browsers.

### 3. Run a Specific Test File

To run a specific test file, use the following command:

```bash
npx playwright test tests/your-test-file.spec.ts
```

## Generating and Viewing Test Reports

This project integrates **Allure** to generate detailed test reports, including test steps, screenshots, and videos for failed tests.

### 1. Generate Allure Report

After running the tests, generate the Allure report using the following command:

```bash
npx allure generate allure-results --clean
```

This will generate a report in the `allure-report` directory.

### 2. View the Allure Report

To open and view the generated Allure report in your browser, use the following command:

```bash
npx allure open
```

This will launch a local web server and open the report in your default browser, where you can explore the test results in detail.

## Project Structure

The project follows a structured setup with clear separation between test files, configuration, and helper utilities.

```
├── tests/                  # Test files go here
│   ├── form.test.ts        # Example test for form validation
│   └── ...                 # Other test files
├── Locators.ts             # Contains element locators used in tests
├── Helpers.ts              # Utility functions for interacting with the page
├── playwright.config.ts    # Playwright configuration file
├── .gitignore              # Ignored files for Git
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

### Key Files:

- **`playwright.config.ts`**: Configuration file that defines browser settings, projects, and test behaviors.
- **`Locators.ts`**: Contains element selectors used by tests to interact with the web page.
- **`Helpers.ts`**: Helper functions for commonly used actions like filling forms or clicking buttons.

## Troubleshooting

If you encounter issues while running tests or generating reports, here are a few common solutions:

- **Browser Installation Issues**: Run `npx playwright install` to ensure all required browsers are installed.
- **Permission Issues with Allure**: Ensure Allure is installed globally using the `npm install -g allure-commandline` command.
- **Failed Test Push**: Run `git pull --rebase origin main` before pushing new changes if you see a "rejected" error message during git push.

---

Now you're ready to run tests and explore detailed reports! If you encounter any issues, feel free to open an issue or reach out to the repository owner.
