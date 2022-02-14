import React from 'react';
import { Link } from 'react-router-dom';
import PageControls from '../components/Textbook/PageControls';
import Word from '../components/Textbook/Word';
import WordsList from '../components/Textbook/WordsList';
import GroupControls from '../components/Textbook/GroupControls';

export default function Textbook() {
  const textbookBasisClassname = 'textbook__link_';

  return (
    <main className="page textbook-page textbook">
      <div className="wrapper">
        <h2 className="page__title textbook-page__title">Учебник</h2>
        <section className="page__main-content textbook-page__main-content">
          <GroupControls />
          <Word />
          <article className="textbook__words-page words-page">
            <WordsList />
            <PageControls />
          </article>
        </section>
        <div className="textbook__links">
          <Link to="/sprint" className={`link textbook__link ${textbookBasisClassname}sprint`}>
            <div className={`${textbookBasisClassname}text`}>
              <p className={`${textbookBasisClassname}title`}>Спринт</p>
              <p className={`${textbookBasisClassname}description`}>
                Переведи как можно больше слов на время
              </p>
            </div>
            <span className={`${textbookBasisClassname}picture`} />
          </Link>
          <Link
            to="/audiocall"
            className={`link textbook__link ${textbookBasisClassname}audiocall`}
          >
            <div className={`${textbookBasisClassname}text`}>
              <p className={`${textbookBasisClassname}title`}>Аудиовызов</p>
              <p className={`${textbookBasisClassname}description`}>Определи слово на слух</p>
            </div>
            <span className={`${textbookBasisClassname}picture`} />
          </Link>
        </div>
      </div>
    </main>
  );
}
