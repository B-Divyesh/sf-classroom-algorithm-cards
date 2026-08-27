# Independent verification — FAIL

**Verified 2026-08-27**

- Candidate commit: `cb657ebd00bbdd4fa9c8d1827eec508400324719`
- Candidate repository: `https://github.com/B-Divyesh/sf-classroom-algorithm-cards.git`
- Live URL: `https://classroom-algorithm-cards.sociobot.in/`
- Verdict: **FAIL — release/deployment quality gate**. The feature itself passed the exercised user journey, but the live release does not meet the required immutable static-asset caching policy.

## Scope and parity

The checked-out worktree was clean and exactly at the candidate SHA before verification. The production `index.html` fetched from the live URL had the same SHA-256 (`851bd1ae…922af`) as the exact local production build and referenced the same JS and CSS asset names (`index-DJTDkgP7.js`, `index-B5dfrjMb.css`). A live Chromium smoke test produced 11 default printable sheets, no console/page errors, and only same-origin first-load requests.

The implementation satisfies the brief's core job: it creates a teacher guide, role cards, instruction cards, and challenge cards for 20/30/40-minute device-free sequencing/debugging activities. It includes activity-specific safety/group-management guidance and explicitly supports multiple valid solutions.

## Checks run

| Check | Result / evidence |
| --- | --- |
| Fresh install | `npm ci` completed; audit reported 0 vulnerabilities. |
| Unit tests | `npm test`: 1 file, 6/6 tests passing. |
| Type and production build | `npm run build` passed (`tsc --noEmit` + Vite) and produced `dist/`. |
| Release budget | JS 11.86 kB / 4.78 kB gzip; CSS 16.59 kB / 4.20 kB gzip; WebP hero 50.4 kB. All are below the stated static-web budgets. |
| Normal flow | Keyboard-selected 20 minutes, 2 teams, Shape machine: 7 sheets, 1 challenge, 10 role cards, 20 command cards, live status updated correctly. |
| Boundary/malformed/recovery | Team count `99` clamped to `8`; `0` and blank numeric input recovered to `1`; a subsequent `3` recovered normally and rendered 9 sheets. Unit tests also cover `NaN` and unknown theme fallback. |
| Desktop and mobile | Chromium at 1366×900 and 390×844: usable stacked mobile layout; no console/page errors; visual inspection completed. |
| Keyboard/focus/reduced motion | Native radio/number controls worked with keyboard. Tab focus exposed a solid outline plus blue 7 px ring. `prefers-reduced-motion` changed smooth scrolling to `auto` and transition duration to `0.01 ms`. |
| Accessibility | axe-core WCAG 2 A/AA/2.1 AA at both desktop and 390 px: 0 violations, 0 serious/critical, 26 passing checks. Also verified `lang=en`, title, one `h1`, `main`, skip link, and meaningful hero alt text. |
| Print | Chromium A4 PDF creation succeeded: 140 kB, 11 `/Type /Page` entries for the default kit. |
| PWA/offline/update | After first visit the service worker controlled the page; offline reload produced all 11 sheets and the visible offline notice with no errors. A controlled update test changed the worker body, called `registration.update()`, and observed `controllerchange` with the new worker activating. |
| Privacy/outbound traffic | Source inspection found no analytics, local/session storage, cookies, forms, or third-party runtime fetches. First load requested only the document, local JS, local CSS, and local WebP. The service worker only fetches/caches same-origin files. Privacy text accurately describes the public offline cache; the GitHub source link is an explicit user-initiated external link. |
| Live transport/security | HTTP redirects to HTTPS. Live responses include HSTS, `Referrer-Policy: strict-origin-when-cross-origin`, and `X-Content-Type-Options: nosniff`. |

## Defects

### Medium — hashed release assets are not immutably cached (release blocker)

Live `GET`/`HEAD` responses for `/assets/index-DJTDkgP7.js` and `/assets/index-B5dfrjMb.css` return:

```
cache-control: public, must-revalidate, max-age=30
```

The asset names are content-hashed, so they should be served with a long-lived immutable policy (for example `public, max-age=31536000, immutable`). The 30-second policy misses the factory static-product caching requirement and causes needless repeat validation/download work. This is deployment configuration rather than a functional kit defect, but it prevents a release PASS.

### Low — CSP and frame-embedding policy absent

The live response does not send `Content-Security-Policy`, `X-Frame-Options`, or a CSP `frame-ancestors` directive. The present static implementation has no third-party scripts and no known injection vector from this audit, but a restrictive CSP (with `frame-ancestors 'none'` or the intended allowlist) would provide appropriate defense in depth.

## Caveats and next steps

- A fresh Lighthouse run was attempted against the exact local production build. The supplied Chromium crashed when Lighthouse attached, so no independent Lighthouse score is claimed here. Browser-level performance evidence and payload measurements are recorded above; rerun Lighthouse in a compatible Chrome environment after the cache-header fix.
- Configure the host/CDN to send immutable one-year caching for content-hashed `/assets/*`, while retaining short revalidation for HTML and the service worker. Then add a restrictive CSP/frame policy and re-run this verification.
- Real classroom validation with 15 educators remains a product-learning next step, not an automated release defect.
