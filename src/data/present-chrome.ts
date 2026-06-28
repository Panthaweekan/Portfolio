// Chrome builders for the Present deck — the per-slide boilerplate (corner marks,
// top bar, background recipe) factored out so slide data carries only its unique
// body. Output is byte-identical to the old hand-repeated chrome; the golden
// equivalence check (deck.golden.json) guards that.
//
// Edit a slide = edit its builder call in present-slides.ts. Chrome lives here.

import type { DeckSlide, GalleryItem } from './present-slides';

// ---- corner marks (the four absolute `+`) -------------------------------------
// Two color variants: `dark` on grid slides, `onBlue` on the blue section dividers.
const CORNER_COLOR = {
  dark: 'var(--mark)',
  onBlue: 'rgba(255,255,255,.65)',
} as const;
type CornerVariant = keyof typeof CORNER_COLOR;

function corners(variant: CornerVariant): string {
  const c = CORNER_COLOR[variant];
  const mark = (pos: string) =>
    `\n  <span style="position:absolute;${pos};color:${c};font-family:'Space Mono',monospace;font-size:24px;line-height:1;" aria-hidden="true">+</span>`;
  return (
    mark('top:28px;left:28px') +
    mark('top:28px;right:28px') +
    mark('bottom:28px;left:28px') +
    mark('bottom:28px;right:28px') +
    '\n  '
  );
}

// ---- top bar (mono strip across the top: `§ LABEL`, `$ whoami … PRESENT`, …) ---
// Same flex wrapper everywhere; only the color and the two span contents change.
function topBar(left: string, right = '', color = 'var(--muted)'): string {
  return (
    `<div style="display:flex; justify-content:space-between; font-family:'Space Mono',monospace; font-size:var(--t-label); letter-spacing:.12em; text-transform:uppercase; color:${color};">\n` +
    `    <span>${left}</span>\n` +
    `    <span>${right}</span>\n` +
    `  </div>`
  );
}

/** `§ LABEL` left content for a content slide's top bar. */
function sectionMark(label: string): string {
  return `<span style="color:var(--blue);">§</span> ${label}`;
}

// ---- background recipes (the slide-root `style` string) ------------------------
const FONT = "color:var(--fg); font-family:'Space Grotesk',sans-serif; padding:var(--pad-y) var(--pad-x); display:flex; flex-direction:column;";
const GRID = 'background-image:linear-gradient(var(--grid) 1px,transparent 1px), linear-gradient(90deg,var(--grid) 1px,transparent 1px); background-size:60px 60px;';
const GRID_GLOW = 'background-image:radial-gradient(ellipse 60% 70% at 26% 46%, var(--glow), transparent 62%), linear-gradient(var(--grid) 1px,transparent 1px), linear-gradient(90deg,var(--grid) 1px,transparent 1px); background-size:auto, 60px 60px, 60px 60px;';

const BG = {
  grid: `background:var(--bg); ${FONT} ${GRID}`,
  gridGlow: `background:var(--bg); ${FONT} ${GRID_GLOW}`,
  // section dividers: solid blue, centered
  sectionBlue: `background:#0000F2; color:#fff; font-family:'Space Grotesk',sans-serif; padding:var(--pad-y) var(--pad-x); display:flex; flex-direction:column; justify-content:center;`,
  // contact: solid blue, top-aligned (no justify-content)
  blue: `background:#0000F2; color:#fff; font-family:'Space Grotesk',sans-serif; padding:var(--pad-y) var(--pad-x); display:flex; flex-direction:column;`,
} as const;
type BgRecipe = keyof typeof BG;

// ---- slide composers ----------------------------------------------------------
// Each returns a DeckSlide. `body` is the slide's unique markup (everything after
// the chrome). Chrome builders emit siblings — never a wrapping div — so the
// authored markup stays a direct flex child (Present.tsx uses display:contents).

interface ContentSlide {
  label: string;
  /** top-bar left content; wrapped as `§ <bar>`. Pass `barLeft`/`barRight` for full control. */
  bar?: string;
  barLeft?: string;
  barRight?: string;
  bg?: Extract<BgRecipe, 'grid' | 'gridGlow'>;
  cornerVariant?: CornerVariant;
  barColor?: string;
  body: string;
  gallery?: GalleryItem[];
}

/** Grid slide with corner marks + a top bar, then the body. The common case. */
export function contentSlide({
  label, bar, barLeft, barRight = '', bg = 'grid',
  cornerVariant = 'dark', barColor, body, gallery,
}: ContentSlide): DeckSlide {
  const left = barLeft ?? (bar !== undefined ? sectionMark(bar) : '');
  const slide: DeckSlide = {
    label,
    style: BG[bg],
    html: corners(cornerVariant) + topBar(left, barRight, barColor) + body,
  };
  if (gallery) slide.gallery = gallery;
  return slide;
}

/** Blue section divider: corner marks (onBlue), no top bar, then the body. */
export function sectionSlide(label: string, body: string): DeckSlide {
  return {
    label,
    style: BG.sectionBlue,
    html: corners('onBlue') + body,
  };
}

/** Blue slide with a top bar (the contact slide). */
export function blueSlide(label: string, barLeft: string, body: string): DeckSlide {
  return {
    label,
    style: BG.blue,
    html: corners('onBlue') + topBar(barLeft, '', 'rgba(255,255,255,.8)') + body,
  };
}

/** Escape hatch: full manual control when a slide doesn't fit the recipes. */
export function bareSlide(slide: DeckSlide): DeckSlide {
  return slide;
}
