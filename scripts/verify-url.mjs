import { chromium } from '@playwright/test';

const target = process.argv[2];
if (!target) throw new Error('Pass a URL to verify.');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
const consoleErrors = [];
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});
page.on('pageerror', (error) => consoleErrors.push(error.message));

try {
  const response = await page.goto(target, { waitUntil: 'networkidle' });
  if (!response) throw new Error(`No document response for ${target}.`);
  const title = await page.title();
  const language = await page.locator('html').getAttribute('lang');
  const mainCount = await page.locator('main').count();
  const h1Count = await page.locator('h1').count();
  const missingAlt = await page.locator('img').evaluateAll((images) => images.filter((image) => !image.hasAttribute('alt')).length);
  const expectedNotFound = response.status() === 404;
  const actionableConsoleErrors = expectedNotFound
    ? consoleErrors.filter((message) => !message.includes('Failed to load resource: the server responded with a status of 404'))
    : consoleErrors;
  const evidence = { url: target, status: response.status(), title, lang: language, mainCount, h1Count, missingAlt, consoleErrors: actionableConsoleErrors };
  console.log(JSON.stringify(evidence, null, 2));
  if (!title || !language || mainCount !== 1 || h1Count !== 1 || missingAlt !== 0 || actionableConsoleErrors.length > 0) {
    throw new Error('URL verification failed. Inspect the JSON evidence above.');
  }
} finally {
  await browser.close();
}
