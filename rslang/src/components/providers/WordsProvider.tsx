import React, { useContext, useEffect, useState } from 'react';
import { IChildren, IWordsData, IWordsProviderValue } from '../../services/interfaces';
import {
  createUserWord,
  DIFFICULT_WORD,
  getAllUserWords,
  getUserWordById,
  getWordById,
  getWordsPage,
  MAX_GROUP_NUMBER,
  MAX_PAGE_NUMBER,
  removeUserWordById,
  TOKEN,
  USER_ID,
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

  const showWordCard = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('words-page__word')) {
      const choosedWordId = { wordId: target.dataset.id as string };
      setWordsData((prevData) => ({ ...prevData, ...choosedWordId }));
    }
  };

  const getWords = () => {
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
          return Promise.all(
            userWords
              .filter((userWord) => userWord.difficulty === DIFFICULT_WORD)
              .map((userWord) => getWordById(userWord.wordId))
          );
        })
        .then((wordsPage) => {
          let wordId: string;
          if (wordsPage.length) {
            wordId = wordsPage[0].id;
          } else {
            wordId = '';
          }
          setWordsData((prevData) => ({ ...prevData, wordsPage, wordId }));
        })
        .catch((error) => console.log(error));
    }
    localStorage.setItem('group', String(wordsData.group));
    localStorage.setItem('page', String(wordsData.page));
  };

  const getWordStatus = () => {
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

  const markWord = (e: React.MouseEvent<HTMLElement>, wordId: string) => {
    const target = e.target as HTMLElement;
    const targetButton = target.closest('.button__mark') as HTMLElement;
    const difficulty = targetButton.dataset.status;
    if (difficulty) {
      targetButton.setAttribute('disabled', 'disabled');
      createUserWord(USER_ID, wordId, difficulty, TOKEN);
      const wordStatus = difficulty;
      setWordsData((prevData) => ({ ...prevData, wordStatus }));
    }
  };

  const unmarkWord = async (wordId: string) => {
    removeUserWordById(USER_ID, wordId, TOKEN);
    getWords();
  };

  useEffect(() => getWordStatus(), [wordsData.wordId]);
  useEffect(() => getWords(), [wordsData.page, wordsData.group, wordsData.wordId]);

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
