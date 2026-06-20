# Improvement Program — Smart Quiz (2026-06)

> **Ngày lập:** 2026-06-21
> **Baseline branch:** `v4-dev` (ahead `main` 5 commits — Wave 12 Kanji)
> **Verified state (chạy thực tế 2026-06-21):** unit `889 pass / 53 files` ✅ · `npm run build` OK trên Linux ⚠️ (cp Windows-fail) · **`npm run check` 149 ERRORS** ❌ · `npm audit` **20 vulns (9 high)** ❌ · E2E (audit 2026-05-13) 27/69 fail ❌ · 7 a11y warnings ⚠️
> **Phạm vi (user chốt):** chạy toàn bộ tuần tự — stabilize (Wave 0-2) → features (Wave 3-4).

---

## Bối cảnh

Repo trưởng thành (SvelteKit 2 + Svelte 5 + TS, GitHub Pages SPA) nhưng **đứng yên ~2.5 tháng** (feature cuối 2026-04-04). `FEATURE_ROADMAP.md` (2026-03-23) phần lớn đã hoàn thành (stats/review/settings/premium/SRS/achievements đã tồn tại) → **không còn là nguồn định hướng**. Chương trình này thay thế, dựa trên trạng thái verify thực tế + audit `codex-audit-2026-05-13.md` + bộ `COMPARISON_*` (vs Nhai Kanji).

### Vì sao quality gate "đỏ" mà CI vẫn xanh

`.github/workflows/deploy.yml`: PR gate **chỉ chạy `npx vitest run`**. `npm run check`, `npm run build`, E2E, `npm audit` KHÔNG nằm trong PR gate → lỗi tích lũy âm thầm. Đây là gốc rễ "release gate không đáng tin" mà audit nêu.

---

## Nguyên tắc thực thi

- Base branch: `v4-dev`. Feature branch prefix `feat/ fix/ docs/ test/ chore/`. PR → `v4-dev`. Release wave: `v4-dev` → `main` sau khi audit pass. **Không commit thẳng `main`.** (per `AGENTS.md`)
- Mỗi wave = 1+ PR nhỏ, testable. TDD khi đổi behavior.
- Verify bằng project scripts (`./scripts/test-local.sh`, `./scripts/check-ci.sh`) trước khi báo xong.
- Living docs cập nhật cùng PR: `CHANGELOG.md`, `FEATURE_ROADMAP.md`, `PR_PLAN_V4.md`, `AGENTS.md` khi đổi convention.

---

## Tổng quan 5 wave

| Wave | Tên | Mục tiêu | Ưu tiên | Chặn wave sau? |
|---|---|---|---|---|
| **0** | Quality Gate Stabilization | `npm run check` 149→0 · build cross-platform · audit harden · npm vulns | 🔴 P0 | ✅ nền cho tất cả |
| **1** | E2E Trustworthy Again | reconcile 27 spec stale · wire E2E vào PR gate | 🔴 P0 | ✅ safety net cho features |
| **2** | Accessibility (WCAG AA) | fix 7 a11y warning · audit touch target/contrast | 🟠 P1 | — |
| **3** | Competitive Features | SEO/prerender · SRS pedagogy sâu · Kanji N3 vietnamese | 🟡 P2 | — |
| **4** | Tech-Debt & Polish | gộp `.btn`↔shadcn · bỏ decorative orbs · CI gate cứng | 🟡 P2 | — |

---

## Wave 0 — Quality Gate Stabilization 🔴 P0

**Mục tiêu:** đưa các lệnh verify về xanh để mọi wave sau đứng trên nền tin được.

### PR 0.1 — Fix `npm run check` → 0 errors
- **Nguyên nhân 1 (140 lỗi, 1 file):** `src/lib/data/kanji/kanji-n3.ts` dùng `{ word, reading, meaning }` nhưng type `KanjiExampleWord = { word, kana, meaning, vietnamese }` (`src/lib/types/lesson.ts:142`).
  - Fix: rename `reading`→`kana` toàn file. Trường `vietnamese`: xem PR 3.3 (backfill bản dịch) — interim làm `vietnamese?` optional HOẶC tách thành content wave. Quyết định khi xem cách `KanjiExampleWord` được render (chỉ display hay vào quiz).
- **Nguyên nhân 2 (9 lỗi, 3 file):** `seo.test.ts` / `a11y.test.ts` / `confirmDialog.test.ts` thiếu `@types/node` (`fs`/`path`/`__dirname`).
  - Fix: thêm `@types/node` devDependency + `"types": ["node"]` trong `tsconfig` test scope (hoặc include nhánh test).
- **AC:** `npm run check` → 0 errors. `npm test` vẫn 889 pass.
- **Branch:** `chore/quality-gate-stabilization`

### PR 0.2 — Cross-platform build + 404 fallback
- `package.json:8` `vite build && cp build/index.html build/404.html` fail trên Windows (audit P0).
- Fix: thay bằng Node script (vd `scripts/postbuild.js` copy index→404) hoặc adapter-static `fallback: '404.html'`.
- **AC:** `npm run build` tạo `build/404.html` trên cả Linux & Windows; CI build job xanh.

### PR 0.3 — Hardening `quality-audit.sh`
- Script đang `|| true` → parse "0 fail" khi lệnh fail / 0 test (audit P1 false-positive).
- Fix: fail audit khi command exit≠0 hoặc test count=0.
- **AC:** chạy script trước khi `npm install` → audit FAIL (không còn báo 94/100 giả).

### PR 0.4 — Dependency security (PR riêng)
- `npm audit`: 20 vulns (9 high) — `@sveltejs/kit`, `ws`, lodash, serialize-javascript...
- Fix: `npm audit fix`; high cần `--force`/major thì tách + review breaking riêng.
- **AC:** high = 0 (hoặc còn lại có lý do ghi rõ); `npm test` + `build` xanh.

