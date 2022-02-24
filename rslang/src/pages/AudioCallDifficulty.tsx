import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/AudiocallGame/PageTemplate';
import { useWordsData } from '../components/providers/WordsProvider';
import { IWordsProviderValue } from '../services/interfaces';
import {
  DIFFICULT_WORD_GROUP_NUMBER,
  MAX_GROUP_NUMBER,
  TOKEN,
  USER_ID,
} from '../services/requests';

const GROUP_AMOUNT = USER_ID && TOKEN ? DIFFICULT_WORD_GROUP_NUMBER : MAX_GROUP_NUMBER;

export default function AudioCallDifficulty() {
  const { wordsData, setWordsGroup } = useWordsData() as IWordsProviderValue;
  const classnames = {
    title: 'audiocall-page__list-title',
    buttonGroup: 'button group-nav__button sprint-game__group-button sprint-game__group-button_',
    listButtons: 'sprint-page__list-buttons',
    link: 'link sprint-page__link-game',
  };

  return (
    <PageTemplate>
      <h3 className={classnames.title}>Выберите уровень сложности</h3>
      <ul className={classnames.listButtons}>
        {Array(GROUP_AMOUNT)
          .fill('')
          .map((_, index) => {
            return (
              <button
                type="button"
                key={index}
                data-group={index + 1}
                className={`${classnames.buttonGroup}${index + 1} ${
                  wordsData.group === index + 1 ? 'selected' : ''
                }`}
                onClick={(e) => setWordsGroup(e, true)}
              >
                {index === MAX_GROUP_NUMBER ? 'Сложные слова' : `${index + 1}`}
              </button>
            );
          })}
      </ul>
      <Link to="/audiocall" state="main" className={classnames.link}>
        Играть
      </Link>
    </PageTemplate>
  );
}
