import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useReducer,
  useState
} from 'react';
import { ILetter } from '../interfaces/Letter';
import WordCatalog from '../content/word-catalog.txt';
import { initialState, reducer } from '../reducers/GameReducer';
import { IGameAction } from '../interfaces/GameAction';
import { removeLetterAccents } from '../helpers/removeLetterAccents';
import useTimer from '../hooks/useTimer';
import getPressedLettersWithValues from '../helpers/getPressedLettersWithValues';

interface IGameContextProviderProps {
  children: ReactNode;
}

interface IGameContext {
  dispatch: Dispatch<IGameAction>;
  hasLost: boolean;
  hasWon: boolean;
  isGameOver: boolean;
  numberOfGames: number;
  numberOfVictories: number;
  pressedLetters: ILetter[];
  resetGame: () => void;
  secondsInTimer: number;
  selectedWord: string;
  setIsBackspacePressed: Dispatch<SetStateAction<boolean>>;
  setPressedLetter: Dispatch<SetStateAction<string | null>>;
}

const SECONDS_IN_TIMER = 300;

const GameContext = createContext<IGameContext>({
  dispatch: () => {},
  hasLost: false,
  hasWon: false,
  isGameOver: false,
  numberOfGames: 0,
  numberOfVictories: 0,
  pressedLetters: [],
  resetGame: () => {},
  secondsInTimer: SECONDS_IN_TIMER,
  selectedWord: '',
  setIsBackspacePressed: () => {},
  setPressedLetter: () => {}
});

function GameContextProvider({ children }: IGameContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    hasLost,
    hasWon,
    isGameOver,
    numberOfGames,
    numberOfVictories,
    pressedLetters,
    selectedWord
  } = state;

  const {
    seconds: secondsInTimer,
    restartTimer,
    isTimerDone
  } = useTimer(SECONDS_IN_TIMER, isGameOver);
  function resetGame() {
    dispatch({ type: 'RESET_GAME' });
    dispatch({ type: 'SET_SELECTED_WORD' });
    restartTimer();
  }
  useEffect(() => {
    if (isTimerDone) {
      dispatch({ type: 'INCREMENT_NUMBER_OF_GAMES' });
      resetGame();
    }
  }, [isTimerDone]);

  const [isBackspacePressed, setIsBackspacePressed] = useState(false);
  useEffect(() => {
    if (isGameOver) return;
    if (!isBackspacePressed) return;
    const pressedLettersWithValues = getPressedLettersWithValues(pressedLetters);
    if (pressedLettersWithValues.length > 0 && pressedLettersWithValues.length % 5 !== 0)
      dispatch({ type: 'BACKSPACE' });
    setIsBackspacePressed(false);
  }, [isBackspacePressed, isGameOver]);

  const [pressedLetter, setPressedLetter] = useState<string | null>(null);
  useEffect(() => {
    if (isGameOver) return;
    if (pressedLetter === null) return;
    const letter: ILetter = { value: removeLetterAccents(pressedLetter), state: 'default' };
    dispatch({ type: 'ADD_PRESSED_LETTER', payload: letter });
    setPressedLetter(null);
  }, [pressedLetter, isGameOver]);

  async function fetchWordCatalog() {
    const response = await fetch(WordCatalog);
    const text = await response.text();
    return text.split('\n').filter(word => word.length === 5);
  }
  useEffect(() => {
    const downHandler = (keyboardEvent: KeyboardEvent) => {
      const { code, key } = keyboardEvent;
      if (code.startsWith('Key')) setPressedLetter(key.toLowerCase());
      else if (code === 'Backspace') setIsBackspacePressed(true);
      else setPressedLetter(null);
    };
    const upHandler = () => setPressedLetter(null);
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    void fetchWordCatalog().then(function (words) {
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
    const pressedLettersWithValues = getPressedLettersWithValues(pressedLetters);
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
        ) {
          letter.state = 'close';
        } else letter.state = 'wrong';
      });
      dispatch({ type: 'SET_PRESSED_LETTERS', payload: pressedLetters });
      dispatch({ type: 'CHECK_HAS_LOST' });
      dispatch({ type: 'CHECK_HAS_WON' });
    }
  }, [pressedLetters]);

  useEffect(() => {
    if (hasWon) {
      dispatch({ type: 'INCREMENT_NUMBER_OF_VICTORIES' });
      dispatch({ type: 'SET_IS_GAME_OVER', payload: true });
      dispatch({ type: 'INCREMENT_NUMBER_OF_GAMES' });
    }
    if (hasLost) {
      dispatch({ type: 'SET_IS_GAME_OVER', payload: true });
      dispatch({ type: 'INCREMENT_NUMBER_OF_GAMES' });
    }
  }, [hasWon, hasLost, dispatch]);

  return (
    <GameContext.Provider
      value={{
        dispatch,
        hasLost,
        hasWon,
        isGameOver,
        numberOfGames,
        numberOfVictories,
        pressedLetters,
        resetGame,
        secondsInTimer,
        selectedWord,
        setIsBackspacePressed,
        setPressedLetter
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameContextProvider };
