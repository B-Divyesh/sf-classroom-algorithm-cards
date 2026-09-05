# Print a device-free coding activity — verification 4

**Verdict: PASS**

- Verified: 2026-09-05
- Implementation candidate: `2bd7499161ccdd02e794e75cce25cda11fc55d1e`
- Documentation candidate at review start: `a04e4e059cc4f3cb86d1999ad1c93011a575b784`
- Live URL: <https://classroom-algorithm-cards.sociobot.in>
- Findings: **0**
- Untested public claims: **0**

This is an unambiguous **PASS**. There are no findings at any severity, and every declared public claim passed its own clean-checkout command.

## Job, audience, and first action before scrolling

The job is to print a device-free coding activity that makes sequencing and debugging visible. The audience is elementary teachers and volunteers running one computing lesson. The first action is **Try it with sample data**. Its adjacent text says it opens a 20-minute Shape machine kit for two teams.

Fresh `1366 × 900` desktop and `390 × 844` phone contexts showed the job, audience, action, action result, and three product facts before scrolling. The phone content ended at 794 CSS px in an 844 CSS px viewport. Neither viewport had horizontal overflow. The original classroom-card visual system was distinct, readable, and consistent with `.factory/design.md`.

## Clean candidate and live parity

A separate clone was detached at the implementation candidate before installation. It was clean before checks. Node was `v22.23.2`; npm was `10.9.8`.

| Check | Result |
| --- | --- |
| `npm ci` | Passed; 59 packages installed and 0 vulnerabilities reported. |
| `npm test` | Passed: 6 unit tests and 15 browser/quality tests. |
| `npm run build` | Passed separately; `dist/index.html` and `dist/staticwebapp.config.json` were produced. |
| `npm run check:artifact-policy` | Passed separately; hashed JS/CSS are immutable and documents/service worker revalidate. |
| Claim manifest consistency | 13 unique manifest IDs exactly match 13 unique `@claim:` test tags. |
| URL helper | `verify-url.sh` passed live `/`, `/demo`, `/privacy/`, `/terms/`, and an arbitrary deliberate 404. |

The live deployment is byte-identical to the implementation candidate for the release-defining files:

| File | Matching SHA-256 |
| --- | --- |
| `index.html` | `bcfae46335b9a1737d2eacb41bd7f614050c7aff103e358c64e0c2bfdb212f3d` |
| `assets/index-N21s4hxS.js` | `2b4105fc9ce17c0ffca9338270b4963d558f6c0f98677938c8610abc7fb27f5a` |
| `assets/index-DbKvLt3c.css` | `b6740fd2b2ebf4d9894d954f3d0d331debfe679eaa9286dd88fe9717dfb9906c` |
| `assets/hero-cards.avif` | `3b7cc0fc048f0a1ac55cd70525dc8176de0670cf3d4ef3b77f34e4233d2f506a` |

## Declared public claims

Every command was run separately from the clean detached checkout.

| Claim ID | Result |
| --- | --- |
| `complete-printable-kit` | Pass |
| `lesson-lengths` | Pass |
| `printed-cards-activity` | Pass |
| `free-no-account` | Pass |
| `browser-pdf` | Pass |
| `offline-after-first-visit` | Pass |
| `demo-isolation` | Pass |
| `private-browser-choices` | Pass |
| `ink-saver-white-cards` | Pass |
| `role-card-duties` | Pass |
| `activity-safety-notes` | Pass |
| `demo-settings-removed` | Pass |
| `offline-cache-only-app-files` | Pass |

The landing page, builder, generated output, README, privacy page, terms page, demo documentation, and design documentation were cross-checked against the manifest. No missing, false, incomplete, unlisted, or untested public claim was found.

## Live product exercise

- The landing action opened `/demo` in one click and moved focus to the new h1.
- The persistent label said, “Demo — sample data, nothing is saved to your real kit.”
- The sample immediately showed one guide, one challenge, 10 role cards, 20 instruction cards, and seven printable pages.
- Changing a normal kit to three teams and Backpack check, then changing the demo to seven teams and 40 minutes, left the normal storage value unchanged.
- **Reset demo** restored two teams, 20 minutes, Shape machine, and the populated sample output.
- **Start for real** removed the demo storage key and restored the normal three-team Backpack check kit.
- Entering `99` teams clamped to 8 and produced 19 pages. A blank value recovered to 1 team and five pages. A later value of 3 recovered to nine pages.
- Chromium produced a populated 88,775-byte A4 sample PDF.
- After service-worker control, a live offline reload retained the demo label, sample output, and offline notice. No separate update behavior is promised publicly.
- Requests during normal and demo changes were same-origin GET requests only. No tracking, form submission, console error, or page error appeared.

