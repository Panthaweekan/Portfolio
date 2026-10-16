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
  slide-numeral:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "220px"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "tnum"
  slide-display:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "140px"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  slide-divider-title:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "112px"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  slide-headline:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "72px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  slide-title:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "40px"
    fontWeight: 600
  slide-body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.375
  slide-node:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 500
  slide-caption:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 400
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
  slide-width: "1920px"
  slide-height: "1080px"
  slide-margin: "120px"
  slide-top: "96px"
  slide-bottom: "56px"
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
  slide-frame:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    padding: "96px 120px 56px"
    width: "1920px"
    height: "1080px"
  chapter-divider:
    backgroundColor: "{colors.field}"
    textColor: "{colors.on-field}"
    padding: "96px 120px 56px"
    width: "1920px"
    height: "1080px"
  slide-folio:
    textColor: "{colors.muted}"
    typography: "{typography.slide-caption}"
  deck-chrome:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    height: "48px"
---

# Design System: Panthaweekan Somngam, Portfolio

Scope: the home page (`/`), the CV viewer (`/resume`) and the presentation deck (`/present`). The deck is the same report set at projection scale on a fixed 1920×1080 page; its canvas and type scale are recorded under Layout and Typography.

## Overview

**Creative North Star: "The Engineer's Annual Report"**

The site is set like a Swiss International Style annual report written by one person. Each system Panthaweekan built is a chapter with one exact figure, and the opening spread carries Figure 1, a live diagram of a single LLM call becoming a priced line item. The page is bright white stock with graphite type. Hierarchy comes from Archivo weight and size, flush-left setting, a 12-column grid and hairline rules, not from colour, cards or shadow.

Ultramarine is a field. It fills a whole region of a spread (the Figure 1 panel and the Contact close) and never appears as an accent on the white ground. Every action on ground is ink. The dark theme is the same report at night: the ground becomes ink, type lifts to a pale cool grey, and the field lightens so it stays legible.

Density is that of a reading document: generous section spacing (48px top, 64px bottom), a 68ch measure for prose, and tabular figures wherever a number or date appears. Motion is limited to Figure 1, which runs on one damped clock and stops when it is off screen or reduced motion is requested. The deck is the report read aloud: numbered pages, a contents page, and an ultramarine divider opening each chapter.

**Key Characteristics:**
- Bright stock, graphite ink, cool grey hairlines; one ultramarine field per spread.
- Archivo Variable throughout, weights 400/500/600, flush left, tabular numbers.
- Strict 12-column grid inside a 1280px container.
- Square corners everywhere; the only circles are Figure 1's station dots and marker.
- Flat: depth comes from an ink rule and grey hairline hierarchy, never shadow.
- Figures are numbered and captioned in run-in style ("Figure N · title").
- Two decks share a fixed 1920×1080 page with folios ("p. N / {deck total}"): each opens with a contents page and an ultramarine divider per chapter. The technical talk runs newest system first; the About me talk runs from now back to university.

## Colors

A near-monochrome report palette (ground, ink, muted, rule) with one saturated ultramarine reserved for whole regions.

### Primary
- **Report Ink** (`ink`, dark `ink-dark`): all body and heading type, the fill of the primary button and the masthead CV button, the focus outline, the selection highlight, and the 1px rule that opens each section and each layer figure.
- **Ultramarine Field** (`field`, dark `field-dark`): the background of the Figure 1 panel and the Contact close on the site; in the decks, the chapter dividers (three per deck) and the Figure 1 slide. Nothing else.

### Neutral
- **Bright Stock** (`ground`, dark `ground-dark`): page background, masthead background, the mobile menu panel, and the text colour on ink buttons. In dark mode the ground is the ink value itself.
- **Graphite Muted** (`muted`, dark `muted-dark`): secondary text such as subtitles, dates, technology lists, table headers, layer names, skill category labels, masthead links at rest.
- **Cool Hairline** (`rule`, dark `rule-dark`): 1px row dividers between chapters, table rows, skill rows and layer rows; the masthead bottom border; the mobile menu border; the CV viewer frame; the scrollbar thumb.
- **On-Field White** (`on-field`, dark `on-field-dark`): type, the travelled rail, the marker and reached dots on the field.
- **On-Field Mist** (`on-field-muted`, dark `on-field-muted-dark`): secondary type on the field: Figure 1's not-yet-reached values, unreached dot borders, the illustrative caption, and the Contact intro line.

