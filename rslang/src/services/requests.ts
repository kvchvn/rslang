// requests to the backend

import { IWord, UserWord, WordsPage } from './interfaces';

const BASIS_URL = 'https://rs-lang-1.herokuapp.com';
export const MAX_PAGE_NUMBER = 30;
// TEMPORARY DATA !!!
export const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmY3NmM5NGNmNzY0MDAxNmM4M2ZjNSIsImlhdCI6MTY0NDEzMjA2MiwiZXhwIjoxNjQ0MTQ2NDYyfQ.TmSvsI6srR6p82Fm8q-jJQhAKXkOSCbF4jtNFRTT2f4';
export const USER_ID = '61ff76c94cf7640016c83fc5';
//
/*
  {
    "id": "61ff76c94cf7640016c83fc5",
    "name": "Ton",
    "email": "ton@mail.ru"
  }
  {
    "message": "Authenticated",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmY3NmM5NGNmNzY0MDAxNmM4M2ZjNSIsImlhdCI6MTY0NDEzMjA2MiwiZXhwIjoxNjQ0MTQ2NDYyfQ.TmSvsI6srR6p82Fm8q-jJQhAKXkOSCbF4jtNFRTT2f4",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmY3NmM5NGNmNzY0MDAxNmM4M2ZjNSIsInRva2VuSWQiOiJjNzhkYzE1OS0zZmI4LTQ2YmItYjQyNy0xZDgyZjFhZmViY2EiLCJpYXQiOjE2NDQxMzIwNjIsImV4cCI6MTY0NDE0ODI2Mn0.BQgQWM2HYJ5m_aS7knFMT9h24YII8zIggt9X2Cjf3co",
    "userId": "61ff76c94cf7640016c83fc5",
    "name": "Ton"
  }
*/

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
  const allUserWords: Array<UserWord> = await response.json();
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
  const response: Response = await fetch(`${BASIS_URL}/users/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const userWord: UserWord = await response.json();
  return userWord;
};
