import React from 'react';
import { IWordsProviderValue } from '../../services/interfaces';
import { MAX_GROUP_NUMBER } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function GroupControls() {
  const { wordsData, setWordsGroup } = useWordsData() as IWordsProviderValue;

  return (
    <nav onClick={setWordsGroup} className="textbook__group-nav group-nav">
      <h4 className="group-nav__title">Сложность</h4>
      {Array(MAX_GROUP_NUMBER + 1)
        .fill('')
        .map((_, index) => {
          return (
            <button
              type="button"
              key={index}
              data-group={index + 1}
              className={`button group-nav__button group-nav__button_${index + 1} ${
                index + 1 === wordsData.group ? 'selected' : ''
              }`}
            >
              <span
                className={`group-nav__button-background group-nav__button-background_${index + 1}`}
              />
              <span className="group-nav__button-text">
                {index === 6 ? 'Сложные слова' : `${index + 1}`}
              </span>
            </button>
          );
        })}
    </nav>
  );
}
