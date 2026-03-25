# Diagrams Index

## Render

```bash
./scripts/render-diagrams.sh           # Render all
./scripts/render-diagrams.sh --check   # Check tools
```

## Diagrams

| # | Diagram | Source | Type | Wave | Status |
|---|---------|--------|------|------|--------|
| 1 | App Architecture (v2 current) | [source/architecture-v2.puml](source/architecture-v2.puml) | PlantUML | Pre-wave | [x] |
| 2 | Route Map | [source/route-map.puml](source/route-map.puml) | PlantUML | Pre-wave | [x] |
| 3 | Component Hierarchy | [source/component-tree.puml](source/component-tree.puml) | PlantUML | Pre-wave | [x] |
| 4 | Data Store Flow | [source/store-flow.puml](source/store-flow.puml) | PlantUML | Pre-wave | [x] |
| 5 | Quiz Flow (user journey) | [source/quiz-flow.mmd](source/quiz-flow.mmd) | Mermaid | Wave 1 | [ ] |
| 6 | SEO + PWA Lifecycle | [source/pwa-lifecycle.mmd](source/pwa-lifecycle.mmd) | Mermaid | Wave 1 | [ ] |
| 7 | Learning Path State Machine | [source/learning-path-sm.puml](source/learning-path-sm.puml) | PlantUML | Wave 2 | [ ] |
| 8 | JLPT Mock Test Flow | [source/mock-test-flow.mmd](source/mock-test-flow.mmd) | Mermaid | Wave 2 | [ ] |
| 9 | Kanji Stroke Animation Pipeline | [source/stroke-animation.mmd](source/stroke-animation.mmd) | Mermaid | Wave 3 | [ ] |
| 10 | Radical Decomposition Data Flow | [source/radical-flow.mmd](source/radical-flow.mmd) | Mermaid | Wave 3 | [ ] |
| 11 | Quiz Adapter Pattern | [source/quiz-adapter.mmd](source/quiz-adapter.mmd) | Mermaid | Wave 4 | [ ] |
| 12 | HSK Data Structure | [source/hsk-data.puml](source/hsk-data.puml) | PlantUML | Wave 4 | [ ] |
| 13 | KanjiCanvas Integration | [source/kanji-canvas.mmd](source/kanji-canvas.mmd) | Mermaid | Wave 5 | [ ] |
| 14 | App Architecture (v4 target) | [source/architecture-v4.mmd](source/architecture-v4.mmd) | Mermaid | Wave 5 | [ ] |
| 15 | Offline-First Data Sync | [source/offline-sync.mmd](source/offline-sync.mmd) | Mermaid | Wave 6 | [ ] |
| 16 | Supabase ERD | [source/supabase-erd.puml](source/supabase-erd.puml) | PlantUML | Wave 6 | [ ] |
| 17 | Auth + Sync Sequence | [source/auth-sync-seq.puml](source/auth-sync-seq.puml) | PlantUML | Wave 6 | [ ] |
| 18 | SRS State Machine | [source/srs-state-machine.puml](source/srs-state-machine.puml) | PlantUML | Wave 7 | [ ] |
| 19 | Premium Gate Flow | [source/premium-flow.mmd](source/premium-flow.mmd) | Mermaid | Wave 8 | [ ] |
| 20 | Deployment Topology | [source/deployment.mmd](source/deployment.mmd) | Mermaid | Wave 8 | [ ] |

## Per-Wave Breakdown

### Pre-wave (tạo trước khi bắt đầu implement — snapshot hiện tại)

| Diagram | Mô tả |
|---------|-------|
| **Architecture v2** | SvelteKit routes → components → stores → data → utils. Current state |
| **Route Map** | 25+ routes tree với page types (quiz, reference, settings, etc.) |
| **Component Hierarchy** | lib/components/ tree: common, quiz, kanji, grammar, layout |
| **Data Store Flow** | progressStore, quizStore, uiStore → localStorage → UI reactivity |

### Wave 1: Foundation
| Diagram | Mô tả |
|---------|-------|
| **Quiz Flow** | User journey: home → course → lesson → quiz mode → questions → results |
| **PWA Lifecycle** | Install prompt → SW register → cache → update notification → offline |

### Wave 2: Learning Path
| Diagram | Mô tả |
|---------|-------|
| **Learning Path SM** | States: locked → unlocked → in-progress → mastered. Transitions by mastery % |
| **Mock Test Flow** | Level select → timer start → 30 questions → auto-submit → JLPT scoring |

### Wave 3: Kanji Core
| Diagram | Mô tả |
|---------|-------|
| **Stroke Animation** | KanjiVG SVG → parse paths → CSS animation pipeline → controls |
| **Radical Flow** | KRADFILE parse → kanji→radicals mapping → UI breakdown → click navigation |

### Wave 4: Bilingual
| Diagram | Mô tả |
|---------|-------|
| **Quiz Adapter** | Shared FlashCard/MC/Typing ← adapter ← JP VocabItem / HSK HSKWord / Kanji KanjiItem |
| **HSK Data** | HSKLevel → HSKGroup[] → HSKWord[] class diagram |

### Wave 5: Kanji Mastery
| Diagram | Mô tả |
|---------|-------|
| **KanjiCanvas** | Canvas touch/mouse → stroke capture → recognition → candidates → match |
| **Architecture v4** | Full system: FE + Supabase + PWA + all features. Target state |

### Wave 6: User System
| Diagram | Mô tả |
|---------|-------|
| **Offline Sync** | localStorage ↔ sync queue ↔ Supabase. Online/offline paths |
| **Supabase ERD** | user_progress, leaderboard_profiles, auth.users. RLS policies |
| **Auth Sequence** | Google OAuth flow: button → Supabase → Google → callback → session → sync |

### Wave 7: Content + SRS
| Diagram | Mô tả |
|---------|-------|
| **SRS State Machine** | new → learning(1m,10m) → review → mature. Fail/leech paths |

### Wave 8: Premium
| Diagram | Mô tả |
|---------|-------|
| **Premium Gate** | Feature check → isPremium? → show content / show upgrade prompt |
| **Deployment** | GitHub Pages (main) + Vercel (v4-dev) + Supabase. Full topology |
