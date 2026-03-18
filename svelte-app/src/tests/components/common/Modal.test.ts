/**
 * Component tests for Modal.svelte
 * Tests open/close behavior, sizes, interactions, and accessibility
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import Modal from '$lib/components/common/Modal.svelte';

// Mock the stores module
vi.mock('$lib/stores', () => ({
  closeModal: vi.fn()
}));

describe('Modal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      const { container } = render(Modal, { props: { isOpen: false } });

      const modal = container.querySelector('.modal');
      expect(modal).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      const { container } = render(Modal, { props: { isOpen: true } });

      const modal = container.querySelector('.modal');
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveClass('modal', 'active');
    });

    it('should render with default medium width', () => {
      const { container } = render(Modal, { props: { isOpen: true } });

      const content = container.querySelector('.modal-content');
      expect(content).toHaveClass('modal-content-md');
    });
  });

  describe('Max Width Variants', () => {
    it('should apply small width class', () => {
      const { container } = render(Modal, {
        props: { isOpen: true, maxWidth: 'sm' }
      });

      const content = container.querySelector('.modal-content');
      expect(content).toHaveClass('modal-content-sm');
    });

    it('should apply medium width class', () => {
      const { container } = render(Modal, {
        props: { isOpen: true, maxWidth: 'md' }
      });

      const content = container.querySelector('.modal-content');
      expect(content).toHaveClass('modal-content-md');
    });

    it('should apply large width class', () => {
      const { container } = render(Modal, {
        props: { isOpen: true, maxWidth: 'lg' }
      });

      const content = container.querySelector('.modal-content');
      expect(content).toHaveClass('modal-content-lg');
    });

    it('should apply extra large width class', () => {
      const { container } = render(Modal, {
        props: { isOpen: true, maxWidth: 'xl' }
      });

      const content = container.querySelector('.modal-content');
      expect(content).toHaveClass('modal-content-xl');
    });
  });

  describe('Title', () => {
    it('should render title when provided', () => {
      render(Modal, {
        props: { isOpen: true, title: 'Test Modal' }
      });

      const title = screen.getByText('Test Modal');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('modal-title');
    });

    it('should not render title when not provided', () => {
      const { container } = render(Modal, {
        props: { isOpen: true, title: '' }
      });

      const title = container.querySelector('.modal-title');
      expect(title?.textContent).toBe('');
    });

    it('should render header even without title if showCloseButton is true', () => {
      const { container } = render(Modal, {
        props: { isOpen: true, title: '', showCloseButton: true }
      });

      const header = container.querySelector('.modal-header');
      expect(header).toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('should show close button by default', () => {
      render(Modal, {
        props: { isOpen: true }
      });

      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      expect(closeButton).toBeInTheDocument();
    });

    it('should hide close button when showCloseButton is false', () => {
      render(Modal, {
        props: { isOpen: true, showCloseButton: false }
      });

      const closeButton = screen.queryByRole('button', { name: 'Close modal' });
      expect(closeButton).not.toBeInTheDocument();
    });

    it('should close modal when close button is clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(Modal, {
        props: { isOpen: true }
      });

      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      await user.click(closeButton);

      // Check that modal is removed from DOM
      await vi.waitFor(() => {
        expect(container.querySelector('.modal')).not.toBeInTheDocument();
      });
    });
  });

  describe('Overlay Interactions', () => {
    it('should close modal when clicking overlay', async () => {
      const user = userEvent.setup();
      const { container } = render(Modal, {
        props: { isOpen: true }
      });

      const overlay = container.querySelector('.modal-overlay') as HTMLElement;
      await user.click(overlay);

      await vi.waitFor(() => {
        expect(container.querySelector('.modal')).not.toBeInTheDocument();
      });
    });

    it('should not close modal when clicking modal content', async () => {
      const user = userEvent.setup();
      const { container } = render(Modal, {
        props: { isOpen: true }
      });

      const content = container.querySelector('.modal-content') as HTMLElement;
      await user.click(content);

      // Modal should still be open in DOM
      expect(container.querySelector('.modal')).toBeInTheDocument();
    });
  });

  describe('Keyboard Interactions', () => {
    it('should close modal when Escape key is pressed', async () => {
      const { container } = render(Modal, {
        props: { isOpen: true }
      });

      await fireEvent.keyDown(window, { key: 'Escape' });

      await vi.waitFor(() => {
        expect(container.querySelector('.modal')).not.toBeInTheDocument();
      });
    });

    it('should not close modal when other keys are pressed', async () => {
      const { container } = render(Modal, {
        props: { isOpen: true }
      });

      await fireEvent.keyDown(window, { key: 'Enter' });
      await fireEvent.keyDown(window, { key: 'Space' });
      await fireEvent.keyDown(window, { key: 'Tab' });

      // Modal should still be open in DOM
      expect(container.querySelector('.modal')).toBeInTheDocument();
    });

    it('should not respond to Escape when modal is closed', async () => {
      const { container } = render(Modal, {
        props: { isOpen: false }
      });

      await fireEvent.keyDown(window, { key: 'Escape' });

      // Should still be closed (not in DOM)
      expect(container.querySelector('.modal')).not.toBeInTheDocument();
    });
  });

  describe('Structure', () => {
    it('should render modal overlay and content', () => {
      const { container } = render(Modal, {
        props: { isOpen: true }
      });

      const overlay = container.querySelector('.modal-overlay');
      const content = container.querySelector('.modal-content');
      const body = container.querySelector('.modal-body');

      expect(overlay).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(body).toBeInTheDocument();
    });

    it('should render header when title or close button exists', () => {
      const { container } = render(Modal, {
        props: { isOpen: true, title: 'Test' }
      });

      const header = container.querySelector('.modal-header');
      expect(header).toBeInTheDocument();
    });

    it('should render body section', () => {
      const { container } = render(Modal, {
        props: { isOpen: true }
      });

      const body = container.querySelector('.modal-body');
      expect(body).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should handle all props together', () => {
      const { container } = render(Modal, {
        props: {
          isOpen: true,
          title: 'Full Modal',
          maxWidth: 'lg',
          showCloseButton: true
        }
      });

      const modal = container.querySelector('.modal');
      const content = container.querySelector('.modal-content');
      const title = screen.getByText('Full Modal');
      const closeButton = screen.getByRole('button', { name: 'Close modal' });

      expect(modal).toBeInTheDocument();
      expect(content).toHaveClass('modal-content-lg');
      expect(title).toBeInTheDocument();
      expect(closeButton).toBeInTheDocument();
    });

    it('should handle minimal configuration', () => {
      const { container } = render(Modal, {
        props: {
          isOpen: true,
          title: '',
          showCloseButton: false
        }
      });

      const modal = container.querySelector('.modal');
      const body = container.querySelector('.modal-body');

      expect(modal).toBeInTheDocument();
      expect(body).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label on close button', () => {
      render(Modal, {
        props: { isOpen: true }
      });

      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
    });

    it('should be keyboard navigable', () => {
      render(Modal, {
        props: { isOpen: true }
      });

      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      expect(closeButton).toBeVisible();

      // Focus the close button
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
    });
  });

  describe('Edge Cases', () => {
    it('should handle starting closed and opening via prop', async () => {
      const { container, component } = render(Modal, {
        props: { isOpen: false }
      });

      expect(container.querySelector('.modal')).not.toBeInTheDocument();

      // Open modal by updating prop
      await component.$set({ isOpen: true });

      // Wait for modal to appear
      await vi.waitFor(() => {
        expect(container.querySelector('.modal')).toBeInTheDocument();
      });
    });

    it('should handle empty title and no close button', () => {
      const { container } = render(Modal, {
        props: { isOpen: true, title: '', showCloseButton: false }
      });

      const header = container.querySelector('.modal-header');
      expect(header).not.toBeInTheDocument();
    });
  });
});
