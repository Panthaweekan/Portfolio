// Deck outline check: slide order, chapters and page numbers.
// Contents and folios derive from this outline, so this is what keeps them true.
// Run: npm run check:deck
import { execFileSync } from 'child_process';
import { strict as assert } from 'assert';

execFileSync('node_modules/.bin/esbuild', [
  'src/components/present/outline.ts', '--format=esm', '--outfile=/tmp/deck-outline-check.mjs',
], { stdio: 'inherit' });

const { OUTLINE, TOTAL_PAGES, pageOf, contents, chapterOf } =
  await import('/tmp/deck-outline-check.mjs?' + Date.now());

assert.equal(TOTAL_PAGES, 12, 'a 10–15 minute talk: 12 slides');
assert.equal(new Set(OUTLINE.map((s) => s.id)).size, OUTLINE.length, 'slide ids are unique');
assert.equal(OUTLINE[0].kind, 'title');
assert.equal(OUTLINE[1].kind, 'contents');
assert.equal(OUTLINE.at(-1).kind, 'close');

assert.deepEqual(contents(), [
  { numeral: 'I', title: 'FinOps engine', page: 3 },
  { numeral: 'II', title: 'API gateway', page: 7 },
  { numeral: 'III', title: 'Earlier systems', page: 9 },
  { numeral: '', title: 'Close', page: 12 },
]);

// Every content slide belongs to the chapter of the divider before it.
for (const s of OUTLINE.filter((x) => x.kind === 'content')) {
  assert.ok(chapterOf(s.id), `${s.id} has a chapter`);
}
assert.deepEqual(chapterOf('finops-figure'), { numeral: 'I', title: 'FinOps engine' });
assert.deepEqual(chapterOf('how-i-work'), { numeral: 'III', title: 'Earlier systems' });
assert.equal(chapterOf('title'), null);
// The contents page lists Close on its own, outside chapter III.
assert.equal(chapterOf('close'), null);

assert.equal(pageOf('close'), 12);
assert.throws(() => pageOf('nope'), /unknown slide/);

console.log('✓ deck outline OK');
