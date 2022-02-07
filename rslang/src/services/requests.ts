// requests to the backend

import { IWord, UserWord, WordsPage } from './interfaces';

const BASIS_URL = 'https://rs-lang-1.herokuapp.com';
export const MAX_PAGE_NUMBER = 30;
export const MAX_GROUP_NUMBER = 6;
// TEMPORARY DATA !!!
export const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDExNWQ4MDBjODUyMDAxNmJmZmQ0ZiIsImlhdCI6MTY0NDIzODMyMCwiZXhwIjoxNjQ0MjUyNzIwfQ.Nel74J7PDtyxOUwO8z287gW1nSCwE1QB80NMdqxdPdM';
export const USER_ID = '620115d800c8520016bffd4f';
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
