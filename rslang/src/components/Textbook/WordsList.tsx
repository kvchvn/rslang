import React from 'react';
import { IWord, IWordsProviderValue } from '../../services/interfaces';
import { useWordsData } from '../providers/WordsProvider';

export default function WordsList() {
  const { wordsData, showWordCard } = useWordsData() as IWordsProviderValue;

  return (
    <ul onClick={showWordCard} className="words-page__words">
      {wordsData.wordsPage.map((word: IWord) => (
        <li
          key={word.id}
          data-id={word.id}
          className={`words-page__word ${word.id === wordsData.wordId ? 'selected' : ''} ${
            wordsData.wordStatus ? wordsData.wordStatus : ''
          }`}
        >
          {word.word}
        </li>
      ))}
    </ul>
  );
}
