// Golden equivalence check: assert the built DECK_SLIDES exactly reproduces the
// pre-refactor snapshot in deck.golden.json. Guards every slide edit.
// When a slide is *meant* to change, regenerate the golden deliberately:
//   node scripts/dump-golden.mjs   (then review the deck.golden.json diff).
// Run: node scripts/check-deck.mjs
import { execFileSync } from 'child_process';
import { readFileSync } from 'fs';
import { strict as assert } from 'assert';

// strip TS types via esbuild, import the result
execFileSync('node_modules/.bin/esbuild', [
  'src/data/present-slides.ts', '--bundle', '--format=esm', '--outfile=/tmp/deck-check.mjs',
], { stdio: 'inherit' });

const { DECK_SLIDES } = await import('/tmp/deck-check.mjs?' + Date.now());
const golden = JSON.parse(readFileSync('./src/data/deck.golden.json', 'utf8'));

try {
  assert.deepEqual(DECK_SLIDES, golden);
  console.log(`✓ deck equivalence OK — ${DECK_SLIDES.length} slides match golden`);
} catch (e) {
  console.error('✗ DECK_SLIDES differs from golden:\n', e.message);
  process.exit(1);
}
