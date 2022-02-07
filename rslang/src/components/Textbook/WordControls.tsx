import React from 'react';
import PropTypes from 'prop-types';
import { createUserWord, removeUserWordById, TOKEN, USER_ID } from '../../services/requests';
import { useWordsData } from '../providers/WordsProvider';

export default function WordControls({ status }: any) {
  const { wordId } = useWordsData();

  const markWord = async (e: any) => {
    const target = e.target as HTMLElement;
    const difficulty = target.dataset.status;
    if (difficulty) {
      await createUserWord(USER_ID, wordId, difficulty, TOKEN);
    }
    // should to mark word-card style straightway
  };

  const unmarkWord = async () => {
    removeUserWordById(USER_ID, wordId, TOKEN);
  };

  if (status) {
    return (
      <button type="button" onClick={unmarkWord}>
        Remove the word from {status}
      </button>
    );
  }

  return (
    <div>
      <button type="button" data-status="difficult" onClick={markWord}>
        Add to difficult
      </button>
      <button type="button" data-status="weak" onClick={markWord}>
        Add to weak
      </button>
    </div>
  );
}

WordControls.propTypes = {
  status: PropTypes.string.isRequired,
};
