export function secondsToMinutesAndSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes}m ${secondsLeft}s`;
}
