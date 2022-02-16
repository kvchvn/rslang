import React, { useContext, useEffect, useState } from 'react';
import {
  AggregatedWordsPage,
  IChildren,
  IWord,
  IWordsData,
  IWordsProviderValue,
  WordsPage,
} from '../../services/interfaces';
import {
  createUserWord,
  DIFFICULT_WEAK_WORD,
  DIFFICULT_WORD,
  DIFFICULT_WORD_GROUP_NUMBER,
  getAggregatedWordsPage,
  getUserWordById,
  getWordsPage,
  MAX_GROUP_NUMBER,
  MAX_PAGE_NUMBER,
  removeUserWordById,
  TOKEN,
  updateUserWordById,
  USER_ID,
  WEAK_WORD,
} from '../../services/requests';

const WordsContext = React.createContext<Partial<IWordsProviderValue>>({});
export const useWordsData = () => useContext(WordsContext);

export default function WordsProvider({ children }: IChildren) {
  const [wordsData, setWordsData] = useState<IWordsData>({
    wordsPage: [],
    userWords: [],
    group: Number(localStorage.getItem('group')) || 1,
    page: Number(localStorage.getItem('page')) || 1,
    wordId: '',
    wordStatus: '',
  });

  const getWordStatus = (wordId: string) => {
    return getUserWordById(USER_ID, wordId, TOKEN)
      .then((userWord) => {
        if (userWord) {
          const wordStatus = userWord.difficulty;
          return wordStatus;
        }
        throw new Error();
      })
      .catch(() => {
        const wordStatus = '';
        return wordStatus;
      });
  };

  const getUserWords = (choosedGroup: number, choosedPage: number) => {
    const withWeakWords = true;
    return getAggregatedWordsPage(USER_ID, choosedPage, TOKEN, withWeakWords, choosedGroup)
      .then((userWords) => userWords)
      .catch(() => []);
  };

  const showWordsPage = (choosedGroup: number, choosedPage: number) => {
    getWordsPage(choosedGroup, choosedPage).then(async (wordsPage) => {
      const group = choosedGroup;
      const page = choosedPage;

      localStorage.setItem('group', String(group));
      localStorage.setItem('page', String(page));

      const wordId = wordsPage[0].id;
      let userWords: AggregatedWordsPage = [];
      if (USER_ID && TOKEN) {
        userWords = await getUserWords(choosedGroup, choosedPage);
      }
      const wordStatus = (await getWordStatus(wordId)) || '';
      setWordsData({ wordsPage, userWords, group, page, wordId, wordStatus });
    });
  };

  const showAggregatedWordsPage = () => {
    const page = 1;
    const group = DIFFICULT_WORD_GROUP_NUMBER;

    localStorage.setItem('group', String(group));
    localStorage.setItem('page', String(page));

    const withWeakWords = false;
    getAggregatedWordsPage(USER_ID, page, TOKEN, withWeakWords).then(
      async (aggregatedWordsPage) => {
        let wordId: string;
        let wordStatus: string;
        let wordsPage: WordsPage;
        if (aggregatedWordsPage.length) {
          wordsPage = aggregatedWordsPage.map((word) => {
            const newWord = word;
            newWord.id = word._id;
            delete newWord._id;
            return newWord as IWord;
          });
          wordId = wordsPage[0].id;
          wordStatus = (await getWordStatus(wordId)) || '';
        } else {
          wordsPage = [];
          wordId = '';
          wordStatus = '';
        }
        setWordsData({ wordsPage, ...{ userWords: [] }, wordId, page, group, wordStatus });
      }
    );
  };

  const setNextPage = () => {
    if (wordsData.page < MAX_PAGE_NUMBER) {
      showWordsPage(wordsData.group, wordsData.page + 1);
    }
  };

  const setPrevPage = () => {
    if (wordsData.page > 1) {
      showWordsPage(wordsData.group, wordsData.page - 1);
    }
  };

  const setPage = (choosedPage: number): void => {
    if (choosedPage >= 1 && choosedPage <= MAX_PAGE_NUMBER) {
      showWordsPage(wordsData.group, choosedPage);
    }
  };

  const setWordsGroup = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const targetButton = target.closest('.group-nav__button') as HTMLElement;

    if (targetButton && targetButton.hasAttribute('data-group')) {
      const group = Number(targetButton.dataset.group);
      const page = 1;

      if (group <= MAX_GROUP_NUMBER) {
        showWordsPage(group, page);
      } else {
        showAggregatedWordsPage();
      }
    }
  };

  const showWordCard = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('words-page__word')) {
      const wordId = target.dataset.id;
      if (wordId) {
        getWordStatus(wordId).then((wordStatus) => {
          setWordsData((prevData) => ({ ...prevData, wordId, wordStatus }));
        });
      }
    }
  };

  const markWord = (e: React.MouseEvent<HTMLElement>, wordId: string) => {
    if (!USER_ID || !TOKEN) return;

    const target = e.target as HTMLElement;
    const settableDifficulty = target.dataset.status;
    if (settableDifficulty) {
      let wordStatus: string;
      if (wordsData.wordStatus) {
        wordStatus = DIFFICULT_WEAK_WORD;
        updateUserWordById(USER_ID, wordId, wordStatus, TOKEN);
      } else {
        wordStatus = settableDifficulty;
        createUserWord(USER_ID, wordId, settableDifficulty, TOKEN);
      }
      getUserWords(wordsData.group, wordsData.page).then((userWords) => {
        setWordsData((prevData) => ({ ...prevData, wordStatus, userWords }));
      });
    }
  };

  const unmarkWord = (e: React.MouseEvent<HTMLElement>, wordId: string) => {
    if (!USER_ID || !TOKEN) return;

    const target = e.target as HTMLElement;
    const targetButton = target.closest('.button_unmark') as HTMLElement;
    const removableDifficulty = targetButton.dataset.status;
    if (removableDifficulty) {
      let wordStatus: string;
      if (wordsData.wordStatus === DIFFICULT_WEAK_WORD) {
        wordStatus = removableDifficulty === DIFFICULT_WORD ? WEAK_WORD : DIFFICULT_WORD;
        updateUserWordById(USER_ID, wordId, wordStatus, TOKEN);
        getUserWords(wordsData.group, wordsData.page).then((userWords) => {
          setWordsData((prevData) => ({ ...prevData, wordStatus, userWords }));
        });
      } else {
        removeUserWordById(USER_ID, wordId, TOKEN);
        if (wordsData.group <= MAX_GROUP_NUMBER) {
          getUserWords(wordsData.group, wordsData.page).then((userWords) => {
            setWordsData((prevData) => ({ ...prevData, wordStatus, userWords }));
          });
        } else {
          showAggregatedWordsPage();
        }
      }
    }
  };

  useEffect(() => {
    const { group } = wordsData;
    const { page } = wordsData;
    if (group <= MAX_GROUP_NUMBER) {
      showWordsPage(group, page);
    } else {
      showAggregatedWordsPage();
    }
  }, []);

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
