import { Page } from '@playwright/test';

export async function waitAndClick(page: Page, selector: string) {
  await page.waitForSelector(selector, { state: 'visible' });
  await page.click(selector);
}

export async function fillForm(page: Page, fields: Record<string, string>) {
  for (const [selector, value] of Object.entries(fields)) {
    await page.fill(selector, value);
  }
}

export function randomEmail(): string {
  return `test_${Date.now()}@example.com`;
}

export function randomString(length = 8): string {
  return Math.random().toString(36).substring(2, length + 2);
}
