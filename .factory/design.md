# Visual thesis — visible thinking, printed loud

## Direction

Classroom Algorithm Cards uses **neo-brutalist utility**: thick ink rules, square paper panels, oversized labels, and offset shadows borrowed from classroom supply bins, copier-room signs, and index cards. The blunt visual grammar makes sequence, roles, and mistakes easy to scan across a table. It is playful without looking like a generic children's app and practical enough to trust five minutes before class.

This is deliberately a single light treatment. The product's destination is white paper, and the on-screen cream stock previews the printed artifact accurately. Dark-mode recoloring would misrepresent the output; the page explicitly paints every surface instead.

## Tokens

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Background | `--paper` | `#f4efdF` | warm recycled-paper field |
| Surface | `--white` | `#fffdf7` | cards and controls |
| Ink | `--ink` | `#171713` | copy and hard rules |
| Muted ink | `--muted` | `#56564d` | secondary guidance |
| Action blue | `--blue` | `#1552c7` | primary actions, links |
| Blue contrast | `--blue-ink` | `#ffffff` | copy on action blue |
| Signal yellow | `--yellow` | `#ffd84a` | sequencing and selection |
| Debug orange | `--orange` | `#b83b0b` | warnings and bug marks |
| Success mint | `--mint` | `#69d3a6` | ready/completion accents |
| Danger | `--danger` | `#a62020` | errors only |

Ink is the default text on yellow/mint/cream. White is used on blue and orange only where contrast clears 4.5:1. State is always paired with an icon or word, never color alone.

Spacing follows an 8 px rhythm (`4, 8, 16, 24, 32, 48, 64`). Corners stay at 0–8 px; cards use a 3 px ink rule and a 5 px hard shadow. Desktop content caps at 1180 px with readable measures of 45–75 characters. Phone layouts stack, hide the decorative quick-demo illustration, and place generation controls before the preview.

## Type

No font files or remote calls are needed. Display labels use the locally available heavy utility stack `Arial Black, Arial, sans-serif`; body copy uses `Trebuchet MS, Arial, sans-serif`. The pairing feels like a teacher's handout headed with a marker and set with a legible school-office typeface. Body copy never drops below 16 px. Numerals use tabular figures where timing or quantities matter.

Scale: 16 px body, 18 px lead, 20 px h3/control emphasis, 28–34 px h2, and a responsive 44–72 px h1.

## Interaction grammar

Controls feel like movable desk objects: 3 px outlines, hard shadows, and a 2 px press displacement. Selection moves the yellow “chosen” strip into the relevant option. Changing the kit updates a live status line and the paper stack preview in place. The primary path is linear: choose time → choose groups → choose challenge → print/save PDF. Native controls preserve arrow-key behavior; all targets are at least 44 px.

Print strips away navigation, controls, shadows, and color-heavy decoration. It imposes intentional page breaks: guide, role cards, instruction cards, and challenge cards. Every card retains a black border and a text label when printed in grayscale.

## Motion policy

Only state changes move: selected controls press 2 px over 150 ms, preview pages settle with a 180 ms opacity/translate transition, and the offline notice drops from the page edge. Nothing loops. Under `prefers-reduced-motion: reduce`, transitions and smooth scrolling are removed and state changes are instant.

## Original asset plan and provenance

- Hero: a generated overhead still life of bold paper algorithm cards, wooden arrow tiles, and a friendly cardboard “bug” marker on a cream classroom table. It explains the physical, collaborative output before the visitor reads. No people, brands, interface screenshot, or embedded text.
- Functional icons (clock, people, printer, arrows, bug): authored in HTML/CSS or inline SVG with geometric strokes; MIT with the repository.
- Print card symbols: authored as simple Unicode/geometric marks so they remain crisp and meaningful in monochrome.

### Hero prompt sheet

**Subject:** overhead tabletop arrangement of hand-cut classroom sequencing cards, chunky wooden direction arrows, paper clips, one small cardboard beetle-shaped debugging token. **World/materials:** recycled cream paper, cobalt and yellow screen-print ink, plywood, black marker rules. **Light/lens:** clean soft daylight, straight 90-degree overhead, modest natural paper texture, all objects fully visible. **Palette words:** warm cream, inky black, school-bus yellow, action cobalt, a touch of mint. **Composition:** rectangular landscape, open quiet area at upper left, energetic diagonal card sequence to lower right. **Negative list:** no people or hands, no readable letters or numbers, no logos, no watermark, no gradients, no glossy 3D rendering, no brand characters, no electronic devices, no cluttered background.

Asset generation uses the factory image model deployment `factory-image` through `/opt/fleet/lib/gen-image.sh`, generated 2026-08-27. Generated imagery is original for this product. The exact prompt is retained beside the source image in `assets/src/hero-cards.json`; optimized WebP/AVIF derivatives ship with the site.
