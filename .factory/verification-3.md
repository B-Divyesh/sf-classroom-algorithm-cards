# Print a device-free coding activity — independent verification

**Verdict: PASS**

- Verified: 2026-09-05
- Implementation candidate reviewed: `def411b681e1f81e600f64d2a92f5da5da331402` (`fix: remove duplicate preview landmark`)
- Documentation candidate at review start: `b5ad13ce01ba89d76bfa5c7101c402fb43f4a342` (`docs: record repair verification handoff`)
- Live URL: <https://classroom-algorithm-cards.sociobot.in>
- Findings: **0**
- Untested public claims: **0**

This is a PASS. The implementation has zero findings at every severity and every public claim has a declared clean-checkout command that passed.

## Job, audience, and first action before scrolling

The job is to print a device-free coding activity with a teacher guide and cards. The audience is elementary teachers and volunteers running one computing lesson. On fresh desktop (1366 × 900) and phone (390 × 844) pages, the first action is **Try it with sample data**. It says it opens a 20-minute Shape machine kit for two teams.

The first screen also says the activity makes sequencing and debugging visible. Its three plain facts say the price is free, sample changes stay separate from the saved kit, and it works offline after the first visit. Both viewports fit without horizontal overflow.

## Clean checkout and candidate parity

A fresh detached clone at `def411b` was installed with `npm ci`. It installed 59 packages and reported zero vulnerabilities. The worktree was clean before the checks.

| Check | Result |
| --- | --- |
| `npm test` | Passed: 6 unit tests, production build, artifact policy, and 10 Playwright checks. |
| `npm run build` | Passed and produced `dist/` with `index.html` and `staticwebapp.config.json`. |
| `npm run check:artifact-policy` | Passed: two hashed JS/CSS files immutable; HTML and `sw.js` revalidate. |
| `./verify-url.sh http://127.0.0.1:4173/demo` | Passed: 200, Demo title, `lang=en`, one main, one h1, no missing alt text, and no console errors. |
| Live parity | Live `index.html`, CSS, and JS SHA-256 values exactly match the fresh `def411b` build. |
| Initial payload | JS 13.93 kB (5.52 kB gzip); CSS 18.08 kB (4.50 kB gzip). Both are within budget. |

The matching live files were `assets/index-DiN6Yfvm.js` and `assets/index-CzbnoFjb.css`. The live document hash was `61c943a23ed606cbdb966ae2d72facab7bfa77539b57508415322c17e73bf254`.

## Public claims

Each command below was run separately from the fresh checkout. Every command passed its single tagged browser test.

| Claim | Command | Result |
| --- | --- | --- |
| Creates a printable guide, role cards, instruction cards, and challenge cards | `npm run test:claims -- --grep @claim:complete-printable-kit` | Pass |
| Creates activities in 20, 30, or 40 minutes | `npm run test:claims -- --grep @claim:lesson-lengths` | Pass |
| Provides a printed-card activity without student devices or an account | `npm run test:claims -- --grep @claim:printed-cards-activity` | Pass |
| The sample kit is free to use without payment or sign-in | `npm run test:claims -- --grep @claim:free-no-account` | Pass |
| Prints or saves the kit as a PDF from the browser | `npm run test:claims -- --grep @claim:browser-pdf` | Pass |
| Works offline after the first visit | `npm run test:claims -- --grep @claim:offline-after-first-visit` | Pass |
| Sample changes stay separate from the saved kit | `npm run test:claims -- --grep @claim:demo-isolation` | Pass |
| Does not send kit settings to another service or load tracking scripts | `npm run test:claims -- --grep @claim:private-browser-choices` | Pass |

The landing page, README, privacy page, builder, and demo copy were cross-checked against `.factory/claims.json`. No unlisted testable public claim was found.

## Live user paths

