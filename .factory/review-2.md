# Review 2 — Print a device-free coding activity

**Verdict: FAIL**

- Reviewed: 2026-09-05
- Live URL: <https://classroom-algorithm-cards.sociobot.in>
- Implementation candidate: `def411b681e1f81e600f64d2a92f5da5da331402` (`fix: remove duplicate preview landmark`)
- Documentation base: `bd040efe8e6295a4f71a1a479518fe3f211c359e` (`docs: record verification 3 pass`)
- Findings: **7**
- Untested public claims: **5**

The verdict is **FAIL**. The main activity works, all eight declared claim commands pass, and the live files match the implementation candidate. A PASS still requires zero findings and zero untested public claims.

## Job, audience, and first action before scrolling

The job is to print a device-free sequencing and debugging activity with a teacher guide and team cards. The audience is an elementary teacher or volunteer running one computing lesson.

In fresh desktop (1366 × 900) and phone (390 × 844) browsers, the first action was **Try it with sample data**. The page says it opens a 20-minute Shape machine kit for two teams. The action, audience sentence, and three facts were visible before scrolling, with no horizontal overflow.

## Findings

### High — Five public claims have no complete tagged claim test

All eight entries in `.factory/claims.json` passed separately. The manifest does not cover five other statements that a visitor can rely on:

| Public statement | Location | Missing proof |
| --- | --- | --- |
| “Keeps card backgrounds white with bold black outlines.” | Ink-saver control | No tagged test toggles ink-saver mode and checks the printed output. |
| “Role cards share movement, materials, speaking, and observing.” | Landing teaching notes | The complete-kit test counts role cards but does not check their roles or duties. |
| “Each activity includes a safety note.” | Landing teaching notes | No tagged test selects every activity and checks its safety note. A manual live check found the notes, but manual evidence does not replace the required claim entry and command. |
| Demo settings “are removed when you choose Start for real.” | Privacy page | The isolation test checks that the normal team count returns, but it does not assert that the demo storage key is removed. The manual live check found the key removed. |
| “The cache contains the app files, not your printed kit or classroom names.” | Privacy page | The offline test reloads the sample but does not inspect cache contents. |

These are true in the exercised implementation where manually checked, but they are still unlisted or incompletely tested public claims under the claims contract.

### Medium — Unknown routes do not use the designed 404 page

`GET /404` correctly returns the product-styled page with HTTP 404. However, a fresh request to `/missing-review-2` returns HTTP 200 and renders the normal home page. An old or mistyped extensionless link therefore does not reach the designed 404 response. The navigation fallback currently treats every unknown extensionless path as an application route.

### Medium — The landing page does not follow the required section order

The live main-section order is hero → How it works → builder/preview → teaching notes. The required order puts the product or live preview before How it works. The required plain-language section about privacy or what the product does not do is also absent from the landing page. Privacy is available as a separate navigation link, but that does not supply the required landing section.

### Medium — Several touch targets are shorter than 44 px

At 390 px, both header and footer wordmark links measure 34 px high. On the designed 404 page, the primary recovery link “Build a classroom kit” measures 19 px high; the other recovery link is also an inline text target. Equivalent undersized wordmark targets appear on the legal pages. This misses the attached accessibility and site-structure minimum of 44 × 44 CSS px.

### Medium — Several interface text styles are below the 16 px baseline

The design contract says body copy never drops below 16 px, and the attached design rules set the same web baseline. Live computed sizes include:

- sample action explanation and product facts: 14.4 px;
- team-count help: 13.76 px;
- builder status: 13.6 px;
- challenge descriptions: 13.33 px;
- footer provenance: 12.8 px.

The text remained readable in the tested browser, but it does not meet the declared minimum.

### Low — Demo navigation does not move focus to the new heading

After keyboard activation of **Try it with sample data**, `/demo` loads and the live region says “Demo opened,” but `document.activeElement` is `BODY`. The h1 has `tabindex="-1"` but is never focused. This misses the route-change requirement to move focus to the new h1 as well as announce it. Browser Back works and returns to `/`, so this is a focus-management issue rather than a blocked route.

