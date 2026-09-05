# Print a device-free coding activity — review 3

**Verdict: PASS**

- Reviewed: 2026-09-05
- Live URL: <https://classroom-algorithm-cards.sociobot.in>
- Implementation candidate: `2bd7499161ccdd02e794e75cce25cda11fc55d1e`
- Documentation candidate at review start: `0b90f53555f81725af4f7a43d3cbefb76b387f3c`
- Findings: **0**
- Untested public claims: **0**

This is an unambiguous **PASS**. No finding of any severity remains, and every public claim has a passing declared command.

## Job, audience, and first action before scrolling

The job is to print a device-free coding activity that makes sequencing and debugging visible. The audience is elementary teachers and volunteers running one computing lesson. The first action is **Try it with sample data**. The adjacent sentence says it opens a 20-minute Shape machine kit for two teams.

Fresh `1366 × 900` desktop and `390 × 844` phone contexts showed the job, audience, action, action result, and three facts before scrolling. The last fact ended at 883.6 CSS px on desktop and 793.7 CSS px on phone. Both fit their viewports without horizontal overflow. The page uses direct task language and the distinct printed-card visual system recorded in `.factory/design.md`.

## Candidate, clean checkout, and live parity

A separate clone was detached at the implementation candidate before dependencies were installed. Its status was clean. Node was `v22.23.2`; npm was `10.9.8`.

| Check | Result |
| --- | --- |
| `npm ci` | Passed; 59 packages installed and 0 vulnerabilities reported. |
| Every command in `.factory/claims.json` | All 13 passed separately. |
| `npm test` | Passed: 6 unit tests and 15 browser/quality tests. |
| `npm run build` | Passed separately and produced `dist/index.html` plus `dist/staticwebapp.config.json`. |
| `npm run check:artifact-policy` | Passed separately; hashed JS/CSS are immutable while HTML and the service worker revalidate. |
| Claim/tag consistency | 13 unique manifest IDs exactly match 13 unique `@claim:` tags. |
| `verify-url.sh` | Passed live `/`, `/demo`, `/privacy/`, `/terms/`, and an arbitrary deliberate 404. |

The later commits after `2bd7499` only change documentation. The live release is byte-identical to the implementation candidate for the release-defining files:

| File | Matching SHA-256 |
| --- | --- |
| `index.html` | `bcfae46335b9a1737d2eacb41bd7f614050c7aff103e358c64e0c2bfdb212f3d` |
| `assets/index-N21s4hxS.js` | `2b4105fc9ce17c0ffca9338270b4963d558f6c0f98677938c8610abc7fb27f5a` |
| `assets/index-DbKvLt3c.css` | `b6740fd2b2ebf4d9894d954f3d0d331debfe679eaa9286dd88fe9717dfb9906c` |
| `assets/hero-cards.avif` | `3b7cc0fc048f0a1ac55cd70525dc8176de0670cf3d4ef3b77f34e4233d2f506a` |

## Declared public claims

Each command below was run on its own from the clean detached checkout.

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

The landing page, generated kit, controls, README, demo documentation, privacy page, terms page, and design record were cross-checked against the manifest. No missing, false, incomplete, unlisted, or untested public claim was found.

## Live product exercise

- The landing action opened `/demo` in one click, changed the title to “Demo — Classroom Algorithm Cards,” and moved focus to “Sample classroom kit.”
- The persistent label said, “Demo — sample data, nothing is saved to your real kit.”
- The sample immediately showed one guide, one challenge, 10 role cards, 20 instruction cards, and seven printable pages.
- A normal three-team Backpack check kit was saved. Changing the demo to seven teams and 40 minutes did not change the normal storage value.
- **Reset demo** restored two teams, 20 minutes, Shape machine, 10 role cards, and 20 instruction cards.
- **Start for real** removed the demo storage entry and restored the normal three-team Backpack check kit.
- Entering `99` teams clamped to 8 and reported 19 pages. A blank value recovered to 1 team and five pages. Entering 3 afterward recovered to nine pages.
- Chromium created a populated 88,775-byte A4 sample PDF.
- After service-worker control, a live offline reload retained the sample label, 10 role cards, 20 instruction cards, and the offline notice. The active cache was `algorithm-cards-v4`. No update behavior is promised publicly.
- Normal and demo changes issued same-origin GET requests only. They produced no console error, page error, form submission, tracking request, or cross-origin runtime request.

## Accessibility, routes, privacy, and performance

