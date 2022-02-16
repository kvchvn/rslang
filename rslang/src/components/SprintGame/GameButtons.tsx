import React from 'react';

export default function GameButtons({
  answer,
  getAnswer,
}: {
  answer: boolean;
  getAnswer: (e: React.MouseEvent<HTMLElement>) => boolean;
}) {
  const classnames = {
    buttonsBox: 'sprint-page__buttons-box',
    buttonTrue: `button sprint-page__button sprint-page__button_true ${answer ? 'true' : ''}`,
    buttonFalse: `button sprint-page__button sprint-page__button_false ${!answer ? 'true' : ''}`,
  };

  return (
    <div className={classnames.buttonsBox}>
      <button type="button" className={classnames.buttonTrue} onClick={(e) => getAnswer(e)}>
        True
      </button>
      <button type="button" className={classnames.buttonFalse} onClick={(e) => getAnswer(e)}>
        False
      </button>
    </div>
  );
}
