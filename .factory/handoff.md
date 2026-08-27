# Handoff — Classroom Algorithm Cards

## Verification status: PASS

This repair addresses only the independent verifier's release-blocking cache-policy finding for candidate `cb657ebd00bbdd4fa9c8d1827eec508400324719`. The prior report remains in `.factory/verification.md` as the historical failure record.

The build now emits `dist/staticwebapp.config.json` for the **Standard** Azure Static Web Apps deployment. It uses `cache-control: no-cache` globally, which makes HTML entrypoints and `/sw.js` revalidate, then grants exactly the current Vite content-hashed JavaScript and CSS paths `public, max-age=31536000, immutable`. Unhashed public assets are deliberately not marked immutable. It was deployed and rechecked at `https://classroom-algorithm-cards.sociobot.in/` on 2026-08-27.

## Shipped

- A responsive, static kit generator for 20, 30, or 40 minute unplugged sequencing/debugging lessons.
- Three complete activity themes: Robot rescue, Backpack check, and Shape machine.
- Team-aware output for 1–8 groups. Each team receives five role cards and a full instruction deck; lesson length selects one to three challenge cards.
- A one-page facilitator guide with timed phases, setup steps, room management, activity-specific safety, exact teacher language, and a multiple-valid-answer assessment cue.
- A live on-screen preview plus deterministic print/PDF sheets, ink-saver mode, grayscale-safe labels, and cut lines. The default four-team kit produces 11 A4 pages; a generated PDF was smoke-tested.
- Offline-ready production shell and explicit connection-state messaging. No settings, classroom details, or student data are stored.
- Original generated hero artwork with optimized 52 KB WebP and 104 KB JPEG outputs. Prompt, tool, date, source image, and licensing/provenance are recorded in `.factory/design.md` and `assets/src/`.
- Privacy and terms pages, MIT license, complete README, responsive 390 px treatment, keyboard focus states, reduced-motion handling, and semantic landmarks.

## Run and verify

```sh
npm install
npm test
npm run build
npm run preview
```

Deployment command: `npm run build`

Deployment directory: `dist/` (`dist/index.html` exists at its root)

This repair was verified against a clean `npm ci` install and the SWA local emulator:

- Unit tests: 6/6 passing.
- `npm test`: 6/6 unit tests, TypeScript/Vite production build, and the new emitted-artifact policy regression all pass.
- Header check: current hashed CSS/JS receive `public, max-age=31536000, immutable`; `/`, `/index.html`, `/privacy/`, `/terms/`, `/sw.js`, and the unhashed hero receive `no-cache`.
- Live parity: the deployed `index.html` SHA-256 is exactly the local production build (`851bd1ae215b2a916b21d533683fd9fd367c60aad22f56a7a77c6c9f5fc922af`); live headers match the emitted policy.
- Browser smoke at 1366 × 900 and 390 × 844: one `<h1>`, `lang="en"`, `<main>`, alt text, and no page/console errors.
- Interaction regression: a 20-minute, two-team Shape machine kit produced 7 sheets, 1 challenge, 10 role cards, and 20 command cards.
- PWA regression: the service worker controlled the page; after first load, offline reload returned the default 11-sheet kit and displayed the offline notice.
- Accessibility: Playwright with axe-core WCAG 2 A/AA/2.1 AA found 0 violations (26 passing checks) at desktop and 390 px; the deployed mobile page was also smoke-tested with the same result.
- Release payload remains 11.86 KB JavaScript (4.78 KB gzip), 16.59 KB CSS (4.20 KB gzip), and 52 KB WebP hero. No fonts or runtime CDN assets.

Local evidence is kept in the ignored `.factory/evidence/repair-local/` directory. The stock `@axe-core/cli` could not start because its Selenium Chrome binary is absent in this container; the equivalent audit above used the installed Playwright Chromium.

## Known gaps and next steps

- The product still needs the brief’s real-world validation: at least 15 educators completing a lesson and reporting whether setup stayed under ten minutes.
- Chromium print output was verified. Before a high-volume school rollout, sample one kit on the specific browser/printer fleet, especially US Letter printers that auto-scale the A4 layout.
- The current three themes are intentionally bounded v1 content. Add themed packs only after educator requests reveal which contexts are most useful.
- The existing low-severity CSP/frame-embedding hardening suggestion from `.factory/verification.md` remains intentionally out of scope for this targeted cache-policy repair.
