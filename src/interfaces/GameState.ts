import { ILetter } from './Letter';

export interface IGameState {
  hasWon: boolean;
  hasLost: boolean;
  selectedWord: string;
  pressedLetters: ILetter[];
  wordCatalog: string[];
}
