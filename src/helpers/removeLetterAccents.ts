export function removeLetterAccents(letter: string) {
  if (letter === 'ñ') return 'ñ';
  return letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
