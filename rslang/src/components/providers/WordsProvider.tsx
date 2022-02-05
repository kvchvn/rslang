import React, { useContext, useEffect, useMemo, useState } from 'react';
import { IChildren, IWordsData } from '../../services/interfaces';
import { getWordsPage, MAX_PAGE_NUMBER } from '../../services/requests';

const WordsContext = React.createContext<any>({});
export const useWordsData = () => useContext(WordsContext);

export default function WordsProvider({ children }: IChildren) {
  const [wordsData, setWordsData] = useState<IWordsData>({
    wordsPage: [],
    group: 1,
    page: 1,
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

  const setWordsGroup = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.hasAttribute('data-group')) {
      const updatedGroup = { group: Number(target.dataset.group) };
      const wordId = '';
      setWordsData((prevData) => ({ ...prevData, ...updatedGroup, wordId }));
    }
  };

  const showWordCard = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('word')) {
      const choosedWordId = { wordId: target.dataset.id as string };
      setWordsData((prevData) => ({ ...prevData, ...choosedWordId }));
    }
  };

  const getWords = useMemo(() => {
    getWordsPage(wordsData.group, wordsData.page).then((wordsPage) => {
      const wordId = !wordsData.wordId ? wordsPage[0].id : wordsData.wordId;
      setWordsData((prevData) => ({ ...prevData, wordsPage, wordId }));
    });
  }, [wordsData.page, wordsData.group, wordsData.wordId]);

  useEffect(() => getWords, [wordsData]);

  return (
    <WordsContext.Provider
      value={{
        wordsPage: wordsData.wordsPage,
        wordId: wordsData.wordId,
        setNextPage,
        setPrevPage,
        setWordsGroup,
        showWordCard,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
}