- The first Tab focused the skip link. Its visible treatment was a 4 px white outline with a 7 px blue ring. Radio arrow keys changed 30 minutes to 20. Back and Forward restored the route and focused heading. No keyboard trap appeared.
- Reviewed compact interface text computed to 16 px or more. Reviewed phone navigation, footer, and demo targets measured at least 44 × 44 CSS px.
- At browser-level 200% zoom, the main action and footer remained available with no horizontal overflow.
- Reduced-motion mode matched, changed smooth scrolling to `auto`, and reduced the button transition to `0.00001s`.
- Playwright axe scans found zero violations on `/`, `/demo`, `/privacy/`, `/terms/`, and an arbitrary 404 at both desktop and phone sizes.
- Each route has `lang="en"`, its own runtime title, one h1, one main landmark, shared navigation/footer structure, and complete image alt attributes.
- `/missing-review-3` deliberately returned HTTP 404 with the designed product page and recovery actions. That expected status and its browser resource line are not defects.
- Landing, legal, and recovery links passed. `robots.txt`, `sitemap.xml`, and both explicit GitHub links returned 200.
- Live documents send CSP with `frame-ancestors 'none'`, `X-Frame-Options: DENY`, a restrictive Permissions Policy, `Referrer-Policy`, and `X-Content-Type-Options: nosniff`.
- The initial JavaScript is 14,466 bytes, CSS is 18,530 bytes, and AVIF hero is 18,063 bytes. All are within the static-product budgets.
- Fresh mobile Lighthouse scored performance **100**, accessibility **100**, best practices **100**, and SEO **100**. FCP and LCP were 0.9 s, total blocking time was 10 ms, CLS was 0, and total transferred bytes were 33,848.
- This is a static product. Backend tenant isolation, restart persistence, health, rate-limit, billing, CLI, library, and desktop checks do not apply.
- AI is not missed leverage. The brief explicitly excludes generated lesson plans, and the deterministic local generator completes the job without sending classroom choices to a model.

## Earlier findings and current disposition

| Earlier item | Current disposition |
| --- | --- |
| Hashed assets lacked immutable caching | Fixed. Live content-hashed JS/CSS use the one-year immutable policy. |
| CSP, anti-framing, or Permissions Policy was absent | Fixed. All required live headers are present. |
| No one-click isolated sample | Fixed. One click opens populated sample output with a persistent label, reset, separate storage, and a clean exit. |
| Claims manifest or claim coverage was missing or incomplete | Fixed. All 13 claim commands pass separately and match 13 unique test tags. |
| The first screen used metaphor or omitted the audience/action | Fixed. The direct job, audience, action, result, and facts fit before scrolling on phone and desktop. |
| Generic 404 or unknown routes returning the home page | Fixed. Arbitrary unknown routes return the designed page with HTTP 404. |
| Required metadata, discovery files, route setup, or URL helper was missing | Fixed. Route titles, metadata, icons, robots, sitemap, explicit demo route, designed 404, and helper pass. |
| Legal pages lacked the shared site skeleton | Fixed. Privacy and terms use the common header, navigation, footer, attribution, and build ID. |
| Landing sections were in the wrong order or lacked privacy guidance | Fixed. Builder/preview precedes How it works, followed by teaching and privacy guidance. |
| Touch targets were below 44 px | Fixed. Reviewed live phone targets meet the minimum. |
| Interface text was below 16 px | Fixed. Reviewed compact styles compute to at least 16 px. |
| Route navigation did not move focus | Fixed. Demo, Back, and Forward focus the route h1. |
| AVIF was absent or served with the wrong type | Fixed. The candidate and live AVIF match and the live response uses `image/avif`. |
| Preview produced a duplicate landmark | Fixed. Structure and axe scans report no landmark issue. |
| Local-preview `Vary: Origin` offline caveat | Not reproduced live. The controlled live demo reloaded offline successfully. |
| Lighthouse launcher caveat | Resolved. A compatible Chromium run completed with 100 in all categories. |
| Fifteen-educator classroom study | Still future research. The product does not claim this measure is complete, so it is not a release defect. |

## Evidence and reproduction

Live screenshots, the populated PDF, browser audit JSON, and Lighthouse JSON are in `/work/.evidence/review-3-live/`.

```sh
git clone --no-local /work/repo /tmp/classroom-algorithm-cards-review-3-clean
git -C /tmp/classroom-algorithm-cards-review-3-clean checkout --detach 2bd7499161ccdd02e794e75cce25cda11fc55d1e
cd /tmp/classroom-algorithm-cards-review-3-clean
npm ci
npm test
npm run build
npm run check:artifact-policy
```

Then run each `test` command in `.factory/claims.json` separately and inspect the live desktop, phone, demo, legal, offline, and deliberate-404 paths.
