import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hashedBuildAssetPaths } from './cache-policy.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(scriptDirectory, '..', 'dist');
const configPath = path.join(distDirectory, 'staticwebapp.config.json');
const immutable = 'public, max-age=31536000, immutable';

await access(path.join(distDirectory, 'index.html'));
const config = JSON.parse(await readFile(configPath, 'utf8'));
const assets = await hashedBuildAssetPaths(distDirectory);
const routes = new Map((config.routes ?? []).map((entry) => [entry.route, entry.headers?.['cache-control']]));

if (config.globalHeaders?.['cache-control'] !== 'no-cache') {
  throw new Error('Expected global cache-control: no-cache so HTML and sw.js revalidate.');
}

const headers = config.globalHeaders ?? {};
if (!headers['Content-Security-Policy']?.includes("frame-ancestors 'none'")) {
  throw new Error('Expected a restrictive Content-Security-Policy with frame-ancestors in generated static configuration.');
}

if (!headers['Permissions-Policy'] || headers['X-Frame-Options'] !== 'DENY') {
  throw new Error('Expected Permissions-Policy and X-Frame-Options headers in generated static configuration.');
}

if (config.navigationFallback) {
  throw new Error('Expected no catch-all navigation fallback so unknown routes return the designed HTTP 404.');
}

if (!config.routes?.some((route) => route.route === '/demo' && route.rewrite === '/index.html')) {
  throw new Error('Expected the explicit /demo client route to serve the application shell.');
}

if (config.responseOverrides?.['404']?.rewrite !== '/404.html' || config.responseOverrides?.['404']?.statusCode !== 404) {
  throw new Error('Expected responseOverrides to render /404.html with HTTP 404.');
}

if (!config.routes?.some((route) => route.route === '/404' && route.statusCode === 404 && !route.rewrite)) {
  throw new Error('Expected a status-only /404 route so Azure reaches the designed 404 response override.');
}

for (const asset of assets) {
  if (routes.get(asset) !== immutable) {
    throw new Error(`Expected ${asset} to be immutable for one year; found ${routes.get(asset) ?? 'no route'}.`);
  }
}

for (const [route, cacheControl] of routes) {
  if (cacheControl === immutable && !assets.includes(route)) {
    throw new Error(`Immutable route ${route} is not a current content-hashed JavaScript or CSS build artifact.`);
  }
}

console.log(`Artifact cache policy verified: ${assets.length} hashed JS/CSS file(s) immutable; HTML and sw.js revalidate.`);
