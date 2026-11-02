---
name: Artisanal Planner
colors:
  surface: '#fff8f2'
  surface-dim: '#e2d9cd'
  surface-bright: '#fff8f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fcf2e6'
  surface-container: '#f6ede0'
  surface-container-high: '#f0e7db'
  surface-container-highest: '#eae1d5'
  on-surface: '#1f1b14'
  on-surface-variant: '#414943'
  inverse-surface: '#343028'
  inverse-on-surface: '#f9efe3'
  outline: '#717972'
  outline-variant: '#c0c9c1'
  surface-tint: '#35684d'
  primary: '#22553b'
  on-primary: '#ffffff'
  primary-container: '#3b6e52'
  on-primary-container: '#b7eecb'
  inverse-primary: '#9cd3b1'
  secondary: '#93493a'
  on-secondary: '#ffffff'
  secondary-container: '#fea08d'
  on-secondary-container: '#783527'
  tertiary: '#5d4742'
  on-tertiary: '#ffffff'
  tertiary-container: '#775e59'
  on-tertiary-container: '#fbdad4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b8efcc'
  primary-fixed-dim: '#9cd3b1'
  on-primary-fixed: '#002112'
  on-primary-fixed-variant: '#1c5036'
  secondary-fixed: '#ffdad3'
  secondary-fixed-dim: '#ffb4a5'
  on-secondary-fixed: '#3c0802'
  on-secondary-fixed-variant: '#753225'
  tertiary-fixed: '#fcdbd5'
  tertiary-fixed-dim: '#dfbfba'
  on-tertiary-fixed: '#291714'
  on-tertiary-fixed-variant: '#58413d'
  background: '#fff8f2'
  on-background: '#1f1b14'
  surface-variant: '#eae1d5'
typography:
  headline-xl:
    fontFamily: Quicksand
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Quicksand
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Quicksand
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  label-md:
    fontFamily: Quicksand
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Quicksand
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 1.75rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system draws inspiration from Japanese craft stationery, hand-bound bullet journals, and cottagecore paper goods. It evokes tactile intimacy, intentional reflection, and reassuring calm, transforming digital interactions into the comforting ritual of writing in a cherished notebook.

### Design Movement & Aesthetic
- **Tactile Craft & Paper Stationery:** Interface elements mimic physical bookbinding details, deckled paper stocks, subtle washi tape adhesives, and gentle ink impressions.
- **Tone & Mood:** Warm, grounded, nurturing, and delightfully organized. It trades cold computational precision for the warmth of natural fiber papers, botanical sages, and soft pottery terracotta.
- **Key Motifs:** Double-lined margins resembling etched stamps and stitched journals, tape-pinned polaroids, hand-drawn utility badges, and cozy piggy-bank or bookmark accents.

## Colors

The palette establishes an organic stationery aesthetic built upon tinted fibrous papers, herbal pressings, and natural clay.

### Role Allocations
- **Primary (`#3B6E52` / Deep Sage):** Structural headers, primary action buttons, active tab markers, and stamped borders. Provides grounding legibility and vintage botanical character.
- **Secondary (`#E08775` / Terracotta Clay):** Highlights, high-priority notifications, primary milestones, and interactive accent underlines.
- **Tertiary (`#F7D6D0` / Blushing Rose):** Soft badge backdrops, subtle highlighter tags, stickers, and decorative ribbon cues.
- **Neutral Surface Palette:**
  - Base Paper Surface: `#FDFBF7` (Crisp vellum / notebook leaf)
  - Recessed Containers / Cards: `#F5EFEB` (Milled fiber paper)
  - Structural Canvas Borders & Neutral Tone: `#EDE4D8` (Warm unbleached kraft)
- **Deep Botanical Ink:** `#2A4F3B` used for sharp editorial contrast, heavy typography, and stamped line icons.
- **Soft Herbal Tint:** `#E8F2EC` used for gentle table row alternations, success states, and calm interactive cards.

## Typography

The typography leverages rounded, organic letterforms that balance structural legibility with approachable handwritten charm.

- **Headlines (Quicksand):** Delivers open geometric counters with organic soft terminals. Used across page titles, dates, section headings, and numeric highlights.
- **Body & Continuous Reading (Nunito Sans):** Balances curved friendliness with functional readability across long journal entries, planner item lists, and descriptions.
- **Labels & Micro-copy (Quicksand):** Ensures badges, stickers, tabs, and small inputs remain playful yet legible.
- **Editorial Flourishes:** Special notes, motivational quotes, and marginalia can utilize loose letter-spacing and italicized weights to emulate fountain pen marginal notes.

## Layout & Spacing

Layouts follow the discipline of grid notebooks (such as 5mm dot grid and Japanese ruled stationery), structuring components with deliberate breathability.

