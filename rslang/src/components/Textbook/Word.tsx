import React, { useEffect, useState } from 'react';
import { IWord } from '../../services/interfaces';
import {
  createUserWord,
  getUserWordById,
  getWordById,
  TOKEN,
  USER_ID,
} from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

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
          } else {
            setWordStatus('');
          }
        })
        .catch(() => {
          setWordStatus('');
        });
    }
  }, [wordId]);

  if (!word) {
    return <p>Loading...</p>;
  }

  const markWord = async (e: any) => {
    const target = e.target as HTMLElement;
    const difficulty = target.dataset.status;
    if (difficulty) {
      await createUserWord(USER_ID, word.id, difficulty, TOKEN);
    }
  };

  return (
    <div className="word-box">
      <p>{word.word}</p>
      <p>{wordStatus}</p>
      <button type="button" data-status="difficult" onClick={markWord}>
        Add to difficult
      </button>
      <button type="button" data-status="weak" onClick={markWord}>
        Add to weak
      </button>
    </div>
  );
}
