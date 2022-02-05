import React from 'react';
import { useData } from '../components/DataContext';
import Word from '../components/Textbook/Word';
import { IWord } from '../services/interfaces';

export default function Textbook() {
  const { data, setNextPage, setPrevPage, setWordsGroup, showWord } = useData();

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
      </ul>
      <ul onClick={showWord}>
        {data.map((word: IWord) => (
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
      <Word />
    </div>
  );
}
