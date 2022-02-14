import React from 'react';
import { IWordsProviderValue } from '../../services/interfaces';
import { DIFFICULT_WORD_GROUP_NUMBER, FIRST_NUM, MAX_GROUP_NUMBER } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function GroupControls() {
  const { wordsData, setWordsGroup } = useWordsData() as IWordsProviderValue;
  const basisButtonClassname = 'button group-nav__button group-nav__button_';
  const basisBackgroundClassname = 'group-nav__button-background group-nav__button-background_';
  return (
    <nav onClick={setWordsGroup} className="textbook__group-nav group-nav">
      <h4 className="group-nav__title">Сложность</h4>
      {Array(DIFFICULT_WORD_GROUP_NUMBER)
        .fill('')
        .map((_, index) => {
          return (
            <button
              type="button"
              key={index}
              data-group={index + 1}
              className={`${basisButtonClassname}${index + 1} ${
                index + FIRST_NUM === wordsData.group ? 'selected' : ''
              }`}
            >
              <span className={`${basisBackgroundClassname}${index + 1}`} />
              <span className="group-nav__button-text">
                {index === MAX_GROUP_NUMBER ? 'Сложные слова' : `${index + 1}`}
              </span>
            </button>
          );
        })}
    </nav>
  );
}
