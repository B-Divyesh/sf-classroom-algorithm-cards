# Handoff — Classroom Algorithm Cards

## Independent verification 3

- Verdict: **PASS** — zero findings and zero untested public claims.
- Implementation reviewed: `def411b681e1f81e600f64d2a92f5da5da331402`.
- Documentation base reviewed: `b5ad13ce01ba89d76bfa5c7101c402fb43f4a342`.
- Full evidence: `.factory/verification-3.md`.

Fresh detached-clone verification passed `npm ci`, `npm test`, `npm run build`, `npm run check:artifact-policy`, `verify-url.sh`, and all eight declared claim commands separately. The production `/`, `/demo`, legal routes, and designed HTTP 404 were exercised at desktop and phone widths. Live HTML, CSS, and JS are byte-identical to the `def411b` build. The sample is populated, labeled, resettable, isolated from normal browser settings, printable, and available after a first online visit when offline.

The remaining product-learning gap is unchanged: 15 educators have not yet run the activity in classrooms. It is not claimed as complete.

## Release

- Implementation candidate: `def411b681e1f81e600f64d2a92f5da5da331402` (`fix: remove duplicate preview landmark`)
- Product feature and documentation candidate: `2654b66879e4df1d6b0f9fb14c6843d4709d0613` (`feat: add isolated classroom kit demo`)
- Routing repair included in: `e416ac44b9066d9b9d3aa552e6bfd40c55bde539` (`fix: return HTTP 404 for designed error page`)
- Live URL: <https://classroom-algorithm-cards.sociobot.in>
- Deployment: production Static Web Apps deployment completed from `dist/` with the product app name on 2026-09-05.

## What changed

- Added `/demo`, a one-click 20-minute Shape machine sample for two teams. Its banner stays visible, Reset demo restores the shipped sample, and Start for real discards the demo namespace.
- Separated normal and demo settings into `real:classroom-algorithm-cards:settings` and `demo:classroom-algorithm-cards:settings`. Demo never reads or writes the real key.
- Rewrote the first screen in plain language: it names printing a coding activity, elementary teachers and volunteers, and **Try it with sample data** as the first action.
- Added `.factory/claims.json` with eight public claims and one tagged browser outcome test for each. Removed the unsupported “under ten minutes” setup and A4/Letter promises.
- Added route metadata, canonical/OG/Twitter cards, social image, apple-touch icon, robots, sitemap, manifest, SPA fallback, restrictive CSP, Permissions Policy, anti-framing, and a product-styled 404 that returns HTTP 404.
- Gave Privacy and Terms the common header, navigation, footer, build identifier, and route-specific metadata. Added `verify-url.sh` for title, language, main, h1, alt, and console checks.
- Added a Playwright browser suite for demo output, minutes, PDF printing, offline reload, namespace isolation, request privacy, responsive layout, keyboard focus, reduced motion, route structure, headers, 404, and axe.

## Verification

From a clean `npm ci` setup:

```sh
npm test
npm run build
npm run check:artifact-policy
```

All pass. `npm test` reports 6 unit tests and 10 browser/quality tests. All eight commands declared in `.factory/claims.json` were also run individually and passed.

Live fresh Chromium checks at desktop `1366×900` and phone `390×844` confirmed:

- First screen: job “Print a device-free coding activity”; audience “elementary teachers and volunteers”; first action “Try it with sample data.”
- `/demo` renders its persistent label and 7-page sample: 1 guide, 1 challenge, 10 role cards, and 20 instruction cards. Reset restores the sample.
- No console or page errors; no horizontal overflow at either width; live axe-core had zero violations after the final landmark repair.
- HTTPS `/`, `/demo`, `/privacy/`, `/terms/`, and `/404` have titles, `lang`, one h1, one main, and valid image alt text. `/404` is deliberately HTTP 404 and shows the product page, not Azure’s generic error.
- Live hashed JS and CSS use `public, max-age=31536000, immutable`; documents revalidate; CSP includes `frame-ancestors 'none'`; Permissions Policy and `X-Frame-Options: DENY` are present.

`npx @axe-core/cli` was attempted, but its downloaded ChromeDriver supports Chrome 152 while the supplied Playwright Chromium is 145. The included Playwright/axe-core audit runs against that installed Chromium and passes with zero violations.

## Run locally

```sh
npm ci
npm test
npm run build
npm run serve:dist
./verify-url.sh http://127.0.0.1:4173/demo
```

## Known gap

The brief’s real-world success measure—15 educators running a lesson and reporting setup time—has not been validated. It needs classroom research and is not represented as a completed product claim.
