import { useContext, useEffect, useState } from 'react';
import { FaQuestionCircle, FaChartBar } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import ToggleButton from '../ToggleButton';
import Instructions from '../Instructions';
import Statistics from '../Statistics';
import { GameContext } from '../../contexts/GameContext';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isGameOver } = useContext(GameContext);

  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
  const handleInstructionsModalClose = () => setIsInstructionsModalOpen(false);
  const handleInstructionsModalOpen = () => setIsInstructionsModalOpen(true);

  const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false);
  const handleStatisticsModalClose = () => setIsStatisticsModalOpen(false);
  const handleStatisticsModalOpen = () => setIsStatisticsModalOpen(true);

  useEffect(() => {
    const isFistTime = localStorage.getItem('isFistTime');
    if (!isFistTime) {
      handleInstructionsModalOpen();
      setTimeout(() => localStorage.setItem('isFistTime', 'false'), 1000);
    }
  }, []);
  useEffect(() => {
    if (isGameOver) handleStatisticsModalOpen();
  }, [isGameOver]);

  return (
    <>
      <header className="flex items-center justify-between rounded-md bg-gray-100 px-8 py-4 text-lg dark:bg-zinc-800">
        <FaQuestionCircle className="cursor-pointer" onClick={handleInstructionsModalOpen} />
        <h1 className="ml-auto font-bold tracking-wider">WORDLE</h1>
        <FaChartBar onClick={handleStatisticsModalOpen} className="ml-auto mr-4 cursor-pointer" />
        <ToggleButton isActive={theme === 'light'} handleToggleSwitch={toggleTheme} />
      </header>
      <Instructions isOpen={isInstructionsModalOpen} onClose={handleInstructionsModalClose} />
      <Statistics isOpen={isStatisticsModalOpen} onClose={handleStatisticsModalClose} />
    </>
  );
}

export default Header;
