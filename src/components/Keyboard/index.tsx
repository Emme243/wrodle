import { FiDelete } from 'react-icons/all';
import LetterContainer from '../LetterContainer';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
];

function Keyboard() {
  const { setPressedLetter, backspace } = useContext(GameContext);

  function onClickLetter(letter: string) {
    switch (letter) {
      case 'backspace':
        backspace();
        break;
      case 'enter':
        setPressedLetter(null);
        break;
      default:
        setPressedLetter(letter);
    }
  }

  function rowClasses(rowIndex: number) {
    switch (rowIndex) {
      case 0:
        return 'justify-start ml-8';
      case 1:
        return 'justify-end';
      case 2:
        return 'justify-start';
      default:
        return '';
    }
  }

  function letterClasses(letter: string) {
    switch (letter) {
      case 'enter':
        return 'w-20';
      case 'backspace':
        return 'w-16';
      default:
        return 'h-10 w-10';
    }
  }

  function letterToDisplay(letter: string) {
    switch (letter) {
      case 'enter':
        return 'Enter';
      case 'backspace':
        return <FiDelete />;
      default:
        return letter;
    }
  }

  return (
    <div className="keyboard space-y-2 rounded-xl bg-gray-100 p-3 dark:bg-zinc-800">
      {keyboardRows.map((row, rowIndex) => (
        <div
          key={`keyboard-row-${rowIndex}`}
          className={`flex items-stretch space-x-2 ${rowClasses(rowIndex)}`}
        >
          {row.map((letter, letterIndex) => (
            <LetterContainer
              key={letterIndex}
              letter={{ value: letterToDisplay(letter), state: 'default' }}
              size="small"
              onClick={() => onClickLetter(letter)}
              className={letterClasses(letter) + ' cursor-pointer'}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
