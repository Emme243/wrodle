import { useEffect, useState } from 'react';

function useTimer(initialSeconds: number, stopCondition?: boolean) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isTimerDone, setIsTimerDone] = useState(false);

  let timer: number;
  useEffect(() => {
    timer = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds === 0 || stopCondition === true) stopTimer();
    if (seconds === 0) setIsTimerDone(true);
  }, [seconds, stopCondition]);

  function restartTimer(): void {
    setIsTimerDone(false);
    setSeconds(initialSeconds);
  }

  function stopTimer(): void {
    clearInterval(timer);
  }

  return { seconds, restartTimer, isTimerDone };
}

export default useTimer;
