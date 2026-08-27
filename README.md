# Classroom Algorithm Cards

Classroom Algorithm Cards is a free, print-first generator for elementary teachers and volunteers running a one-off computing lesson. In a few choices it creates a complete 20, 30, or 40 minute unplugged sequencing and debugging pack: a timed facilitation guide, role cards, instruction decks for every team, and challenge cards.

Live product: <https://classroom-algorithm-cards.sociobot.in>

## Who it is for

The kit is designed for an adult who needs to lead one useful computing activity with 3–40 elementary learners and less than ten minutes of setup. It does not require devices, student accounts, prior coding experience, or a single “correct” answer sequence.

Included themes:

- Robot rescue — a careful movement-and-map activity
- Backpack check — an everyday procedure made testable
- Shape machine — a seated paper-shape puzzle

Every theme includes specific safety guidance and facilitator prompts that frame bugs as observable surprises rather than student failures.

## Develop and verify

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

`npm run build` is the deployment command. It type-checks the TypeScript app and writes the static release to `dist/`, with `dist/index.html` at the root.

## How it works

The app is Vite plus framework-free TypeScript. Kit content and pagination calculations live in `src/kit.ts`; `src/main.ts` renders the selected pack into semantic print sheets. Browser print styles create deterministic A4 pages and work with “Save as PDF.” A small service worker caches the built shell and hashed Vite assets after the first successful visit, so an opened kit survives a connection drop.

No selection is uploaded or persisted. There are no accounts, analytics, ad scripts, remote fonts, or runtime third-party requests. See the included `/privacy/` and `/terms/` pages.

## Product sources

- `.factory/brief.json` — researched opportunity and scope
- `.factory/design.md` — neo-brutalist visual system and generated-art provenance
- `assets/src/` — original image source and exact generation prompt

The software and classroom materials are available under the [MIT License](LICENSE).
