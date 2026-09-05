# Review 1 — Print a device-free classroom kit

**Verdict: FAIL**

- Reviewed: 2026-09-05
- Live URL: https://classroom-algorithm-cards.sociobot.in/
- Implementation candidate: `54fe86a1f6048b34b9b71d48ad5d4b9c2ed8c5fb` (`fix: emit immutable cache policy for hashed assets`)
- Documentation candidate: `6adedd94a1fe7a5ebfb046fdffce3ade68ba19cb` (`docs: add independent verification report`)
- Findings: **8**
- Untested public claims: **9**

The verdict is FAIL. A PASS requires zero findings and zero untested claims.

## Job, audience, and first action

The job is to generate and print a 20, 30, or 40 minute unplugged sequencing and debugging kit with a guide, role cards, command cards, and challenges. The audience is an elementary teacher or volunteer who needs to run one computing lesson.

In fresh desktop (1366 × 900) and phone (390 × 844) browsers, before scrolling, the first action was **“Build my free kit”**. It moves to `#builder`; it does not start a sample. The visible h1 was “Put the algorithm on the table.” The hero paragraph describes a class period but does not name the teacher or volunteer audience. This does not meet the required plain-words first-screen shape.

## Findings

### High — There is no one-click demo sandbox

The first screen has no “Try it with sample data” action. `/demo` returns the Azure Static Web Apps 404 page. The application has no demo storage namespace, persistent “Demo — sample data, nothing is saved” label, Reset demo control, Start for real control, or `.factory/demo.md`.

The normal builder does render real content, but it is not a separate sample sandbox. The required demo path therefore cannot prove that sample use leaves real data unchanged.

### High — Public claims have no claims manifest or claim tests

`.factory/claims.json` is absent. There are no `@claim:<id>` tests, and no public claim has a declared command that a reviewer can run from the demo entry point. The existing six unit tests cover kit calculations but are not observable claim tests.

Nine testable public claims are consequently untested:

1. The generator creates a complete printable kit.
2. It produces 20, 30, and 40 minute activities.
3. It works without devices or accounts.
4. Setup takes under ten minutes.
5. Browser printing can save a PDF.
6. An opened kit works offline after the first visit.
7. Selections are not uploaded or persisted.
8. There is no tracking or runtime third-party traffic.
9. Output is A4 and Letter friendly.

The statements appear on the landing page, privacy page, or README. Manual observations cannot replace the required sandbox claim tests.

### Medium — The first screen does not use plain words or a sample action

The required job headline is absent. “Put the algorithm on the table.” is a metaphor, not a direct description of printing a classroom kit. The eyebrow copy (“No prep spiral” and “No wrong-shaped thinking”) is also non-plain, non-informational copy. The first action says “Build my free kit,” does not say what appears after activation, and is not the required sample-data action.

### Medium — The 404 page is a broken product path

`GET /404` correctly returns HTTP 404, but the body is Azure’s generic page. It has title “Azure Static Web Apps - 404: Not found,” no h1, no main landmark, no product styling, and no link back to the kit. It also loads Azure CDN scripts and styles. This is not the required designed 404 page. The same generic page appears at `/demo`.

### Medium — Required route metadata and discovery files are missing

The landing document has no canonical link, Open Graph tags, Twitter card tags, or apple-touch icon. `robots.txt` and `sitemap.xml` both return 404. The generated Static Web Apps configuration has immutable asset routes only; it has no designed 404 rewrite or navigation fallback. These omissions leave required routes and page discovery incomplete.

### Low — Content Security Policy, anti-framing, and Permissions Policy remain absent

Live `/`, `/privacy/`, `/terms/`, `/sw.js`, and hashed assets send `Referrer-Policy` and `X-Content-Type-Options`, but no `Content-Security-Policy`, `X-Frame-Options`/`frame-ancestors`, or `Permissions-Policy`. This is the unresolved low finding in both prior verification reports.

### Low — Privacy and terms pages do not use the required common site skeleton

Both legal pages have a home link and a footer link, but no consistent primary navigation. Their footers omit the product one-liner, Privacy and Terms links, “Built by Param Factory,” and version/build identifier required on every route.

### Low — The required URL verification helper is absent

