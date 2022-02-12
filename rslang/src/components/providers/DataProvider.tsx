import React, { useContext, useState } from 'react';
import { IChildren } from '../../services/interfaces';

const DataContext = React.createContext<any>([]);
export const useData = () => useContext(DataContext);

export function DataProvider({ children }: IChildren) {
  const [totalData] = useState({});

  return <DataContext.Provider value={{ totalData }}>{children}</DataContext.Provider>;
}
