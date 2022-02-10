import '../styles/textbook.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useWordsData } from '../components/providers/WordsProvider';
import PageControls from '../components/Textbook/PageControls';
import Word from '../components/Textbook/Word';
import { IWord } from '../services/interfaces';
import { MAX_GROUP_NUMBER } from '../services/requests';

export default function Textbook() {
  const { wordsPage, setWordsGroup, showWordCard } = useWordsData();

  return (
    <main className="page textbook-page textbook wrapper">
      <h2 className="page__title textbook-page__title">Учебник</h2>
      <section className="page__main-content textbook-page__main-content">
        <nav onClick={setWordsGroup} className="textbook__group-nav group-nav">
          <h4 className="group-nav__title">Разделы</h4>
          {Array(MAX_GROUP_NUMBER + 1)
            .fill('')
            .map((_, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  data-group={index + 1}
                  className={`button group-nav__button group-nav__button_${index + 1}`}
                >
                  {index === 6 ? 'Сложные слова' : `${index + 1}`}
                </button>
              );
            })}
        </nav>
        <Word />
        <article className="textbook__words-page words-page">
          <ul onClick={showWordCard} className="words-page__words">
            {wordsPage.map((word: IWord) => (
              <li key={word.id} data-id={word.id} className="words-page__word">
                {word.word}
              </li>
            ))}
          </ul>
          <PageControls />
        </article>
      </section>
      <div className="textbook__links">
        <Link to="/sprint">Sprint</Link>
        <Link to="/audiocall">Audio Call</Link>
      </div>
    </main>
  );
}
