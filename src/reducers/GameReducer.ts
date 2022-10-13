import { IGameState } from '../interfaces/GameState';
import { IGameAction } from '../interfaces/GameAction';
import { ILetter } from '../interfaces/Letter';

function getInitialPressedLetters(): ILetter[] {
  return Array<ILetter>(25).fill({ value: '', state: 'default' });
}

export const initialState: IGameState = {
  hasWon: false,
  hasLost: false,
  selectedWord: '',
  pressedLetters: getInitialPressedLetters(),
  wordCatalog: [],
};

export const reducer = (state: IGameState, action: IGameAction) => {
  switch (action.type) {
    case 'SET_SELECTED_WORD':
      const randomWord = state.wordCatalog[Math.floor(Math.random() * state.wordCatalog.length)];
      const newCatalog = state.wordCatalog.filter(word => word !== randomWord);
      return {
        ...state,
        selectedWord: randomWord,
        wordCatalog: newCatalog,
      };
    case 'SET_HAS_WON':
      return {
        ...state,
        hasWon: action.payload,
      };
    case 'SET_HAS_LOST':
      return {
        ...state,
        hasLost: action.payload,
      };
    case 'ADD_PRESSED_LETTER':
      return {
        ...state,
        pressedLetters: [...state.pressedLetters, action.payload],
      };
    case 'RESET_GAME':
      return {
        ...initialState,
      };
    case 'SET_WORD_CATALOG':
      return {
        ...state,
        wordCatalog: action.payload,
      };
    case 'SET_PRESSED_LETTERS':
      return {
        ...state,
        pressedLetters: action.payload,
      };
    default:
      return state;
  }
};
