import React from 'react';
import { useWordsData } from '../providers/WordsProvider';

export default function Word() {
  const { wordId } = useWordsData();

  if (!wordId) return <p>No ID</p>;

  return (
    <div>
      <p>{wordId}</p>
    </div>
  );
}
