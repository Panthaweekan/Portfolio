// One-shot generator: rebuild present-slides.ts from the golden snapshot using
// the chrome builders. Splits each slide into corners + (top bar) + body, then
// emits a builder call. Bodies are copied verbatim from golden — no retyping.
// Run: node scripts/gen-slides.mjs   (then verify with the equivalence check)
import g from '../src/data/deck.golden.json' with { type: 'json' };
import { writeFileSync } from 'fs';

const CORNER_END = 'aria-hidden="true">+</span>';
const q = (s) => JSON.stringify(s); // safe JS string literal

// strip the 4 corner spans (and the trailing "\n  ") off the front of html
function stripCorners(html) {
  const last = html.lastIndexOf(CORNER_END);
  return html.slice(last + CORNER_END.length).replace(/^\n  /, '');
}
// split off a leading top-bar div, returning { bar, body } or { bar:null, body }
function splitBar(rest) {
  if (!rest.startsWith('<div style="display:flex; justify-content:space-between;')) {
    return { bar: null, body: rest };
  }
  const end = rest.indexOf('</div>') + '</div>'.length;
  return { bar: rest.slice(0, end), body: rest.slice(end) };
}
// from a content top-bar, pull left content, right content, color
function parseBar(bar) {
  const color = bar.match(/color:([^;"]*)/)[1];
  const spans = [...bar.matchAll(/<span>([\s\S]*?)<\/span>\n/g)].map((m) => m[1]);
  // left span may itself contain the §-marker span; right span often empty
  const left = spans[0] ?? '';
  const right = spans[1] ?? '';
  return { left, right, color };
}

const calls = g.map((s, i) => {
  const blue = s.style.startsWith('background:#0000F2');
  const glow = s.style.includes('radial-gradient');
  const rest = stripCorners(s.html);
  const { bar, body } = splitBar(rest);

  if (blue && !bar) {
    return `  sectionSlide(${q(s.label)}, ${q(body)}),`;
  }
  if (blue && bar) {
    const { left } = parseBar(bar);
    return `  blueSlide(${q(s.label)}, ${q(left)}, ${q(body)}),`;
  }
  // content slide
  const { left, right, color } = parseBar(bar);
  // is the left a plain §-marker?  `<span style="color:var(--blue);">§</span> X`
  const sec = left.match(/^<span style="color:var\(--blue\);">§<\/span> ([\s\S]*)$/);
  const fields = [`label: ${q(s.label)}`];
  if (glow) fields.push(`bg: 'gridGlow'`);
  if (sec && !right && color === 'var(--muted)') {
    fields.push(`bar: ${q(sec[1])}`);
  } else {
    fields.push(`barLeft: ${q(left)}`);
    if (right) fields.push(`barRight: ${q(right)}`);
    if (color !== 'var(--muted)') fields.push(`barColor: ${q(color)}`);
  }
  fields.push(`body: ${q(body)}`);
  if (s.gallery) fields.push(`gallery: ${JSON.stringify(s.gallery)}`);
  return `  contentSlide({\n    ${fields.join(',\n    ')},\n  }),`;
});

const out = `// Present deck slides — DATA ONLY. Chrome (corner marks, top bar, background)
// is built by the helpers in present-chrome.ts, not repeated here.
// 16 fixed 1920x1080 slides. To edit a slide, edit its builder call below.
// After any change, run \`node scripts/check-deck.mjs\` (golden equivalence).

import { contentSlide, sectionSlide, blueSlide } from './present-chrome';

export interface GalleryItem {
  /** path under /public, spaces allowed — encoded at render time */
  src: string;
  cap: string;
  /** featured on the slide as a large readable shot; non-heroes live only in the lightbox */
  hero?: boolean;
}

export interface DeckSlide {
  label: string;
  /** inline style for the slide root (the 1920x1080 section) */
  style: string;
  /** inner HTML of the slide, rendered as-authored */
  html: string;
  /** when present, Present.tsx renders a clickable thumbnail grid + lightbox
   *  below the html chrome (used for the Inventory feature walkthrough). */
  gallery?: GalleryItem[];
}

export const DECK_SLIDES: DeckSlide[] = [
${calls.join('\n')}
];
`;

writeFileSync('./src/data/present-slides.ts', out);
console.log('wrote present-slides.ts:', g.length, 'slides');
