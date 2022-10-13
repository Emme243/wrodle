import { GameContext } from '../../contexts/GameContext';
import { useContext } from 'react';
import Modal from '../Modal';

interface IStatisticsProps {
  isOpen: boolean;
  onClose: () => void;
}

function Statistics({ onClose, isOpen }: IStatisticsProps) {
  const { isGameOver, hasLost, selectedWord, numberOfVictories, numberOfGames, resetGame } =
    useContext(GameContext);

  function handleClose() {
    if (isGameOver) resetGame();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-7">
        <div className="text-center">
          <h2 className="text-xl font-bold">Estadísticas</h2>
        </div>
        <div className="flex justify-evenly">
          <div className="flex flex-col items-center space-y-1">
            <span className="text-xl font-bold">{numberOfGames}</span>
            <span>Jugadas</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <span className="text-xl font-bold">{numberOfVictories}</span>
            <span>Victorias</span>
          </div>
        </div>
        {hasLost && (
          <p className="text-center">
            La palabra era: <span className="font-bold uppercase">{selectedWord}</span>
          </p>
        )}
        <div className="flex flex-col items-center">
          <p>SIGUIENTE PALABRA</p>
          <p className="font-bold">04:10</p>
        </div>
        <div className="text-center">
          <button
            className="rounded bg-green-400 px-4 py-1 text-xl font-bold dark:bg-green-800"
            onClick={() => handleClose()}
          >
            Aceptar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Statistics;
