import {
  AggregatedWordsPage,
  AggregatedWordsResponse,
  IWord,
  UserWord,
  WordsPage,
} from './interfaces';

const BASIS_URL = 'https://rs-lang-1.herokuapp.com';
export const MAX_PAGE_NUMBER = 30;
export const MAX_GROUP_NUMBER = 6;

export const DIFFICULT_WORD = 'difficult';
export const WEAK_WORD = 'weak';
export const DIFFICULT_WEAK_WORD = 'both';

// TEMPORARY DATA !!!
export const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDc3Yzk4NzczZWM1MDAxNmUwYmI3ZSIsImlhdCI6MTY0NDc2MTIzMCwiZXhwIjoxNjQ0Nzc1NjMwfQ.9A1dW2nQAfABzzynTU-9rQjzAJGNEFQQ8pCJ6NYF5e0';
export const USER_ID = '62077c98773ec50016e0bb7e';
//

export const getWordsPage = async (group: number, page: number) => {
  const response: Response = await fetch(`${BASIS_URL}/words?group=${group - 1}&page=${page - 1}`);
  const wordsPage: WordsPage = await response.json();
  return wordsPage;
};

export const getWordById = async (wordId: string) => {
  const response: Response = await fetch(`${BASIS_URL}/words/${wordId}`);
  const word: IWord = await response.json();
  return word;
};

export const getAllUserWords = async (userId: string, token: string) => {
  const response: Response = await fetch(`${BASIS_URL}/users/${userId}/words`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const allUserWords: Array<UserWord> | [] = await response.json();
  return allUserWords;
};

export const createUserWord = async (
  userId: string,
  wordId: string,
  difficulty: string,
  token: string
) => {
  const response: Response = await fetch(`${BASIS_URL}/users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ difficulty }),
  });
  const userWord: UserWord = await response.json();
  return userWord;
};

export const getUserWordById = async (userId: string, wordId: string, token: string) => {
  const response: Response = await fetch(`${BASIS_URL}/users/${userId}/words/${wordId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const userWord: UserWord = await response.json();
  return userWord;
};

export const removeUserWordById = async (userId: string, wordId: string, token: string) => {
  await fetch(`${BASIS_URL}/users/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const updateUserWordById = async (
  userId: string,
  wordId: string,
  difficulty: string,
  token: string
) => {
  const response: Response = await fetch(`${BASIS_URL}/users/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ difficulty }),
  });
  const userWord: UserWord = await response.json();
  return userWord;
};

export const getAggregatedWordsPage = async (
  userId: string,
  page: number,
  token: string
): Promise<AggregatedWordsPage> => {
  // filter by difficulty: "difficult" and "both"
  const filter =
    '%7B%22%24or%22%3A%5B%7B%22userWord.difficulty%22%3A%22difficult%22%7D%2C%7B%22userWord.difficulty%22%3A%22both%22%7D%5D%7D';
  const response: Response = await fetch(
    `${BASIS_URL}/users/${userId}/aggregatedWords?page=${page - 1}&filter=${filter}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const aggregatedWords: AggregatedWordsResponse = await response.json();
  return aggregatedWords[0].paginatedResults;
};
