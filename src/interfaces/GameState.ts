import { ILetter } from './Letter';

export interface IGameState {
  hasWon: boolean;
  hasLost: boolean;
  isGameOver: boolean;
  selectedWord: string;
  pressedLetters: ILetter[];
  wordCatalog: string[];
  numberOfVictories: number;
  numberOfGames: number;
}
