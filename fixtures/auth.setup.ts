import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TEST_USERS } from '../utils/constants';

const authFile = 'fixtures/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(TEST_USERS.STANDARD.username, TEST_USERS.STANDARD.password);  await loginPage.expectLoginSuccess();
  await page.context().storageState({ path: authFile });
});
