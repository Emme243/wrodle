import Letter from '../Letter';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';

function Board() {
  const { pressedKeys } = useContext(GameContext);

  return (
    <div className="mx-auto grid w-[70%] grid-cols-5 grid-rows-5 gap-2">
      {pressedKeys.map((key, index) => (
        <Letter key={index} {...key} className="h-16" />
      ))}
    </div>
  );
}

export default Board;
