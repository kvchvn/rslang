import React from 'react';
import { DIFFICULT_WORD, WEAK_WORD } from '../../services/requests';

export default function WordControls({ status, markWord, unmarkWord }: any) {
  const buttonUnmark = (
    <button type="button" onClick={unmarkWord}>
      {status === DIFFICULT_WORD ? 'Убрать из сложных' : 'Изучать снова'}
    </button>
  );

  const createButtonMark = (wordStatus: string): React.ReactNode => {
    return (
      <button type="button" data-status={wordStatus} onClick={markWord}>
        {wordStatus === DIFFICULT_WORD ? 'Сложное' : 'Изученное'}
      </button>
    );
  };

  let buttonsBox: React.ReactNode;
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

  return <div>{buttonsBox}</div>;
}
