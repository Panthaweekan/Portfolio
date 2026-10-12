---
name: Panthaweekan Somngam, Portfolio
description: A one-person annual report. Each system is a chapter with one exact figure.
colors:
  ground: "#FAFAFA"
  ink: "#16181D"
  muted: "#555A66"
  rule: "#C9CDD6"
  field: "#1F3BD6"
  on-field: "#FFFFFF"
  on-field-muted: "#C7D0FF"
  ground-dark: "#16181D"
  ink-dark: "#E8EAF0"
  muted-dark: "#A3A8B4"
  rule-dark: "#343843"
  field-dark: "#3550E8"
  on-field-dark: "#FFFFFF"
  on-field-muted-dark: "#E0E5FF"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.375
  headline:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body-lead:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    fontFeature: "tnum"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  gutter: "24px"
  inset: "24px"
  inset-md: "40px"
  section: "48px"
  section-end: "64px"
  close: "80px"
  container: "1280px"
  measure: "68ch"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  button-masthead-cv:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "36px"
  link-text:
    textColor: "{colors.ink}"
  nav-link:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.ink}"
  field-panel:
    backgroundColor: "{colors.field}"
    textColor: "{colors.on-field}"
    rounded: "{rounded.none}"
    padding: "48px"
  masthead:
    backgroundColor: "{colors.ground}"
    height: "56px"
---

# Design System: Panthaweekan Somngam, Portfolio

Scope: the home page (`/`) and the CV viewer (`/resume`). `/present` is a separate fixed-size deck that keeps its own styles and is not governed by this file.

## Overview

**Creative North Star: "The Engineer's Annual Report"**

The site is set like a Swiss International Style annual report written by one person. Each system Panthaweekan built is a chapter with one exact figure, and the opening spread carries Figure 1, a live diagram of a single LLM call becoming a priced line item. The page is bright white stock with graphite type. Hierarchy comes from Archivo weight and size, flush-left setting, a 12-column grid and hairline rules, not from colour, cards or shadow.

Ultramarine is a field. It fills a whole region of a spread (the Figure 1 panel and the Contact close) and never appears as an accent on the white ground. Every action on ground is ink. The dark theme is the same report at night: the ground becomes ink, type lifts to a pale cool grey, and the field lightens so it stays legible.

Density is that of a reading document: generous section spacing (48px top, 64px bottom), a 68ch measure for prose, and tabular figures wherever a number or date appears. Motion is limited to Figure 1, which runs on one damped clock and stops when it is off screen or reduced motion is requested.

**Key Characteristics:**
- Bright stock, graphite ink, cool grey hairlines; one ultramarine field per spread.
- Archivo Variable throughout, weights 400/500/600, flush left, tabular numbers.
- Strict 12-column grid inside a 1280px container.
- Square corners everywhere; the only circles are Figure 1's station dots and marker.
- Flat: depth comes from an ink rule and grey hairline hierarchy, never shadow.
- Figures are numbered and captioned in run-in style ("Figure N · title").

## Colors

A near-monochrome report palette (ground, ink, muted, rule) with one saturated ultramarine reserved for whole regions.

### Primary
- **Report Ink** (`ink`, dark `ink-dark`): all body and heading type, the fill of the primary button and the masthead CV button, the focus outline, the selection highlight, and the 1px rule that opens each section and each layer figure.
- **Ultramarine Field** (`field`, dark `field-dark`): the background of the Figure 1 panel and the Contact close. Nothing else.

### Neutral
- **Bright Stock** (`ground`, dark `ground-dark`): page background, masthead background, the mobile menu panel, and the text colour on ink buttons. In dark mode the ground is the ink value itself.
- **Graphite Muted** (`muted`, dark `muted-dark`): secondary text such as subtitles, dates, technology lists, table headers, layer names, skill category labels, masthead links at rest.
- **Cool Hairline** (`rule`, dark `rule-dark`): 1px row dividers between chapters, table rows, skill rows and layer rows; the masthead bottom border; the mobile menu border; the CV viewer frame; the scrollbar thumb.
- **On-Field White** (`on-field`, dark `on-field-dark`): type, the travelled rail, the marker and reached dots on the field.
- **On-Field Mist** (`on-field-muted`, dark `on-field-muted-dark`): secondary type on the field: Figure 1's not-yet-reached values, unreached dot borders, the illustrative caption, and the Contact intro line.

