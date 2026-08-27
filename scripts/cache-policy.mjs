import { readdir } from 'node:fs/promises';
import path from 'node:path';

const HASHED_JS_OR_CSS = /.+-[A-Za-z0-9_-]{8,}\.(?:js|css)$/;

/**
 * Return the deployment paths that Vite content-addresses and can therefore
 * safely receive a one-year immutable cache lifetime.
 */
export async function hashedBuildAssetPaths(distDirectory) {
  const assetDirectory = path.join(distDirectory, 'assets');
  const entries = await readdir(assetDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && HASHED_JS_OR_CSS.test(entry.name))
    .map((entry) => `/assets/${entry.name}`)
    .sort();
}

export function staticWebAppsConfig(assetPaths) {
  return {
    globalHeaders: {
      // HTML, sw.js, manifests, and non-fingerprinted public files must be
      // checked again before use so an application update is discoverable.
      'cache-control': 'no-cache',
    },
    routes: assetPaths.map((route) => ({
      route,
      headers: {
        // These paths include Vite's content hash and are never overwritten.
        'cache-control': 'public, max-age=31536000, immutable',
      },
    })),
  };
}
