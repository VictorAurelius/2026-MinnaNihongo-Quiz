/**
 * Tests for SkipLink component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import SkipLink from '$lib/components/common/SkipLink.svelte';

describe('SkipLink', () => {
  it('should render link with "Skip to main content"', () => {
    render(SkipLink);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('should have href="#main-content"', () => {
    render(SkipLink);
    const link = screen.getByText('Skip to main content');
    expect(link.getAttribute('href')).toBe('#main-content');
  });

  it('should have sr-only class', () => {
    render(SkipLink);
    const link = screen.getByText('Skip to main content');
    expect(link).toHaveClass('sr-only');
  });

  it('should have focus classes for visibility on focus', () => {
    render(SkipLink);
    const link = screen.getByText('Skip to main content');
    expect(link.className).toContain('focus:not-sr-only');
  });
});
