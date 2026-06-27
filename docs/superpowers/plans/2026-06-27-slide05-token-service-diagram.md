# Slide 05 Token-Service Diagram Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign slide 05 ("Request flow, end to end") from a flat 7-box row into a two-tier architecture diagram — a muted context spine (Mobile→Kong→istio→Microservices) plus a blue-hero Token Service integration branch showing the issue/validate auth flow.

**Architecture:** The slide is one entry in the `DECK_SLIDES` array in `src/data/present-slides.ts` — a `{label, style, html}` object whose `html` is a raw HTML string injected via `dangerouslySetInnerHTML` in `Present.tsx`. We replace the inner node-row HTML of the slide-05 entry. No React/component changes. Styling uses the deck's existing CSS custom properties (`--blue`, `--muted`, `--line`, `--card`, `--glow`, `--fg`, fonts). Icons reuse existing files in `public/present-icons/` (real logos as full-color `<img>`, concept marks as masked `<span>`), per the convention already applied to slides 05/06/10/13.

**Tech Stack:** React 19 + TypeScript + Vite. Verification via `npm run build` (TS strict) and headless Google Chrome screenshots (no unit-test harness exists for the deck; the screenshot is the test).

## Global Constraints

- Only `src/data/present-slides.ts` changes (the `"API Gateway — High-level"` entry, slide index 5 / array index 4). No change to `Present.tsx` or other slides.
- No new npm dependencies.
- Inside the `html` JSON string, double-quotes are escaped `\"` and `url("…")` is written `url(&quot;…&quot;)` — match the existing file exactly.
- Icon path base is `/Portfolio/present-icons/` (Vite base path).
- Must fit the fixed **1920×1080** canvas without overflow.
- Real brand logos render as full-color `<img>` (`object-fit:contain`); conceptual marks render as masked `<span>` (`background:var(--…); -webkit-mask + mask`) so they recolor with the theme.
- Kong stays a single context node — do NOT expand its internals.

## Icon inventory (all already exist in `public/present-icons/`)

- Real logos (full-color `<img>`): `kong.svg`, `istio.svg`, `3c0682cf-807f-4a0c-bf43-fde9486baa70.svg` (Redis), `eafbca31-25fe-4291-ab89-ccf08c658bef.svg` (PostgreSQL), `a00c02a6-83c9-4045-a5fd-dedebc6a6206.svg` (Go — Token Service).
- Concept glyphs (masked `<span>`): `glyph-phone.svg` (Mobile), `glyph-loadbalancer.svg` (F5), `glyph-shield.svg` (WAF + CA Layer7), `glyph-grid.svg` (Microservices).

No new icon files are needed.

## File Structure

- **Modify:** `src/data/present-slides.ts` — the single `html` field of the slide whose `"label": "API Gateway — High-level"`. The slide root `style` (grid background, padding, flex column) is unchanged; only the inner `<div style="flex:1; display:flex; …">` node row (the part after the `<h2>` + subtitle) is replaced with the two-tier markup.

---

### Task 1: Replace slide-05 node row with the two-tier diagram

