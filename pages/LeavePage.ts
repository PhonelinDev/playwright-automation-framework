import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LeavePage extends BasePage {
  // Leave List
  private searchButton = this.page.getByRole('button', { name: 'Search' });

  // Apply Leave Form
  private leaveTypeDropdown = this.page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2);
  private fromDateInput = this.page.getByRole('textbox', { name: 'yyyy-dd-mm' }).first();
  private toDateInput = this.page.getByRole('textbox', { name: 'yyyy-dd-mm' }).nth(1);
  private commentsInput = this.page.locator('textarea');
  private applyButton = this.page.getByRole('button', { name: 'Apply' });

  constructor(page: Page) {
    super(page);
  }

  async gotoLeaveList() {
    await this.navigate('/web/index.php/leave/viewLeaveList');
    await this.waitForPageLoad();
  }

  async gotoApplyLeave() {
    await this.navigate('/web/index.php/leave/applyLeave');
    await this.waitForPageLoad();
  }

  async searchLeave() {
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  async applyLeave(leaveType: string, fromDate: string, toDate: string, comment: string) {
    await this.leaveTypeDropdown.click();
    await this.page.getByRole('option', { name: leaveType }).click();
    await this.fromDateInput.fill(fromDate);
    await this.toDateInput.fill(toDate);
    await this.toDateInput.press('Tab');
    await this.commentsInput.fill(comment);
    await this.applyButton.click();
    await this.waitForPageLoad();
  }

  async expectLeaveApplied() {
    await expect(this.page).toHaveURL(/.*viewLeaveList/);
  }

  async expectRecordsFound() {
    await expect(
      this.page.locator('span.oxd-text--span', { hasText: 'Records Found' })
    ).toBeVisible({ timeout: 15000 });
  }
}