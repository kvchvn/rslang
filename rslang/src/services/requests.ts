// requests to the backend

import { IWord, WordsPage } from './interfaces';

const BASIS_URL = 'https://rs-lang-1.herokuapp.com';
export const MAX_PAGE_NUMBER = 30;

export const getWordsPage = async (group: number, page: number) => {
  const response: Response = await fetch(`${BASIS_URL}/words?group=${group - 1}&page=${page - 1}`);
  const wordsPage: WordsPage = await response.json();
  return wordsPage;
};

export const getWordById = async (id: string) => {
  const response: Response = await fetch(`${BASIS_URL}/words/${id}`);
  const wordsPage: IWord = await response.json();
  return wordsPage;
};
