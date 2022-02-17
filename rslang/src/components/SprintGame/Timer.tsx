import React, { useState, useEffect } from 'react';

const ROUND_TIME = 30;

export default function Timer({ endRound, isEnded }: { endRound: () => void; isEnded: boolean }) {
  const [seconds, setSeconds] = useState(ROUND_TIME);
  const classnames = {
    box: 'sprint-page__timer-box timer-box',
    time: 'timer-box__time',
  };

  useEffect(() => {
    if (isEnded) {
      setSeconds(0);
    }

    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    endRound();
  }, [seconds]);

  return (
    <div className={classnames.box}>
      <span className={classnames.time}>{seconds}</span>
    </div>
  );
}
