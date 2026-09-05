import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

async function openDemo(page: import('@playwright/test').Page) {
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.getByLabel('Demo controls')).toContainText('Demo — sample data, nothing is saved to your real kit.');
  await expect(page.getByText('Ready: 7 printable pages for 2 teams.')).toBeVisible();
}

test('@claim:complete-printable-kit opens a realistic kit in one click', async ({ page }) => {
  await openDemo(page);
  await expect(page.locator('.guide-sheet')).toHaveCount(1);
  await expect(page.locator('.challenge-card')).toHaveCount(1);
  await expect(page.locator('.role-card')).toHaveCount(10);
  await expect(page.locator('.command-card')).toHaveCount(20);
  await expect(page.getByRole('heading', { name: 'Shape machine' }).first()).toBeVisible();
});

test('@claim:lesson-lengths changes the printed plan for 20, 30, and 40 minutes', async ({ page }) => {
  await openDemo(page);
  for (const [minutes, challenges] of [[20, 1], [30, 2], [40, 3]] as const) {
    await page.getByRole('radio', { name: new RegExp(`${minutes} min`) }).check();
    await expect(page.locator('.guide-sheet .sheet-kicker')).toContainText(`${minutes} minutes`);
    await expect(page.locator('.challenge-card')).toHaveCount(challenges);
  }
});

test('@claim:printed-cards-activity provides a complete printed activity without an account', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('radio', { name: /40 min/ }).check();
  await page.getByRole('radio', { name: /Robot rescue/ }).check();
  await expect(page.getByText('Ready: 7 printable pages for 2 teams.')).toBeVisible();
  await expect(page.getByText('Print this kit, single-sided.')).toBeVisible();
  await expect(page.getByRole('button', { name: /Print \/ save PDF/ })).toBeEnabled();
});

test('@claim:free-no-account lets a teacher open and use the sample without payment or sign-in', async ({ page }) => {
  await openDemo(page);
  await page.locator('#teams').fill('3');
  await expect(page.getByText('Ready: 9 printable pages for 3 teams.')).toBeVisible();
  await expect(page.getByRole('button', { name: /Print \/ save PDF/ })).toBeEnabled();
});

test('@claim:browser-pdf produces a populated printable PDF', async ({ page }) => {
  await openDemo(page);
  await page.emulateMedia({ media: 'print' });
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  expect(pdf.byteLength).toBeGreaterThan(20_000);
  expect(pdf.toString('latin1')).toContain('/Type /Page');
});

test('@claim:offline-after-first-visit keeps the demo available offline', async ({ browser }) => {
  const offlineContext = await browser.newContext();
  try {
    const page = await offlineContext.newPage();
    await page.goto('http://127.0.0.1:4173/demo');
    await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
    await offlineContext.setOffline(true);
    await page.reload();
    await expect(page.getByLabel('Demo controls')).toBeVisible();
    await expect(page.getByText('Ready: 7 printable pages for 2 teams.')).toBeVisible();
  } finally {
    await offlineContext.close();
  }
});

test('@claim:demo-isolation restores the real kit after leaving the sample', async ({ page }) => {
  await page.goto('/');
  await page.locator('#teams').fill('3');
  await expect(page.getByText('Ready: 9 printable pages for 3 teams.')).toBeVisible();
  await page.goto('/demo');
  await page.locator('#teams').fill('7');
  await expect(page.getByText('Ready: 17 printable pages for 7 teams.')).toBeVisible();
  await page.getByRole('link', { name: 'Start for real' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('#teams')).toHaveValue('3');
  await expect(page.getByLabel('Demo controls')).toBeHidden();
});

test('@claim:private-browser-choices keeps demo requests on this site and sends no form data', async ({ browser }) => {
  const context = await browser.newContext();
  const requests: Array<{ url: string; method: string }> = [];
  context.on('request', (request) => requests.push({ url: request.url(), method: request.method() }));
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4173/demo');
    await page.locator('#teams').fill('5');
    await expect(page.getByText('Ready: 14 printable pages for 5 teams.')).toBeVisible();
    expect(requests.length).toBeGreaterThan(0);
    expect(requests.every(({ url }) => new URL(url).origin === 'http://127.0.0.1:4173')).toBe(true);
    expect(requests.every(({ method }) => method === 'GET')).toBe(true);
  } finally {
    await context.close();
  }
});

test('quality: routes, metadata, responsive layout, security headers, and accessibility work', async ({ page, request, browser }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  const page404 = await request.get('/404');
  expect(page404.status()).toBe(404);
  expect(await page404.text()).toContain('This page is not here');
  expect((await request.get('/robots.txt')).status()).toBe(200);
  expect((await request.get('/sitemap.xml')).status()).toBe(200);
  for (const route of ['/privacy/', '/terms/']) {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain('<main');
    expect(html).toContain('<nav');
    expect(html).toContain('Built by Param Factory');
  }
  const demo = await request.get('/demo');
  expect(demo.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(demo.headers()['permissions-policy']).toContain('camera=()');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  await expect(page).toHaveTitle('Demo — Classroom Algorithm Cards');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://classroom-algorithm-cards.sociobot.in/demo');
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('img[alt]')).toHaveCount(1);
  expect(await page.locator('body').evaluate((body) => body.scrollWidth <= window.innerWidth)).toBe(true);
  await page.locator('#teams').fill('99');
  await expect(page.locator('#teams')).toHaveValue('8');
  await expect(page.getByText('Ready: 19 printable pages for 8 teams.')).toBeVisible();
  await page.locator('#teams').fill('');
  await expect(page.locator('#teams')).toHaveValue('1');
  await expect(page.getByText('Ready: 5 printable pages for 1 team.')).toBeVisible();
  await page.goto('/demo');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  expect(consoleErrors).toEqual([]);

  const a11yContext = await browser.newContext({ bypassCSP: true, viewport: { width: 390, height: 844 } });
  try {
    const a11yPage = await a11yContext.newPage();
    await a11yPage.goto('http://127.0.0.1:4173/demo');
    const axeSource = await readFile('node_modules/axe-core/axe.min.js', 'utf8');
    await a11yPage.addScriptTag({ content: axeSource });
    const results = await a11yPage.evaluate(async () => (window as typeof window & { axe: { run: () => Promise<{ violations: Array<{ impact: string | null }> }> } }).axe.run());
    expect(results.violations).toEqual([]);
  } finally {
    await a11yContext.close();
  }
});

test('quality: reduced motion removes interface movement', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4173/demo');
    const duration = await page.locator('.button').first().evaluate((element) => Number.parseFloat(getComputedStyle(element).transitionDuration));
    expect(duration).toBeLessThanOrEqual(0.00001);
  } finally {
    await context.close();
  }
});
