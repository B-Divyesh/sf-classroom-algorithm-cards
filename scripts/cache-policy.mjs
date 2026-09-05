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
    navigationFallback: {
      rewrite: '/index.html',
      exclude: ['/assets/*', '/404', '/404.html', '/apple-touch-icon.png', '/favicon.svg', '/legal.css', '/privacy/*', '/robots.txt', '/site.webmanifest', '/sitemap.xml', '/sw.js', '/terms/*'],
    },
    responseOverrides: {
      '404': {
        rewrite: '/404.html',
        statusCode: 404,
      },
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