### Named Rules
**The Whole Field Rule.** Ultramarine fills a whole region (a full figure panel or a full-bleed closing band) and is never used for text, links, buttons, icons or borders on the ground.

**The Ink Action Rule.** Primary buttons, the focus outline (2px solid, 3px offset) and text selection use ink on ground. Inside a field region (`.on-field`) the focus outline switches to on-field.

**The Token Dimming Rule.** Text that is pending or secondary on the field changes to the on-field-muted token instead of fading with opacity. Opacity is reserved for non-text strokes and states: the untravelled Figure 1 rail (on-field at 30%) and the ink-button hover (90%).

## Typography

**Display Font:** Archivo Variable (with Archivo, system-ui, sans-serif)
**Body Font:** Archivo Variable (same stack)

**Character:** A single neutral grotesk carries everything, as in a Swiss annual report. Hierarchy comes from size and three weights (400 text, 500 emphasis in tables and layer nodes, 600 headings and actions). Headings are tracked slightly tight.

### Hierarchy
- **Display** (600, 36px rising to 48px at md, line-height 1.05, tracking -0.025em): the name on the opening spread only.
- **Lead** (400, 24px rising to 28px at md, line-height 1.375): the one-line positioning statement under the name.
- **Headline** (600, 30px, tracking -0.025em): section titles (Systems, Record, Skills, Education); Contact goes to 36px at md.
- **Title** (600, 24px, line-height 1.25, tracking -0.025em): chapter titles, the CV viewer heading, and the Figure 1 caption (30px at md).
- **Body-lead** (400, 18px, line-height 1.625, max 68ch): a chapter's description paragraph.
- **Body** (400, 16px, line-height 1.55, max 68ch): running text, lists, table cells.
- **Label** (400, 14px, muted, tabular): metadata lines, figure captions, table headers, layer and skill category names, masthead links. Sentence case, never uppercase.

### Named Rules
**The Tabular Figures Rule.** Every number, date, figure number and amount is set with tabular numerals (`tnum`).

**The Run-in Caption Rule.** A figure caption reads "Figure N · title" on one line: the figure number in semibold ink, a middle dot, then the title. It is never a separate stacked label above the title.

## Layout

A 12-column grid with a 24px gutter sits inside a centred 1280px container, with 24px side padding that grows to 40px at md (768px). Below md, every grid region spans all 12 columns.

- **Opening spread (md and up):** at least one viewport tall below the 56px masthead. The name and positioning take columns 1–5, the intro and actions sit under them, and Figure 1 fills columns 6–12 for the full height. On phones the order is name, then Figure 1, then intro, with Email and LinkedIn repeated under the name so contact is on the first screen.
- **Chapters:** a 4/8 split at md: the title and metadata on the left, description, figure and expandable detail on the right.
- **Label/value rows:** layer figures use 4/8 and skills use 3/9 from sm (640px) up, stacking on phones.
- **Rhythm:** sections open with 48px top padding and end with 64px; chapters have 48px above and below; the Contact close has 80px vertical padding and runs full-bleed outside the container.
- **Measure:** prose is capped at 68ch.
- **Masthead:** sticky, 56px tall; `scroll-padding-top` is 72px so anchored sections clear it.

## Elevation & Depth

The system is flat. There are no shadows anywhere, including the mobile menu panel, which is separated by a 1px hairline border. Depth and structure come from a two-level rule hierarchy and from the field's solid colour.

### Named Rules
**The Rule Hierarchy Rule.** A 1px ink rule opens a section or a figure table (Systems, Record, Skills, Education, each layer figure). A 1px grey hairline (`rule`) separates rows inside it (chapters, table rows, skill rows, layer rows). Never swap the two, and never add a shadow to separate content.

## Shapes

