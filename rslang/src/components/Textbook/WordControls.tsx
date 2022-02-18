import React from 'react';
import { IWordsProviderValue } from '../../services/interfaces';
import {
  DIFFICULT_WEAK_WORD,
  DIFFICULT_WORD,
  TOKEN,
  USER_ID,
  WEAK_WORD,
} from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';
import ButtonMark from './ButtonMark';
import ButtonUnmark from './ButtonUnmark';

export default function WordControls() {
  const { wordsData } = useWordsData() as IWordsProviderValue;
  const classnames = {
    box: 'word__controls',
  };

  if (!USER_ID || !TOKEN) return null;

  let buttonsBox = (
    <>
      <ButtonMark requireWordStatus={DIFFICULT_WORD} />
      <ButtonUnmark requireWordStatus={WEAK_WORD} />
    </>
  );

  switch (wordsData.wordStatus) {
    case DIFFICULT_WORD:
      buttonsBox = (
        <>
          <ButtonUnmark requireWordStatus={DIFFICULT_WORD} />
          <ButtonMark requireWordStatus={WEAK_WORD} />
        </>
      );
      break;
    case WEAK_WORD:
      buttonsBox = (
        <>
          <ButtonMark requireWordStatus={DIFFICULT_WORD} />
          <ButtonUnmark requireWordStatus={WEAK_WORD} />
        </>
      );
      break;
    case DIFFICULT_WEAK_WORD:
      buttonsBox = (
        <>
          <ButtonUnmark requireWordStatus={DIFFICULT_WORD} />
          <ButtonUnmark requireWordStatus={WEAK_WORD} />
        </>
      );
      break;
    default:
      buttonsBox = (
        <>
          <ButtonMark requireWordStatus={DIFFICULT_WORD} />
          <ButtonMark requireWordStatus={WEAK_WORD} />
        </>
      );
  }

  return <div className={classnames.box}>{buttonsBox}</div>;
}
