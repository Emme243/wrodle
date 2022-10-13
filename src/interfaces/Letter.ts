import { ReactNode } from 'react';

export type ILetterState = 'default' | 'correct' | 'close' | 'wrong';

export interface ILetter {
  state: ILetterState;
  value: ReactNode;
}