### Low — The promised AVIF hero derivative is absent

`.factory/design.md` says optimized WebP and AVIF derivatives ship. The built picture contains WebP and JPEG only, and no AVIF file exists in `dist/assets`. The delivered WebP is small and performance is good, but the image contract and recorded design statement are not satisfied.

## Declared claim commands

Every command below was run separately from a clean detached checkout. Each passed its single tagged browser test.

| Claim | Command | Result |
| --- | --- | --- |
| Complete printable kit | `npm run test:claims -- --grep @claim:complete-printable-kit` | Pass |
| 20, 30, and 40 minute lessons | `npm run test:claims -- --grep @claim:lesson-lengths` | Pass |
| Printed activity without devices or an account | `npm run test:claims -- --grep @claim:printed-cards-activity` | Pass |
| Free sample without payment or sign-in | `npm run test:claims -- --grep @claim:free-no-account` | Pass |
| Browser PDF | `npm run test:claims -- --grep @claim:browser-pdf` | Pass |
| Offline after the first visit | `npm run test:claims -- --grep @claim:offline-after-first-visit` | Pass |
| Demo isolation | `npm run test:claims -- --grep @claim:demo-isolation` | Pass |
| Same-origin settings flow with no tracking | `npm run test:claims -- --grep @claim:private-browser-choices` | Pass |

## Clean checkout, build, and live parity

A fresh `git clone --no-local` checkout was detached at `def411b`. It was clean before installation. Node was `v22.23.2`; npm was `10.9.8`.

| Check | Result |
| --- | --- |
| `npm ci` | Passed; 59 packages installed, 0 vulnerabilities. |
| `npm test` | Passed: 6 unit tests, build, artifact policy, and 10 Playwright tests. |
| `npm run build` | Passed and produced `dist/index.html` plus `dist/staticwebapp.config.json`. |
| `npm run check:artifact-policy` | Passed; two hashed JS/CSS files are configured immutable and documents revalidate. |
| `./verify-url.sh` | Passed on live `/`, `/demo`, `/privacy/`, `/terms/`, and the deliberate `/404`. |
| Live parity | Live HTML, JS, and CSS are byte-identical to the candidate build. |
| Payload | JS 13.93 kB / 5.52 kB gzip; CSS 18.08 kB / 4.50 kB gzip; hero WebP 50,428 bytes. |

The matching SHA-256 values are:

- `index.html`: `61c943a23ed606cbdb966ae2d72facab7bfa77539b57508415322c17e73bf254`;
- `assets/index-DiN6Yfvm.js`: `272ffe666955b9ea6f1086b83f1c4c6a53cb8e691493a34f85e094961c5f8255`;
- `assets/index-CzbnoFjb.css`: `5ce82baf5a61522682b4e2bb7fc1db4b769ee2e4a10a89e08f5793c6f7ea5c2a`.

Fresh mobile Lighthouse against the live landing page scored performance **100**, accessibility **100**, best practices **100**, and SEO **100**. LCP was 1.1 s, total blocking time 20 ms, and CLS 0.

## Live activity checks

- The one-click demo opened one guide, one challenge, 10 role cards, and 20 instruction cards. It reported seven printable pages for two teams and retained the sample label.
- Normal settings were set to three teams and Backpack check. Demo settings were changed to seven teams and 40 minutes. The normal storage value did not change.
- **Reset demo** restored two teams, 20 minutes, and Shape machine. **Start for real** removed the demo key and restored the normal three-team Backpack check kit.
- `99` teams clamped to 8 and 19 pages. A blank value recovered to 1 and 5 pages. A later value of 3 recovered to 9 pages.
- Robot rescue, Backpack check, and Shape machine at 40 minutes and 8 teams each rendered 3 challenges, 40 roles, 80 instructions, 19 pages, an activity-specific safety note, and the multiple-valid-answer teaching note.
- Chromium generated a populated 117,093-byte, 9-page A4 PDF from the live sample state.
- The first Tab reached the skip link with a 4 px white outline and a 7 px blue ring. Radio arrow keys changed the duration and output. No keyboard trap appeared.
- After service-worker control, an offline phone reload retained the sample, 10 roles, 20 instructions, and the visible offline notice. The cache was `algorithm-cards-v3`.
- Reduced motion matched the media query, set transitions to `0.00001s`, and removed smooth scrolling. The page reflowed without horizontal overflow at 320 CSS px.
- Runtime requests during normal and demo changes were same-origin GETs only. No console or page errors occurred.

