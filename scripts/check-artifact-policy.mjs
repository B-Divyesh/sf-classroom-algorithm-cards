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
