/**
 * Tests for MasteryRing component
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import MasteryRing from '$lib/components/common/MasteryRing.svelte';

describe('MasteryRing', () => {
  it('should render SVG element', () => {
    const { container } = render(MasteryRing, { props: { percentage: 50 } });
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should show percentage text', () => {
    const { container } = render(MasteryRing, { props: { percentage: 75 } });
    expect(container.textContent).toContain('75');
  });

  it('should show lock icon when locked=true', () => {
    const { container } = render(MasteryRing, { props: { percentage: 0, locked: true } });
    expect(container.textContent).toContain('🔒');
  });

  it('should handle 0% edge case', () => {
    const { container } = render(MasteryRing, { props: { percentage: 0 } });
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should handle 100% edge case', () => {
    const { container } = render(MasteryRing, { props: { percentage: 100 } });
    expect(container.textContent).toContain('100');
  });
});
