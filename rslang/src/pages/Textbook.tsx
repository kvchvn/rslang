import React from 'react';
import { Link } from 'react-router-dom';
import PageControls from '../components/Textbook/PageControls';
import Word from '../components/Textbook/Word';
import WordsList from '../components/Textbook/WordsList';
import GroupControls from '../components/Textbook/GroupControls';

export default function Textbook() {
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
