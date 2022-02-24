import React from 'react';
import { IWordsProviderValue } from '../../services/interfaces';
import {
  DIFFICULT_WORD_GROUP_NUMBER,
  FIRST_GROUP_NUMBER,
  MAX_GROUP_NUMBER,
  TOKEN,
  USER_ID,
} from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function GroupControls() {
  const { wordsData, setWordsGroup } = useWordsData() as IWordsProviderValue;
  const GROUP_AMOUNT = !USER_ID || !TOKEN ? MAX_GROUP_NUMBER : DIFFICULT_WORD_GROUP_NUMBER;

  const classnames = {
    navBox: 'textbook__group-nav group-nav',
    title: 'group-nav__title',
    button: 'button group-nav__button group-nav__button_',
    buttonBackground: 'group-nav__button-background group-nav__button-background_',
    buttonText: 'group-nav__button-text',
    selected: 'selected',
  };

  return (
    <nav onClick={setWordsGroup} className={classnames.navBox}>
      <h4 className={classnames.title}>Сложность</h4>
      {Array(GROUP_AMOUNT)
        .fill('')
        .map((_, index) => {
          return (
            <button
              type="button"
              key={index}
              data-group={index + 1}
              className={`${classnames.button}${index + 1} ${
                index + FIRST_GROUP_NUMBER === wordsData.group ? classnames.selected : ''
              }`}
            >
              <span className={`${classnames.buttonBackground}${index + 1}`} />
              <span className={classnames.buttonText}>
                {index === MAX_GROUP_NUMBER ? 'Сложные слова' : `${index + 1}`}
              </span>
            </button>
          );
        })}
    </nav>
  );
}
