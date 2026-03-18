# Development Guidelines - Smart Quiz

## 📋 Overview

Guidelines cho việc phát triển và maintain dự án Smart Quiz - ứng dụng học JLPT (Japanese) và HSK (Chinese).

---

## 🏗️ Kiến trúc dự án

### Tech Stack
- **Framework:** SvelteKit (static adapter)
- **Language:** TypeScript (strict mode)
- **Styling:** CSS modules + global styles
- **State:** Svelte stores (reactive)
- **Build:** Vite + Terser
- **Testing:** Vitest + Testing Library
- **PWA:** Service Worker + Manifest
- **Deployment:** GitHub Pages / Netlify / Vercel

### Structure
```
svelte-app/
├── src/
│   ├── lib/
│   │   ├── components/      # Svelte components
│   │   ├── stores/          # State management
│   │   ├── data/            # JLPT/HSK lesson data
│   │   ├── utils/           # Pure functions
│   │   └── types/           # TypeScript types
│   ├── routes/              # SvelteKit pages
│   └── app.css              # Global styles
├── static/                  # Static assets
└── tests/                   # Test files
```

---

## 🎯 Core Principles

### 1. Data Integrity
- **KHÔNG BAO GIỜ** sửa trực tiếp lesson data mà không validate
- Mọi thay đổi data phải qua validation rules (xem VALIDATION.md)
- Backup data trước khi migration

### 2. Progressive Enhancement
- App phải hoạt động offline (PWA)
- Test trên mobile devices
- Graceful degradation cho older browsers

### 3. Performance First
- Lazy load lesson data (code splitting)
- Optimize bundle size (<350 KB target)
- Use Svelte reactivity, avoid unnecessary re-renders

### 4. Type Safety
- Strict TypeScript mode
- Define types trong `src/lib/types/`
- Không dùng `any` trừ khi thật sự cần thiết

### 5. Accessibility
- Keyboard navigation support (↑↓←→, Enter, Space)
- ARIA labels cho screen readers
- Focus management trong modals

---

## 🔧 Common Development Tasks

### Thêm Lesson Data mới

1. **Create lesson file:**
   ```bash
   # Copy template
   cp src/lib/data/minna/lessons/lesson-01.ts \
      src/lib/data/minna/lessons/lesson-26.ts
   ```

2. **Update data:**
   ```typescript
   export const LESSON_26_DATA: LessonData = {
     lessonNumber: 26,
     title: "...",
     vocabulary: [
       {
         japanese: "見る",
         vietnamese: "nhìn, xem",
         english: "to see, to watch",
         romaji: "miru",
         audioFile: "lesson-26/miru.mp3"
       }
     ],
     grammar: [...]
   };
   ```

3. **Validate:** Chạy validation (xem VALIDATION.md)

4. **Update index:**
   ```typescript
   // src/lib/data/minna/lessons/index.ts
   export { LESSON_26_DATA } from './lesson-26';
   ```

### Thêm Quiz Mode mới

1. **Xem checklist:** FEATURE_CHECKLIST.md → "Adding New Quiz Mode"
2. **Create component:** `src/lib/components/quiz/YourMode.svelte`
3. **Add route:** `src/routes/quiz/your-mode/+page.svelte`
4. **Update stores:** Add mode logic vào `src/lib/stores/quiz.ts`
5. **Test thoroughly:** All lesson types, keyboard shortcuts, offline

### Sửa Bug

1. **Reproduce:** Viết failing test trước
2. **Fix:** Sửa code
3. **Verify:** Test pass + manual testing
4. **Regression check:** Chạy full test suite
5. **Document:** Update CHANGELOG.md nếu user-facing

### Performance Optimization

1. **Measure first:** Lighthouse audit
2. **Identify bottleneck:** Chrome DevTools Performance tab
3. **Optimize:**
   - Bundle analysis: `npm run build -- --mode analyze`
   - Code splitting: Update `vite.config.ts` manualChunks
   - Lazy load: Use dynamic imports
4. **Verify:** Re-run Lighthouse

---

## 🧪 Testing Requirements

### Unit Tests (Utils/Stores)
```bash
npm run test              # Run once
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

**Coverage target:** >80% for utils, >60% for stores

### Component Tests
```typescript
// Example: FlashCard.test.ts
import { render, fireEvent } from '@testing-library/svelte';
import FlashCard from '$lib/components/quiz/FlashCard.svelte';

