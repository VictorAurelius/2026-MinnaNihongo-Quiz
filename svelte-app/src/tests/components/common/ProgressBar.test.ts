/**
 * Component tests for ProgressBar.svelte
 * Tests progress calculation, text display positions, and accessibility
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import ProgressBar from '$lib/components/common/ProgressBar.svelte';

describe('ProgressBar Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      const { container } = render(ProgressBar);

      const progressBar = container.querySelector('.progress-bar');
      expect(progressBar).toBeInTheDocument();
    });

    it('should render progress fill element', () => {
      const { container } = render(ProgressBar);

      const progressFill = container.querySelector('.progress-fill');
      expect(progressFill).toBeInTheDocument();
    });
  });

  describe('Progress Calculation', () => {
    it('should calculate 0% when current is 0', () => {
      render(ProgressBar, {
        props: { current: 0, total: 100 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '0');
      expect(progressBar).toHaveStyle({ width: '0%' });
    });

    it('should calculate 50% when current is half of total', () => {
      render(ProgressBar, {
        props: { current: 50, total: 100 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
      expect(progressBar).toHaveStyle({ width: '50%' });
    });

    it('should calculate 100% when current equals total', () => {
      render(ProgressBar, {
        props: { current: 100, total: 100 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '100');
      expect(progressBar).toHaveStyle({ width: '100%' });
    });

    it('should handle custom total values', () => {
      render(ProgressBar, {
        props: { current: 7, total: 10 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '7');
      expect(progressBar).toHaveStyle({ width: '70%' });
    });

    it('should handle fractional percentages by rounding', () => {
      render(ProgressBar, {
        props: { current: 1, total: 3 }
      });

      const progressBar = screen.getByRole('progressbar');
      // 1/3 = 33.33%, rounds to 33%
      expect(progressBar).toHaveStyle({ width: '33%' });
    });

    it('should handle 0 total gracefully', () => {
      render(ProgressBar, {
        props: { current: 5, total: 0 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveStyle({ width: '0%' });
    });
  });

  describe('Text Display - Top Position', () => {
    it('should show text on top by default', () => {
      const { container } = render(ProgressBar, {
        props: { current: 25, total: 100 }
      });

      const text = container.querySelector('.progress-text');
      expect(text).toBeInTheDocument();
      expect(text?.textContent).toBe('25 / 100 (25%)');
    });

    it('should display correct format for text', () => {
      const { container } = render(ProgressBar, {
        props: { current: 7, total: 10, textPosition: 'top' }
      });

      const text = container.querySelector('.progress-text');
      expect(text?.textContent).toBe('7 / 10 (70%)');
    });

    it('should not show top text when textPosition is inside', () => {
      const { container } = render(ProgressBar, {
        props: { current: 50, total: 100, textPosition: 'inside' }
      });

      const topText = container.querySelector('.progress-text');
      expect(topText).not.toBeInTheDocument();
    });

    it('should not show top text when textPosition is none', () => {
      const { container } = render(ProgressBar, {
        props: { current: 50, total: 100, textPosition: 'none' }
      });

      const topText = container.querySelector('.progress-text');
      expect(topText).not.toBeInTheDocument();
    });

    it('should not show text when showText is false', () => {
      const { container } = render(ProgressBar, {
        props: { current: 50, total: 100, showText: false }
      });

      const topText = container.querySelector('.progress-text');
      expect(topText).not.toBeInTheDocument();
    });
  });

  describe('Text Display - Inside Position', () => {
    it('should show percentage inside when textPosition is inside and percentage > 15', () => {
      const { container } = render(ProgressBar, {
        props: { current: 20, total: 100, textPosition: 'inside' }
      });

      const insideText = container.querySelector('.progress-text-inside');
      expect(insideText).toBeInTheDocument();
      expect(insideText?.textContent).toBe('20%');
    });

    it('should show 50% inside progress bar', () => {
      const { container } = render(ProgressBar, {
        props: { current: 50, total: 100, textPosition: 'inside' }
      });

      const insideText = container.querySelector('.progress-text-inside');
      expect(insideText).toBeInTheDocument();
      expect(insideText?.textContent).toBe('50%');
    });

    it('should not show inside text when percentage <= 15', () => {
      const { container } = render(ProgressBar, {
        props: { current: 10, total: 100, textPosition: 'inside' }
      });

      const insideText = container.querySelector('.progress-text-inside');
      expect(insideText).not.toBeInTheDocument();
    });

    it('should not show inside text when showText is false', () => {
      const { container } = render(ProgressBar, {
        props: { current: 50, total: 100, textPosition: 'inside', showText: false }
      });

      const insideText = container.querySelector('.progress-text-inside');
      expect(insideText).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have progressbar role', () => {
      render(ProgressBar, {
        props: { current: 30, total: 100 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
    });

    it('should have correct aria-valuenow attribute', () => {
      render(ProgressBar, {
        props: { current: 42, total: 100 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '42');
    });

    it('should have aria-valuemin set to 0', () => {
      render(ProgressBar, {
        props: { current: 50, total: 100 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    });

    it('should have aria-valuemax set to total', () => {
      render(ProgressBar, {
        props: { current: 5, total: 10 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuemax', '10');
    });

    it('should update aria attributes when props change', async () => {
      const { component } = render(ProgressBar, {
        props: { current: 30, total: 100 }
      });

      let progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '30');

      // Update current value
      await component.$set({ current: 75 });

      progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '75');
    });
  });

  describe('Edge Cases', () => {
    it('should handle current > total gracefully', () => {
      render(ProgressBar, {
        props: { current: 150, total: 100 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveStyle({ width: '150%' });
    });

    it('should handle negative current value', () => {
      render(ProgressBar, {
        props: { current: -10, total: 100 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '-10');
    });

    it('should handle very large numbers', () => {
      render(ProgressBar, {
        props: { current: 500, total: 1000 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '500');
      expect(progressBar).toHaveStyle({ width: '50%' });
    });

    it('should handle decimal values', () => {
      render(ProgressBar, {
        props: { current: 7.5, total: 10 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveStyle({ width: '75%' });
    });
  });

  describe('Combined Props', () => {
    it('should handle all props together', () => {
      const { container } = render(ProgressBar, {
        props: {
          current: 45,
          total: 60,
          showText: true,
          textPosition: 'top'
        }
      });

      const progressBar = screen.getByRole('progressbar');
      const topText = container.querySelector('.progress-text');

      expect(progressBar).toHaveAttribute('aria-valuenow', '45');
      expect(progressBar).toHaveStyle({ width: '75%' });
      expect(topText).toBeInTheDocument();
      expect(topText?.textContent).toBe('45 / 60 (75%)');
    });

    it('should work with minimal props', () => {
      render(ProgressBar, {
        props: { current: 0, total: 1 }
      });

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle({ width: '0%' });
    });
  });
});
