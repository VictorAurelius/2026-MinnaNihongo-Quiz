# Testing Guide

## Test Setup

The project uses **Vitest** for unit testing and **@testing-library/svelte** for component testing.

### Test Stack
- **Vitest**: Fast unit test framework (Vite-native)
- **@testing-library/svelte**: Component testing utilities
- **@testing-library/jest-dom**: Custom matchers for DOM testing
- **jsdom**: DOM implementation for Node.js

## Running Tests

```bash
# Run tests once
npm run test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with UI (interactive)
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

```
src/
├── lib/
│   ├── utils/
│   │   ├── quizUtils.ts
│   │   └── quizUtils.test.ts        # Unit tests for utilities
│   ├── components/
│   │   └── common/
│   │       ├── Button.svelte
│   │       └── Button.test.ts       # Component tests
│   └── stores/
│       └── quiz.test.ts             # Store tests
└── tests/
    └── setup.ts                     # Global test setup
```

## Writing Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { shuffleArray } from './quizUtils';

describe('shuffleArray', () => {
  it('should return array of same length', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result).toHaveLength(input.length);
  });
});
```

### Component Test Example

```typescript
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Button from './Button.svelte';

describe('Button', () => {
  it('should render with text', () => {
    render(Button, { props: { children: 'Click me' } });
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Store Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { get } from 'svelte/store';
import { quizStore } from './quiz';

describe('Quiz Store', () => {
  it('should have initial state', () => {
    const state = get(quizStore);
    expect(state.questionIndex).toBe(0);
  });
});
```

## Test Coverage

Current test coverage:

| Module | Coverage | Files Tested |
|--------|----------|--------------|
| **Utils** | ✅ Basic | quizUtils.ts |
| **Components** | ⏳ Pending | - |
| **Stores** | ⏳ Pending | - |
| **Data** | N/A | Static data |

**Total Coverage**: ~15% (foundation tests only)

## Testing Strategy

### Phase 1: Unit Tests (Current)
- [x] Quiz utilities (shuffle, grade, normalize)
- [ ] Grammar utilities (filter, search, group)
- [ ] PWA utilities (service worker, install)

### Phase 2: Component Tests (Planned)
- [ ] Common components (Button, Card, Modal)
- [ ] Quiz components (FlashCard, MultipleChoice, Typing)
- [ ] Grammar components (GrammarCard, Modals)

### Phase 3: Integration Tests (Planned)
- [ ] Quiz flow (start → answer → results)
- [ ] Grammar reference (search → filter → detail)
- [ ] Lesson navigation

### Phase 4: E2E Tests (Future)
- [ ] Complete quiz workflow
- [ ] PWA installation
- [ ] Offline functionality

## Mocking

### localStorage
```typescript
// Automatically mocked in setup.ts
localStorage.getItem('key'); // Returns null
localStorage.setItem('key', 'value'); // No-op
```

### speechSynthesis
```typescript
// Automatically mocked in setup.ts
speechSynthesis.speak(utterance); // No-op
speechSynthesis.getVoices(); // Returns []
```

### SvelteKit modules
```typescript
import { goto } from '$app/navigation'; // Auto-mocked by Vitest
```

## Best Practices

### 1. Test Behavior, Not Implementation
```typescript
// ❌ Bad: Testing implementation details
expect(component.data.internalState).toBe(true);

// ✅ Good: Testing user-facing behavior
expect(screen.getByRole('button')).toBeDisabled();
```

### 2. Use Testing Library Queries
```typescript
// ❌ Bad: Using CSS selectors
const button = container.querySelector('.btn-primary');

// ✅ Good: Using semantic queries
const button = screen.getByRole('button', { name: 'Submit' });
```

### 3. Avoid Test IDs When Possible
```typescript
// ❌ Bad: Relying on test IDs
screen.getByTestId('submit-button');

// ✅ Good: Using accessible queries
screen.getByRole('button', { name: 'Submit' });
```

### 4. Test User Interactions
```typescript
import { fireEvent } from '@testing-library/svelte';

// Test clicking
await fireEvent.click(button);

// Test typing
await fireEvent.input(input, { target: { value: 'test' } });
```

## Debugging Tests

### VS Code Integration
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest Tests",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test"],
  "console": "integratedTerminal"
}
```

### Browser Debugging
```bash
npm run test:ui
# Opens browser with interactive test UI
```

### Verbose Output
```bash
npm run test -- --reporter=verbose
```

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run tests
  run: npm run test

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/coverage-final.json
```

## Performance Testing

### Bundle Size Monitoring
```bash
# Check bundle sizes after build
npm run build
du -sh build/_app/immutable/chunks/*.js
```

### Lighthouse CI
```bash
# Run Lighthouse audit
npx lighthouse http://localhost:4173 --view
```

## Troubleshooting

### Common Issues

**Issue**: Tests fail with "Cannot find module '@testing-library/svelte'"
```bash
# Solution: Install test dependencies
npm install -D @testing-library/svelte @testing-library/jest-dom jsdom vitest
```

**Issue**: Component tests fail with "Invalid component"
```bash
# Solution: Check vitest.config.ts has svelte plugin
```

**Issue**: Store tests fail with "Cannot read property 'subscribe'"
```bash
# Solution: Import from 'svelte/store', not from file directly
```

## Future Improvements

1. **Increase Coverage**: Target 80%+ code coverage
2. **Visual Regression**: Add visual diff testing
3. **Performance Tests**: Add bundle size tests
4. **A11y Tests**: Automated accessibility testing
5. **E2E Tests**: Playwright or Cypress integration

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/svelte-testing-library/intro)
- [Svelte Testing Guide](https://svelte.dev/docs/testing)
