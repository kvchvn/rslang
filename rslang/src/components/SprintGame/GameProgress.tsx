import React, { useEffect, useState } from 'react';

export default function GameProgress({
  rowProgress,
  totalProgress,
}: {
  rowProgress: number;
  totalProgress: Array<boolean>;
}) {
  const [points, setPoints] = useState(0);
  const rightAnswers = totalProgress.filter((elem) => elem).length;
  const combos = Math.ceil(rowProgress / 4);

  useEffect(() => {
    if (rowProgress === 0) setPoints(0);
    setPoints(points + 10 * combos);
  }, [rowProgress, totalProgress.length]);

  return (
    <div className="sprint-page__progress-box progress-box">
      <p className="progress-box__row-progress">{`Комбо: ${combos}`}</p>
      <p className="progress-box__total-points">{`Очки: ${points}`}</p>
      <p className="progress-box__total-progress">{`Правильных ответов: ${rightAnswers}`}</p>
    </div>
  );
}