### Named Rules
**The Whole Field Rule.** Ultramarine fills a whole region (a full figure panel, a full-bleed closing band, or a whole divider slide) and is never used for text, links, buttons, icons or borders on the ground.

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

### Slide Scale
The deck sets type in pixels on the 1920px canvas; the canvas scales as a whole, so these sizes never reflow. Same family, same three weights.
- **Slide numeral** (600, 220px, line-height 1, tabular): the chapter numeral (I, II, III) on a divider.
- **Slide display** (600, 140px, line-height 0.98, tracking -0.025em): the name on the title slide and "Questions?" on the close. Figure 1's landed amount sits just below this at 120px, tabular.
- **Slide divider title** (600, 112px, line-height 1.02, tracking -0.025em): the chapter title on a divider.
- **Slide headline** (600, 72px, line-height 1.05, tracking -0.025em): the headline of every content slide.
- **Slide steps** (56 / 52 / 48 / 44 / 40px): contents entries at 56 (600); a slide's lead statement and the title-slide positioning line at 52 (400); the Figure 1 caption at 48 (600); the divider subtitle at 44 (400); column titles, step titles, contents numerals and page numbers at 40.
- **Slide body** (400, 36 / 32px, line-height 1.375): 36px for the close slide's contact lines, 32px for lists, step examples and Figure 1 stations. 32px is the floor for running text.
- **Slide node** (500, 28px): layer-figure nodes on a slide.
- **Slide caption** (400, 22px, muted, tabular): folios, figure captions, layer names, column metadata. 22px is the floor for anything on a slide.

### Named Rules
**The Tabular Figures Rule.** Every number, date, figure number and amount is set with tabular numerals (`tnum`).

**The Run-in Caption Rule.** A figure caption reads "Figure N · title" on one line: the figure number in semibold ink, a middle dot, then the title. It is never a separate stacked label above the title.

**The Projection Floor Rule.** On a slide nothing is set below 22px, and running text not below 32px.

## Layout

A 12-column grid with a 24px gutter sits inside a centred 1280px container, with 24px side padding that grows to 40px at md (768px). Below md, every grid region spans all 12 columns.

- **Opening spread (md and up):** at least one viewport tall below the 56px masthead. The name and positioning take columns 1–5, the intro and actions sit under them, and Figure 1 fills columns 6–12 for the full height. On phones the order is name, then Figure 1, then intro, with Email and LinkedIn repeated under the name so contact is on the first screen.
- **Chapters:** a 4/8 split at md: the title and metadata on the left, description, figure and expandable detail on the right.
- **Label/value rows:** layer figures use 4/8 and skills use 3/9 from sm (640px) up, stacking on phones.
- **Rhythm:** sections open with 48px top padding and end with 64px; chapters have 48px above and below; the Contact close has 80px vertical padding and runs full-bleed outside the container.
- **Measure:** prose is capped at 68ch.
- **Masthead:** sticky, 56px tall; `scroll-padding-top` is 72px so anchored sections clear it.

### Slide canvas
- **Page:** every slide is a fixed 1920×1080 canvas, scaled as a whole to fit the stage between the deck chrome and letterboxed on the ground with a 1px hairline frame. It never reflows: a phone shows the same page, smaller.
- **Grid:** 12 columns with a 24px gutter inside 120px side margins; 96px top and 56px bottom padding. The folio sits at the foot of that padding.
- **Splits:** two-column slides split 6/6 with a 64px gap between columns; the contents page and the step list use 1/9/2 and 1/5/6 rows; Figure 1's stations use 3/9.
- **Title slide:** the type sits in the left 1200px within the same margins; the portrait plate fills the right 720px at full height and bleeds to the edge. It is the only image in the deck.
- **Chrome:** outside the canvas. A 2px progress rule (ink over a hairline track) and a 48px top bar (Portfolio link, "p. N / {deck total} · title", theme and fullscreen) above; a 56px bottom bar (previous, page dots, next) below. Both bars are separated from the stage by hairlines.

