import React, { useEffect, useState } from 'react';
import { IWord } from '../../services/interfaces';
import { getUserWordById, getWordById, TOKEN, USER_ID } from '../../services/requests';
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

  if (!word || !wordId) {
    return null;
  }

  return (
    <div className="word-box">
      <p>{word.word}</p>
      <p>{wordStatus}</p>
      <WordControls status={wordStatus} />
    </div>
  );
}