There is no `verify-url.sh` in the clean checkout, so the required title/lang/main/alt/console helper could not be run. `npx @axe-core/cli https://classroom-algorithm-cards.sociobot.in/` was attempted but its Selenium driver could not find a Chrome binary in this container. An equivalent Playwright axe-core audit did complete with zero violations; that does not restore the missing helper.

## Checks that passed

| Check | Evidence |
| --- | --- |
| Clean candidate install | Fresh detached clone at `54fe86a`; `npm ci` added 56 packages and reported 0 vulnerabilities. |
| Declared commands | `npm test` passed 6/6 Vitest tests and its build/policy checks. A separate `npm run build` and `npm run check:artifact-policy` also passed. |
| Live parity | Candidate and live HTML SHA-256: `851bd1ae…f5fc922af`; JS: `2702fe26…587ed8fe92`; CSS: `e7fe5c06…bb7f9f7fc4a53`. |
| Static budget | Built JS 11,860 B (4,780 B gzip), CSS 16,587 B (4,200 B gzip), and WebP hero 50,428 B. |
| Default output | Both fresh browsers rendered 11 sheets: one guide, two challenges, 20 role cards, and 40 command cards. |
| Populated normal path | 20 minutes, two teams, Shape machine rendered seven sheets, one challenge, 10 role cards, and 20 command cards. Chromium created an 89 KB A4 PDF from that populated kit. |
| Boundary, invalid, recovery | `99` teams visibly clamped to 8 and 19 pages. Blank recovered to 1 team and 5 pages. A later value of 3 recovered to 9 pages. |
| Keyboard and focus | Arrow Left on the focused minutes radio selected 20. The skip link had a 4 px white outline and 7 px blue focus ring. |
| Phone and desktop | Fresh 390 × 844 phone and 1366 × 900 desktop pages worked without browser console errors or page errors. |
| Accessibility smoke test | Playwright-injected axe-core WCAG 2 A/AA and 2.1 AA found zero violations at both viewports. The pages have `lang`, one landing h1, and a main landmark. |
| Reduced motion | In a reduced-motion context, document scroll behavior was `auto` and button transition duration was `0.01ms`. |
| Privacy runtime observation | Landing-page requests stayed same-origin. The fresh context had zero cookies and zero local/session-storage entries. This is an observation, not a declared privacy claim test. |
| Offline | After first load, the service worker controlled the page. A fresh offline reload showed 11 sheets and “Offline — your kit still works and prints from this device.” |
| Legal routes | `/privacy/` and `/terms/` return 200 with route-specific titles and one main landmark. |
| Links and transport | Landing internal links resolve; the explicit GitHub source link returns 200. HTTP redirects to HTTPS. |
| Cache repair | Live HTML and SW use `cache-control: no-cache`; hashed JS/CSS use `public, max-age=31536000, immutable`. The previous medium cache finding is fixed. |

## Earlier findings and notes

| Earlier item | Current disposition |
| --- | --- |
| Hashed assets were not immutable | Fixed. The live headers now use the required one-year immutable policy, and live files match `54fe86a`. |
| CSP / anti-framing headers absent | Still open; recorded above as a low finding. |
| Local Vite preview had a `Vary: Origin` offline-cache caveat | Not reproduced on live. The live offline reload passed. This was a preview-server caveat, not a live defect. |
| Lighthouse attachment caveat | No new Lighthouse score is claimed in this review. Payload budgets and runtime browser checks are recorded above. |
| Validate the brief with 15 educators | Still not performed. It requires real classroom research and is not represented as completed by an automated test. |

## Reproduce

```sh
git clone --no-local /work/repo /tmp/classroom-algorithm-cards-audit
git -C /tmp/classroom-algorithm-cards-audit checkout --detach 54fe86a1f6048b34b9b71d48ad5d4b9c2ed8c5fb
cd /tmp/classroom-algorithm-cards-audit
npm ci
npm test
npm run build
npm run check:artifact-policy
```

Browser evidence was produced with Playwright 1.58.2. Screenshots, the populated PDF, and `browser-audit.json` are in the reviewer workspace at `/tmp/classroom-algorithm-cards-audit.5CrL5K/evidence/`.