Corners are square (0px) on every rectangle: buttons, the field panels, the menu panel, the CV frame. The only round forms are inside Figure 1: the 10px station dots with 2px borders and the 16px travelling marker, both fully round. Borders are always 1px, except Figure 1's 2px rail and dot outlines.

## Components

### Buttons
Blunt ink blocks set in semibold type.
- **Shape:** square corners (0px).
- **Primary (Download CV):** ink fill, ground text, 600 weight, 44px tall with 20px horizontal padding. One per spread, always for the CV.
- **Masthead CV:** the same treatment at 36px tall, 14px type, with a 16px download icon; the label shortens to "CV" below sm. It stays visible in every viewport.
- **Hover / Focus:** hover drops opacity to 90%; focus shows the global 2px ink outline at a 3px offset.
- **Secondary actions** (Email, LinkedIn, Read the full chapter, Download PDF): semibold text with a 1px underline at a 0.2em offset. "Read the full chapter" thickens its underline to 2px on hover.

### Navigation
- **Masthead:** sticky ground bar with a hairline bottom border. The short name sits at the left in semibold type; section links (Systems, Record, Skills, Contact) are 14px muted text that turns ink and underlined on hover. On the right sit Presentation, the theme toggle (a 36px square icon button, muted to ink), and the CV button.
- **Mobile:** section links collapse into a "Menu" disclosure that opens a 176px ground panel with a hairline border, no shadow, aligned to the right edge.

### Figure 1 (signature)
The ultramarine panel on the opening spread. A run-in caption in title type ("Figure 1 · One LLM call becomes money") sits above a vertical list of five stations (Agent step, Collector, Kafka, Engine, Dashboard). A 2px rail joins the station dots. The untravelled rail is on-field at 30% opacity, and the travelled part is solid on-field up to a 16px marker. The station names are semibold. A value is on-field once the marker has reached it and on-field-muted before that, with a 500ms colour transition. The next station's dot is drawn hollow on-field before the marker arrives. The final station shows its amount in title-size tabular figures. A muted 14px footnote labels the figure as illustrative.
- **Motion:** one clock. 1500ms per segment with cubic ease-in-out, a 2000ms hold on the final frame, then the loop restarts. It runs only while the figure is on screen and the tab is visible. Under reduced motion, it shows the final frame statically with no marker.

### Layer Figure
A chapter's architecture as a numbered table: a 14px muted run-in caption ("**Figure N** · System: architecture"), then an ink top rule and one hairline-separated row per layer, with the layer name in muted type and its nodes in 500-weight type and optional muted sublabels joined by middle dots.

### Chapter
A section with a hairline top rule. On the left are the title, a muted tabular metadata line joined by middle dots, and the technology list. On the right are the body-lead description, an optional layer figure, and a "Read the full chapter" text toggle that reveals the highlights as a disc list within the measure.

### Contact Close
A full-bleed ultramarine band at the end of the page. The headline and an on-field-muted intro sit on the left 6 columns; on the right is an 18px list of underlined on-field links (email, LinkedIn, GitHub, Download CV, presentation).

## Do's and Don'ts

### Do:
- **Do** use ultramarine only as the full background of a region, with on-field and on-field-muted type on it.
- **Do** make the primary action an ink block (44px, square, semibold) and keep the masthead CV button reachable in every viewport.
- **Do** caption every figure in run-in style: "Figure N · title", with figure numbers counting on from Figure 1.
- **Do** set every number and date with tabular figures.
- **Do** open sections with a 1px ink rule and separate rows with 1px grey hairlines.
- **Do** dim pending text on the field by switching to on-field-muted, not by fading it.
- **Do** cap prose at 68ch and keep everything flush left on the 12-column grid.

### Don't:
- **Don't** use ultramarine for links, buttons, icons, borders or highlights on the ground.
- **Don't** add shadows, rounded rectangles, cards or gradients; depth is rules and fields only.
- **Don't** stack a small label above a heading; captions and metadata run in on one line.
- **Don't** add a second typeface or a weight above 600.
- **Don't** animate anything other than Figure 1, and never animate it when reduced motion is requested.
- **Don't** apply this system to `/present`; it keeps its own styles.