## Elevation & Depth

The system is flat. There are no shadows anywhere, including the mobile menu panel, which is separated by a 1px hairline border. Depth and structure come from a two-level rule hierarchy and from the field's solid colour. The deck follows the same hierarchy at projection scale: an ink rule tops each column, figure and list on a slide, and a hairline sits over every folio.

### Named Rules
**The Rule Hierarchy Rule.** A 1px ink rule opens a section or a figure table (Systems, Record, Skills, Education, each layer figure). A 1px grey hairline (`rule`) separates rows inside it (chapters, table rows, skill rows, layer rows). Never swap the two, and never add a shadow to separate content.

## Shapes

Corners are square (0px) on every rectangle: buttons, the field panels, the menu panel, the CV frame. The only round forms are inside Figure 1: the 10px station dots with 2px borders and the 16px travelling marker, both fully round (on the slide the dots grow to 16px). Borders are always 1px, except Figure 1's 2px rail and dot outlines.

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

### Slide Folio
The foot of every slide: a 1px hairline, then a 22px muted tabular line with the chapter at the left ("I · FinOps engine") and the page at the right ("p. 5 / 12"). Slides outside a chapter (contents or agenda, a coda such as "How I work" or "What I build with", close) carry the name instead; the title slide carries the talk and date. On a divider the rule turns on-field-muted and the left side carries the chapter's dates. The chapter and page are derived from the slide order, never typed.

### Chapter Divider
A whole slide filled with the ultramarine field: the chapter numeral at 220px top left, the chapter title (112px) and a 44px subtitle at the foot of the type area, then the folio. Three dividers per deck, one per chapter; with the Figure 1 slide they are the only field pages in the decks.

### Contents Page
A content slide ("Contents" in the technical deck, "Agenda" in About me; six or more rows tighten to 16px row padding) listing the chapters, the codas and the close under an ink rule, one hairline row each: muted numeral, 56px semibold title, and the page number on the right in tabular figures. Page numbers come from the slide order, never typed.

### Figure Slide Variants
- **Figure 1, slide:** the same ultramarine panel set inside the slide margins, showing the final frame only (no clock, no marker). Caption at 48px, stations at 32px on a 3/9 split with 16px dots, the landed amount right-aligned at 120px, the illustrative note at 22px.
- **Layer figure, slide:** the same table with a 22px caption and layer names, 28px nodes, and fixed 4/8 columns.

### About me Slides
- **Built-with caption:** a 22px muted line set above the folio rule ("Built with Go · React · …"). It is the only place a story slide names tools.
- **Toolkit rows:** under an ink rule, one hairline row per area: the area at 40px semibold in 3 columns, then the tools at 32px with a 22px muted gloss below in 9 columns.
- **Flow figure:** nine stages in a 9-column ordered list, each under an ink rule with a 22px muted number. Stages a person signs off are 28px semibold with a hairline-ruled 22px sign-off note; AI-drafted stages are 28px medium in muted. No arrows, dots or field: order comes from the numbers.
- **Points:** a ruled 32px list whose items may open with a semibold lead-in.

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
- **Do** build every slide on the 1920×1080 canvas with 120px margins and a folio, deriving page numbers from the slide order.
- **Do** keep slide type at 22px or larger, and running text at 32px or larger.

### Don't:
- **Don't** use ultramarine for links, buttons, icons, borders or highlights on the ground.
- **Don't** add shadows, rounded rectangles, cards or gradients; depth is rules and fields only.
- **Don't** stack a small label above a heading; captions and metadata run in on one line.
- **Don't** add a second typeface or a weight above 600.
- **Don't** animate anything other than Figure 1, and never animate it when reduced motion is requested.
- **Don't** fill a deck slide with ultramarine unless it is a chapter divider or the Figure 1 slide.
- **Don't** type a page number into a slide or the contents page; derive it.
