import React from 'react';
import { IAudiocallGameButtonsProps } from '../../services/interfaces';

export default function AnswersBox({
  answersWords,
  getAnswer,
  answer,
}: IAudiocallGameButtonsProps) {
  const classnames = {
    wordsAnswersBox: 'audiocall-page__answers-box answers-box',
    answerItem: 'answers-box__answer answers-box__answer_',
  };

  return (
    <ul className={classnames.wordsAnswersBox} onClick={getAnswer}>
      {answersWords.map((word, index) => {
        return (
          <li
            key={index}
            className={`${classnames.answerItem}${index} ${index === answer ? 'true' : ''}`}
          >
            {word}
          </li>
        );
      })}
    </ul>
  );
}
