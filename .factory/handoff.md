# Handoff — Classroom Algorithm Cards

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

Verification completed on 2026-08-27 against the production build:

- Unit tests: 6/6 passing.
- TypeScript and Vite production build: passing.
- Browser smoke test at 1366 px and 390 px: one `<h1>`, `lang="en"`, `<main>`, image alt text, labeled buttons, and zero console/page errors.
- Interaction test: switching to a 20-minute, two-team Shape machine kit produced exactly 7 sheets, 1 challenge, 10 role cards, and 20 command cards.
- Offline reload: production app loaded, regenerated the kit, and showed its offline status with the network disabled after first visit.
- Print smoke test: Chromium produced a 140 KB, 11-page default-kit PDF.
- axe-core WCAG 2 A/AA/2.1 AA audit at 390 × 844: 0 violations, 26 automated checks passed.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 92; FCP 0.9 s, LCP 1.2 s, CLS 0, Total Blocking Time 0 ms. INP is not available from a synthetic no-interaction run, so TBT and the interaction smoke test are reported instead.
- Release payload: 11.86 KB JavaScript (4.78 KB gzip), 16.59 KB CSS (4.20 KB gzip), 52 KB WebP hero. No fonts or runtime CDN assets.

## Known gaps and next steps

- The product still needs the brief’s real-world validation: at least 15 educators completing a lesson and reporting whether setup stayed under ten minutes.
- Chromium print output was verified. Before a high-volume school rollout, sample one kit on the specific browser/printer fleet, especially US Letter printers that auto-scale the A4 layout.
- The current three themes are intentionally bounded v1 content. Add themed packs only after educator requests reveal which contexts are most useful.
