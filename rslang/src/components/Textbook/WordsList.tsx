import React from 'react';
import { IWord, IWordsProviderValue } from '../../services/interfaces';
import { useWordsData } from '../providers/WordsProvider';

export default function WordsList() {
  const { wordsData, showWordCard } = useWordsData() as IWordsProviderValue;
  const userWordsIds = wordsData.userWords.map((word) => word._id);
  const userWordsStatuses = wordsData.userWords.map((word) => word.userWord.difficulty);
  const classnames = {
    list: 'words-page__words',
    wordItemBasis: 'words-page__word',
    selected: 'selectes',
    wordItemMarkBasis: 'words-page__word-mark word-mark_',
  };

  return (
    <ul onClick={showWordCard} className={classnames.list}>
      {wordsData.wordsPage.map((word: IWord) => (
        <li
          key={word.id}
          data-id={word.id}
          className={`${classnames.wordItemBasis} ${
            word.id === wordsData.wordId ? `${classnames.selected} ${wordsData.wordStatus}` : ''
          }`}
        >
          {word.word}
          <span
            className={`${classnames.wordItemMarkBasis}${
              userWordsIds.includes(word.id) ? userWordsStatuses[userWordsIds.indexOf(word.id)] : ''
            }`}
          />
        </li>
      ))}
    </ul>
  );
}
