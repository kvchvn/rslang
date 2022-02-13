import React from 'react';
import { IWordsProviderValue } from '../../services/interfaces';
import { DIFFICULT_WEAK_WORD, DIFFICULT_WORD, WEAK_WORD } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function WordControls() {
  const { wordsData, unmarkWord, markWord } = useWordsData() as IWordsProviderValue;

  const createButtonUnmark = (requireWordStatus: string): React.ReactNode => {
    return (
      <button
        type="button"
        data-status={requireWordStatus}
        onClick={(e) => unmarkWord(e, wordsData.wordId)}
        className={`button button_unmark button_unmark_${requireWordStatus}`}
      >
        <span className="button_unmark_hover-text">
          {requireWordStatus === DIFFICULT_WORD ? 'Убрать из сложных' : 'Убрать из изученных'}
        </span>
        <span className="button_unmark_text">
          {requireWordStatus === DIFFICULT_WORD ? 'Сложное' : 'Изученное'}
        </span>
      </button>
    );
  };

  const createButtonMark = (requireWordStatus: string): React.ReactNode => {
    let textContent: string;

    switch (wordsData.wordStatus) {
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
        className={`button button_mark button_mark_${requireWordStatus}`}
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

  switch (wordsData.wordStatus) {
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
