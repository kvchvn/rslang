import React from 'react';
import { DIFFICULT_WORD, MAX_GROUP_NUMBER, WEAK_WORD } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function WordControls({ status }: any) {
  const { wordId, group, unmarkWord, markWord } = useWordsData();

  const buttonUnmark = (
    <button type="button" onClick={() => unmarkWord(wordId)}>
      {status === DIFFICULT_WORD ? 'Убрать из сложных' : 'Изучать снова'}
    </button>
  );

  const createButtonMark = (wordStatus: string): React.ReactNode => {
    return (
      <button
        type="button"
        data-status={wordStatus}
        onClick={(e) => markWord(e, wordId)}
        className="button"
        disabled={wordStatus === status}
      >
        {wordStatus === DIFFICULT_WORD ? 'Сложное' : 'Изученное'}
      </button>
    );
  };

  let buttonsBox = (
    <>
      {createButtonMark(DIFFICULT_WORD)}
      {createButtonMark(WEAK_WORD)}
    </>
  );

  if (group === MAX_GROUP_NUMBER + 1) {
    switch (status) {
      case DIFFICULT_WORD:
        buttonsBox = (
          <>
            {buttonUnmark}
            {createButtonMark(WEAK_WORD)}
          </>
        );
        break;
      case WEAK_WORD:
        buttonsBox = (
          <>
            {buttonUnmark}
            {createButtonMark(DIFFICULT_WORD)}
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

  return <div>{buttonsBox}</div>;
}
