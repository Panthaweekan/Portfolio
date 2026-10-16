// Deck outline check: slide order, chapters and page numbers for both decks.
// Contents and folios derive from these outlines, so this is what keeps them true.
// Run: npm run check:deck
import { execFileSync } from 'child_process';
import { strict as assert } from 'assert';

execFileSync('node_modules/.bin/esbuild', [
  'src/components/present/outline.ts', '--format=esm', '--outfile=/tmp/deck-outline-check.mjs',
], { stdio: 'inherit' });

const { DECKS, isDeckId, pageOf, totalOf, contents, chapterOf } =
  await import('/tmp/deck-outline-check.mjs?' + Date.now());

const all = [...DECKS.recruiter, ...DECKS.technical];
assert.equal(new Set(all.map((s) => s.id)).size, all.length, 'slide ids are unique across both decks');
assert.deepEqual(Object.keys(DECKS).sort(), ['recruiter', 'technical']);
assert.ok(isDeckId('recruiter') && isDeckId('technical'));
assert.ok(!isDeckId('foo') && !isDeckId('') && !isDeckId('toString'), 'only real deck names');

// ── Technical: the 12-slide Contents and Chapters talk, unchanged ──
const T = DECKS.technical;
assert.equal(T.length, 12, 'a 10–15 minute talk: 12 slides');
assert.equal(T[0].kind, 'title');
assert.equal(T[1].kind, 'contents');
assert.equal(T.at(-1).kind, 'close');

assert.deepEqual(contents('technical'), [
  { numeral: 'I', title: 'FinOps engine', page: 3 },
  { numeral: 'II', title: 'API gateway', page: 7 },
  { numeral: 'III', title: 'Earlier systems', page: 9 },
  { numeral: '', title: 'How I work', page: 11 },
  { numeral: '', title: 'Close', page: 12 },
]);

// Every content slide belongs to the chapter of the divider before it.
for (const s of T.filter((x) => x.kind === 'content')) {
  assert.ok(chapterOf(s.id), `${s.id} has a chapter`);
}
assert.deepEqual(chapterOf('finops-figure'), { numeral: 'I', title: 'FinOps engine' });
assert.deepEqual(chapterOf('earlier-two-up'), { numeral: 'III', title: 'Earlier systems' });
// How I work sums up every chapter, so it stands outside them, like Close.
assert.equal(T.find((s) => s.id === 'how-i-work').kind, 'coda');
assert.equal(chapterOf('how-i-work'), null);
assert.equal(chapterOf('title'), null);
// The contents page lists Close on its own, outside chapter III.
assert.equal(chapterOf('close'), null);

assert.equal(pageOf('close'), 12);
assert.equal(totalOf('close'), 12);
assert.throws(() => pageOf('nope'), /unknown slide/);
assert.throws(() => totalOf('nope'), /unknown slide/);

// ── Recruiter: 15 slides, told from now back to the start ──
const R = DECKS.recruiter;
assert.deepEqual(R.map((s) => s.id), [
  'about-title', 'about-agenda',
  'about-now', 'about-spec', 'about-flow', 'about-review',
  'about-before', 'about-start', 'about-users',
  'about-toolkit',
  'about-self', 'about-why', 'about-outside',
  'about-next', 'about-close',
]);
assert.equal(R[0].kind, 'title');
assert.equal(R[1].kind, 'contents');
assert.equal(R.at(-1).kind, 'close');

// The agenda lists chapters, codas and close, newest first.
assert.deepEqual(contents('recruiter'), [
  { numeral: 'I', title: 'Now · SCB TechX', page: 3 },
  { numeral: 'II', title: 'Before · Chiang Mai University', page: 7 },
  { numeral: '', title: 'What I build with', page: 10 },
  { numeral: 'III', title: 'Who I am', page: 11 },
  { numeral: '', title: "What I'm looking for", page: 14 },
  { numeral: '', title: 'Close', page: 15 },
]);

const NOW = { numeral: 'I', title: 'Now · SCB TechX' };
const BEFORE = { numeral: 'II', title: 'Before · Chiang Mai University' };
const SELF = { numeral: 'III', title: 'Who I am' };
for (const id of ['about-spec', 'about-flow', 'about-review']) assert.deepEqual(chapterOf(id), NOW, id);
for (const id of ['about-start', 'about-users']) assert.deepEqual(chapterOf(id), BEFORE, id);
for (const id of ['about-why', 'about-outside']) assert.deepEqual(chapterOf(id), SELF, id);
// The toolkit sums up both jobs and what's next looks ahead, so both stand outside the chapters.
for (const id of ['about-title', 'about-agenda', 'about-toolkit', 'about-next', 'about-close']) {
  assert.equal(chapterOf(id), null, `${id} sits outside any chapter`);
}

// Each deck counts its own pages.
assert.equal(pageOf('about-close'), 15);
assert.equal(totalOf('about-flow'), 15);
assert.equal(totalOf('finops-figure'), 12);

console.log('✓ deck outlines OK');
