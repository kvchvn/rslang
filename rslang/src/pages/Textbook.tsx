import '../styles/textbook.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useWordsData } from '../components/providers/WordsProvider';
import PageControls from '../components/Textbook/PageControls';
import Word from '../components/Textbook/Word';
import { IWord } from '../services/interfaces';
import { MAX_GROUP_NUMBER } from '../services/requests';

export default function Textbook() {
  const { group, wordId, wordsPage, setWordsGroup, showWordCard } = useWordsData();

  return (
    <main className="page textbook-page textbook">
      <div className="wrapper">
        <h2 className="page__title textbook-page__title">Учебник</h2>
        <section className="page__main-content textbook-page__main-content">
          <nav onClick={setWordsGroup} className="textbook__group-nav group-nav">
            <h4 className="group-nav__title">Сложность</h4>
            {Array(MAX_GROUP_NUMBER + 1)
              .fill('')
              .map((_, index) => {
                return (
                  <button
                    type="button"
                    key={index}
                    data-group={index + 1}
                    className={`button group-nav__button group-nav__button_${index + 1} ${
                      index + 1 === group ? 'selected' : ''
                    }`}
                  >
                    <span
                      className={`group-nav__button-background group-nav__button-background_${
                        index + 1
                      }`}
                    />
                    <span className="group-nav__button-text">
                      {index === 6 ? 'Сложные слова' : `${index + 1}`}
                    </span>
                  </button>
                );
              })}
          </nav>
          <Word />
          <article className="textbook__words-page words-page">
            <ul onClick={showWordCard} className="words-page__words">
              {wordsPage.map((word: IWord) => (
                <li
                  key={word.id}
                  data-id={word.id}
                  className={`words-page__word ${word.id === wordId ? 'selected' : ''}`}
                >
                  {word.word}
                </li>
              ))}
            </ul>
            <PageControls />
          </article>
        </section>
        <div className="textbook__links">
          <Link to="/sprint" className="link textbook__link textbook__link_sprint">
            <div className="textbook__link_text">
              <p className="textbook__link_title">Спринт</p>
              <p className="textbook__link_description">Переведи как можно больше слов на время</p>
            </div>
            <span className="textbook__link_picture" />
          </Link>
          <Link to="/audiocall" className="link textbook__link textbook__link_audiocall">
            <div className="textbook__link_text">
              <p className="textbook__link_title">Аудиовызов</p>
              <p className="textbook__link_description">Определи слово на слух</p>
            </div>
            <span className="textbook__link_picture" />
          </Link>
        </div>
      </div>
    </main>
  );
}
