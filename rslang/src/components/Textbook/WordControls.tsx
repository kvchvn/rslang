import React from 'react';
import { IWordsProviderValue } from '../../services/interfaces';
import {
  DIFFICULT_WEAK_WORD,
  DIFFICULT_WORD,
  MAX_GROUP_NUMBER,
  WEAK_WORD,
} from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function WordControls({ status }: any) {
  const { wordsData, unmarkWord, markWord } = useWordsData() as IWordsProviderValue;

  const createButtonUnmark = (wordStatus: string): React.ReactNode => {
    return (
      <button
        type="button"
        data-status={wordStatus}
        onClick={(e) => unmarkWord(e, wordsData.wordId)}
        className={`button button__unmark button__unmark_${wordStatus}`}
      >
        {wordStatus === DIFFICULT_WORD ? 'Убрать из сложных' : 'Изучать снова'}
      </button>
    );
  };

  const createButtonMark = (wordStatus: string): React.ReactNode => {
    let textContent: string;

    if (status) {
      if (status === DIFFICULT_WORD) {
        textContent = wordStatus === DIFFICULT_WORD ? 'Сложное' : 'В изученные';
      } else {
        textContent = wordStatus === WEAK_WORD ? 'Изученное' : 'В сложные';
      }
    } else {
      textContent = wordStatus === DIFFICULT_WORD ? 'В сложные' : 'В изученные';
    }

    return (
      <button
        type="button"
        data-status={wordStatus}
        onClick={(e) => markWord(e, wordsData.wordId)}
        className={`button button__mark button__mark_${wordStatus}`}
        disabled={wordStatus === status}
      >
        {textContent}
      </button>
    );
  };

  let buttonsBox = (
    <>
      {createButtonMark(DIFFICULT_WORD)}
      {createButtonMark(WEAK_WORD)}
    </>
  );

  if (wordsData.group === MAX_GROUP_NUMBER + 1) {
    switch (status) {
      case DIFFICULT_WORD:
        buttonsBox = (
          <>
            {createButtonUnmark(DIFFICULT_WORD)}
            {createButtonMark(WEAK_WORD)}
          </>
        );
        break;
      case WEAK_WORD:
        buttonsBox = (
          <>
            {createButtonMark(DIFFICULT_WORD)}
            {createButtonUnmark(WEAK_WORD)}
          </>
        );
        break;
      case DIFFICULT_WEAK_WORD:
        buttonsBox = (
          <>
            {createButtonUnmark(DIFFICULT_WORD)}
            {createButtonUnmark(WEAK_WORD)}
          </>
        );
        break;
      default:
        buttonsBox = (
          <>
            {createButtonMark(DIFFICULT_WORD)}
            {createButtonMark(WEAK_WORD)}
          </>
        );
    }
  }

  return <div className="word__controls">{buttonsBox}</div>;
}
