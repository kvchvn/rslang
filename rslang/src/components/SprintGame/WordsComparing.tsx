import React from 'react';

export default function WordsComparing({
  originalWord,
  translatedWord,
}: {
  originalWord: string;
  translatedWord: string;
}) {
  const classnames = {
    box: 'sprint-page__words-comparing words-comparing',
    originalWord: 'words-comparing__word words-comparing__original-word',
    centerLine: 'words-comparing__center-line',
    translatedWord: 'words-comparing__word words-comparing__translated-word',
  }

  return (
    <div className={classnames.box}>
      <p className={classnames.originalWord}>{originalWord}</p>
      <span className={classnames.centerLine} />
      <p className={classnames.translatedWord}>{translatedWord}</p>
    </div>
  );
}
