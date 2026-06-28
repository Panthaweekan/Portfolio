// Regenerate deck.golden.json from the CURRENT DECK_SLIDES. Run this ONLY when a
// slide change is intentional — the resulting deck.golden.json diff is the review
// brief showing exactly what rendered output moved. Run: node scripts/dump-golden.mjs
import { execFileSync } from 'child_process';
import { writeFileSync } from 'fs';

execFileSync('node_modules/.bin/esbuild', [
  'src/data/present-slides.ts', '--bundle', '--format=esm', '--outfile=/tmp/deck-dump.mjs',
], { stdio: 'inherit' });

const { DECK_SLIDES } = await import('/tmp/deck-dump.mjs?' + Date.now());
writeFileSync('./src/data/deck.golden.json', JSON.stringify(DECK_SLIDES, null, 2));
console.log(`wrote deck.golden.json — ${DECK_SLIDES.length} slides`);
