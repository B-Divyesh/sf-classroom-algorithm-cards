# Independent verification — PASS

**Verified 2026-08-27**

- Candidate commit: `91bd73f9501439ddf37b0ab5d8b4bf689092a9a3`
- Candidate repository: `https://github.com/B-Divyesh/sf-classroom-algorithm-cards.git`
- Deployed URL: `https://classroom-algorithm-cards.sociobot.in/`
- Verdict: **PASS**. The candidate and live static deployment implement the researched one-off, printable unplugged-lesson generator and pass the exercised release gates. `.factory/verification.md` remains the historical failure report for the earlier candidate.

## Clean-checkout build and parity

I cloned `/work/repo` with `git clone --no-local`, detached it at the candidate SHA, confirmed an empty `git status --porcelain`, then ran `npm ci`, `npm test`, and a separate `npm run build` with Node `v22.23.2` / npm `10.9.8`.

| Check | Evidence |
| --- | --- |
| Install | `npm ci`: 57 packages audited; 0 vulnerabilities. |
| Unit / integration command | `npm test`: Vitest `6/6` passed, then the TypeScript/Vite production build and generated-artifact cache-policy check passed. |
| Type/lint | `tsc --noEmit` passed as part of each build. The repository exposes no separate lint script/configuration. |
| Exact production build | `npm run build` passed and produced `dist/`, including `dist/index.html` and `dist/staticwebapp.config.json`. |
| Live identity | Live `/` SHA-256 equals local `dist/index.html`: `851bd1ae215b2a916b21d533683fd9fd367c60aad22f56a7a77c6c9f5fc922af`. Live JS and CSS are byte-identical to `index-DJTDkgP7.js` and `index-B5dfrjMb.css` from this build. |
| Release budget | Initial JS: 11,860 B / 4,802 B gzip; CSS: 16,587 B / 4,192 B gzip; LCP WebP: 50,428 B. All are below the applicable 200 KB JS, 50 KB CSS, and 300 KB mobile-image budgets. |
| Lighthouse, local production preview, mobile | Performance **99**, accessibility **100**, best practices **100**, SEO **92**. LCP 1,245 ms, TBT 122 ms, CLS 0.0. Lighthouse was run against a manually launched Playwright Chromium because its automatic launcher could not attach in this container. |

## End-to-end product exercise

Playwright exercised the local production preview and live deployment at desktop `1366 × 900` and mobile `390 × 844`. Visual screenshots were inspected at both widths.

| Scenario | Result |
| --- | --- |
| Default load | Renders the 11-page, four-team 30-minute Robot rescue kit. It supplies a facilitation guide, role cards, instruction cards, challenge cards, safety/group-management cues, and an explicit multiple-valid-answer facilitation cue. |
| Representative normal flow | Select 20 minutes, 2 teams, Shape machine: status reported 7 pages; preview had 1 challenge, 10 role cards, and 20 command cards. |
| All activity content / upper boundary | Each of Robot rescue, Backpack check, and Shape machine at 40 minutes / 8 teams rendered 3 challenges, 40 roles, 80 commands, 19 sheets, its activity-specific safety text, and the multiple-valid-answer guidance. |
| Boundary input | Entering `99` teams clamps and visibly recovers to `8` teams / 19 pages. |
| Malformed and recovery input | A blank number control normalizes to `1` team / 5 pages, then a later `3` recovers to 9 pages. Unit coverage separately verifies `NaN` and an unknown theme fall back safely. |
| Print | Chromium A4 PDF generation succeeded: 143,227 B and 11 PDF page objects for the default kit. |
| Desktop / 390 px mobile | Both layouts were visually usable. The 390 px interface stacks the chooser before the preview; no horizontal clipping or page/console error was observed. |

## Accessibility, keyboard, and errors

- Playwright-injected axe-core (WCAG 2 A, 2 AA, and 2.1 AA) reported **0 violations**, including **0 serious/critical**, with 27 passing rules on both desktop and 390 px, against local and live pages.
- The stock `@axe-core/cli` was also attempted, but its Selenium driver could not locate a Chrome binary in this container. The equivalent Playwright Chromium audit above completed successfully.
- Confirmed `lang="en"`, descriptive title, exactly one `h1`, `main`, semantic header/nav/footer, skip link, image alt text, labeled controls, and live status text.
- Keyboard-only checks: Tab reaches the skip link and all chooser controls; focused controls expose the designed white outline/blue 7 px focus ring. Arrow Left on the minute radio changes 30 to 20 and refreshes the status. No trap was found.
- `prefers-reduced-motion: reduce` changes smooth scrolling to `auto` and button transition duration to `0.01 ms`.
- No browser `console.error` or `pageerror` event occurred during the exercised local or live flows.

## Privacy, PWA, requests, headers, and caching

- First-load browser requests were only the same-origin document, hashed JS, hashed CSS, and local WebP. Source inspection found no analytics, ads, forms, cookies, `localStorage`, `sessionStorage`, `indexedDB`, or third-party runtime requests. A live page had zero cookies, zero local/session-storage entries, and only the user-initiated GitHub source link was cross-origin.
- Privacy wording accurately discloses only the public offline cache. This satisfies the brief's no-child-data/local-first requirement.
- The live service worker controlled the page. With network emulation offline, reload returned all 11 default sheets and the visible offline notice. A separate disposable static-server test served an altered worker response for `registration.update()`; `controllerchange` fired and the updated worker also completed offline reload. No candidate file was changed for that test.
- HTTP redirects to HTTPS. Live `/`, `/index.html`, `/privacy/`, `/terms/`, and `/sw.js` return `cache-control: no-cache`; content-hashed JS/CSS return `public, max-age=31536000, immutable`; the unhashed hero revalidates. HSTS, `Referrer-Policy: same-origin`, and `X-Content-Type-Options: nosniff` are present.

## Defects

### Low — CSP / anti-framing hardening is absent

Live responses do not send `Content-Security-Policy`, `X-Frame-Options`, a CSP `frame-ancestors` directive, or `Permissions-Policy`. This static, same-origin implementation has no current user-controlled HTML injection or third-party script surface, so it is not a release blocker. Add a restrictive CSP (including `frame-ancestors 'none'`, if embedding is not intended) and an appropriate Permissions Policy as defense in depth.

## Notes

- The local Vite preview sends `Vary: Origin`; its worker's precached module response therefore does not match the browser's module request under offline emulation. The deployed host does **not** send that header, and the live offline reload passed. This is a preview-server artifact, not a deployed PWA defect.
- The product's remaining non-release product-learning task is the brief's real-world validation: 15 educators completing a one-period activity and reporting setup time.
