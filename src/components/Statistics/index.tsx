import { GameContext } from '../../contexts/GameContext';
import { useContext } from 'react';

interface IStatisticsProps {
  onButtonClick: () => void;
}

function Statistics({ onButtonClick }: IStatisticsProps) {
  const { hasLost, selectedWord } = useContext(GameContext);

  return (
    <div className="space-y-7">
      <div className="text-center">
        <h2 className="text-xl font-bold">Estadísticas</h2>
      </div>
      <div className="flex justify-evenly">
        <div className="flex flex-col items-center space-y-1">
          <span className="text-xl font-bold">8</span>
          <span>Jugadas</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="text-xl font-bold">2</span>
          <span>Victorias</span>
        </div>
      </div>
      <p className="text-center">
        La palabra era: <span className="font-bold uppercase">{selectedWord}</span>
      </p>
      <div className="flex flex-col items-center">
        <p>SIGUIENTE PALABRA</p>
        <p className="font-bold">04:10</p>
      </div>
      <div className="text-center">
        <button
          className="rounded bg-green-400 px-4 py-1 text-xl font-bold dark:bg-green-800"
          onClick={() => onButtonClick()}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}

export default Statistics;
