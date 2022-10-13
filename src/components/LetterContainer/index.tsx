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
        return 'bg-green text-white';
      case 'close':
        return 'bg-yellow text-white';
      case 'wrong':
        return 'bg-gray text-white';
      default:
        return 'bg-gray/30';
    }
  }

  return (
    <div
      className={`flex items-center justify-center rounded-md capitalize dark:border-zinc-700 ${
        className ?? ''
      } ${letterBackground()}`}
      onClick={onClick}
    >
      <span className={fontSizeClass}>{letter.value}</span>
    </div>
  );
}

export default LetterContainer;