**Files:**
- Modify: `src/data/present-slides.ts` (the `"API Gateway — High-level"` entry's `html` field — the flex node-row block; keep the corner `+` marks, the header row, the `<h2>Request flow, end to end</h2>`, and the subtitle line untouched).

**Interfaces:**
- Consumes: deck CSS vars (`--bg --card --card-2 --line --fg --muted --blue --glow`) and fonts already defined in `Present.tsx`'s `DECK_CSS`. The `cssTextToObject` parser only applies to the slide `style`, not the inner `html` (which is raw HTML), so inner styles can use any valid inline CSS.
- Produces: nothing other slides consume. Self-contained.

- [ ] **Step 1: Locate the slide-05 entry and its node-row block**

Run: `grep -n '"label": "API Gateway — High-level"' src/data/present-slides.ts`
Then read that entry's `html` string. The block to replace begins at `<div style=\"flex:1; display:flex; align-items:center; gap:0;\">` (the node row) and ends at its matching closing `</div>` immediately before the final `\n` of the html string. Everything before it (corner marks, header, `<h2>`, subtitle `mobile → F5 · WAF · CA Layer7 → Kong → istio mesh → microservices`) stays.

- [ ] **Step 2: Replace the node-row block with the two-tier markup**

Replace the entire `<div style=\"flex:1; display:flex; align-items:center; gap:0;\">…</div>` node-row block with the following (one continuous string in the file — newlines shown here for readability are the literal `\n` already used throughout this html field; keep the `\"` and `&quot;` escaping exactly):

```html
  <div style=\"flex:1; display:flex; flex-direction:column; justify-content:center; gap:54px; min-height:0;\">

    <!-- ===== TOP TIER: context spine (muted, recessive) ===== -->
    <div style=\"display:flex; align-items:stretch; gap:0;\">

      <!-- CLIENT -->
      <div style=\"flex:1; display:flex; flex-direction:column; gap:8px;\">
        <div style=\"font-family:'Space Mono',monospace; font-size:15px; letter-spacing:.14em; color:var(--muted); text-transform:uppercase;\">Client</div>
        <div style=\"flex:1; border:1px solid var(--line); background:var(--card); padding:16px 10px; text-align:center;\">
          <span style=\"display:block;width:34px;height:34px;margin:0 auto 10px;background:var(--muted);-webkit-mask:url(&quot;/Portfolio/present-icons/glyph-phone.svg&quot;) center/contain no-repeat;mask:url(&quot;/Portfolio/present-icons/glyph-phone.svg&quot;) center/contain no-repeat;\"></span>
          <div style=\"font-family:'Space Mono',monospace; font-size:20px; font-weight:700; color:var(--muted);\">Mobile</div>
        </div>
      </div>

      <div style=\"flex:none; width:40px; align-self:center; text-align:center; color:var(--muted); font-size:26px;\" aria-hidden=\"true\">→</div>

      <!-- EDGE · SECURITY (grouped zone) -->
      <div style=\"flex:2.2; display:flex; flex-direction:column; gap:8px;\">
        <div style=\"font-family:'Space Mono',monospace; font-size:15px; letter-spacing:.14em; color:var(--muted); text-transform:uppercase;\">Edge · Security</div>
        <div style=\"flex:1; border:1px solid var(--line); background:rgba(150,156,203,.04); padding:12px; display:flex; align-items:stretch; gap:12px;\">
          <div style=\"flex:1; text-align:center;\"><span style=\"display:block;width:30px;height:30px;margin:0 auto 8px;background:var(--muted);-webkit-mask:url(&quot;/Portfolio/present-icons/glyph-loadbalancer.svg&quot;) center/contain no-repeat;mask:url(&quot;/Portfolio/present-icons/glyph-loadbalancer.svg&quot;) center/contain no-repeat;\"></span><div style=\"font-family:'Space Mono',monospace; font-size:18px; font-weight:700; color:var(--muted);\">F5</div></div>
          <div style=\"flex:none; align-self:center; color:var(--muted); font-size:20px;\" aria-hidden=\"true\">→</div>
          <div style=\"flex:1; text-align:center;\"><span style=\"display:block;width:30px;height:30px;margin:0 auto 8px;background:var(--muted);-webkit-mask:url(&quot;/Portfolio/present-icons/glyph-shield.svg&quot;) center/contain no-repeat;mask:url(&quot;/Portfolio/present-icons/glyph-shield.svg&quot;) center/contain no-repeat;\"></span><div style=\"font-family:'Space Mono',monospace; font-size:18px; font-weight:700; color:var(--muted);\">WAF</div></div>
          <div style=\"flex:none; align-self:center; color:var(--muted); font-size:20px;\" aria-hidden=\"true\">→</div>
          <div style=\"flex:1; text-align:center; border:1px dashed var(--muted); padding:6px 4px;\"><span style=\"display:block;width:30px;height:30px;margin:0 auto 8px;background:var(--muted);-webkit-mask:url(&quot;/Portfolio/present-icons/glyph-shield.svg&quot;) center/contain no-repeat;mask:url(&quot;/Portfolio/present-icons/glyph-shield.svg&quot;) center/contain no-repeat;\"></span><div style=\"font-family:'Space Mono',monospace; font-size:16px; font-weight:700; color:var(--muted); line-height:1.1;\">CA Layer7</div><div style=\"font-family:'Space Mono',monospace; font-size:13px; color:var(--muted);\">legacy</div></div>
        </div>
      </div>

      <div style=\"flex:none; width:54px; align-self:center; display:flex; flex-direction:column; align-items:center; color:var(--muted);\"><div style=\"font-family:'Space Mono',monospace; font-size:13px; margin-bottom:2px;\">NLB/ALB</div><div style=\"font-size:26px;\" aria-hidden=\"true\">→</div></div>

      <!-- GATEWAY (Kong — context, but the branch point) -->
      <div style=\"flex:1.1; display:flex; flex-direction:column; gap:8px;\">
        <div style=\"font-family:'Space Mono',monospace; font-size:15px; letter-spacing:.14em; color:var(--muted); text-transform:uppercase;\">Gateway</div>
        <div id=\"node-kong\" style=\"flex:1; border:1px solid var(--line); background:var(--card); padding:16px 10px; text-align:center;\">
          <img src=\"/Portfolio/present-icons/kong.svg\" alt=\"\" style=\"display:block;width:36px;height:36px;margin:0 auto 10px;object-fit:contain;\">
          <div style=\"font-family:'Space Mono',monospace; font-size:21px; font-weight:700; color:var(--fg);\">Kong</div>
          <div style=\"font-family:'Space Mono',monospace; font-size:14px; color:var(--muted); margin-top:4px;\">validate plugin</div>
        </div>
      </div>

      <div style=\"flex:none; width:54px; align-self:center; display:flex; flex-direction:column; align-items:center; color:var(--muted);\"><div style=\"font-family:'Space Mono',monospace; font-size:13px; margin-bottom:2px;\">mesh</div><div style=\"font-size:26px;\" aria-hidden=\"true\">→</div></div>

      <!-- MESH -->
      <div style=\"flex:1; display:flex; flex-direction:column; gap:8px;\">
        <div style=\"font-family:'Space Mono',monospace; font-size:15px; letter-spacing:.14em; color:var(--muted); text-transform:uppercase;\">Mesh</div>
        <div style=\"flex:1; border:1px solid var(--line); background:var(--card); padding:16px 10px; text-align:center;\">
          <img src=\"/Portfolio/present-icons/istio.svg\" alt=\"\" style=\"display:block;width:34px;height:34px;margin:0 auto 10px;object-fit:contain;\">
          <div style=\"font-family:'Space Mono',monospace; font-size:20px; font-weight:700; color:var(--muted);\">istio</div>
        </div>
      </div>

      <div style=\"flex:none; width:40px; align-self:center; text-align:center; color:var(--muted); font-size:26px;\" aria-hidden=\"true\">→</div>

      <!-- SERVICES -->
      <div style=\"flex:1.1; display:flex; flex-direction:column; gap:8px;\">
        <div style=\"font-family:'Space Mono',monospace; font-size:15px; letter-spacing:.14em; color:var(--muted); text-transform:uppercase;\">Services</div>
        <div style=\"flex:1; border:1px solid var(--line); background:var(--card); padding:16px 10px; text-align:center;\">
          <span style=\"display:block;width:32px;height:32px;margin:0 auto 10px;background:var(--muted);-webkit-mask:url(&quot;/Portfolio/present-icons/glyph-grid.svg&quot;) center/contain no-repeat;mask:url(&quot;/Portfolio/present-icons/glyph-grid.svg&quot;) center/contain no-repeat;\"></span>
          <div style=\"font-family:'Space Mono',monospace; font-size:19px; font-weight:700; color:var(--muted);\">Microservices</div>
          <div style=\"font-family:'Space Mono',monospace; font-size:13px; color:var(--muted); margin-top:4px;\">Profile · Tile · Login</div>
        </div>
      </div>

    </div>

    <!-- ===== BOTTOM TIER: the integration I own (blue hero) ===== -->
    <div style=\"display:flex; align-items:stretch; gap:28px; padding-left:6%;\">

      <!-- MY SERVICE -->
      <div style=\"flex:1.1; display:flex; flex-direction:column; gap:8px;\">
        <div style=\"font-family:'Space Mono',monospace; font-size:15px; letter-spacing:.14em; color:var(--blue); text-transform:uppercase;\">My Service</div>
        <div style=\"flex:1; border:1.5px solid var(--blue); background:var(--card); padding:18px 16px; box-shadow:0 0 24px var(--glow); display:flex; align-items:center; gap:14px;\">
          <img src=\"/Portfolio/present-icons/a00c02a6-83c9-4045-a5fd-dedebc6a6206.svg\" alt=\"\" style=\"flex:none;width:40px;height:40px;object-fit:contain;\">
          <div>
            <div style=\"font-family:'Space Mono',monospace; font-size:21px; font-weight:700; color:var(--fg);\">API Gateway MS</div>
            <div style=\"font-family:'Space Mono',monospace; font-size:15px; color:var(--blue); margin-top:4px;\">Go token service · ← my service</div>
          </div>
        </div>
      </div>

      <!-- flow ① label + ② connector toward store -->
      <div style=\"flex:none; width:120px; align-self:center; display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--blue);\">
        <div style=\"font-family:'Space Mono',monospace; font-size:14px; color:var(--blue); text-align:center; line-height:1.3;\"><span style=\"font-weight:700;\">②</span> upsert<br>Redis + PG</div>
        <div style=\"font-size:26px;\" aria-hidden=\"true\">→</div>
      </div>

      <!-- AUTH STORE -->
      <div style=\"flex:1.2; display:flex; flex-direction:column; gap:8px;\">
        <div style=\"font-family:'Space Mono',monospace; font-size:15px; letter-spacing:.14em; color:var(--blue); text-transform:uppercase;\">Auth Store</div>
        <div style=\"flex:1; border:1.5px solid var(--blue); background:var(--card); padding:14px 18px; box-shadow:0 0 24px var(--glow); display:flex; flex-direction:column; gap:10px;\">
          <div style=\"display:flex; align-items:center; gap:24px;\">
            <div style=\"display:flex; align-items:center; gap:10px;\"><img src=\"/Portfolio/present-icons/3c0682cf-807f-4a0c-bf43-fde9486baa70.svg\" alt=\"\" style=\"flex:none;width:28px;height:28px;object-fit:contain;\"><span style=\"font-family:'Space Mono',monospace; font-size:19px; font-weight:700; color:var(--fg);\">Redis</span></div>
            <div style=\"display:flex; align-items:center; gap:10px;\"><img src=\"/Portfolio/present-icons/eafbca31-25fe-4291-ab89-ccf08c658bef.svg\" alt=\"\" style=\"flex:none;width:28px;height:28px;object-fit:contain;\"><span style=\"font-family:'Space Mono',monospace; font-size:19px; font-weight:700; color:var(--fg);\">PostgreSQL</span></div>
          </div>
          <div style=\"font-family:'Space Mono',monospace; font-size:14px; color:var(--muted); line-height:1.4;\">issue → upsert both · <span style=\"color:var(--blue);\">validate → Redis only</span></div>
        </div>
      </div>

    </div>

    <!-- integration legend: the two Kong↔my-service flows -->
    <div style=\"display:flex; gap:34px; font-family:'Space Mono',monospace; font-size:15px; color:var(--muted); padding-left:6%;\">
      <span><span style=\"color:var(--blue); font-weight:700;\">①</span> Kong → <span style=\"color:var(--fg);\">no token → issue</span> → API Gateway MS</span>
      <span><span style=\"color:var(--blue); font-weight:700;\">③</span> Kong <span style=\"color:var(--blue);\">validate · lookup Redis only</span> (token svc bypassed)</span>
    </div>

  </div>
```

- [ ] **Step 3: Build to verify TS + HTML string parse**

Run: `npm run build 2>&1 | grep -E "error|Error|✓ built"`
Expected: `✓ built in …` with no `error`. (A broken escape in the html string surfaces as a TS parse error here.)

- [ ] **Step 4: Screenshot slide 05 in dark theme**

Run:
```bash
cd /Users/xanta999flyhigh/Learning-space/Portfolio
(npm run preview > /tmp/pv.log 2>&1 &) ; sleep 3
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --screenshot=/tmp/s5-dark.png --window-size=1920,1080 --hide-scrollbars "http://localhost:4173/Portfolio/present?slide=5" 2>/dev/null ; sleep 1
```
Then view `/tmp/s5-dark.png`.
Expected: Top tier (Mobile→…→Microservices) reads muted/recessive with EDGE·SECURITY grouped in a bounded box; bottom tier (API Gateway MS + Redis·PostgreSQL) reads blue with glow; ① ② ③ labels legible; nothing overflows the frame.

- [ ] **Step 5: Screenshot slide 05 in light theme**

The deck reads theme from `localStorage`. Capture light theme by setting it before load:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --screenshot=/tmp/s5-light.png --window-size=1920,1080 --hide-scrollbars "http://localhost:4173/Portfolio/present?slide=5" --user-data-dir=/tmp/cr-light --run-all-compositor-stages-before-draw 2>/dev/null ; sleep 1
```
If the headless default (dark) is captured instead, alternatively toggle in the running app and re-shoot; the key check is: masked glyphs (phone/shield/grid/loadbalancer) recolor with the theme, and real logos (Kong/istio/Redis/PostgreSQL/Go) stay full-color. View `/tmp/s5-light.png`.
Expected: muted spine + blue hero both legible on the light `#ECE9DF` background; no contrast failures.

- [ ] **Step 6: Stop preview server and clean temp files**

Run:
```bash
pkill -f "vite preview" 2>/dev/null; pkill -f "npm run preview" 2>/dev/null
rm -f /tmp/s5-dark.png /tmp/s5-light.png /tmp/pv.log; rm -rf /tmp/cr-light
```

- [ ] **Step 7: Commit**

```bash
cd /Users/xanta999flyhigh/Learning-space/Portfolio
git add src/data/present-slides.ts
git commit -m "feat: redesign slide 05 as token-service integration diagram

Two-tier layout: muted context spine (Mobile→Kong→istio→Microservices)
plus blue-hero Token Service branch showing issue (upsert Redis+PG) vs
validate (Kong reads Redis only, token svc bypassed).

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Two-tier layout (muted spine + blue hero) → Task 1 Step 2 ✓
- Corrected topology (issue upserts Redis+PG; validate reads Redis only; token svc bypassed) → encoded in the Auth Store caption + ① ③ legend ✓
- Kong as context black box (not expanded) → single Kong node, "validate plugin" subtitle only ✓
- Zone group boxes with mono-uppercase labels (CLIENT/EDGE·SECURITY/GATEWAY/MESH/SERVICES/MY SERVICE/AUTH STORE) → all present ✓
- Three labeled flows ① ② ③ → ② on the store connector, ① ③ in the legend ✓
- Icons: real logos as `<img>`, concept glyphs masked; Go logo for Token Service → ✓
- Fits 1920×1080, only slide 05, no deps, no Present.tsx change → Global Constraints + Task 1 scope ✓
- Verify build + both-theme screenshots → Steps 3–5 ✓

**Placeholder scan:** No TBD/TODO/"handle edge cases"; full HTML block provided verbatim. ✓

**Type consistency:** No TS types introduced; the only structural contract is the `{label, style, html}` shape, unchanged. Icon filenames match the inventory section and the files confirmed present this session. ✓

**Note on light-theme screenshot (Step 5):** headless Chrome may default to the deck's dark theme since theme comes from `localStorage` (defaults to dark). If light isn't captured cleanly, the fallback (toggle in-app, re-shoot) is stated; light-theme correctness is a should-verify, not a build blocker.
