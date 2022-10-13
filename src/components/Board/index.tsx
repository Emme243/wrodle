import LetterContainer from '../LetterContainer';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';

function Board() {
  const { pressedLetters } = useContext(GameContext);

  return (
    <div className="mx-auto grid w-full grid-cols-5 grid-rows-5 gap-2 xs:w-[90%] sm:w-[70%]">
      {pressedLetters.map((letter, index) => (
        <LetterContainer key={index} letter={letter} className="h-16" />
      ))}
    </div>
  );
}

export default Board;
