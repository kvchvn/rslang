import React, { useContext, useEffect, useState } from 'react';
import { getWordById, getWordsPage, MAX_PAGE_NUMBER } from '../services/requests';

const DataContext = React.createContext<any>([]);
export const useData = () => useContext(DataContext);

export function DataProvider({ children }: any) {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [group, setGroup] = useState<number>(1);
  const [wordId, setWordId] = useState<string>('');
  const [showedWord, setShowedWord] = useState<any>('');

  const setNextPage = () => {
    if (page < MAX_PAGE_NUMBER) {
      setPage(page + 1);
      setWordId('');
    }
  };

  const setPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setWordId('');
    }
  };

  const setWordsGroup = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.hasAttribute('data-group')) {
      const choosedGroup = Number(target.dataset.group);
      setGroup(choosedGroup);
      setWordId('');
    }
  };

  const showWord = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('word')) {
      const choosedWordId = target.dataset.id as string;
      setWordId(choosedWordId);
    }
  };

  useEffect(() => {
    getWordsPage(group, page).then((wordsPage) => {
      setData(wordsPage);
      if (!wordId) {
        setWordId(wordsPage[0].id);
      }
    });
    getWordById(wordId).then((word) => setShowedWord(word));
  }, [group, page, wordId]);

  return (
    <DataContext.Provider
      value={{ data, setNextPage, setPrevPage, setWordsGroup, showWord, showedWord }}
    >
      {children}
    </DataContext.Provider>
  );
}
