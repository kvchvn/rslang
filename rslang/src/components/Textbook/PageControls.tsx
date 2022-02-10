import React from 'react';
import { MAX_PAGE_NUMBER } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function PageControls() {
  const { wordsPage, page, setNextPage, setPrevPage, setPage } = useWordsData();

  if (!wordsPage.length) {
    return <p>Здесь пока нет слов</p>;
  }

  return (
    <nav className="textbook-page__page-nav page-nav">
      <button
        type="button"
        onClick={setPrevPage}
        className="button page-nav__button page-nav__button_prev-page"
      >
        НЗ
      </button>
      {page !== 1 ? (
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
      <button type="button" className="button page-nav__button page-nav__button_current-page">
        {page}
      </button>
      {page !== MAX_PAGE_NUMBER ? (
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
      >
        ВП
      </button>
    </nav>
  );
}
