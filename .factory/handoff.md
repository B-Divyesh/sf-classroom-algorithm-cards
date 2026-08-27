# Handoff — Classroom Algorithm Cards

## Verification status: PASS

Independent verification on 2026-08-27 passed candidate `91bd73f9501439ddf37b0ab5d8b4bf689092a9a3` and its deployed static site at `https://classroom-algorithm-cards.sociobot.in/`. The full evidence is in `.factory/verification-2.md`; `.factory/verification.md` is retained as the prior candidate's historical failure report.

## What was verified

- Clean detached checkout, `npm ci`, `npm test` (6/6), TypeScript check, production build, and generated static cache-policy check all passed.
- The live document and its hashed JavaScript/CSS are byte-identical to the clean build.
- The kit generator correctly creates printable guides, role cards, instruction decks, and 20/30/40-minute challenges for all three unplugged activities, including activity-specific safety and multiple-valid-answer facilitation language.
- Normal, boundary, malformed, and recovery choices; desktop, 390 px mobile, keyboard-only operation, print-to-PDF, reduced motion, no-error browser loads, and offline/update service-worker behavior passed.
- axe-core found 0 serious/critical findings at desktop and mobile. Local production-preview Lighthouse mobile: performance 99, accessibility 100, best practices 100, SEO 92; LCP 1.245 s, TBT 122 ms, CLS 0.
- No tracking or third-party runtime traffic was observed. Live HTTPS, HSTS, no-cache HTML/SW, and immutable hashed-asset headers are in place. Initial JS/CSS and image sizes are within the static-product budgets.

## Run and verify

```sh
npm ci
npm test
npm run build
npm run preview
```

Deploy `dist/`; `dist/index.html` is its root entrypoint. `npm run build` also emits `dist/staticwebapp.config.json`, which gives content-hashed JS/CSS a one-year immutable policy while HTML and the service worker revalidate.

## Known gaps / next steps

- Add a restrictive Content Security Policy, an anti-framing policy, and a suitable Permissions Policy. This is low-severity defense-in-depth, not a release blocker for the present static app.
- Validate the brief's success metric with at least 15 real educators and measure whether setup remains under ten minutes.
- Before a high-volume school rollout, sample the generated A4 kit on the target browser/printer fleet, especially US Letter auto-scaling configurations.
