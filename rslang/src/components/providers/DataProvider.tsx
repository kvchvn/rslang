import React, { useContext, useState } from 'react';

const DataContext = React.createContext<any>([]);
export const useData = () => useContext(DataContext);

export function DataProvider({ children }: any) {
  const [totalData] = useState({});

  return <DataContext.Provider value={{ totalData }}>{children}</DataContext.Provider>;
}
