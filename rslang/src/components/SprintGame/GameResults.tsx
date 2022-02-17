import React from 'react';

export default function GameResults({
  totalAnswers,
  score,
}: {
  totalAnswers: Array<boolean>;
  score: number;
}) {
  const rightAnswers = totalAnswers.filter((elem: boolean) => elem).length;
  const classnames = {
    box: 'sprint-page__results-box results-box',
    title: 'results-box__title',
    rightAnswers: 'results-box__right-answers',
    score: 'results-box__score',
  };

  return (
    <div className={classnames.box}>
      <h3 className={classnames.title}>Игра закончена</h3>
      <p className={classnames.rightAnswers}>{`Правильных ответов: ${rightAnswers}`}</p>
      <p className={classnames.score}>{`Счет: ${score}`}</p>
    </div>
  );
}
