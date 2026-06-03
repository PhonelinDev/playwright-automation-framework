import { test, expect } from '@playwright/test';

const BASE_URL = 'https://opensource-demo.orangehrmlive.com';

test.describe('OrangeHRM API', () => {
  let cookies: string;

  test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto(`${BASE_URL}/web/index.php/auth/login`);
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(/.*dashboard/);

  const cookieList = await context.cookies();
  cookies = cookieList.map(c => `${c.name}=${c.value}`).join('; ');
  
  await context.close();
});

  test('GET /api/v2/pim/employees should return 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/web/index.php/api/v2/pim/employees`, {
      headers: { Cookie: cookies },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBeTruthy();
  });

  test('GET /api/v2/leave/leaves should return 200', async ({ request }) => {
   const today = new Date().toISOString().split('T')[0]; // "2026-06-03"
const response = await request.get(
  `${BASE_URL}/web/index.php/api/v2/dashboard/employees/leaves?date=${today}`,
  { headers: { Cookie: cookies } }
);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('data');
  });

  test('GET /api/v2/pim/employees with invalid auth should return 401', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/web/index.php/api/v2/pim/employees`, {
      headers: { Cookie: 'orangehrm=invalidcookie' },
    });
    expect(response.status()).toBe(401);
  });
});