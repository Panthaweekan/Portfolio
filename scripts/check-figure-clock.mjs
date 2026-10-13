// Figure 1 clock check: the timeline that drives the marker and the reveals.
// Run: npm run check:figure
import { execFileSync } from 'child_process';
import { strict as assert } from 'assert';

execFileSync('node_modules/.bin/esbuild', [
  'src/lib/figureClock.ts', '--format=esm', '--outfile=/tmp/figure-clock-check.mjs',
], { stdio: 'inherit' });

const { frameAt, FINAL_FRAME, LOOP_MS, SEGMENT_MS, STATION_COUNT } =
  await import('/tmp/figure-clock-check.mjs?' + Date.now());

assert.equal(STATION_COUNT, 5);
assert.equal(LOOP_MS, 8000);

// Start: on segment 0, the first station shown, the second one marked next.
assert.deepEqual(frameAt(0), { segment: 0, fraction: 0, active: 1, revealed: 1 });

// Ease in and out of every station, so the call reads as one continuous move:
// slow leaving, half-way at half time, slow arriving.
const at = (share) => frameAt(SEGMENT_MS * share).fraction;
assert.equal(frameAt(SEGMENT_MS / 2).segment, 0);
assert.ok(at(0.25) < 0.25, `leaves softly (fraction at 25% was ${at(0.25)})`);
assert.ok(Math.abs(at(0.5) - 0.5) < 1e-9, `half-way at half time (was ${at(0.5)})`);
assert.ok(at(0.75) > 0.75, `arrives softly (fraction at 75% was ${at(0.75)})`);

// Arrival at station 1 reveals it and marks station 2.
assert.deepEqual(frameAt(SEGMENT_MS), { segment: 1, fraction: 0, active: 2, revealed: 2 });

// Hold: everything shown until the loop restarts.
assert.deepEqual(frameAt(4 * SEGMENT_MS), FINAL_FRAME);
assert.deepEqual(frameAt(LOOP_MS - 1), FINAL_FRAME);
assert.deepEqual(FINAL_FRAME, { segment: 3, fraction: 1, active: 4, revealed: 5 });

// Loop and negative time both wrap.
assert.deepEqual(frameAt(LOOP_MS), frameAt(0));
assert.deepEqual(frameAt(-1), FINAL_FRAME);

// The marker never moves backwards within one loop.
let previous = -1;
for (let t = 0; t < 4 * SEGMENT_MS; t += 50) {
  const f = frameAt(t);
  const position = f.segment + f.fraction;
  assert.ok(position >= previous, `marker moved backwards at ${t}ms`);
  previous = position;
}

console.log('✓ figure clock OK');
