/**
 * Test setup file
 * Configures the test environment and global utilities
 */

/**
 * Test setup file
 * Configures the test environment and global utilities
 */

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/svelte';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Type declaration for global augmentation
declare global {
  // eslint-disable-next-line no-var
  var localStorage: Storage;
  // eslint-disable-next-line no-var
  var speechSynthesis: SpeechSynthesis;
}

// Mock localStorage
const localStorageMock = {
  getItem: (key: string): string | null => {
    return null;
  },
  setItem: (key: string, value: string): void => {
    // Mock implementation
  },
  removeItem: (key: string): void => {
    // Mock implementation
  },
  clear: (): void => {
    // Mock implementation
  }
};

globalThis.localStorage = localStorageMock as Storage;

// Mock speechSynthesis
globalThis.speechSynthesis = {
  speak: () => {},
  cancel: () => {},
  pause: () => {},
  resume: () => {},
  getVoices: () => [],
  speaking: false,
  pending: false,
  paused: false
} as any;
