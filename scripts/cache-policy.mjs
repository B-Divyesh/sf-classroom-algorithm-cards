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
      'Content-Security-Policy': "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'",
      'Permissions-Policy': 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
      'Referrer-Policy': 'same-origin',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
    },
    responseOverrides: {
      '404': {
        rewrite: '/404.html',
        statusCode: 404,
      },
    },
    routes: [
      // The app only owns this explicit client route. Leaving navigation
      // fallback disabled lets typoed and stale paths reach the real 404.
      { route: '/demo', rewrite: '/index.html' },
      // This status-only route intentionally flows through responseOverrides.
      // Azure rejects a route that combines statusCode and rewrite.
      { route: '/404', statusCode: 404 },
      ...assetPaths.map((route) => ({
        route,
        headers: {
          // These paths include Vite's content hash and are never overwritten.
          'cache-control': 'public, max-age=31536000, immutable',
        },
      })),
    ],
  };
}
