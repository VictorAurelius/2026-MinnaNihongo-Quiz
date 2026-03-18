/**
 * Component tests for BackButton.svelte
 * Tests navigation behavior, icon/text display, and accessibility
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import BackButton from '$lib/components/common/BackButton.svelte';
import { goto } from '$app/navigation';

describe('BackButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.history
    Object.defineProperty(window, 'history', {
      writable: true,
      value: {
        length: 2,
        back: vi.fn()
      }
    });
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      render(BackButton);

      const button = screen.getByRole('button', { name: 'Go back' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('back-btn');
    });

    it('should render icon by default', () => {
      const { container } = render(BackButton);

      const icon = container.querySelector('.back-icon');
      expect(icon).toBeInTheDocument();
      expect(icon?.textContent).toBe('←');
    });

    it('should render text by default', () => {
      const { container } = render(BackButton);

      const text = container.querySelector('.back-text');
      expect(text).toBeInTheDocument();
      expect(text?.textContent).toBe('Back');
    });
  });

  describe('Icon Display', () => {
    it('should show icon when showIcon is true', () => {
      const { container } = render(BackButton, {
        props: { showIcon: true }
      });

      const icon = container.querySelector('.back-icon');
      expect(icon).toBeInTheDocument();
    });

    it('should hide icon when showIcon is false', () => {
      const { container } = render(BackButton, {
        props: { showIcon: false }
      });

      const icon = container.querySelector('.back-icon');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('Text Display', () => {
    it('should show default text "Back"', () => {
      const { container } = render(BackButton);

      const text = container.querySelector('.back-text');
      expect(text?.textContent).toBe('Back');
    });

    it('should show custom text', () => {
      const { container } = render(BackButton, {
        props: { text: 'Return' }
      });

      const text = container.querySelector('.back-text');
      expect(text?.textContent).toBe('Return');
    });

    it('should hide text when text prop is empty', () => {
      const { container } = render(BackButton, {
        props: { text: '' }
      });

      const text = container.querySelector('.back-text');
      expect(text).not.toBeInTheDocument();
    });

    it('should support multi-word text', () => {
      const { container } = render(BackButton, {
        props: { text: 'Go Back Home' }
      });

      const text = container.querySelector('.back-text');
      expect(text?.textContent).toBe('Go Back Home');
    });
  });

  describe('Navigation Behavior', () => {
    it('should call window.history.back() when history exists', async () => {
      const user = userEvent.setup();
      const historySpy = vi.spyOn(window.history, 'back');

      render(BackButton);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(historySpy).toHaveBeenCalledTimes(1);
      expect(goto).not.toHaveBeenCalled();
    });

    it('should call goto with fallbackPath when no history', async () => {
      const user = userEvent.setup();
      // Set history length to 1 (no back history)
      Object.defineProperty(window, 'history', {
        writable: true,
        value: { length: 1, back: vi.fn() }
      });

      render(BackButton, {
        props: { fallbackPath: '/home' }
      });

      const button = screen.getByRole('button');
      await user.click(button);

      expect(goto).toHaveBeenCalledWith('/home');
      expect(goto).toHaveBeenCalledTimes(1);
    });

    it('should use default fallbackPath "/" when not specified', async () => {
      const user = userEvent.setup();
      Object.defineProperty(window, 'history', {
        writable: true,
        value: { length: 1, back: vi.fn() }
      });

      render(BackButton);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(goto).toHaveBeenCalledWith('/');
    });

    it('should handle custom fallbackPath', async () => {
      const user = userEvent.setup();
      Object.defineProperty(window, 'history', {
        writable: true,
        value: { length: 1, back: vi.fn() }
      });

      render(BackButton, {
        props: { fallbackPath: '/lessons' }
      });

      const button = screen.getByRole('button');
      await user.click(button);

      expect(goto).toHaveBeenCalledWith('/lessons');
    });
  });

  describe('Accessibility', () => {
    it('should have button role', () => {
      render(BackButton);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should have aria-label', () => {
      render(BackButton);

      const button = screen.getByRole('button', { name: 'Go back' });
      expect(button).toHaveAttribute('aria-label', 'Go back');
    });

    it('should be keyboard accessible', () => {
      render(BackButton);

      const button = screen.getByRole('button');
      button.focus();

      expect(document.activeElement).toBe(button);
    });
  });

  describe('Combined Props', () => {
    it('should handle icon only (no text)', () => {
      const { container } = render(BackButton, {
        props: { showIcon: true, text: '' }
      });

      const icon = container.querySelector('.back-icon');
      const text = container.querySelector('.back-text');

      expect(icon).toBeInTheDocument();
      expect(text).not.toBeInTheDocument();
    });

    it('should handle text only (no icon)', () => {
      const { container } = render(BackButton, {
        props: { showIcon: false, text: 'Back' }
      });

      const icon = container.querySelector('.back-icon');
      const text = container.querySelector('.back-text');

      expect(icon).not.toBeInTheDocument();
      expect(text).toBeInTheDocument();
    });

    it('should handle all props together', () => {
      const { container } = render(BackButton, {
        props: {
          showIcon: true,
          text: 'Return',
          fallbackPath: '/dashboard'
        }
      });

      const icon = container.querySelector('.back-icon');
      const text = container.querySelector('.back-text');
      const button = screen.getByRole('button');

      expect(icon).toBeInTheDocument();
      expect(text?.textContent).toBe('Return');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle history length of 0', async () => {
      const user = userEvent.setup();
      Object.defineProperty(window, 'history', {
        writable: true,
        value: { length: 0, back: vi.fn() }
      });

      render(BackButton, {
        props: { fallbackPath: '/home' }
      });

      const button = screen.getByRole('button');
      await user.click(button);

      expect(goto).toHaveBeenCalledWith('/home');
    });

    it('should handle multiple clicks', async () => {
      const user = userEvent.setup();
      const historySpy = vi.spyOn(window.history, 'back');

      render(BackButton);

      const button = screen.getByRole('button');
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(historySpy).toHaveBeenCalledTimes(3);
    });

    it('should render without text or icon', () => {
      const { container } = render(BackButton, {
        props: { showIcon: false, text: '' }
      });

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      const icon = container.querySelector('.back-icon');
      const text = container.querySelector('.back-text');

      expect(icon).not.toBeInTheDocument();
      expect(text).not.toBeInTheDocument();
    });
  });
});
