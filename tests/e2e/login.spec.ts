import { test, expect } from '@playwright/test';
import { TEST_USERS } from '../../utils/constants';
import { LoginPage } from '../../pages/LoginPage';  

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(TEST_USERS.ADMIN.username, TEST_USERS.ADMIN.password);
    await loginPage.expectLoginSuccess();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await loginPage.login('wronguser', 'wrongpass');
    await loginPage.expectLoginFailed();
    const msg = await loginPage.getErrorMessage();
    expect(msg).toContain('Invalid credentials');
  });

  test('should show error when username is empty', async ({ page }) => {
    await loginPage.login('', 'admin123');
    await expect(page.getByText('Required')).toBeVisible();
  });

  test('should show error when password is empty', async ({ page }) => {
    await loginPage.login(TEST_USERS.ADMIN.username, '');
    await expect(page.getByText('Required')).toBeVisible();
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/OrangeHRM/);
  });
});