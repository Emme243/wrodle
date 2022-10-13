import { useEffect, useState } from 'react';

function useTimer(initialSeconds: number, stopCondition?: boolean) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isTimerDone, setIsTimerDone] = useState(false);

  let timer: number;
  useEffect(() => {
    timer = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds === 0 || stopCondition) stopTimer();
    if (seconds === 0) setIsTimerDone(true);
  }, [seconds, stopCondition]);

  function restartTimer() {
    setIsTimerDone(false);
    setSeconds(initialSeconds);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  return { seconds, restartTimer, isTimerDone };
}

export default useTimer;
