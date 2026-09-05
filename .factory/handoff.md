# Handoff — Classroom Algorithm Cards

## Review status: FAIL

Review 1 on 2026-09-05 found **8 findings and 9 untested public claims**. The current implementation reviewed is `54fe86a1f6048b34b9b71d48ad5d4b9c2ed8c5fb`; the current documentation commit is `6adedd94a1fe7a5ebfb046fdffce3ade68ba19cb`. See `.factory/review-1.md` for complete evidence. The earlier verification reports remain historical records only.

## What was verified

- A fresh detached checkout passed `npm ci`, `npm test` (6/6), `npm run build`, and `npm run check:artifact-policy`.
- Live HTML, JavaScript, and CSS are byte-identical to the reviewed implementation. Immutable caching for hashed assets is now correct.
- The live generator produced the expected default and populated printable kits at desktop and 390 px phone widths; invalid values recovered, keyboard selection worked, a populated A4 PDF was produced, reduced motion worked, and a post-first-load offline reload worked.
- Playwright axe-core found zero WCAG 2 A/AA and 2.1 AA violations. There were no browser console errors in the tested normal flow.

## What remains before acceptance

- Implement the one-click `/demo` sandbox with realistic sample data, a persistent demo label, Reset demo, Start for real, isolated storage, and `.factory/demo.md`.
- Add `.factory/claims.json` and one tagged observable demo test for every public claim. The current count is nine untested claims.
- Replace metaphor copy with a direct job headline, name teachers/volunteers in the first screen, and make the first action the sample-data action.
- Ship a product-styled 404 and complete required route metadata, `robots.txt`, `sitemap.xml`, and Static Web Apps routing configuration.
- Add CSP, anti-framing, Permissions Policy, consistent legal-page navigation/footer, and the required URL verification helper.
- Validate the brief’s 15-educator and under-ten-minute success measure with real classroom research.

## Run and verify

```sh
npm ci
npm test
npm run build
npm run check:artifact-policy
```

`npm run build` produces `dist/` with `dist/index.html` at its root.
