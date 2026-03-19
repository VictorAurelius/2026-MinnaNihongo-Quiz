/**
 * HSK 5 Vocabulary Index — 1603 words
 * Ported from original src/js/data/hsk/ (commit 47863db^)
 */

import type { HSKGroup } from '$lib/types/hsk';
import { HSK5_A } from './hsk5-a';
import { HSK5_B } from './hsk5-b';
import { HSK5_C } from './hsk5-c';
import { HSK5_D } from './hsk5-d';
import { HSK5_E } from './hsk5-e';

export const HSK5_DATA: HSKGroup[] = [
  { id: 'a', title: 'A – G', words: HSK5_A },   // 337 words
  { id: 'b', title: 'G – M', words: HSK5_B },   // 299 words
  { id: 'c', title: 'M – S', words: HSK5_C },   // 320 words
  { id: 'd', title: 'S – X', words: HSK5_D },   // 317 words
  { id: 'e', title: 'X – Z', words: HSK5_E },   // 330 words
];
