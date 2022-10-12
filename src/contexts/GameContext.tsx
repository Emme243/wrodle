import { createContext, useEffect, useState, ReactNode } from 'react';
import { KeyLetter } from '../interfaces/Key';
import WordCatalog from '../content/word-catalog.txt';

interface IPressLetterContextProviderProps {
  children: ReactNode;
}

interface IPressLetterContext {
  pressedKeys: KeyLetter[];
  setPressedKey: (key: string) => void;
  hasLost: boolean;
  hasWon: boolean;
  selectedWord: string;
}

const GameContext = createContext<IPressLetterContext>({
  pressedKeys: [],
  setPressedKey: () => {},
  hasLost: false,
  hasWon: false,
  selectedWord: '',
});

function GameContextProvider({ children }: IPressLetterContextProviderProps) {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [pressedKeys, setPressedKeys] = useState<KeyLetter[]>(
    Array<KeyLetter>(25).fill({ letter: '', state: 'default' })
  );
  useEffect(() => {
    if (pressedKey && pressedKey !== 'backspace' && pressedKey !== 'enter') {
      setPressedKeys(prev => {
        const newLetters = [...prev];
        const index = newLetters.map(({ letter }) => letter).indexOf('');
        if (index !== -1) {
          newLetters[index] = { letter: pressedKey, state: 'default' };
        }
        return newLetters;
      });
      setPressedKey(null);
    }
  }, [pressedKey]);
  useEffect(() => {
    const downHandler = (keyboardEvent: KeyboardEvent) => {
      const { code, key } = keyboardEvent;
      if (code.startsWith('Key')) setPressedKey(key);
      else setPressedKey(null);
    };
    const upHandler = () => setPressedKey(null);

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  const [selectedWord, setSelectedWord] = useState<string>('');
  const [wordCatalog, setWordCatalog] = useState<string[]>([]);
  const [hasLost, setHasLost] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  function initGame() {
    setHasLost(false);
    setHasWon(false);
    setPressedKeys(Array<KeyLetter>(25).fill({ letter: '', state: 'default' }));
    selectRandomWord();
  }
  function selectRandomWord() {
    const randomWord = wordCatalog[Math.floor(Math.random() * wordCatalog.length)];
    setSelectedWord(randomWord);
    const newCatalog = wordCatalog.filter(word => word !== randomWord);
    setWordCatalog(newCatalog);
  }
  async function fetchWordCatalog() {
    const response = await fetch(WordCatalog);
    const text = await response.text();
    const words = text.split('\n').filter(word => word.length === 5);
    setWordCatalog(words);
  }
  useEffect(() => {
    fetchWordCatalog().then(() => initGame());
  }, []);

  return (
    <GameContext.Provider value={{ pressedKeys, setPressedKey, hasLost, hasWon, selectedWord }}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameContextProvider };
