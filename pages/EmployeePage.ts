import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeePage extends BasePage {
  // Employee List
  private searchEmployeeName = this.page.getByRole('textbox', { name: 'Type for hints...' }).first();
  private searchButton = this.page.getByRole('button', { name: 'Search' });
  private addButton = this.page.getByRole('button', { name: 'Add' });

  // Add Employee Form
  private firstNameInput = this.page.getByRole('textbox', { name: 'First Name' });
  private middleNameInput = this.page.getByRole('textbox', { name: 'Middle Name' });
  private lastNameInput = this.page.getByRole('textbox', { name: 'Last Name' });
  private employeeIdInput = this.page.getByRole('textbox').nth(4);
  private saveButton = this.page.getByRole('button', { name: 'Save' });

  constructor(page: Page) {
    super(page);
  }

  async gotoEmployeeList() {
    await this.navigate('/web/index.php/pim/viewEmployeeList');
    await this.waitForPageLoad();
  }

  async gotoAddEmployee() {
    await this.navigate('/web/index.php/pim/addEmployee');
    await this.waitForPageLoad();  
  }

  async searchEmployee(name: string) {
    await this.searchEmployeeName.fill(name);
    await this.searchButton.click();
    await this.waitForPageLoad();  
  }

  async addEmployee(firstName: string, middleName: string, lastName: string) {
    await this.addButton.click();
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
    await this.waitForPageLoad(); 
  }

  async expectEmployeeAdded() {
  await expect(this.page).toHaveURL(/.*viewPersonalDetails/, { timeout: 15000 });
}

  async expectSearchResult(name: string) {
    await expect(this.page.getByRole('cell', { name })).toBeVisible();
  }

  async expectNoRecordsFound() {
  await expect(
    this.page.locator('span.oxd-text--span', { hasText: 'No Records Found' })
  ).toBeVisible();
}

  async getRecordCount(): Promise<string> {
    return this.page.locator('.oxd-text--span').filter({ hasText: 'Records Found' }).innerText();
  }
}