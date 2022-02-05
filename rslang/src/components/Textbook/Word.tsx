import React from 'react';
import { useData } from '../DataContext';

export default function Word() {
  const { showedWord } = useData();

  return (
    <div>
      <p>{showedWord.word}</p>
    </div>
  );
}
