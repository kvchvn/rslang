import React, { useContext, useEffect, useState } from 'react';
import {
  IChildren,
  IWord,
  IWordsData,
  IWordsProviderValue,
  WordsPage,
} from '../../services/interfaces';
import {
  createUserWord,
  DIFFICULT_WEAK_WORD,
  DIFFICULT_WORD,
  getAggregatedWordsPage,
  getUserWordById,
  getWordsPage,
  MAX_GROUP_NUMBER,
  MAX_PAGE_NUMBER,
  removeUserWordById,
  TOKEN,
  updateUserWordById,
  USER_ID,
  WEAK_WORD,
} from '../../services/requests';

const WordsContext = React.createContext<Partial<IWordsProviderValue>>({});
export const useWordsData = () => useContext(WordsContext);

export default function WordsProvider({ children }: IChildren) {
  const [wordsData, setWordsData] = useState<IWordsData>({
    wordsPage: [],
    group: Number(localStorage.getItem('group')) || 1,
    page: Number(localStorage.getItem('page')) || 1,
    wordId: '',
    wordStatus: '',
  });

  const setNextPage = () => {
    if (wordsData.page < MAX_PAGE_NUMBER) {
      const updatedPage = { page: wordsData.page + 1 };
      const wordId = '';
      setWordsData((prevData) => ({ ...prevData, ...updatedPage, wordId }));
    }
  };

  const setPrevPage = () => {
    if (wordsData.page > 1) {
      const updatedPage = { page: wordsData.page - 1 };
      const wordId = '';
      setWordsData((prevData) => ({ ...prevData, ...updatedPage, wordId }));
    }
  };

  const setPage = (pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= MAX_PAGE_NUMBER) {
      const updatedPage = { page: pageNumber };
      const wordId = '';
      setWordsData((prevData) => ({ ...prevData, ...updatedPage, wordId }));
    }
  };

  const setWordsGroup = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const targetButton = target.closest('.group-nav__button') as HTMLElement;
    if (targetButton && targetButton.hasAttribute('data-group')) {
      const updatedGroup = { group: Number(targetButton.dataset.group) };
      const updatedPage = { page: 1 };
      const wordId = '';
      setWordsData((prevData) => ({ ...prevData, ...updatedGroup, ...updatedPage, wordId }));
    }
  };

  const getWordStatus = () => {
    console.log('get status');
    getUserWordById(USER_ID, wordsData.wordId, TOKEN)
      .then((userWord) => {
        if (userWord) {
          const wordStatus = userWord.difficulty;
          setWordsData((prevData) => ({ ...prevData, wordStatus }));
        }
      })
      .catch(() => {
        const wordStatus = '';
        setWordsData((prevData) => ({ ...prevData, wordStatus }));
      });
  };

  const showWordCard = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('words-page__word')) {
      const choosedWordId = { wordId: target.dataset.id as string };
      setWordsData((prevData) => ({ ...prevData, ...choosedWordId }));
    }
  };

  const getWords = () => {
    console.log('get words');
    if (wordsData.group <= MAX_GROUP_NUMBER) {
      getWordsPage(wordsData.group, wordsData.page).then((wordsPage) => {
        const wordId = !wordsData.wordId ? wordsPage[0].id : wordsData.wordId;
        setWordsData((prevData) => ({ ...prevData, wordsPage, wordId }));
      });
    } else {
      getAggregatedWordsPage(USER_ID, wordsData.page, TOKEN)
        .then((aggregatedWordsPage) => {
          let wordId: string;
          let wordsPage: WordsPage;
          if (aggregatedWordsPage.length) {
            wordsPage = aggregatedWordsPage.map((word) => {
              const newWord = word;
              newWord.id = word._id;
              delete newWord._id;
              return newWord as IWord;
            });
            wordId = wordsPage[0].id;
          } else {
            wordsPage = [];
            wordId = '';
          }
          setWordsData((prevData) => ({ ...prevData, wordsPage, wordId }));
        })
        .catch((error) => console.log(error));
    }
    localStorage.setItem('group', String(wordsData.group));
    localStorage.setItem('page', String(wordsData.page));
  };

  const markWord = (e: React.MouseEvent<HTMLElement>, wordId: string) => {
    const target = e.target as HTMLElement;
    const settableDifficulty = target.dataset.status;
    if (settableDifficulty) {
      let wordStatus: string;
      if (wordsData.wordStatus) {
        wordStatus = DIFFICULT_WEAK_WORD;
        updateUserWordById(USER_ID, wordId, wordStatus, TOKEN);
      } else {
        wordStatus = settableDifficulty;
        createUserWord(USER_ID, wordId, settableDifficulty, TOKEN);
      }
      setWordsData((prevData) => ({ ...prevData, wordStatus }));
    }
  };

  const unmarkWord = (e: React.MouseEvent<HTMLElement>, wordId: string) => {
    const target = e.target as HTMLElement;
    const targetButton = target.closest('.button_unmark') as HTMLElement;
    const removableDifficulty = targetButton.dataset.status;
    if (removableDifficulty) {
      let wordStatus: string;
      if (wordsData.wordStatus === DIFFICULT_WEAK_WORD) {
        wordStatus = removableDifficulty === DIFFICULT_WORD ? WEAK_WORD : DIFFICULT_WORD;
        updateUserWordById(USER_ID, wordId, wordStatus, TOKEN);
      } else {
        removeUserWordById(USER_ID, wordId, TOKEN);
      }
      setWordsData((prevData) => ({ ...prevData, wordStatus }));
    }
  };

  useEffect(() => getWords(), [wordsData.page, wordsData.group, wordsData.wordStatus]);
  useEffect(() => {
    if (wordsData.wordId) {
      getWordStatus();
    }
  }, [wordsData.wordId, wordsData.wordStatus]);
  console.log(wordsData);
  return (
    <WordsContext.Provider
      value={{
        wordsData,
        setNextPage,
        setPrevPage,
        setPage,
        setWordsGroup,
        showWordCard,
        unmarkWord,
        markWord,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
}
