import React, { useEffect, useState } from 'react';
import { IWord } from '../../services/interfaces';
import {
  createUserWord,
  getUserWordById,
  getWordById,
  removeUserWordById,
  TOKEN,
  USER_ID,
} from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';
import WordControls from './WordControls';

export default function Word() {
  const { wordId } = useWordsData();
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

  const markWord = (e: any) => {
    const target = e.target as HTMLElement;
    const difficulty = target.dataset.status;
    if (difficulty) {
      setWordStatus(difficulty);
      createUserWord(USER_ID, wordId, difficulty, TOKEN);
    }
    // should to mark word-card style straightway
  };

  const unmarkWord = async () => {
    setWordStatus('');
    removeUserWordById(USER_ID, wordId, TOKEN);
  };

  if (!word || !wordId) {
    return <p>Loading</p>;
  }

  const backgroundImage = {
    background: `no-repeat url('https://raw.githubusercontent.com/rolling-scopes-school/react-rslang-be/main/${word.image}') 50% 50% / cover`,
  };

  return (
    <div className="textbook__word-box word-box word">
      <div className="word__image" style={backgroundImage} />
      <div className="word__main-text">
        <p className="word__name">{word.word}</p>
        <p className="word__transcription">{word.transcription}</p>
        <p className="word__translation">{word.wordTranslate}</p>
        <span className="word__audio" onClick={() => playAudio(word.audio)}>Sound</span>
      </div>
      <div className="word__sub-text">
        <p dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
        <p>{word.textMeaningTranslate}</p>
        <p dangerouslySetInnerHTML={{ __html: word.textExample }} />
        <p>{word.textExampleTranslate}</p>
      </div>
      <WordControls status={wordStatus} markWord={markWord} unmarkWord={unmarkWord} />
    </div>
  );
}
