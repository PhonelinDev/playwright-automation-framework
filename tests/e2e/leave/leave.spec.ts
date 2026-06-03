import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { LeavePage } from '../../../pages/LeavePage';
import { TEST_USERS } from '../../../utils/constants';
import testData from '../../../fixtures/test-data.json';

test.describe('Leave Management', () => {
  let loginPage: LoginPage;
  let leavePage: LeavePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    leavePage = new LeavePage(page);

    await loginPage.goto();
    await loginPage.login(TEST_USERS.ADMIN.username, TEST_USERS.ADMIN.password);
    await loginPage.expectLoginSuccess();
  });

  test('should show leave list', async ({ page }) => {
    await leavePage.gotoLeaveList();
    await leavePage.expectRecordsFound();
  });

  test('should search leave list', async ({ page }) => {
    await leavePage.gotoLeaveList();
    await leavePage.searchLeave();
    await leavePage.expectRecordsFound();
  });

  test('should navigate to apply leave page', async ({ page }) => {
  await leavePage.gotoApplyLeave();
  // เช็คแค่ว่าโหลดหน้าได้ ไม่สนใจ content
  await expect(page).toHaveURL(/.*applyLeave/);
});
});