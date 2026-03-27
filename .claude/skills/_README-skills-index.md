# Skills Index — Khi nào dùng skill nào?

## Quy trình phát triển (theo thứ tự)

1. **Brainstorm** → `core/brainstorming-methodology.md`
2. **Task Breakdown** → `core/task-breakdown-guide.md`
3. **TDD** → `core/tdd-enforcement.md`
4. **Implementation** → (project-specific standards)
5. **Code Review** → `core/two-stage-code-review.md`
6. **Push** → `scripts/test-local.sh` → `scripts/check-ci.sh`

## Tất cả Skills

### Core (mỗi PR)
| File | Dùng khi |
|------|----------|
| `core/brainstorming-methodology.md` | Bắt đầu mỗi PR — phân tích scope, risks |
| `core/task-breakdown-guide.md` | Chia nhỏ công việc |
| `core/tdd-enforcement.md` | Trước khi viết code (Red→Green→Refactor) |
| `core/two-stage-code-review.md` | Self-review trước khi tạo PR |
| `core/systematic-debugging.md` | Gặp lỗi khó hiểu — 4-phase debugging |

### Workflow
| File | Dùng khi |
|------|----------|
| `workflow/development-workflow.md` | Git, PR, commit, self-test, CI monitoring |

### Quality
| File | Dùng khi |
|------|----------|
| `quality/quality-audit.md` | Đánh giá chất lượng /100 điểm |

### Frontend Design (MỚI — Anthropic + Impeccable)
| File | Dùng khi |
|------|----------|
| `frontend-design/SKILL.md` | **Mọi UI work** — design thinking, aesthetics, anti-patterns, AI slop test |
| `frontend-design/reference/typography.md` | Font, scale, pairing, fluid type, loading |
| `frontend-design/reference/color-and-contrast.md` | OKLCH, palettes, dark mode, a11y contrast |
| `frontend-design/reference/spatial-design.md` | Grid, spacing, hierarchy, container queries |
| `frontend-design/reference/motion-design.md` | Timing, easing, reduced motion, stagger |
| `frontend-design/reference/interaction-design.md` | Forms, focus, loading, modals, keyboard nav |
| `frontend-design/reference/responsive-design.md` | Mobile-first, fluid, breakpoints, touch targets |
| `frontend-design/reference/ux-writing.md` | Labels, errors, empty states, voice & tone |
| `frontend-design/commands/audit.md` | Technical quality audit — scored report (a11y, perf, responsive) |
| `frontend-design/commands/critique.md` | UX design review — heuristics scoring |
| `frontend-design/commands/polish.md` | Final pass before shipping — comprehensive checklist |
| `frontend-design/commands/*.md` | 20 targeted commands (typeset, arrange, animate, colorize, etc.) |

### Reference
| File | Dùng khi |
|------|----------|
| `reference/ui-template-guide.md` | Chọn approach: Figma vs Component library, page checklist |
| `reference/business-docs-3-layer.md` | Thiết kế business docs (rules + use-cases + api-contract) |
| `reference/service-docs-standard.md` | Chuẩn README + QUICK-START cho mỗi service |
| `reference/project-structure.md` | Cấu trúc folder best practice, khi nào refactor |
| `reference/ide-setup.md` | VS Code settings, test runner, tắt MD warnings, Claude permissions |
| `reference/diagrams.md` | PlantUML/Mermaid setup, render workflow, minimum diagrams |

## Scripts (PHẢI dùng, KHÔNG lệnh ad-hoc)

| Script | Dùng khi |
|--------|----------|
| `scripts/test-local.sh` | Trước push — test local |
| `scripts/test-local.sh --quick` | Quick check (compile/lint only) |
| `scripts/check-ci.sh` | Sau push — đợi CI |
| `scripts/check-ci.sh --status` | Quick CI status (audit, review) |
| `scripts/render-diagrams.sh` | Render PlantUML/Mermaid → PNG |
| `scripts/render-diagrams.sh --check` | Kiểm tra tools đã cài chưa |