---

## Wave 1 — E2E Trustworthy Again 🔴 P0

**Mục tiêu:** E2E thành gate thật, không phải 27 spec lỗi thời.

### PR 1.1 — Reconcile stale E2E
- 27/69 fail (audit): `home.spec.ts`, `quiz-typing.spec.ts`, `user-flows.spec.ts` kỳ vọng UI text/route cũ (`Choose a Lesson`, `/quiz/...?lesson=1`).
- Phân loại từng fail: **test-staleness** (sửa spec theo UI mới) vs **regression thật** (file bug + fix). Document trong PR.
- **AC:** `npx playwright test --project=chromium` 100% pass; mỗi fail cũ ghi rõ stale-fix hay regression-fix.

### PR 1.2 — Wire E2E + check + build vào PR gate
- `deploy.yml`: thêm `npm run check` + `npm run build` + E2E (smoke subset nếu E2E full chậm) vào job chạy trên `pull_request`.
- **AC:** PR mới đỏ nếu check/build/E2E fail (đóng gốc rễ "gate yếu").

---

## Wave 2 — Accessibility (WCAG AA) 🟠 P1

**Mục tiêu:** đạt mục tiêu WCAG 2.1 AA mà AGENTS.md tuyên bố.

### PR 2.1 — Fix 7 a11y warning
- `Modal.svelte:80` role=dialog thiếu focusable container · `ConfirmDialog.svelte:30` alertdialog thiếu tabindex + click-no-keyboard · `Card.svelte:34` div click không keyboard · `hsk/[group]/quiz/[mode]:132` flashcard div không keyboard · `WritingCanvas.svelte:98` canvas role=img sai · `KanjiWritingQuiz.svelte:14` unused export `answer`.
- **AC:** `npm run check` 0 a11y warning; keyboard nav (F1/Space/Enter/1-4) còn nguyên.

### PR 2.2 — Audit contrast + touch target
- `COMPARISON_ACCESSIBILITY.md`: warning `#ff9500` / success `#34c759` fail AA khi làm text. Touch target ≥44×44.
- **AC:** không còn cặp màu text < AA; interactive ≥44px.

---

## Wave 3 — Competitive Features 🟡 P2

**Mục tiêu:** thu hẹp gap lớn nhất vs Nhai Kanji (theo `COMPARISON_*`).

### PR 3.1 — SEO / Prerender (gap lớn nhất: 2/10)
- SPA shell 1.35KB cho crawler; thiếu `<title>`/meta/og/twitter/sitemap.
- Fix: bật SvelteKit `prerender` cho trang content tĩnh (course/kanji/grammar/alphabet); thêm `<svelte:head>` meta + og:image (đã có `static/og-image.png`); `sitemap.xml`; `lang` đúng.
- **AC:** view-source trang prerendered có nội dung thật; Lighthouse SEO ≥90.

### PR 3.2 — SRS pedagogy sâu (`COMPARISON_PEDAGOGY.md`)
- Hiện SM-2 nhưng quality nhị phân, không learning steps, không leech detection, mastery↔easeFactor rời nhau.
- Fix: graded quality (dùng response time/streak), learning steps (1m/10m), leech flag (>8 sai), liên kết mastery↔SRS. Giữ `srsUtils.ts` API, TDD.
- **AC:** unit test cho graded quality + leech; review page hiển thị leech badge.

### PR 3.3 — Kanji N3 vietnamese + mở rộng content
- kanji-n3 examples thiếu `vietnamese` (gốc của PR 0.1). Backfill bản dịch (N2/N1 đã có 2400+).
- Cân nhắc mở rộng Kanji (256→nhiều hơn) — gap nội dung 3/10. Tách content wave nếu lớn.
- **AC:** `KanjiExampleWord.vietnamese` required lại; N3 đủ field; không hạ test.

---

## Wave 4 — Tech-Debt & Polish 🟡 P2

### PR 4.1 — Gộp `.btn` legacy ↔ shadcn `ui/`
- Hai hệ component song song (audit P2). Chọn 1 (shadcn) làm chuẩn, migrate dần.
- **AC:** không còn `.btn` legacy mới; visual không hồi quy (UI review).

### PR 4.2 — Bỏ decorative orbs + UI-review run
- Orbs trang lesson/course xung đột design rules. Chạy `/ui-review` (playbook) theo `WAVE_128_PLAN` còn lại.
- **AC:** UI review score giữ/tăng vs baseline.

---

## Theo dõi

| Wave | PR | Trạng thái |
|---|---|---|
| 0 | 0.1 check→0 | [ ] |
| 0 | 0.2 build cross-platform | [ ] |
| 0 | 0.3 quality-audit harden | [ ] |
| 0 | 0.4 npm audit | [ ] |
| 1 | 1.1 E2E reconcile | [ ] |
| 1 | 1.2 CI gate wire | [ ] |
| 2 | 2.1 a11y warnings | [ ] |
| 2 | 2.2 contrast/touch | [ ] |
| 3 | 3.1 SEO/prerender | [ ] |
| 3 | 3.2 SRS pedagogy | [ ] |
| 3 | 3.3 kanji N3 vietnamese | [ ] |
| 4 | 4.1 btn↔shadcn | [ ] |
| 4 | 4.2 orbs + ui-review | [ ] |

---

## Tham chiếu
- Audit gần nhất: `documents/04-quality/codex-audit-2026-05-13.md`
- So sánh đối thủ: `documents/04-quality/COMPARISON_*.md`
- Conventions: `AGENTS.md`
- Roadmap cũ (đa số DONE, superseded): `documents/03-planning/FEATURE_ROADMAP.md`
