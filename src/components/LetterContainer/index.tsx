import { ILetter } from '../../interfaces/Letter';

interface ILetterContainerProps {
  letter: ILetter;
  size?: 'small' | 'medium';
  className?: string;
  onClick?: () => void;
}

function LetterContainer({ letter, size = 'medium', className, onClick }: ILetterContainerProps) {
  const fontSizeClass = size === 'small' ? 'text-base' : 'text-2xl font-bold';
  function letterBackground() {
    switch (letter.state) {
      case 'correct':
        return 'bg-green-400 dark:bg-green-800';
      case 'close':
        return 'bg-yellow-300 dark:bg-yellow-600';
      case 'wrong':
        return 'bg-gray-400 dark:bg-gray-600';
      default:
        return '';
    }
  }

  return (
    <div
      className={`flex items-center justify-center rounded-md border border-zinc-300 capitalize dark:border-zinc-700 ${
        className ?? ''
      } ${letterBackground()}`}
      onClick={onClick}
    >
      <span className={fontSizeClass}>{letter.value}</span>
    </div>
  );
}

export default LetterContainer;
