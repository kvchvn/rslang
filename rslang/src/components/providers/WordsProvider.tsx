import React, { useContext, useEffect, useMemo, useState } from 'react';
import { IChildren, IWordsData } from '../../services/interfaces';
import {
  getAllUserWords,
  getWordById,
  getWordsPage,
  MAX_GROUP_NUMBER,
  MAX_PAGE_NUMBER,
  TOKEN,
  USER_ID,
} from '../../services/requests';

const WordsContext = React.createContext<any>({});
export const useWordsData = () => useContext(WordsContext);

export default function WordsProvider({ children }: IChildren) {
  const [wordsData, setWordsData] = useState<IWordsData>({
    wordsPage: [],
    group: Number(localStorage.getItem('group')) || 1,
    page: Number(localStorage.getItem('page')) || 1,
    wordId: '',
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

  const setWordsGroup = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.hasAttribute('data-group')) {
      const updatedGroup = { group: Number(target.dataset.group) };
      const updatedPage = { page: 1 };
      const wordId = '';
      setWordsData((prevData) => ({ ...prevData, ...updatedGroup, ...updatedPage, wordId }));
    }
  };

  const showWordCard = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('words-page__word')) {
      const choosedWordId = { wordId: target.dataset.id as string };
      setWordsData((prevData) => ({ ...prevData, ...choosedWordId }));
    }
  };

  const getWords = useMemo(() => {
    if (wordsData.group <= MAX_GROUP_NUMBER) {
      getWordsPage(wordsData.group, wordsData.page).then((wordsPage) => {
        const wordId = !wordsData.wordId ? wordsPage[0].id : wordsData.wordId;
        setWordsData((prevData) => ({ ...prevData, wordsPage, wordId }));
      });
    } else {
      getAllUserWords(USER_ID, TOKEN)
        .then((userWords) => {
          if (!userWords.length) {
            return userWords as [];
          }
          return Promise.all(userWords.map((userWord) => getWordById(userWord.wordId)));
        })
        .then((wordsPage) => {
          let wordId: string;
          if (wordsPage.length) {
            wordId = !wordsData.wordId ? wordsPage[0].id : wordsData.wordId;
          } else {
            wordId = '';
          }
          setWordsData((prevData) => ({ ...prevData, wordsPage, wordId }));
        })
        .catch((error) => console.log(error));
    }
    localStorage.setItem('group', String(wordsData.group));
    localStorage.setItem('page', String(wordsData.page));
  }, [wordsData.page, wordsData.group, wordsData.wordId]);

  useEffect(() => getWords, [wordsData]);

  return (
    <WordsContext.Provider
      value={{
        ...wordsData,
        setNextPage,
        setPrevPage,
        setPage,
        setWordsGroup,
        showWordCard,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
}
