export function removeLetterAccents(letter: string) {
  if (letter.toLowerCase() === 'ñ') return 'ñ';
  return letter
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
