import React from 'react';
import { ISprintGameButtonsProps } from '../../services/interfaces';

export default function GameButtons({ answer, getUserAnswer }: ISprintGameButtonsProps) {
  const classnames = {
    buttonsBox: 'sprint-page__buttons-box',
    buttonTrue: `button sprint-page__button sprint-page__button_true ${answer ? 'true' : ''}`,
    buttonFalse: `button sprint-page__button sprint-page__button_false ${!answer ? 'true' : ''}`,
  };

  return (
    <div className={classnames.buttonsBox}>
      <button type="button" className={classnames.buttonTrue} onClick={(e) => getUserAnswer(e)}>
        Верно
      </button>
      <button type="button" className={classnames.buttonFalse} onClick={(e) => getUserAnswer(e)}>
        Неверно
      </button>
    </div>
  );
}
