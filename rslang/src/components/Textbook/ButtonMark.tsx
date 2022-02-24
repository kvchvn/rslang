import React from 'react';
import { IWordsProviderValue } from '../../services/interfaces';
import { DIFFICULT_WEAK_WORD, DIFFICULT_WORD, WEAK_WORD } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function ButtonMark({ requireWordStatus }: { requireWordStatus: string }) {
  const { wordsData, markWord } = useWordsData() as IWordsProviderValue;
  const classnames = {
    button: `button button_mark button_mark_${requireWordStatus}`,
  };

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
      className={classnames.button}
    >
      {textContent}
    </button>
  );
}
