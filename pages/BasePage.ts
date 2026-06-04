import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  async navigate(path = '') {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForPageLoad() {
   await this.page.waitForLoadState('domcontentloaded');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `reports/screenshots/${name}.png`, fullPage: true });
  }

  protected getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
