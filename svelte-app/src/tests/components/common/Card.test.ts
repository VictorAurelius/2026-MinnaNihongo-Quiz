/**
 * Component tests for Card.svelte
 * Tests props, padding variants, hover/clickable states, and interactions
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import Card from '$lib/components/common/Card.svelte';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      const { container } = render(Card);

      const card = container.querySelector('.card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('card', 'card-padding-md');
      expect(card).not.toHaveClass('card-hover', 'card-clickable');
    });

    it('should apply default medium padding', () => {
      const { container } = render(Card);

      const card = container.querySelector('.card');
      expect(card).toHaveClass('card-padding-md');
    });
  });

  describe('Padding Variants', () => {
    it('should apply small padding class', () => {
      const { container } = render(Card, { props: { padding: 'sm' } });

      const card = container.querySelector('.card');
      expect(card).toHaveClass('card-padding-sm');
    });

    it('should apply medium padding class', () => {
      const { container } = render(Card, { props: { padding: 'md' } });

      const card = container.querySelector('.card');
      expect(card).toHaveClass('card-padding-md');
    });

    it('should apply large padding class', () => {
      const { container } = render(Card, { props: { padding: 'lg' } });

      const card = container.querySelector('.card');
      expect(card).toHaveClass('card-padding-lg');
    });
  });

  describe('Hover State', () => {
    it('should not have hover class by default', () => {
      const { container } = render(Card);

      const card = container.querySelector('.card');
      expect(card).not.toHaveClass('card-hover');
    });

    it('should apply hover class when hover prop is true', () => {
      const { container } = render(Card, { props: { hover: true } });

      const card = container.querySelector('.card');
      expect(card).toHaveClass('card-hover');
    });

    it('should not apply hover class when hover prop is false', () => {
      const { container } = render(Card, { props: { hover: false } });

      const card = container.querySelector('.card');
      expect(card).not.toHaveClass('card-hover');
    });
  });

  describe('Clickable State', () => {
    it('should not have clickable class by default', () => {
      const { container } = render(Card);

      const card = container.querySelector('.card');
      expect(card).not.toHaveClass('card-clickable');
    });

    it('should apply clickable class when clickable prop is true', () => {
      const { container } = render(Card, { props: { clickable: true } });

      const card = container.querySelector('.card');
      expect(card).toHaveClass('card-clickable');
    });

    it('should not apply clickable class when clickable prop is false', () => {
      const { container } = render(Card, { props: { clickable: false } });

      const card = container.querySelector('.card');
      expect(card).not.toHaveClass('card-clickable');
    });
  });

  describe('Interactions', () => {
    it('should trigger click event when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      const { container } = render(Card);
      const card = container.querySelector('.card') as HTMLElement;
      card.addEventListener('click', handleClick);
      await user.click(card);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should trigger multiple clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      const { container } = render(Card);
      const card = container.querySelector('.card') as HTMLElement;
      card.addEventListener('click', handleClick);
      await user.click(card);
      await user.click(card);
      await user.click(card);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('should pass click event data', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      const { container } = render(Card);
      const card = container.querySelector('.card') as HTMLElement;
      card.addEventListener('click', handleClick);
      await user.click(card);

      expect(handleClick).toHaveBeenCalled();
      const event = handleClick.mock.calls[0][0];
      expect(event).toBeTruthy();
    });
  });

  describe('Combined Props', () => {
    it('should handle hover and clickable together', () => {
      const { container } = render(Card, {
        props: { hover: true, clickable: true }
      });

      const card = container.querySelector('.card');
      expect(card).toHaveClass('card', 'card-hover', 'card-clickable', 'card-padding-md');
    });

    it('should handle all props together', () => {
      const { container } = render(Card, {
        props: { hover: true, clickable: true, padding: 'lg' }
      });

      const card = container.querySelector('.card');
      expect(card).toHaveClass('card', 'card-hover', 'card-clickable', 'card-padding-lg');
    });

    it('should handle custom props via restProps', () => {
      const { container } = render(Card, {
        props: {
          'data-testid': 'custom-card',
          'aria-label': 'Custom card label'
        }
      });

      const card = container.querySelector('.card');
      expect(card).toHaveAttribute('data-testid', 'custom-card');
      expect(card).toHaveAttribute('aria-label', 'Custom card label');
    });
  });

  describe('Accessibility', () => {
    it('should support aria attributes via restProps', () => {
      const { container } = render(Card, {
        props: {
          'aria-label': 'Lesson card',
          'aria-describedby': 'lesson-desc',
          role: 'article'
        }
      });

      const card = container.querySelector('.card');
      expect(card).toHaveAttribute('aria-label', 'Lesson card');
      expect(card).toHaveAttribute('aria-describedby', 'lesson-desc');
      expect(card).toHaveAttribute('role', 'article');
    });

    it('should support role attribute for clickable cards', () => {
      const { container } = render(Card, {
        props: {
          clickable: true,
          role: 'button',
          tabindex: 0
        }
      });

      const card = container.querySelector('.card');
      expect(card).toHaveClass('card-clickable');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('tabindex', '0');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty card', () => {
      const { container } = render(Card);

      const card = container.querySelector('.card');
      expect(card).toBeInTheDocument();
      expect(card?.textContent).toBe('');
    });

    it('should handle boolean props as false explicitly', () => {
      const { container } = render(Card, {
        props: { hover: false, clickable: false }
      });

      const card = container.querySelector('.card');
      expect(card).not.toHaveClass('card-hover');
      expect(card).not.toHaveClass('card-clickable');
    });

    it('should update classes when props change', async () => {
      const { container, component } = render(Card, {
        props: { hover: false, clickable: false }
      });

      const card = container.querySelector('.card');
      expect(card).not.toHaveClass('card-hover');

      // Update prop
      component.$set({ hover: true });
      await vi.waitFor(() => {
        expect(card).toHaveClass('card-hover');
      });
    });
  });
});
