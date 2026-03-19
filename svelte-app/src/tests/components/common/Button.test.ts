/**
 * Component tests for Button.svelte
 * Tests props, variants, sizes, interactions, and accessibility
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import Button from '$lib/components/common/Button.svelte';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(Button);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('btn', 'btn-primary', 'btn-md');
    });

    it('should render with correct button type attribute', () => {
      render(Button);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should render as link when href is provided', () => {
      render(Button, { props: { href: '/test' } });

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
    });
  });

  describe('Variants', () => {
    it('should apply primary variant class', () => {
      render(Button, { props: { variant: 'primary' } });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-primary');
    });

    it('should apply accent variant class', () => {
      render(Button, { props: { variant: 'accent' } });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-accent');
    });

    it('should apply secondary variant class', () => {
      render(Button, { props: { variant: 'secondary' } });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-secondary');
    });

    it('should apply success variant class', () => {
      render(Button, { props: { variant: 'success' } });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-success');
    });

    it('should apply danger variant class', () => {
      render(Button, { props: { variant: 'danger' } });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-danger');
    });

    it('should apply outline variant class', () => {
      render(Button, { props: { variant: 'outline' } });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-outline');
    });
  });

  describe('Sizes', () => {
    it('should apply small size class', () => {
      render(Button, { props: { size: 'sm' } });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-sm');
    });

    it('should apply medium size class (default)', () => {
      render(Button, { props: { size: 'md' } });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-md');
    });

    it('should apply large size class', () => {
      render(Button, { props: { size: 'lg' } });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-lg');
    });
  });

  describe('Button Types', () => {
    it('should have button type by default', () => {
      render(Button);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should support submit type', () => {
      render(Button, { props: { type: 'submit' } });

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should support reset type', () => {
      render(Button, { props: { type: 'reset' } });

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });

  describe('Disabled State', () => {
    it('should be enabled by default', () => {
      render(Button);

      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });

    it('should be disabled when disabled prop is true', () => {
      render(Button, { props: { disabled: true } });

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should not trigger click when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(Button, { props: { disabled: true } });
      const button = screen.getByRole('button');
      button.addEventListener('click', handleClick);
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Icons', () => {
    it('should render icon on the left by default', () => {
      const { container } = render(Button, {
        props: { icon: '🔥', iconPosition: 'left' }
      });

      const button = container.querySelector('button');
      expect(button).toHaveClass('btn-with-icon');
      expect(button?.textContent).toContain('🔥');
    });

    it('should render icon on the right', () => {
      const { container } = render(Button, {
        props: { icon: '➡️', iconPosition: 'right' }
      });

      const button = container.querySelector('button');
      expect(button).toHaveClass('btn-with-icon');
      expect(button?.textContent).toContain('➡️');
    });

    it('should not have icon class when no icon provided', () => {
      render(Button);

      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('btn-with-icon');
    });
  });

  describe('Interactions', () => {
    it('should trigger click event', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(Button);
      const button = screen.getByRole('button');
      button.addEventListener('click', handleClick);
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should trigger multiple clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(Button);
      const button = screen.getByRole('button');
      button.addEventListener('click', handleClick);
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('Accessibility', () => {
    it('should have accessible role', () => {
      render(Button);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should support aria attributes via restProps', () => {
      render(Button, {
        props: {
          'aria-label': 'Custom label',
          'aria-describedby': 'description'
        }
      });

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
      expect(button).toHaveAttribute('aria-describedby', 'description');
    });

    it('should have link role when href is provided', () => {
      render(Button, { props: { href: '/test' } });

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should handle multiple props together', () => {
      render(Button, {
        props: {
          variant: 'success',
          size: 'lg',
          icon: '✓',
          disabled: false
        }
      });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-success', 'btn-lg', 'btn-with-icon');
      expect(button).not.toBeDisabled();
    });

    it('should handle link with icon', () => {
      render(Button, {
        props: {
          href: '/home',
          icon: '🏠',
          variant: 'primary'
        }
      });

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/home');
      expect(link).toHaveClass('btn-primary', 'btn-with-icon');
    });
  });
});
