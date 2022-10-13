import { IGameState } from '../interfaces/GameState';
import { IGameAction } from '../interfaces/GameAction';
import { ILetter } from '../interfaces/Letter';
import { removeLetterAccents } from '../helpers/removeLetterAccents';

function getInitialPressedLetters(): ILetter[] {
  return Array<ILetter>(25).fill({ value: '', state: 'default' });
}

export const initialState: IGameState = {
  hasWon: false,
  hasLost: false,
  selectedWord: '',
  pressedLetters: getInitialPressedLetters(),
  wordCatalog: [],
  numberOfGames: 0,
  numberOfVictories: 0,
  isGameOver: false
};

export const reducer = (state: IGameState, action: IGameAction): IGameState => {
  switch (action.type) {
    case 'SET_SELECTED_WORD': {
      const randomWord = state.wordCatalog[Math.floor(Math.random() * state.wordCatalog.length)];
      const newCatalog = state.wordCatalog.filter(word => word !== randomWord);
      return {
        ...state,
        selectedWord: randomWord,
        wordCatalog: newCatalog
      };
    }
    case 'CHECK_HAS_WON': {
      const lastFiveLetters = state.pressedLetters.filter(letter => letter.value !== '').slice(-5);
      const wordGuessed = lastFiveLetters.map(letter => letter.value).join('');
      const selectedWordWithoutAccents = state.selectedWord
        .split('')
        .map(removeLetterAccents)
        .join('');
      const hasWon = wordGuessed === selectedWordWithoutAccents;

      return {
        ...state,
        hasWon
      };
    }
    case 'CHECK_HAS_LOST': {
      const lastFiveLettersAreWrong = state.pressedLetters
        .slice(-5)
        .some(letter => letter.state === 'wrong' || letter.state === 'close');
      const hasLost = state.pressedLetters.length === 25 && lastFiveLettersAreWrong;

      return {
        ...state,
        hasLost
      };
    }
    case 'ADD_PRESSED_LETTER': {
      const newPressedLetters = [...state.pressedLetters];
      const index = newPressedLetters.findIndex(letter => letter.value === '');
      newPressedLetters[index] = action.payload as ILetter;
      return {
        ...state,
        pressedLetters: newPressedLetters
      };
    }
    case 'BACKSPACE': {
      const newPressedLetters = [...state.pressedLetters];
      const index2 = newPressedLetters.findIndex(letter => letter.value === '');
      newPressedLetters[index2 - 1] = { value: '', state: 'default' };
      return {
        ...state,
        pressedLetters: newPressedLetters
      };
    }
    case 'RESET_GAME': {
      return {
        ...initialState,
        wordCatalog: state.wordCatalog,
        numberOfGames: state.numberOfGames,
        numberOfVictories: state.numberOfVictories
      };
    }
    case 'SET_WORD_CATALOG': {
      return {
        ...state,
        wordCatalog: action.payload as string[]
      };
    }
    case 'SET_PRESSED_LETTERS': {
      return {
        ...state,
        pressedLetters: action.payload as ILetter[]
      };
    }
    case 'INCREMENT_NUMBER_OF_GAMES': {
      return {
        ...state,
        numberOfGames: state.numberOfGames + 1
      };
    }
    case 'INCREMENT_NUMBER_OF_VICTORIES': {
      return {
        ...state,
        numberOfVictories: state.numberOfVictories + 1
      };
    }
    case 'SET_IS_GAME_OVER': {
      return {
        ...state,
        isGameOver: action.payload as boolean
      };
    }
    default:
      return state;
  }
};