### Grid & Layout Principles
- **Layout Model:** Fixed and contained layouts (max-width `1200px` on desktop) centered on textured page backdrops to evoke physical spreads and journal desks.
- **Adaptive Breakpoints:**
  - **Mobile (< 768px):** Single-column notebook view. Outer canvas margin at `1rem`. Internal card padding set to `space-md`.
  - **Tablet (768px - 1024px):** 2-column spread. Margins relax to `2rem`, gutters at `1.25rem`.
  - **Desktop (> 1024px):** 12-column binder layout or dual-page journal spread. Canvas margins expand to `3rem`, with gutters at `1.75rem`.

## Elevation & Depth

Rather than relying on modern blurred drop-shadows or stark digital planes, this system creates tactile depth through layered physical craft techniques.

### Depth Mechanics
- **Stacked Paper Shadows:** Gentle, warm-tinted multi-layered shadows mimicking heavy cardstock sitting on paper:
  - Default card depth: `0 2px 6px -1px rgba(74, 58, 42, 0.08), 0 8px 18px -3px rgba(74, 58, 42, 0.06)`
  - Elevated stickers & dialogs: `0 12px 24px -4px rgba(74, 58, 42, 0.12), 0 4px 8px -2px rgba(74, 58, 42, 0.04)`
- **Washi Tape Adhesion:** Modal edges, sticky notes, and cards feature semi-translucent overlapping top strips (`rgba(247, 214, 208, 0.85)` or `#E8F2EC`) with slight irregular rotations (`-1deg` to `1.5deg`).
- **Stamp & Indentation Outlines:** Cards use warm border strokes (`#EDE4D8`) combined with double borders (`border: 3px double #3B6E52` or `box-shadow: inset 0 0 0 1px #EDE4D8`) evoking stationery embossing and ink seals.

## Shapes

The shape system adopts smooth, soft curves reminiscent of corner-punched card stock, die-cut stickers, and tumbled stationery items.

### Shape Hierarchy
- **Standard Cards & Input Fields:** 8px (`0.5rem`) to 16px (`1rem`) border radius, preserving the feel of rounded planner corners.
- **Interactive Badges & Stickers:** Pill radii (`9999px`) or irregular stamp scalloping for die-cut tape tags, piggy bank emblems, and decorative bookmarks.
- **Borders & Dividers:** Subtle dotted (`border-style: dotted`) or dashed dividers resembling tear-off perforation sheets.

## Components

### Buttons
- **Primary Button:** Filled deep sage (`#3B6E52`) background with warm vellum text (`#FDFBF7`). Features a subtle bottom offset press shadow (`0 3px 0 #2A4F3B`) that flattens when active (`transform: translateY(2px)`).
- **Secondary / Craft Button:** Background in natural parchment (`#F5EFEB`), bordered with a 1.5px solid terracotta (`#E08775`) stroke, housing terracotta text and rounded corners.
- **Ghost Action:** Deep sage text accompanied by a faint dashed bottom border that transitions into a solid stroke on hover.

### Cards & Paper Sheets
- Built with a `#FDFBF7` surface, bordered with a delicate double-rule or solid `#EDE4D8` outline.
- Optional decorative washi-tape banner pinned to the top-center or top-right corner to ground the papercraft aesthetic.
- Pinned content and finance trackers include pig-shaped badge icons or brass-paperclip SVG accents anchored to the header.

### Chips & Washi Badges
- Semi-translucent pastel backgrounds (`#F7D6D0`, `#E8F2EC`, `#F5EFEB`).
- Straight-cut edges or notched banner tails with tiny zigzag perforations.
- Typography set in small, uppercase or bold rounded `Quicksand` with a mini icon prefix (leaves, paperclips, stars, piggy bank).

### Form Inputs
- Background in unbleached paper `#F5EFEB`, bordered with a warm beige line (`#EDE4D8`).
- Focus state creates an ink-dip highlight: crisp inner line of `#3B6E52` without harsh neon glows.
- Placeholders set in muted moss tones with a handwritten, notebook-prompt feel.

### Checkboxes & Radio Buttons
- **Checkboxes:** Styled as hand-drawn rounded boxes. When selected, filled with sage green `#3B6E52` showing a warm off-white checkmark that resembles an ink tick.
- **Radio Buttons:** Circular frames filled with a solid terracotta dot (`#E08775`) centered like a seal wax press.

### Lists & Perforated Trackers
- Checklists styled like bullet journal habits: dotted dividers separating each line item, with completed tasks displaying struck-through text in terracotta and stamped checkmarks.
- Sticky-note pullouts for summaries and tips, rotated subtly with soft parchment backgrounding (`#FAF4EB`).