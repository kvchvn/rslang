import React from 'react';
import { IWordsProviderValue } from '../../services/interfaces';
import { MAX_GROUP_NUMBER, MAX_PAGE_NUMBER } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function PageControls() {
  const { wordsData, setNextPage, setPrevPage, setPage } = useWordsData() as IWordsProviderValue;

  if (!wordsData.wordsPage.length) {
    return <p className="no-words-message">Здесь пока нет слов</p>;
  }

  if (wordsData.group > MAX_GROUP_NUMBER) {
    return null;
  }

  return (
    <nav className="textbook-page__page-nav page-nav">
      <button
        type="button"
        onClick={setPrevPage}
        className="button page-nav__button page-nav__button_prev-page"
        disabled={wordsData.page === 1}
      />
      {wordsData.page !== 1 ? (
        <button
          type="button"
          onClick={() => setPage(1)}
          className="button page-nav__button page-nav__button_first-page"
        >
          1
        </button>
      ) : (
        ''
      )}
      {wordsData.page > 2 ? (
        <button
          type="button"
          onClick={() => setPage(wordsData.page - 1)}
          className="button page-nav__button page-nav__button_current-prev-page"
        >
          {wordsData.page - 1}
        </button>
      ) : (
        ''
      )}
      <button type="button" className="button page-nav__button page-nav__button_current-page">
        {wordsData.page}
      </button>
      {wordsData.page < MAX_PAGE_NUMBER - 1 ? (
        <button
          type="button"
          onClick={() => setPage(wordsData.page + 1)}
          className="button page-nav__button page-nav__button_current-next-page"
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
          className="button page-nav__button page-nav__button_last-page"
        >
          {MAX_PAGE_NUMBER}
        </button>
      ) : (
        ''
      )}
      <button
        type="button"
        onClick={setNextPage}
        className="button page-nav__button page-nav__button_next-page"
        disabled={wordsData.page === MAX_PAGE_NUMBER}
      />
    </nav>
  );
}