## Accessibility, routes, privacy, and performance

- Keyboard checks passed for the skip link, radio arrow keys, demo navigation, Back, Forward, and route-heading focus. The focus ring was visible and there was no trap.
- Reviewed interface text computed to at least 16 px. Reviewed phone navigation and content targets measured at least 44 × 44 CSS px. At 200% root text size, the main action and footer remained present and usable.
- Reduced-motion mode matched and reduced transition duration to `0.00001s` with automatic scrolling.
- Playwright axe WCAG 2 A/AA and 2.1 AA scans found zero violations on `/`, `/demo`, `/privacy/`, `/terms/`, and an arbitrary 404 at desktop and phone widths.
- Each route has `lang="en"`, its own plain title, one h1, one main landmark, shared header/navigation/footer, and complete image alt attributes.
- The arbitrary route `/missing-verification-4` deliberately returned HTTP 404 with the product design and two recovery links. That expected status is not a defect.
- All discovered internal links, both explicit GitHub links, `robots.txt`, and `sitemap.xml` returned 200.
- Live documents send CSP with `frame-ancestors 'none'`, `X-Frame-Options: DENY`, restrictive Permissions Policy, `Referrer-Policy`, and `X-Content-Type-Options: nosniff`.
- The hero is delivered as `image/avif`. The initial JS is 14.47 kB, CSS is 18.53 kB, and AVIF is 18,063 bytes.
- Fresh mobile Lighthouse: performance 99, accessibility 100, best practices 100, SEO 100; LCP 1.10 s, total blocking time 101 ms, CLS 0, and transferred bytes 35,187.
- This is a static product. Backend tenant isolation, restart persistence, health, 429 handling, billing, CLI, library, and desktop installation checks do not apply.
- AI is not missed leverage. The brief explicitly excludes generated lesson plans, and the deterministic local generator completes the requested job without sending classroom choices to a model.

## Earlier findings

| Earlier item | Current disposition |
| --- | --- |
| No one-click isolated sample | Fixed. One click opens a populated, labeled, resettable sample with separate storage. |
| Missing or incomplete public claims | Fixed. All 13 declared commands passed separately and their tags match the manifest exactly. |
| Metaphorical first screen or missing audience/action | Fixed. Job, audience, sample action, result, and facts are visible before scrolling on phone and desktop. |
| Generic 404 or unknown paths returning home | Fixed. Arbitrary unknown routes return the designed product page with HTTP 404. |
| Wrong landing order or no privacy section | Fixed. Builder/preview precedes How it works; privacy/classroom use follows teaching notes. |
| Targets below 44 px | Fixed. Reviewed targets meet the minimum in the live phone browser. |
| Interface text below 16 px | Fixed. Reviewed compact styles compute to 16 px or more. |
| Route focus not moved | Fixed. Demo, Back, and Forward place focus on the route h1. |
| Missing promised AVIF or wrong MIME | Fixed. The rendered source exists, matches the candidate, and returns `image/avif`. |
| Missing metadata, discovery files, security headers, legal skeleton, or URL helper | Fixed. All passed live checks. |
| Hashed assets not immutable | Fixed. Live JS/CSS use one-year immutable caching. |
| Duplicate preview landmark | Fixed. Structure and axe scans pass. |
| Local-preview `Vary: Origin` offline caveat | Not reproduced live; the service-worker-controlled live offline reload passed. |
| Lighthouse tooling caveat | Resolved with the fresh compatible-Chromium run recorded above. |
| Classroom validation with 15 educators | Not yet conducted. This is an honest future research measure and is not claimed as complete. |

## Evidence

Machine-readable live-browser results, first-screen screenshots, the PDF, axe results, and Lighthouse JSON are in `/work/.evidence/`. The required report copy and result JSON are written there at handoff.
