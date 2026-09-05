import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(scriptDirectory, '..', 'dist');
const port = Number(process.env.PORT ?? 4173);
const host = process.env.HOST ?? '127.0.0.1';

const mimeTypes = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

const headers = {
  'cache-control': 'no-cache',
  'content-security-policy': "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'",
  'permissions-policy': 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
  'referrer-policy': 'same-origin',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
};

function safeFile(requestPath) {
  const normalized = path.posix.normalize(`/${requestPath}`).replace(/^\/+/, '');
  const resolved = path.resolve(distDirectory, normalized);
  return resolved.startsWith(`${distDirectory}${path.sep}`) || resolved === distDirectory ? resolved : null;
}

async function existingFile(candidate) {
  try {
    const info = await stat(candidate);
    if (info.isFile()) return candidate;
    if (info.isDirectory()) {
      const index = path.join(candidate, 'index.html');
      await access(index);
      return index;
    }
  } catch {
    return null;
  }
  return null;
}

function sendFile(response, file, statusCode = 200) {
  response.writeHead(statusCode, {
    ...headers,
    'content-type': mimeTypes[path.extname(file)] ?? 'application/octet-stream',
  });
  createReadStream(file).pipe(response);
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? '/', `http://${host}:${port}`);
  const pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === '/demo' || pathname === '/demo/') {
    sendFile(response, path.join(distDirectory, 'index.html'));
    return;
  }

  const candidate = safeFile(pathname);
  const file = candidate ? await existingFile(candidate) : null;
  if (file) {
    sendFile(response, file);
    return;
  }

  sendFile(response, path.join(distDirectory, '404.html'), 404);
});

server.listen(port, host, () => console.log(`Static test server listening at http://${host}:${port}`));
