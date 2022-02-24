import React, { useEffect, useState } from 'react';
import { IWord, IWordsProviderValue } from '../../services/interfaces';
import { useWordsData } from '../providers/WordsProvider';
import WordControls from './WordControls';

export const MEDIA_BASIS_URL =
  'https://raw.githubusercontent.com/rolling-scopes-school/react-rslang-be/main';

export default function Word() {
  const { wordsData } = useWordsData() as IWordsProviderValue;
  sessionStorage.setItem('wordId', wordsData.wordId);
  const [wordCard, setWordCard] = useState<IWord>();

  const classnames = {
    box: 'textbook__word-box word-box word',
    mainContent: 'word__main-content',
    image: 'word__image',
    mainTextBox: 'word__main-text',
    name: 'word__name',
    audio: 'word__audio',
    subTextBox: 'word__sub-text',
    meainingBox: 'word__meaning-box',
    exampleBox: 'word__example-box',
  };

  useEffect(() => {
    if (wordsData.wordId) {
      setWordCard(wordsData.wordsPage.find((word) => word.id === wordsData.wordId));
    }
  }, [wordsData.wordId]);

  const playAudio = (sources: Array<string>) => {
    if (wordsData.wordId !== sessionStorage.getItem('wordId')) return;
    const audio = new Audio(`${MEDIA_BASIS_URL}/${sources[0]}`);
    audio.play();
    if (sources.length > 0) {
      audio.addEventListener('ended', () => {
        audio.remove();
        playAudio(sources.slice(1));
      });
    }
  };

  if (!wordCard || !wordsData.wordId) {
    return <div className="textbook__word-box word-box word" />;
  }

  const backgroundImage = {
    background: `no-repeat url('${MEDIA_BASIS_URL}/${wordCard.image}') 50% 50% / cover`,
  };

  return (
    <div className={classnames.box}>
      <div className={classnames.mainContent}>
        <div className={classnames.image} style={backgroundImage} />
        <div className={classnames.mainTextBox}>
          <p className={classnames.name}>{wordCard.word}</p>
          <p>{wordCard.transcription}</p>
          <p>{wordCard.wordTranslate}</p>
          <span
            className={classnames.audio}
            onClick={() =>
              playAudio([wordCard.audio, wordCard.audioMeaning, wordCard.audioExample])
            }
          />
        </div>
      </div>
      <div className={classnames.subTextBox}>
        <div className={classnames.meainingBox}>
          <p dangerouslySetInnerHTML={{ __html: wordCard.textMeaning }} />
          <p>{wordCard.textMeaningTranslate}</p>
        </div>
        <div className={classnames.exampleBox}>
          <p dangerouslySetInnerHTML={{ __html: wordCard.textExample }} />
          <p>{wordCard.textExampleTranslate}</p>
        </div>
      </div>
      <WordControls />
    </div>
  );
}
