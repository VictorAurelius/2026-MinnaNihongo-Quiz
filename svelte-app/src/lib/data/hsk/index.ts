/**
 * HSK 5 Vocabulary Index — 1603 words
 */

import type { HSKGroup } from '/types/hsk';
import { HSK5_A } from './hsk5-a';
import { HSK5_B } from './hsk5-b';
import { HSK5_C } from './hsk5-c';
import { HSK5_D } from './hsk5-d';
import { HSK5_E } from './hsk5-e';

export const HSK5_DATA: HSKGroup[] = [
  { id: 'a', title: 'A – G', words: HSK5_A },
  { id: 'b', title: 'H – L', words: HSK5_B },
  { id: 'c', title: 'M – Q', words: HSK5_C },
  { id: 'd', title: 'R – X', words: HSK5_D },
  { id: 'e', title: 'Y – Z', words: HSK5_E },
];
