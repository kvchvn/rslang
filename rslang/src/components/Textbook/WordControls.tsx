import React from 'react';
import { IWordsProviderValue } from '../../services/interfaces';
import { DIFFICULT_WEAK_WORD, DIFFICULT_WORD, WEAK_WORD } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function WordControls({ status }: { status: string }) {
  const { wordsData, unmarkWord, markWord } = useWordsData() as IWordsProviderValue;

  const createButtonUnmark = (requireWordStatus: string): React.ReactNode => {
    return (
      <button
        type="button"
        data-status={requireWordStatus}
        onClick={(e) => unmarkWord(e, wordsData.wordId)}
        className={`button button__unmark button__unmark_${requireWordStatus}`}
      >
        {requireWordStatus === DIFFICULT_WORD ? 'Убрать из сложных' : 'Убрать из изученных'}
      </button>
    );
  };

  const createButtonMark = (requireWordStatus: string): React.ReactNode => {
    let textContent: string;
    // status is current status of word showed on the screen
    switch (status) {
      case DIFFICULT_WORD:
        textContent = requireWordStatus === DIFFICULT_WORD ? 'Сложное' : 'В изученные';
        break;
      case WEAK_WORD:
        textContent = requireWordStatus === WEAK_WORD ? 'Изученное' : 'В сложные';
        break;
      case DIFFICULT_WEAK_WORD:
        textContent = requireWordStatus === DIFFICULT_WORD ? 'Сложное' : 'Изученное';
        break;
      default:
        textContent = requireWordStatus === DIFFICULT_WORD ? 'В сложные' : 'В изученные';
    }

    return (
      <button
        type="button"
        data-status={requireWordStatus}
        onClick={(e) => markWord(e, wordsData.wordId)}
        className={`button button__mark button__mark_${requireWordStatus}`}
        disabled={requireWordStatus === status}
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

  return <div className="word__controls">{buttonsBox}</div>;
}