- Opening `/demo` directly and using the landing action both showed the persistent label: “Demo — sample data, nothing is saved to your real kit.” The populated sample had one guide, one challenge, 10 role cards, 20 instruction cards, and the status “Ready: 7 printable pages for 2 teams.”
- Changing normal settings to three teams, changing demo settings to seven teams, then choosing **Start for real** restored the normal three-team kit. Reset demo restored the shipped two-team Shape machine sample. The two storage keys were separate (`real:` and `demo:` namespaces).
- The live demo made a populated A4 PDF of 90,204 bytes. The Print / save PDF action was available without sign-in or payment.
- Boundary and recovery checks passed live: 99 teams visibly clamps to 8 and 19 pages; a blank teams value restores to 1 and 5 pages; changing it again recovers normally.
- Arrow Left on the focused 30-minute radio selected 20 minutes. A fresh Tab focused the skip link, with a 4 px white outline and 7 px blue ring. No keyboard trap was found.
- With reduced motion enabled, button transition duration was `0.00001s`.
- After service-worker control, an offline reload of `/demo` retained the sample output, demo label, and the visible offline notice.

## Routes, accessibility, privacy, and errors

- Live `/`, `/demo`, `/privacy/`, and `/terms/` returned 200. They have route-specific titles, `lang=en`, one h1, one main, header, nav, footer, and no console or page errors during normal use.
- The product-styled `/404` returned HTTP 404 with the title “Page not found — Classroom Algorithm Cards,” one h1, one main, and a way back. The browser’s expected failed-resource console message for that deliberate 404 is not a defect.
- `robots.txt` and `sitemap.xml` returned 200. All discovered on-site links returned 200. The legal pages use the common header, navigation, footer, Privacy/Terms links, product one-liner, Param Factory attribution, and build identifier.
- Playwright-injected axe-core against live desktop and phone routes reported zero WCAG 2 A/AA and 2.1 AA violations (25 passing rules on each viewport). This uses the supplied Chromium and avoids the incompatible standalone axe CLI driver.
- Live normal and demo request logs contained only `https://classroom-algorithm-cards.sociobot.in`. No tracking or third-party runtime traffic was observed.
- Live documents revalidate. Hashed JS and CSS use `public, max-age=31536000, immutable`. The live CSP includes `frame-ancestors 'none'`; `X-Frame-Options: DENY`, `Referrer-Policy: same-origin`, `X-Content-Type-Options: nosniff`, and the restrictive Permissions Policy are present.

## Earlier findings and current disposition

| Earlier item | Current disposition and evidence |
| --- | --- |
| No one-click sandbox | Fixed. `/demo` is one click, populated, labeled, resettable, and isolated. |
| No claims manifest or outcome tests | Fixed. Eight claims in `.factory/claims.json`; all eight commands passed separately. |
| Metaphorical first screen and no sample action | Fixed. The first screen uses the direct job headline, names the audience, and exposes the sample action. |
| Generic or broken 404 | Fixed. `/404` is deliberately HTTP 404 and is the product’s designed page. |
| Missing metadata, discovery files, and route setup | Fixed. Route titles, canonical/OG/Twitter metadata, icons, robots, sitemap, fallback, and designed 404 are live. |
| Missing CSP, anti-framing, and Permissions Policy | Fixed. The live response headers above are present. |
| Legal pages missing the common skeleton | Fixed. Both legal routes have the required common header, nav, footer, attribution, and build identifier. |
| Missing URL helper | Fixed. `verify-url.sh` exists and passed. |
| Hashed assets not immutable | Fixed. Live content-hashed CSS and JS are byte-identical to the candidate and use one-year immutable caching. |
| Local preview `Vary: Origin` caveat | Not reproduced on the live service-worker offline reload; it remains a preview-server note, not a product defect. |
| Earlier Lighthouse tooling caveat | No unsupported fresh Lighthouse score is claimed here. Payload measurements and live browser checks passed. |
| Fifteen-educator classroom validation | Still unperformed. It is the brief’s future research measure, not a completed public product claim or a release defect. |

## Reproduce

```sh
git clone --no-local /work/repo /tmp/classroom-algorithm-cards-verify3
git -C /tmp/classroom-algorithm-cards-verify3 checkout --detach def411b681e1f81e600f64d2a92f5da5da331402
cd /tmp/classroom-algorithm-cards-verify3
npm ci
npm test
npm run build
npm run check:artifact-policy
```

Then run every command in `.factory/claims.json` separately and inspect the live demo at <https://classroom-algorithm-cards.sociobot.in/demo>.
