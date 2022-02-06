import React from 'react';
import { useWordsData } from '../components/providers/WordsProvider';
import Word from '../components/Textbook/Word';
import { IWord } from '../services/interfaces';
import { MAX_PAGE_NUMBER } from '../services/requests';

export default function Textbook() {
  const { wordsPage, page, setNextPage, setPrevPage, setWordsGroup, showWordCard } = useWordsData();

  return (
    <div>
      <ul onClick={setWordsGroup}>
        <li>
          <button type="button" data-group="1">
            1
          </button>
        </li>
        <li>
          <button type="button" data-group="2">
            2
          </button>
        </li>
        <li>
          <button type="button" data-group="3">
            3
          </button>
        </li>
        <li>
          <button type="button" data-group="4">
            4
          </button>
        </li>
        <li>
          <button type="button" data-group="5">
            5
          </button>
        </li>
        <li>
          <button type="button" data-group="6">
            6
          </button>
        </li>
        <li>
          <button type="button" data-group="7">
            7
          </button>
        </li>
      </ul>
      <ul onClick={showWordCard}>
        {wordsPage.map((word: IWord) => (
          <li key={word.id} data-id={word.id} className="word">
            {word.word}
          </li>
        ))}
      </ul>
      <button type="button" onClick={setPrevPage}>
        Prev
      </button>
      <button type="button" onClick={setNextPage}>
        Next
      </button>
      <span>
        {page} of {MAX_PAGE_NUMBER}
      </span>
      <Word />
    </div>
  );
}
