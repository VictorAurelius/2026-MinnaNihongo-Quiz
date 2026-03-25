# Deployment Strategy — v2 Stable + v4 Development

> **Ngày:** 2026-03-25
> **Problem:** v4 phát triển lâu dài, cần duy trì v2 stable cho user hiện tại

---

## Branch Strategy

```
main ──────────────────────────► GitHub Pages (v2 stable)
  │                                https://victoraurelius.github.io/2026-Smart-Quiz/
  │
  └── v4-dev ──────────────────► Vercel (v4 preview)
        │                          https://smart-quiz-v4.vercel.app (tự động)
        ├── feat/seo
        ├── feat/learning-path
        └── ... (feature branches merge vào v4-dev)
```

| Branch | Deploy | URL | Mục đích |
|--------|--------|-----|----------|
| `main` | GitHub Pages (auto) | `victoraurelius.github.io/2026-Smart-Quiz/` | Production — user đang dùng |
| `v4-dev` | Vercel (auto) | `smart-quiz-v4.vercel.app` | Development — test features mới |
| `feat/*` | Vercel Preview | Per-PR preview URL | Review từng PR |

## Lifecycle

```
1. Feature branch từ v4-dev (KHÔNG từ main)
2. Implement → test → PR vào v4-dev
3. Vercel auto-deploy preview
4. Review → merge vào v4-dev
5. Vercel auto-deploy v4-dev
6. Khi wave complete + audit pass → cherry-pick/merge v4-dev → main
7. GitHub Pages auto-deploy stable version
```

## Khi nào merge v4-dev → main?

**Điều kiện:**
- [ ] Wave checkpoint passed
- [ ] `./scripts/quality-audit.sh` ≥ 100/100
- [ ] `./scripts/test-local.sh all` pass
- [ ] Manual QA trên Vercel preview
- [ ] Không break existing features (regression test)

**Frequency:** Sau mỗi wave hoàn thành (không phải mỗi PR).

---

## Setup Vercel (1 lần)

```bash
# 1. Connect repo to Vercel
#    vercel.com → New Project → Import GitHub repo
#    Framework: SvelteKit
#    Root: svelte-app/
#    Build: npm run build
#    Output: build/

# 2. Config
#    Production branch: v4-dev (KHÔNG phải main)
#    Preview branches: feat/*, fix/*, docs/*

# 3. Environment
#    VITE_SUPABASE_URL=... (khi đến Wave 6)
#    VITE_SUPABASE_ANON_KEY=... (khi đến Wave 6)
```

## Chi phí

| Service | Tier | Limit | Cost |
|---------|------|-------|------|
| GitHub Pages | Free | 1GB, 100GB bandwidth/mo | $0 |
| Vercel | Hobby | 100GB bandwidth, 6000 min build/mo | $0 |
| Supabase | Free | 50K MAU, 500MB DB, 5GB bandwidth | $0 |
| **Total** | | | **$0/tháng** |
