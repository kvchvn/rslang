import React from 'react';
import { IWordsProviderValue } from '../../services/interfaces';
import { MAX_GROUP_NUMBER, MAX_PAGE_NUMBER } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function PageControls() {
  const { wordsData, setNextPage, setPrevPage, setPage } = useWordsData() as IWordsProviderValue;

  const basisClassname = 'button page-nav__button page-nav__button_';

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
        className={`${basisClassname}prev-page`}
        disabled={wordsData.page === 1}
      />
      {wordsData.page !== 1 ? (
        <button type="button" onClick={() => setPage(1)} className={`${basisClassname}first-page`}>
          1
        </button>
      ) : (
        ''
      )}
      {wordsData.page > 2 ? (
        <button
          type="button"
          onClick={() => setPage(wordsData.page - 1)}
          className={`${basisClassname}current-prev-page`}
        >
          {wordsData.page - 1}
        </button>
      ) : (
        ''
      )}
      <button type="button" className={`${basisClassname}current-page`}>
        {wordsData.page}
      </button>
      {wordsData.page < MAX_PAGE_NUMBER - 1 ? (
        <button
          type="button"
          onClick={() => setPage(wordsData.page + 1)}
          className={`${basisClassname}current-next-page`}
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
          className={`${basisClassname}last-page`}
        >
          {MAX_PAGE_NUMBER}
        </button>
      ) : (
        ''
      )}
      <button
        type="button"
        onClick={setNextPage}
        className={`${basisClassname}next-page`}
        disabled={wordsData.page === MAX_PAGE_NUMBER}
      />
    </nav>
  );
}