test('flips on click', async () => {
  const { container } = render(FlashCard, { props: { item: mockItem } });
  const card = container.querySelector('.flashcard');

  await fireEvent.click(card);

  expect(card).toHaveClass('flipped');
});
```

### E2E Tests (Critical paths)
```bash
npm run test:e2e          # Playwright
```

**Test cases:**
- Complete quiz flow (flashcard/MC/typing)
- Offline mode
- Progress persistence

---

## 🚀 Build & Deployment

### Local Build
```bash
npm run build             # Production build
npm run preview           # Preview build locally
```

### Pre-deployment Checklist
- [ ] All tests pass (`npm run test`)
- [ ] TypeScript compiles (`npm run check`)
- [ ] No console errors in build
- [ ] Lighthouse score >95
- [ ] Test offline mode
- [ ] Test on mobile device

### Deployment
```bash
git push origin main      # Triggers GitHub Actions
```

CI/CD sẽ tự động:
1. Run tests
2. Build production
3. Deploy to GitHub Pages

---

## 📦 Dependencies Management

### Adding Dependencies

**Think twice before adding:**
- Bundle size impact (check on bundlephobia.com)
- Alternatives already in project?
- Maintenance status

```bash
# Install
npm install package-name

# Check bundle size
npm run build
```

### Updating Dependencies

```bash
# Check outdated
npm outdated

# Update (careful with major versions)
npm update

# Test thoroughly after update
npm run test && npm run build
```

---

## 🎨 Styling Guidelines

### CSS Organization
```css
/* Component styles: Scoped by default */
<style>
  .component-name { }
</style>

/* Global styles: app.css */
:root {
  --primary-color: #6366f1;
  --spacing-unit: 8px;
}
```

### Responsive Design
```css
/* Mobile first */
.container {
  padding: var(--spacing-2);
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-4);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-6);
  }
}
```

### Dark Mode
```css
/* Use prefers-color-scheme */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #e5e5e5;
  }
}
```

---

## 🐛 Debugging Tips

### Common Issues

**Issue: Lesson data không load**
```typescript
// Check: Import đúng chưa?
import { LESSON_01_DATA } from '$lib/data/minna/lessons/lesson-01';

// Check: Lesson number match?
console.log(LESSON_01_DATA.lessonNumber); // Should be 1
```

**Issue: Store không reactive**
```svelte
<!-- Wrong: Direct access -->
<p>{quizStore.score}</p>

<!-- Correct: Use $ prefix -->
<p>{$quizStore.score}</p>
```

**Issue: PWA không update**
```bash
# Clear service worker
# Chrome DevTools → Application → Service Workers → Unregister
# Then hard refresh (Ctrl+Shift+R)
```

**Issue: Build size quá lớn**
```bash
# Analyze bundle
npm run build -- --mode analyze

# Check manualChunks in vite.config.ts
```

---

## 📚 Resources

### Documentation
- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Svelte Tutorial](https://svelte.dev/tutorial)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

### Internal Docs
- `VALIDATION.md` - Data validation rules
- `FEATURE_CHECKLIST.md` - Feature development checklist
- `TESTING.md` - Testing guide
- `DEPLOYMENT.md` - Deployment guide
- `OPTIMIZATION.md` - Performance optimization

---

## 🤝 Code Review Guidelines

### Before Submitting PR

- [ ] Code follows project conventions
- [ ] All tests pass
- [ ] TypeScript compiles without errors
- [ ] No console.log() left in code
- [ ] Updated relevant documentation
- [ ] Tested on mobile device
- [ ] Lighthouse score maintained

### Review Checklist

**Functionality:**
- Does it work as intended?
- Edge cases handled?
- Error handling adequate?

**Code Quality:**
- Readable and maintainable?
- Follows DRY principle?
- TypeScript types correct?

**Performance:**
- No unnecessary re-renders?
- Bundle size impact acceptable?
- Lazy loading where appropriate?

**Testing:**
- Adequate test coverage?
- Tests actually test the right thing?

---

## 📞 Getting Help

### When stuck:

1. **Check docs:** DEVELOPMENT.md (this file), VALIDATION.md, FEATURE_CHECKLIST.md
2. **Search issues:** Existing solutions in GitHub Issues
3. **Debug systematically:** Console, DevTools, test one thing at a time
4. **Ask Claude Code:** Provide context, error messages, what you've tried

### Common Questions

**Q: Làm sao để test offline mode?**
A: Chrome DevTools → Network → Offline checkbox, hoặc dùng Lighthouse

**Q: Lesson data format là gì?**
A: Xem `src/lib/types/lesson.ts` và example trong `lesson-01.ts`

**Q: Làm sao optimize bundle size?**
A: Xem OPTIMIZATION.md section "Bundle Size Optimization"

---

## 🔄 Version Control

### Commit Messages
```
type(scope): subject

- feat(quiz): add hint button to typing mode
- fix(data): correct romaji for lesson 5 vocab
- refactor(stores): simplify quiz state logic
- docs(readme): update installation steps
- test(utils): add tests for kana conversion
```

### Branching Strategy
```
main                    # Production
└── feature/xyz         # Feature branches
└── fix/abc            # Bug fix branches
```

### Pull Request Template
```markdown
## Changes
- Added X feature
- Fixed Y bug

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing on mobile

## Checklist
- [ ] TypeScript compiles
- [ ] No console errors
- [ ] Documentation updated
```

---

**Last updated:** 2026-03-18
**Maintainer:** Development Team
