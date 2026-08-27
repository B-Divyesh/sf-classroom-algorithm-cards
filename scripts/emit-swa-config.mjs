import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hashedBuildAssetPaths, staticWebAppsConfig } from './cache-policy.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(scriptDirectory, '..', 'dist');
const assets = await hashedBuildAssetPaths(distDirectory);

if (assets.length === 0) {
  throw new Error('No content-hashed JavaScript or CSS assets were found in dist/assets.');
}

const configPath = path.join(distDirectory, 'staticwebapp.config.json');
await mkdir(distDirectory, { recursive: true });
await writeFile(configPath, `${JSON.stringify(staticWebAppsConfig(assets), null, 2)}\n`);
console.log(`Emitted ${path.relative(process.cwd(), configPath)} for ${assets.length} hashed asset(s).`);
