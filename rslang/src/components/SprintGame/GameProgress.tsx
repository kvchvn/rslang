import React from 'react';

const ADD_COMBO_FOR_RIGHT_ANSWERS_AMOUNT = 4;

export default function GameProgress({
  rowRightAnswers,
  totalAnswers,
  score,
}: {
  rowRightAnswers: number;
  totalAnswers: Array<boolean>;
  score: number;
}) {
  const combos = Math.ceil(rowRightAnswers / ADD_COMBO_FOR_RIGHT_ANSWERS_AMOUNT) || 1;
  const rightAnswers = totalAnswers.filter((elem: boolean) => elem).length;
  const classnames = {
    box: 'sprint-page__progress-box progress-box',
    combos: 'progress-box__row-progress',
    score: 'progress-box__score',
    rightAnswers: 'progress-box__right-answers',
  };

  return (
    <div className={classnames.box}>
      <p className={classnames.combos}>{`Комбо: ${combos}`}</p>
      <p className={classnames.score}>{`Счет: ${score}`}</p>
      <p className={classnames.rightAnswers}>{`Правильных ответов: ${rightAnswers}`}</p>
    </div>
  );
}
