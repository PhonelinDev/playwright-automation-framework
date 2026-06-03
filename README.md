# 🎭 Playwright Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-1.44-green?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![CI](https://github.com/yourusername/playwright-automation-framework/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

A production-ready test automation framework built with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** design pattern.

---

## 🗂 Project Structure

```
playwright-automation-framework/
├── tests/
│   ├── e2e/              # End-to-end UI tests
│   └── api/              # API tests
├── pages/                # Page Object Model classes
│   ├── BasePage.ts       # Abstract base page
│   └── LoginPage.ts      # Login page object
├── utils/
│   ├── helpers.ts        # Reusable helper functions
│   └── constants.ts      # Test constants & config
├── fixtures/
│   ├── test-data.json    # Test data
│   └── auth.setup.ts     # Authentication setup
├── reports/              # Test reports output
├── .github/
│   └── workflows/
│       └── ci.yml        # GitHub Actions CI pipeline
├── playwright.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/playwright-automation-framework.git
cd playwright-automation-framework
npm install
npx playwright install
```

### Environment Variables

Create a `.env` file:

```env
BASE_URL=https://your-app.com
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=yourpassword
API_URL=https://api.your-app.com
```

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run only E2E tests
npm run test:e2e

# Run only API tests
npm run test:api

# Run with browser visible
npm run test:headed

# Open Playwright UI mode
npm run test:ui

# View HTML report
npm run report
```

---

## 🏗 Architecture

### Page Object Model (POM)
All page interactions are encapsulated in page classes under `/pages`, extending `BasePage`.

### Test Data
Centralized test data in `fixtures/test-data.json` — no hardcoded values in test files.

### CI/CD
GitHub Actions runs tests on every push/PR across Chromium, Firefox, and WebKit in parallel.

---

## 📊 Reporting

- **HTML Report**: `reports/html-report/`
- **JSON Report**: `reports/results.json`
- Screenshots and videos are captured automatically on failure.

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Playwright | ^1.44 | Test runner & browser automation |
| TypeScript | ^5.0 | Type safety |
| GitHub Actions | - | CI/CD pipeline |

---

## 📁 Design Patterns

- ✅ Page Object Model (POM)
- ✅ Fixture-based test data management
- ✅ Centralized configuration
- ✅ Shared authentication state
- ✅ Cross-browser testing
