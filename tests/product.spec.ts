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

test('@claim:ink-saver-white-cards gives printable cards white fills and black outlines', async ({ page }) => {
  await openDemo(page);
  await expect(page.getByRole('checkbox', { name: /Use ink-saver mode/ })).toBeChecked();
  await page.emulateMedia({ media: 'print' });
  const card = page.locator('.command-card').first();
  const symbol = card.locator('.command-symbol');
  await expect(symbol).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(symbol).toHaveCSS('border-top-color', 'rgb(23, 23, 19)');
  await expect(symbol).toHaveCSS('border-top-width', '3px');
});

test('@claim:role-card-duties gives every team the five named classroom duties', async ({ page }) => {
  await openDemo(page);
  await expect(page.locator('.role-card h3')).toHaveText([
    'Robot', 'Sequencer', 'Debugger', 'Card keeper', 'Reporter',
    'Robot', 'Sequencer', 'Debugger', 'Card keeper', 'Reporter',
  ]);
  await expect(page.locator('.role-card').first()).toContainText('Follow only the cards you are given.');
  await expect(page.locator('.role-card').nth(1)).toContainText('Choose and arrange the instruction cards.');
  await expect(page.locator('.role-card').nth(2)).toContainText('Spot the first surprise and suggest one change.');
  await expect(page.locator('.role-card').nth(3)).toContainText('Keep unused cards visible and return used cards.');
  await expect(page.locator('.role-card').nth(4)).toContainText('Share the team’s route and one useful mistake.');
});

test('@claim:activity-safety-notes puts an activity-specific safety note in every guide', async ({ page }) => {
  await openDemo(page);
  const safetyByTheme = [
    ['Robot rescue', 'Walking only. Clear bags and chairs from the route; the robot freezes if space feels unsafe.'],
    ['Backpack check', 'Use only light, unbreakable classroom items. Keep food, medicine, and student property out of the activity.'],
    ['Shape machine', 'Prepare shapes before class if scissors are not already part of your classroom routine.'],
  ];
  for (const [theme, safety] of safetyByTheme) {
    await page.getByRole('radio', { name: theme }).check();
    await expect(page.locator('.guide-sheet')).toContainText(safety);
  }
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

test('@claim:demo-settings-removed removes sample settings when the teacher starts for real', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('#teams').fill('6');
  await expect(page.getByText('Ready: 15 printable pages for 6 teams.')).toBeVisible();
  await page.getByRole('link', { name: 'Start for real' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.evaluate(() => localStorage.getItem('demo:classroom-algorithm-cards:settings'))).resolves.toBeNull();
});

test('@claim:offline-cache-only-app-files keeps browser cache entries limited to app files', async ({ browser }) => {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4173/demo');
    await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
    await page.reload();
    await page.locator('#teams').fill('5');
    await expect(page.getByText('Ready: 14 printable pages for 5 teams.')).toBeVisible();
    const cachedPaths = await page.evaluate(async () => {
      const cacheNames = await caches.keys();
      const cache = await caches.open(cacheNames.find((name) => name.startsWith('algorithm-cards-')) ?? 'missing');
      return (await cache.keys()).map((request) => new URL(request.url).pathname);
    });
    expect(cachedPaths).toContain('/index.html');
    expect(cachedPaths).toContain('/assets/hero-cards.avif');
    expect(cachedPaths).toContain('/demo');
    expect(cachedPaths.every((pathname) => /^(?:\/$|\/(?:demo|index\.html|privacy\/?|terms\/?|404\.html|legal\.css|favicon\.svg|apple-touch-icon\.png|assets\/(?:hero-cards\.(?:avif|webp|jpg)|[\w.-]+\.(?:js|css))))$/.test(pathname))).toBe(true);
  } finally {
    await context.close();
  }
});

test('@claim:private-browser-choices keeps normal and demo requests on this site and sends no form data', async ({ browser }) => {
  const context = await browser.newContext();
  const requests: Array<{ url: string; method: string }> = [];
  context.on('request', (request) => requests.push({ url: request.url(), method: request.method() }));
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4173/');
    await page.locator('#teams').fill('4');
    await expect(page.getByText('Ready: 11 printable pages for 4 teams.')).toBeVisible();
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
  const unknownPage = await request.get('/missing-review-3');
  expect(unknownPage.status()).toBe(404);
  expect(await unknownPage.text()).toContain('This page is not here');
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
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.locator('h1')).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('h1')).toBeFocused();
  await page.goForward();
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.locator('h1')).toBeFocused();
  const keyboardContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  try {
    const keyboardPage = await keyboardContext.newPage();
    await keyboardPage.goto('http://127.0.0.1:4173/demo');
    await keyboardPage.keyboard.press('Tab');
    await expect(keyboardPage.locator('.skip-link')).toBeFocused();
  } finally {
    await keyboardContext.close();
  }
  const layoutOrder = await page.locator('main > section').evaluateAll((sections) => sections.map((section) => section.id || section.className));
  expect(layoutOrder).toEqual(['hero', 'builder', 'how-it-works', 'teacher-notes', 'privacy-notes']);
  await expect(page.getByRole('heading', { name: 'Use the kit without student accounts' })).toBeVisible();
  const compactTextSizes = await page.locator('.quiet-proof, .plain-facts, .field-help, .theme-options small, #builder-status, .site-footer .provenance').evaluateAll((elements) => elements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize)));
  expect(compactTextSizes.every((size) => size >= 16)).toBe(true);
  const homeTargets = await page.locator('.site-header .brand, .site-header nav a, .site-footer .brand, .site-footer a, .privacy-notes .text-link').evaluateAll((elements) => elements.filter((element) => getComputedStyle(element).display !== 'none').map((element) => {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }));
  expect(homeTargets.every(({ width, height }) => width >= 44 && height >= 44)).toBe(true);
  expect(consoleErrors).toEqual([]);
  await page.goto('/404');
  const recoveryTargets = await page.locator('main .nav-action, main .touch-link').evaluateAll((elements) => elements.map((element) => {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }));
  expect(recoveryTargets.every(({ width, height }) => width >= 44 && height >= 44)).toBe(true);

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
