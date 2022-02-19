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
    button: 'button results-box__button',
  };

  return (
    <div className={classnames.box}>
      <h3 className={classnames.title}>Игра окончена</h3>
      <p className={classnames.rightAnswers}>{`Правильных ответов: ${rightAnswers}`}</p>
      <p className={classnames.score}>{`Счет: ${score}`}</p>
      <button type="button" className={classnames.button} />
    </div>
  );
}
