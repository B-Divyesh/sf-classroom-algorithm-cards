# Classroom Algorithm Cards

Print a device-free coding activity for elementary teachers and volunteers. The generator creates a printable guide, role cards, instruction cards, and challenge cards for a 20, 30, or 40 minute lesson.

Start with the one-click sample at [classroom-algorithm-cards.sociobot.in/demo](https://classroom-algorithm-cards.sociobot.in/demo). It opens a populated 20-minute Shape machine kit for two teams. The sample is free to use without payment or sign-in.

## What it does

- Creates a printed-card activity without student devices or an account.
- Prints or saves a populated kit as a browser PDF.
- Keeps the kit available offline after the first visit.
- Keeps sample changes separate from normal kit settings in the same browser.
- Does not send kit settings to another service or load tracking scripts.

The [/privacy/](/privacy/) and [/terms/](/terms/) pages explain browser storage, offline files, and classroom use.

## Run and verify

Requires Node.js 20 or newer and the Playwright Chromium browser for browser checks.

```sh
npm ci
npm test
npm run build
npm run check:artifact-policy
```

`npm test` runs unit checks, builds `dist/`, validates the generated Static Web Apps configuration, and runs the tagged browser claim suite against the one-click `/demo` sandbox. Each public product claim and its clean command are listed in [`.factory/claims.json`](.factory/claims.json).

For local browsing:

```sh
npm run dev
npm run preview
```

With `npm run serve:dist` running in another terminal, verify the rendered route:

```sh
./verify-url.sh http://127.0.0.1:4173/demo
```

`npm run build` is the static deployment command. It writes `dist/` with `index.html` at its root and generates `dist/staticwebapp.config.json` with cache, security-header, navigation fallback, and designed-404 rules.

## Product files

- `.factory/brief.json` — researched scope and audience
- `.factory/design.md` — visual system and original-art provenance
- `.factory/demo.md` — sample route and separate storage namespaces
- `assets/src/` — original hero source and generation prompt
- `LICENSE` — project license
