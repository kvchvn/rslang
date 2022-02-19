import React from 'react';
import { useLocation } from 'react-router-dom';
import { useWordsData } from '../components/providers/WordsProvider';

const FROM_TEXTBOOK_PAGE = 'textbook';

export default function SprintGame() {
  const location = useLocation();
  // const { wordsData } = useWordsData();


  if (location.state === FROM_TEXTBOOK_PAGE) {
    return (
      <main className="page sprints-page textbook">

      </main>
    );
  }
  return <p>from main menu</p>;
}
