import React from 'react';
import { IWordsProviderValue } from '../../services/interfaces';
import { MAX_GROUP_NUMBER, MAX_PAGE_NUMBER } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function PageControls({ isStudiedPage }: { isStudiedPage: boolean }) {
  const { wordsData, setNextPage, setPrevPage, setPage } = useWordsData() as IWordsProviderValue;

  const buttonBasisClassname = `button ${
    isStudiedPage ? 'studied-page' : ''
  } page-nav__button page-nav__button_`;

  const classnames = {
    navBox: 'textbook-page__page-nav page-nav',
    buttonPrev: `${buttonBasisClassname}prev-page`,
    buttonFirst: `${buttonBasisClassname}first-page`,
    buttonCurrentPrev: `${buttonBasisClassname}current-prev-page`,
    buttonCurrent: `${buttonBasisClassname}current-page`,
    buttonCurrentNext: `${buttonBasisClassname}current-next-page`,
    buttonLast: `${buttonBasisClassname}last-page`,
    buttonNext: `${buttonBasisClassname}next-page`,
  };

  if (!wordsData.wordsPage.length) {
    return <p className="no-words-message">Здесь пока нет слов</p>;
  }

  if (wordsData.group > MAX_GROUP_NUMBER) {
    return null;
  }

  return (
    <nav className={classnames.navBox}>
      <button
        type="button"
        onClick={setPrevPage}
        className={classnames.buttonPrev}
        disabled={wordsData.page === 1}
      />
      {wordsData.page !== 1 ? (
        <button type="button" onClick={() => setPage(1)} className={classnames.buttonFirst}>
          1
        </button>
      ) : (
        ''
      )}
      {wordsData.page > 2 ? (
        <button
          type="button"
          onClick={() => setPage(wordsData.page - 1)}
          className={classnames.buttonCurrentPrev}
        >
          {wordsData.page - 1}
        </button>
      ) : (
        ''
      )}
      <button type="button" className={classnames.buttonCurrent}>
        {wordsData.page}
      </button>
      {wordsData.page < MAX_PAGE_NUMBER - 1 ? (
        <button
          type="button"
          onClick={() => setPage(wordsData.page + 1)}
          className={classnames.buttonCurrentNext}
        >
          {wordsData.page + 1}
        </button>
      ) : (
        ''
      )}
      {wordsData.page !== MAX_PAGE_NUMBER ? (
        <button
          type="button"
          onClick={() => setPage(MAX_PAGE_NUMBER)}
          className={classnames.buttonLast}
        >
          {MAX_PAGE_NUMBER}
        </button>
      ) : (
        ''
      )}
      <button
        type="button"
        onClick={setNextPage}
        className={classnames.buttonNext}
        disabled={wordsData.page === MAX_PAGE_NUMBER}
      />
    </nav>
  );
}
