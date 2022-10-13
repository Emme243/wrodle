import { ILetter } from './Letter';

export interface IGameState {
  hasLost: boolean;
  hasWon: boolean;
  isGameOver: boolean;
  numberOfGames: number;
  numberOfVictories: number;
  pressedLetters: ILetter[];
  selectedWord: string;
  wordCatalog: string[];
}
