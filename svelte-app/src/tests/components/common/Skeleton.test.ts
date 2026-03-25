/**
 * Tests for Skeleton and SkeletonCard components
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import Skeleton from '$lib/components/common/Skeleton.svelte';
import SkeletonCard from '$lib/components/common/SkeletonCard.svelte';

describe('Skeleton', () => {
  it('should render with default dimensions', () => {
    const { container } = render(Skeleton);
    const el = container.querySelector('.skeleton');
    expect(el).toBeInTheDocument();
  });

  it('should accept custom width and height props', () => {
    const { container } = render(Skeleton, { props: { width: '200px', height: '2rem' } });
    const el = container.querySelector('.skeleton');
    expect(el?.getAttribute('style')).toContain('width: 200px');
    expect(el?.getAttribute('style')).toContain('height: 2rem');
  });

  it('should have shimmer animation class', () => {
    const { container } = render(Skeleton);
    expect(container.querySelector('.skeleton-shimmer')).toBeInTheDocument();
  });

  it('should have role="status" and aria-label', () => {
    const { container } = render(Skeleton);
    const el = container.querySelector('.skeleton');
    expect(el?.getAttribute('role')).toBe('status');
    expect(el?.getAttribute('aria-label')).toBe('Loading');
  });
});

describe('SkeletonCard', () => {
  it('should render title + lines + button skeleton', () => {
    const { container } = render(SkeletonCard);
    const skeletons = container.querySelectorAll('.skeleton');
    expect(skeletons.length).toBeGreaterThanOrEqual(4);
  });

  it('should have card container', () => {
    const { container } = render(SkeletonCard);
    expect(container.querySelector('.skeleton-card')).toBeInTheDocument();
  });
});
