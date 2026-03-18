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

global.localStorage = localStorageMock as Storage;

// Mock speechSynthesis
global.speechSynthesis = {
  speak: () => {},
  cancel: () => {},
  pause: () => {},
  resume: () => {},
  getVoices: () => [],
  speaking: false,
  pending: false,
  paused: false
} as any;
