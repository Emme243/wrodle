import LetterContainer, { ILetterState } from '../LetterContainer';
import { ILetter } from '../../interfaces/Letter';

interface IHowToPlayModalProps {
  onButtonClick: () => void;
}

type IExample = ILetter[];

function generateLetterObject(
  letter: string,
  condition: boolean,
  newStateAccordingToCondition: ILetterState
): ILetter {
  let state: ILetterState = 'default';
  if (condition) state = newStateAccordingToCondition;
  return { value: letter, state };
}
const example1: IExample = 'gatos'
  .split('')
  .map(letter => generateLetterObject(letter, letter === 'g', 'correct'));
const example2: IExample = 'vocal'
  .split('')
  .map(letter => generateLetterObject(letter, letter === 'c', 'close'));
const example3: IExample = 'canto'
  .split('')
  .map(letter => generateLetterObject(letter, letter === 'o', 'wrong'));

function generateExample(example: IExample) {
  return (
    <div className="align-center flex space-x-2">
      {example.map((letterObject, letterIndex) => (
        <LetterContainer
          key={`example-${letterIndex + 1}-letter-${letterObject.value}`}
          className="h-16 w-16"
          {...letterObject}
        />
      ))}
    </div>
  );
}

function Instructions({ onButtonClick }: IHowToPlayModalProps) {
  return (
    <div className="space-y-3">
      <div className="text-center">
        <h2 className="text-xl font-bold">Cómo jugar</h2>
      </div>
      <p className="leading-5">Adivína la palabra en oculta en cinco intentos</p>
      <p className="leading-5">Cada intento debe ser una palabra válida de 5 letras</p>
      <p className="leading-5">
        Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de
        acertar la palabra
      </p>
      <h3 className="font-bold">Ejemplos</h3>
      {generateExample(example1)}
      <p className="leading-5">
        La letra <span className="font-bold">G</span> está en la palabra y en la posición correcta.
      </p>
      {generateExample(example2)}
      <p className="leading-5">
        La letra <span className="font-bold">C</span> está en la palabra pero en la posición
        incorrecta.
      </p>
      {generateExample(example3)}
      <p className="leading-5">
        La letra <span className="font-bold">O</span> no está en la palabra
      </p>
      <div className="!mt-7 space-y-7">
        <p className="font-bold leading-5">
          Puede haber letras repetidas. Las pistas son independientes para cada letra.
        </p>
        <p className="text-center leading-5">¡Una palabra nueva cada 5 minutos!</p>
        <div className="text-center">
          <button
            className="rounded bg-green-400 px-4 py-1 text-xl font-bold dark:bg-green-800"
            onClick={() => onButtonClick()}
          >
            ¡JUGAR!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
