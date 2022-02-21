import React from 'react';
import { Link } from 'react-router-dom';

export default function GameResults({
  resetGame,
  totalAnswers,
  score,
}: {
  resetGame: () => void;
  totalAnswers: Array<boolean>;
  score: number;
}) {
  const rightAnswers = totalAnswers.filter((elem: boolean) => elem).length;
  const classnames = {
    box: 'sprint-page__results-box results-box',
    title: 'results-box__title',
    button: 'button results-box__button',
    wordsBox: 'results-box__words',
    textContent: 'results-box__text-content',
    linksBox: 'results-box__links-box',
    linkToMain: 'link results-box__link results-box__link_main-page',
    linkToSprint: 'link results-box__link results-box__link_sprint-page',
  };

  const showWordsBox = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.classList.toggle('show-words-box');
  };

  return (
    <div className={classnames.box}>
      <button type="button" className={classnames.button} onClick={(e) => showWordsBox(e)} />
      <ul className={classnames.wordsBox} />
      <div className={classnames.textContent}>
        <h3 className={classnames.title}>Игра окончена</h3>
        <p>{`Правильных ответов: ${rightAnswers}`}</p>
        <p>{`Счет: ${score}`}</p>
      </div>
      <div className={classnames.linksBox}>
        <Link to="/" className={classnames.linkToMain}>
          На главную
        </Link>
        <Link to="/sprint" className={classnames.linkToSprint} onClick={resetGame}>
          Сыграть еще раз
        </Link>
      </div>
    </div>
  );
}
