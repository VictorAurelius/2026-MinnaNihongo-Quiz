/**
 * HSK 5 Vocabulary Index
 * Barrel export for all HSK groups
 */

import type { HSKGroup } from './types';
import { HSK5_A } from './hsk5-a';
import { HSK5_B } from './hsk5-b';
import { HSK5_C } from './hsk5-c';
import { HSK5_D } from './hsk5-d';
import { HSK5_E } from './hsk5-e';

export const HSK5_DATA: HSKGroup[] = [
  { id: 'a', title: 'A – G', words: HSK5_A },
  { id: 'b', title: 'G – M', words: HSK5_B },
  { id: 'c', title: 'M – S', words: HSK5_C },
  { id: 'd', title: 'S – X', words: HSK5_D },
  { id: 'e', title: 'X – Z', words: HSK5_E },
];

export { HSK5_A, HSK5_B, HSK5_C, HSK5_D, HSK5_E };
export * from './types';
