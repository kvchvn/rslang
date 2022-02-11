import React from 'react';
import { MAX_PAGE_NUMBER } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function PageControls() {
  const { wordsPage, page, setNextPage, setPrevPage, setPage } = useWordsData();

  if (!wordsPage.length) {
    return <p className="no-words-message">Здесь пока нет слов</p>;
  }

  return (
    <nav className="textbook-page__page-nav page-nav">
      <button
        type="button"
        onClick={setPrevPage}
        className="button page-nav__button page-nav__button_prev-page"
        disabled={page === 1}
      />
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
      {page > 2 ? (
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          className="button page-nav__button page-nav__button_current-prev-page"
        >
          {page - 1}
        </button>
      ) : (
        ''
      )}
      <button type="button" className="button page-nav__button page-nav__button_current-page">
        {page}
      </button>
      {page < MAX_PAGE_NUMBER - 1 ? (
        <button
          type="button"
          onClick={() => setPage(page + 1)}
          className="button page-nav__button page-nav__button_current-next-page"
        >
          {page + 1}
        </button>
      ) : (
        ''
      )}
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
        disabled={page === MAX_PAGE_NUMBER}
      />
    </nav>
  );
}
