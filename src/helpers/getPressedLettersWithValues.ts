import { ILetter } from '../interfaces/Letter';

function getPressedLettersWithValues(pressedLetters: ILetter[]) {
  return pressedLetters.filter(letter => Boolean(letter.value));
}

export default getPressedLettersWithValues;
