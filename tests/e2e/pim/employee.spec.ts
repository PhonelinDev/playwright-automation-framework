import { test, expect } from '@playwright/test';
import { TEST_USERS } from '../../../utils/constants';
import { LoginPage } from '../../../pages/LoginPage';
import { EmployeePage } from '../../../pages/EmployeePage';
import testData from '../../../fixtures/test-data.json';


test.describe('PIM - Employee', () => {
  let loginPage: LoginPage;
  let employeePage: EmployeePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    employeePage = new EmployeePage(page);

    await loginPage.goto();
    await loginPage.login(TEST_USERS.ADMIN.username, TEST_USERS.ADMIN.password);
    await loginPage.expectLoginSuccess();
  });

  test('should show employee list', async ({ page }) => {
    await employeePage.gotoEmployeeList();
    await expect(page.locator('span.oxd-text--span', { hasText: 'Records Found' })).toBeVisible({ timeout: 15000 });;
  });

  test('should search employee by name', async ({ page }) => {
    await employeePage.gotoEmployeeList();
    await employeePage.searchEmployee(testData.employees.search.existing);
    await expect(page.locator('span.oxd-text--span', { hasText: 'Records Found' })).toBeVisible({ timeout: 15000 });
  });

  test('should show no records for unknown employee', async ({ page }) => {
    await employeePage.gotoEmployeeList();
    await employeePage.searchEmployee(testData.employees.search.notExist);
    await employeePage.expectNoRecordsFound();
  });

  test('should add new employee successfully', async ({ page }) => {
    await employeePage.gotoEmployeeList();
    await employeePage.addEmployee(
        testData.employees.new.firstName,
        testData.employees.new.middleName,
        testData.employees.new.lastName
    );
    await employeePage.expectEmployeeAdded();
  });
});