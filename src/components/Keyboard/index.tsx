import { FiDelete } from 'react-icons/all';
import LetterContainer from '../LetterContainer';
import { ReactNode, useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { ILetter } from '../../interfaces/Letter';

const generateLetterObject = (letter: ReactNode): ILetter => ({ value: letter, state: 'default' });
const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map(generateLetterObject),
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'].map(generateLetterObject),
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'].map(generateLetterObject)
];

function Keyboard() {
  const { setPressedLetter, setIsBackspacePressed, pressedLetters } = useContext(GameContext);

  function onClickLetter(letter: ILetter['value']) {
    switch (letter) {
      case 'backspace':
        setIsBackspacePressed(true);
        break;
      case 'enter':
        setPressedLetter(null);
        break;
      default:
        setPressedLetter(letter as string);
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

  function letterClasses(letter: ILetter['value']) {
    switch (letter) {
      case 'enter':
        return 'w-20';
      case 'backspace':
        return 'w-16';
      default:
        return 'h-10 w-10';
    }
  }

  function letterToDisplay(letter: ILetter['value']) {
    switch (letter) {
      case 'enter':
        return 'Enter';
      case 'backspace':
        return <FiDelete />;
      default:
        return letter;
    }
  }

  function checkLetterState(letter: ILetter): ILetter['state'] {
    const letterInPressedLetters = pressedLetters.find(
      pressedLetter => pressedLetter.value === letter.value
    );
    if (letterInPressedLetters) return letterInPressedLetters.state;
    return 'default';
  }

  return (
    <div className="keyboard space-y-2 rounded-xl bg-[#dadce0]/30 p-3">
      {keyboardRows.map((row, rowIndex) => (
        <div
          key={`keyboard-row-${rowIndex}`}
          className={`flex items-stretch space-x-2 ${rowClasses(rowIndex)}`}
        >
          {row.map((letter, letterIndex) => (
            <LetterContainer
              key={letterIndex}
              letter={{ value: letterToDisplay(letter.value), state: checkLetterState(letter) }}
              size="small"
              onClick={() => onClickLetter(letter.value)}
              className={letterClasses(letter.value) + ' cursor-pointer'}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
