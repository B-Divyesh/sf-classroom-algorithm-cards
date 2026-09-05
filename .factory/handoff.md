# Handoff — Classroom Algorithm Cards repair 3

## Release

- Implementation candidate: `2bd7499161ccdd02e794e75cce25cda11fc55d1e` (`fix: serve hero AVIF with its image type`)
- User-visible repair commit: `4d74771f81fa22925ea3c037d9cd443f4d2443e9`
- Static-route repair commit: `c45462b6b7590391291ce2fa75fef3457bd3e66b`
- Previous review documentation base: `eaf21780c8bc9667a24164c494e879128512d928`
- Live URL: <https://classroom-algorithm-cards.sociobot.in>
- Deployment: production Azure Static Web Apps deployment from `dist/` completed on 2026-09-05. The first upload was rejected before upload because Azure treats `/demo/` as a duplicate of `/demo`; the explicit route was corrected and the final deployment succeeded.

## What changed

- Closed all five untested public claims from Review 2. `.factory/claims.json` now has 13 claims, each backed by one tagged browser outcome test. The new proof covers ink-saver card output, all five role duties, safety guidance for every activity, removal of demo storage, and Cache Storage containing app files only.
- Made `/demo` the only explicit client route and removed the catch-all navigation fallback. Arbitrary extensionless paths now receive the product-styled `404.html` with HTTP 404; the local test server has the same behavior.
- Put the live builder/preview before **How it works** and added a plain-language **Privacy and classroom use** landing section.
- Raised reviewed UI copy to at least 16 px, made header/footer wordmarks and 404 recovery links 44 px targets, and tested mobile target dimensions.
- Moved focus to the new heading after demo/real navigation and after Back/Forward restoration, with route announcements. The first Tab in a fresh context still reaches the skip link.
- Added the promised original-hero AVIF derivative (18,063 bytes on disk), used it in the responsive picture, precached it for offline use, and mapped it to `image/avif` in Static Web Apps.
- Updated the copy audit, visual thesis, README deployment description, and catalog-description evidence. No paid offer or external integration applies: the researched brief specifies a free product.

## Verification

From the documented clean setup (`npm ci`), the final candidate passed:

```sh
npm test
npm run build
npm run check:artifact-policy
```

- `npm test`: 6 unit tests plus 15 browser/quality checks passed.
- Every one of the 13 commands in `.factory/claims.json` was run separately and passed.
- `verify-url.sh` passed locally and on live `/`, `/demo`, `/privacy/`, `/terms/`, and an arbitrary unknown URL. The unknown URL deliberately returns HTTP 404 with the designed product page.
- Playwright-injected axe-core found zero violations (including zero serious/critical) on live `/`, `/demo`, `/privacy/`, `/terms/`, and the 404 at desktop and 390 px phone widths. This is the supported axe check for the supplied Chromium.
- Fresh live desktop and phone contexts showed the job “Print a device-free coding activity,” the elementary teacher/volunteer audience, and **Try it with sample data** before scrolling, with no horizontal overflow or console errors.
- The fresh live demo showed its persistent sample label and a populated 20-minute Shape machine kit: 1 guide, 1 challenge, 10 role cards, 20 instruction cards, and 7 printable pages. Reset restores the shipped sample; leaving demo restored a normal 3-team kit and removed the demo storage key.
- A fresh live service-worker context reloaded `/demo` offline with the label, seven-page sample, and offline notice intact.
- Live `index.html`, JS, and CSS SHA-256 values match the final local build. Current initial JS is 14.47 kB (5.69 kB gzip); CSS is 18.53 kB (4.53 kB gzip); the AVIF hero is 18,063 bytes on disk including its container.
- The live AVIF response is `Content-Type: image/avif`; documents revalidate and content-hashed JS/CSS are configured immutable for one year.

## Review 2 disposition

| Finding | Disposition |
| --- | --- |
| Five incomplete claims | Fixed with five claim entries and outcome checks. |
| Unknown paths rendered home | Fixed; arbitrary unknown path is HTTP 404 with product recovery links. |
| Preview after How it works / missing landing privacy section | Fixed; builder/preview is second and privacy/classroom-use is fourth. |
| Targets below 44 px | Fixed and measured in the browser. |
| Text below 16 px | Fixed for reviewed interface and footer styles, with computed-size regression checks. |
| Demo navigation focus | Fixed for direct navigation and Back/Forward. |
| Missing AVIF | Fixed with rendered AVIF output and explicit MIME type. |

Earlier resolved findings remain resolved: the one-click isolated demo, designed 404, metadata/discovery, security headers, legal skeleton, immutable hashed assets, skip link, reduced-motion behavior, and duplicate-landmark repair all pass the current suite and live checks.

## Known gap

The brief’s future research measure—15 educators completing a one-period activity and reporting setup time—has not been run. The site does not claim that result.
