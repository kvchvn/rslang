import React from 'react';

export default function WordsComparing({
  originalWord,
  translatedWord,
}: {
  originalWord: string;
  translatedWord: string;
}) {
  return (
    <div className="sprint-page__words-comparing words-comparing">
      <p className="words-comparing__word words-comparing__original-word">{originalWord}</p>
      <span className="words-comparing__center-line" />
      <p className="words-comparing__word words-comparing__translated-word">{translatedWord}</p>
    </div>
  );
}
