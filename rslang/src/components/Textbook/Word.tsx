import React, { useEffect, useState } from 'react';
import { IWord } from '../../services/interfaces';
import { getUserWordById, getWordById, TOKEN, USER_ID } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';
import WordControls from './WordControls';

const MEDIA_BASIS_URL =
  'https://raw.githubusercontent.com/rolling-scopes-school/react-rslang-be/main';

export default function Word() {
  const { wordId } = useWordsData();
  sessionStorage.setItem('wordId', wordId);
  const [word, setWord] = useState<IWord>();
  const [wordStatus, setWordStatus] = useState<string>('');

  useEffect(() => {
    if (wordId) {
      getWordById(wordId).then((wordData) => {
        setWord(wordData);
      });
      getUserWordById(USER_ID, wordId, TOKEN)
        .then((userWord) => {
          if (userWord) {
            setWordStatus(userWord.difficulty);
          }
        })
        .catch(() => {
          setWordStatus('');
        });
    }
  }, [wordId, wordStatus]);

  const playAudio = (sources: Array<string>) => {
    if (wordId !== sessionStorage.getItem('wordId')) return;
    const audio = new Audio(`${MEDIA_BASIS_URL}/${sources[0]}`);
    audio.play();
    if (sources.length > 0) {
      audio.addEventListener('ended', () => {
        audio.remove();
        playAudio(sources.slice(1));
      });
    }
  };

  if (!word || !wordId) {
    return <p>Loading</p>;
  }

  const backgroundImage = {
    background: `no-repeat url('${MEDIA_BASIS_URL}/${word.image}') 50% 50% / cover`,
  };

  return (
    <div className="textbook__word-box word-box word">
      <div className="word__image" style={backgroundImage} />
      <div className="word__main-text">
        <p className="word__name">{word.word}</p>
        <p className="word__transcription">{word.transcription}</p>
        <p className="word__translation">{word.wordTranslate}</p>
        <span
          className="word__audio"
          onClick={() => playAudio([word.audio, word.audioMeaning, word.audioExample])}
        >
          Sound
        </span>
      </div>
      <div className="word__sub-text">
        <p dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
        <p>{word.textMeaningTranslate}</p>
        <p dangerouslySetInnerHTML={{ __html: word.textExample }} />
        <p>{word.textExampleTranslate}</p>
      </div>
      <WordControls status={wordStatus} />
    </div>
  );
}
