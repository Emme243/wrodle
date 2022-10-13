import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import { ILetter } from '../interfaces/Letter';
import WordCatalog from '../content/word-catalog.txt';
import { initialState, reducer } from '../reducers/GameReducer';
import { IGameState } from '../interfaces/GameState';
import { IGameAction } from '../interfaces/GameAction';

interface IPressLetterContextProviderProps {
  children: ReactNode;
}

type IPressLetterContext = {
  setPressedLetter: (letter: string) => void;
  dispatch: React.Dispatch<IGameAction>;
  hasWon: boolean;
  hasLost: boolean;
  selectedWord: string;
  pressedLetters: ILetter[];
};

const GameContext = createContext<IPressLetterContext>({
  pressedLetters: [],
  setPressedLetter: () => {},
  hasLost: false,
  hasWon: false,
  selectedWord: '',
  dispatch: () => {},
});

function GameContextProvider({ children }: IPressLetterContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { hasLost, hasWon, selectedWord, pressedLetters } = state as IGameState;

  async function fetchWordCatalog() {
    const response = await fetch(WordCatalog);
    const text = await response.text();
    return text.split('\n').filter(word => word.length === 5);
  }
  function initGame() {
    dispatch({ type: 'RESET_GAME' });
    fetchWordCatalog().then(function (words) {
      dispatch({ type: 'SET_WORD_CATALOG', payload: words });
      dispatch({ type: 'SET_SELECTED_WORD' });
    });
  }
  useEffect(() => {
    const downHandler = (keyboardEvent: KeyboardEvent) => {
      const { code, key } = keyboardEvent;
      if (code.startsWith('Key')) setPressedLetter(key);
      else setPressedLetter(null);
    };
    const upHandler = () => setPressedLetter(null);
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    initGame();
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  const [pressedLetter, setPressedLetter] = useState<string | null>(null);
  useEffect(() => {
    if (pressedLetter && pressedLetter !== 'backspace' && pressedLetter !== 'enter') {
      const newPressedLetters = [...pressedLetters];
      const index = newPressedLetters.findIndex(letter => letter.value === '');
      if (index !== -1) {
        newPressedLetters[index] = { value: pressedLetter, state: 'default' };
        dispatch({ type: 'SET_PRESSED_LETTERS', payload: newPressedLetters });
      }
      setPressedLetter(null);
    }
  }, [pressedLetter]);

  return (
    <GameContext.Provider
      value={{ pressedLetters, setPressedLetter, hasLost, hasWon, selectedWord, dispatch }}
    >
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameContextProvider };
