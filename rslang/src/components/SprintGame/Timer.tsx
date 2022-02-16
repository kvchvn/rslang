import React, { useState, useEffect } from 'react';

const ROUND_TIME = 5;

export default function Timer({ endRound }: { endRound: () => void }) {
  const [seconds, setSeconds] = useState(ROUND_TIME);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    endRound();
  }, [seconds]);

  return <p>{seconds}</p>;
}
