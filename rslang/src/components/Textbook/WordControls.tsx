import React from 'react';
import { DIFFICULT_WORD, WEAK_WORD } from '../../services/requests';

export default function WordControls({ status, markWord, unmarkWord }: any) {
  const buttonUnmark = (
    <button type="button" onClick={unmarkWord}>
      Remove the word from {status}
    </button>
  );

  const createButtonMark = (wordStatus: string): React.ReactNode => {
    return (
      <button type="button" data-status={wordStatus} onClick={markWord}>
        Add to {wordStatus}
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
