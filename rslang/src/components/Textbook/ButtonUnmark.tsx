import React from 'react';
import { IWordsProviderValue } from '../../services/interfaces';
import { DIFFICULT_WORD } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function ButtonUnmark({ requireWordStatus }: { requireWordStatus: string }) {
  const { wordsData, unmarkWord } = useWordsData() as IWordsProviderValue;

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
}