## Routes, accessibility, privacy, and links

- Playwright-injected axe-core reported zero WCAG 2 A/AA and 2.1 AA violations on `/`, `/demo`, `/privacy/`, `/terms/`, and `/404` at desktop and phone sizes. The manual target-size finding above is outside these axe results.
- Each tested route has `lang="en"`, a route title, one h1, one main landmark, a header, navigation, a site footer, and no missing image alt text. The root contains additional section footers inside the printed sheets; axe reported no landmark issue.
- Internal links and both explicit GitHub links returned 200. `robots.txt` and `sitemap.xml` returned 200. The social image is 1200 × 630, and the touch icon is 180 × 180.
- Live documents use `cache-control: no-cache`; hashed JS and CSS use one-year immutable caching. CSP includes `frame-ancestors 'none'`; `X-Frame-Options: DENY`, `Permissions-Policy`, `Referrer-Policy: same-origin`, HSTS, and `X-Content-Type-Options: nosniff` are present.
- No backend, tenant, restart-persistence, health, or 429 check applies to this static-web product. No CLI, library, desktop installation, billing, or payment-provider path exists.
- AI assistance is not missed leverage here. The brief explicitly excludes generated lesson plans, and the deterministic printable generator completes the stated job without sending classroom content to a model.

## Earlier findings and current disposition

| Earlier item | Current disposition |
| --- | --- |
| No one-click demo sandbox | Fixed. The live demo is one click, populated, labeled, resettable, and manually proven separate from normal storage. |
| No claim manifest or claim tests | Partly fixed. Eight declared commands pass, but five public statements remain unlisted or incompletely tested; this review reopens the claim finding. |
| Metaphorical first screen and no sample action | Fixed. The job, audience, action, result, and three facts are clear before scrolling on phone and desktop. |
| Generic or broken 404 | Partly fixed. `/404` is a correct designed HTTP 404, but arbitrary extensionless unknown paths still return the home page with HTTP 200. |
| Missing route metadata and discovery files | Fixed. Titles, canonical, Open Graph, Twitter, icons, robots, sitemap, manifest, and legal metadata are present. |
| Missing CSP, anti-framing, and Permissions Policy | Fixed. Required live headers are present. |
| Legal pages lacked the common skeleton | Fixed. Both legal routes use the shared header, navigation, footer, attribution, and build identifier. |
| Missing URL verification helper | Fixed. The helper exists and passed all five tested live routes. |
| Hashed assets were not immutable | Fixed. Live hashed CSS and JS have one-year immutable caching. |
| Duplicate preview landmark | Fixed. Axe found no landmark violation on the candidate or live pages. |
| Local preview `Vary: Origin` caveat | Not reproduced live. The service-worker-controlled live demo reloaded offline successfully. |
| Earlier Lighthouse tooling caveat | Resolved for this review with a fresh live mobile run scoring 100 in all four categories. |
| Fifteen-educator classroom validation | Still future product research. The site does not claim that the success measure has been achieved, so it is not counted as a release finding. |

## Reproduce

```sh
git clone --no-local /work/repo /tmp/classroom-algorithm-cards-review-2
git -C /tmp/classroom-algorithm-cards-review-2 checkout --detach def411b681e1f81e600f64d2a92f5da5da331402
cd /tmp/classroom-algorithm-cards-review-2
npm ci
npm test
npm run build
npm run check:artifact-policy
```

Then run every command in `.factory/claims.json` separately and inspect the live desktop, phone, demo, legal, offline, and 404 paths.
