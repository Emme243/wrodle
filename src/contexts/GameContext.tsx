import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import { ILetter } from '../interfaces/Letter';
import WordCatalog from '../content/word-catalog.txt';
import { initialState, reducer } from '../reducers/GameReducer';
import { IGameState } from '../interfaces/GameState';
import { IGameAction } from '../interfaces/GameAction';
import { removeLetterAccents } from '../helpers/removeLetterAccents';

interface IGameContextProviderProps {
  children: ReactNode;
}

type IGameContext = {
  setPressedLetter: React.Dispatch<React.SetStateAction<string | null>>;
  dispatch: React.Dispatch<IGameAction>;
  hasWon: boolean;
  hasLost: boolean;
  selectedWord: string;
  pressedLetters: ILetter[];
  numberOfVictories: number;
  numberOfGames: number;
  isGameOver: boolean;
  resetGame: () => void;
  backspace: () => void;
};

const GameContext = createContext<IGameContext>({
  pressedLetters: [],
  setPressedLetter: () => {},
  hasLost: false,
  hasWon: false,
  selectedWord: '',
  dispatch: () => {},
  numberOfGames: 0,
  numberOfVictories: 0,
  isGameOver: false,
  resetGame: () => {},
  backspace: () => {},
});

function GameContextProvider({ children }: IGameContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { hasLost, hasWon, selectedWord, pressedLetters, isGameOver } = state as IGameState;

  async function fetchWordCatalog() {
    const response = await fetch(WordCatalog);
    const text = await response.text();
    return text.split('\n').filter(word => word.length === 5);
  }
  function resetGame() {
    dispatch({ type: 'RESET_GAME' });
    dispatch({ type: 'SET_SELECTED_WORD' });
  }

  const [pressedLetter, setPressedLetter] = useState<string | null>(null);
  useEffect(() => {
    if (isGameOver) return;
    if (pressedLetter === null) return;
    const letter: ILetter = { value: pressedLetter, state: 'default' };
    dispatch({ type: 'ADD_PRESSED_LETTER', payload: letter });
    setPressedLetter(null);
  }, [pressedLetter, isGameOver]);

  useEffect(() => {
    const downHandler = (keyboardEvent: KeyboardEvent) => {
      const { code, key } = keyboardEvent;
      if (code.startsWith('Key')) setPressedLetter(key.toLowerCase());
      else if (code === 'Backspace') backspace();
      else setPressedLetter(null);
    };
    const upHandler = () => setPressedLetter(null);
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    fetchWordCatalog().then(function (words) {
      dispatch({ type: 'RESET_GAME' });
      dispatch({ type: 'SET_WORD_CATALOG', payload: words });
      dispatch({ type: 'SET_SELECTED_WORD' });
    });
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  useEffect(() => {
    const pressedLettersWithValues = pressedLetters.filter(letter => letter.value !== '');
    if (pressedLettersWithValues.length > 0 && pressedLettersWithValues.length % 5 === 0) {
      const lastFiveLetters = pressedLettersWithValues.slice(-5);
      const lettersFromSelectedWord = selectedWord
        .split('')
        .map(letter => ({ value: letter, state: 'default' }));
      lastFiveLetters.forEach((letter, index) => {
        const letterWithoutAccent = removeLetterAccents(lettersFromSelectedWord[index].value);
        if (letter.value === letterWithoutAccent) letter.state = 'correct';
        else if (
          lettersFromSelectedWord
            .map(letter => ({ value: removeLetterAccents(letter.value) }))
            .some(l => l.value === letter.value)
        )
          letter.state = 'close';
        else letter.state = 'wrong';
      });
      dispatch({ type: 'SET_PRESSED_LETTERS', payload: pressedLetters });
      dispatch({ type: 'CHECK_HAS_LOST' });
      dispatch({ type: 'CHECK_HAS_WON' });
    }
  }, [pressedLetters]);

  useEffect(() => {
    if (hasWon || hasLost) {
      dispatch({ type: 'SET_IS_GAME_OVER', payload: true });
      dispatch({ type: 'INCREMENT_NUMBER_OF_GAMES' });
    }
    if (hasWon) dispatch({ type: 'INCREMENT_NUMBER_OF_VICTORIES' });
  }, [hasWon, hasLost]);

  function backspace() {
    if (isGameOver) return;
    dispatch({ type: 'BACKSPACE' });
  }

  return (
    <GameContext.Provider
      value={{
        dispatch,
        setPressedLetter,
        resetGame,
        backspace,
        hasLost: state.hasLost,
        hasWon: state.hasWon,
        selectedWord: state.selectedWord,
        pressedLetters: state.pressedLetters,
        numberOfGames: state.numberOfGames,
        numberOfVictories: state.numberOfVictories,
        isGameOver: state.isGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameContextProvider };
