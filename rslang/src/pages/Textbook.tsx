import React from 'react';
import { Link } from 'react-router-dom';
import PageControls from '../components/Textbook/PageControls';
import Word from '../components/Textbook/Word';
import WordsList from '../components/Textbook/WordsList';
import GroupControls from '../components/Textbook/GroupControls';
import { useWordsData } from '../components/providers/WordsProvider';
import { IWordsProviderValue } from '../services/interfaces';
import { DIFFICULT_WEAK_WORD, WEAK_WORD } from '../services/requests';
import Footer from '../components/Footer';

export default function Textbook() {
  const { wordsData } = useWordsData() as IWordsProviderValue;

  const studiedWordsOnPage = wordsData.userWords.filter(
    (word) =>
      word.userWord.difficulty === WEAK_WORD || word.userWord.difficulty === DIFFICULT_WEAK_WORD
  ).length;
  const wordsOnPage = wordsData.wordsPage.length;
  const isStudiedPage = studiedWordsOnPage === wordsOnPage;

  const linkBasisClassname = 'textbook__link_';
  const classnames = {
    main: `page textbook-page textbook_${wordsData.group} textbook`,
    wrapper: 'wrapper textbook-wrapper',
    title: 'page__title textbook-page__title',
    mainSection: 'page__main-content textbook-page__main-content',
    wordsList: 'textbook__words-page words-page',
    gamesLinksBox: 'textbook__links',
    sprintLink: `link textbook__link ${linkBasisClassname}sprint ${
      isStudiedPage ? 'disabled' : ''
    }`,
    audiocallLink: `link textbook__link ${linkBasisClassname}audiocall ${
      isStudiedPage ? 'disabled' : ''
    }`,
  };

  return (
    <>
      <main className={classnames.main}>
        <div className={classnames.wrapper}>
          <h2 className={classnames.title}>Учебник</h2>
          <section className={classnames.mainSection}>
            <GroupControls />
            <Word />
            <article className={classnames.wordsList}>
              <WordsList />
              <PageControls isStudiedPage={isStudiedPage} />
            </article>
          </section>
          <div className={classnames.gamesLinksBox}>
            <Link to="/sprint" state="textbook" className={classnames.sprintLink}>
              <div className={`${linkBasisClassname}text`}>
                <p className={`${linkBasisClassname}title`}>Спринт</p>
                <p className={`${linkBasisClassname}description`}>
                  Переведи как можно больше слов на время
                </p>
              </div>
              <span className={`${linkBasisClassname}picture`} />
            </Link>
            <Link to="/audiocall" state="textbook" className={classnames.audiocallLink}>
              <div className={`${linkBasisClassname}text`}>
                <p className={`${linkBasisClassname}title`}>Аудиовызов</p>
                <p className={`${linkBasisClassname}description`}>Определи слово на слух</p>
              </div>
              <span className={`${linkBasisClassname}picture`} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
