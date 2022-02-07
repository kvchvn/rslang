import React from 'react';
import { MAX_PAGE_NUMBER } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function PageControls() {
  const { wordsPage, page, setNextPage, setPrevPage } = useWordsData();

  if (!wordsPage.length) {
    return <p>There are no words!</p>;
  }

  return (
    <div>
      <button type="button" onClick={setPrevPage}>
        Prev
      </button>
      <button type="button" onClick={setNextPage}>
        Next
      </button>
      <span>
        {page} of {MAX_PAGE_NUMBER}
      </span>
    </div>
  );
}
