export const TIMEOUTS = {
  SHORT: 5_000,
  MEDIUM: 15_000,
  LONG: 30_000,
};

export const BASE_URLS = {
  DEV: 'https://dev.example.com',
  STAGING: 'https://staging.example.com',
  PROD: 'https://example.com',
};

export const TEST_USERS = {
  ADMIN: {
    username: process.env.ADMIN_USERNAME || 'Admin',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  },
  STANDARD: {
    username: process.env.USER_USERNAME || 'user',
    password: process.env.USER_PASSWORD || 'User@1234',
  },
};
