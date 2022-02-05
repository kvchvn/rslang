import React, { useContext, useEffect, useState } from 'react';
import getWordsPage, { MAX_PAGE_NUMBER } from '../services/requests';

const DataContext = React.createContext<any>([]);
export const useData = () => useContext(DataContext);

export function DataProvider({ children }: any) {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [group, setGroup] = useState<number>(1);

  const setNextPage = () => {
    if (page < MAX_PAGE_NUMBER) {
      setPage(page + 1);
    }
  };

  const setPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const setWordsGroup = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.hasAttribute('data-group')) {
      const choosedGroup = Number(target.dataset.group);
      setGroup(choosedGroup);
    }
  };

  useEffect(() => {
    getWordsPage(group, page).then((wordsPage) => setData(wordsPage));
  }, [group, page]);

  return (
    <DataContext.Provider value={{ data, setNextPage, setPrevPage, setWordsGroup }}>
      {children}
    </DataContext.Provider>
  );
}
