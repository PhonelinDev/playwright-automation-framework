import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameInput = this.page.getByRole('textbox', { name: 'Username' });
  private passwordInput = this.page.getByRole('textbox', { name: 'Password' });
  private submitButton = this.page.getByRole('button', { name: 'Login' });
  private errorMessage = this.page.locator('.oxd-alert-content-text');

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigate('/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.errorMessage.innerText();
  }

async expectLoginSuccess() {
  await expect(this.page).toHaveURL(/.*dashboard/, { timeout: 30000 });
}

  async expectLoginFailed() {
  await expect(this.errorMessage).toBeVisible({ timeout: 30000 });
}
}