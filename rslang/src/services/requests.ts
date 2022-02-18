import {
  AggregatedWordsPage,
  AggregatedWordsResponse,
  IUserData,
  IWord,
  UserWord,
  WordsPage,
  IStatisticsResponse,
  IStatistics,
} from './interfaces';

const BASIS_URL = 'https://rs-lang-1.herokuapp.com';
export const MAX_WORDS_ON_PAGE = 20;
export const ALL_WORDS_COUNT = 3600;
export const MAX_PAGE_NUMBER = 30;
export const MAX_GROUP_NUMBER = 6;
export const DIFFICULT_WORD_GROUP_NUMBER = 7;
export const FIRST_PAGE_NUMBER = 1;
export const FIRST_GROUP_NUMBER = 1;

export const DIFFICULT_WORD = 'difficult';
export const WEAK_WORD = 'weak';
export const DIFFICULT_WEAK_WORD = 'both';

const userData = localStorage.getItem('sigin');
const parsedUserData: [IUserData] = userData ? JSON.parse(userData) : null;

export const TOKEN = parsedUserData
  ? parsedUserData[0].token
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDc3Yzk4NzczZWM1MDAxNmUwYmI3ZSIsImlhdCI6MTY0NTE3MjE5MSwiZXhwIjoxNjQ1MTg2NTkxfQ.NfQgnh7b8RRB_EWQNhJthGtCGZTU-BH2wxA83BAP5QI';
export const USER_ID = parsedUserData ? parsedUserData[0].userId : '62077c98773ec50016e0bb7e';

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
  if (!userId || !token) return [];

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
  token: string,
  allDifficultWords: boolean,
  page?: number,
  group?: number
): Promise<AggregatedWordsPage> => {
  if (!userId || !token) return [];

  // {"$and":[{"$or":[{"userWord.difficulty":"weak"},{"userWord.difficulty":"difficult"},{"userWord.difficulty":"both"}]},{"group":0},{"page":0}]}
  // {"$or":[{"userWord.difficulty":"difficult"},{"userWord.difficulty":"both"}]}

  // filter by difficulty: "difficult" and "both"
  let filter: string;
  let wordsPerPage: number;

  const filterByAllUserWords =
    '%7B%22%24or%22%3A%5B%7B%22userWord.difficulty%22%3A%22difficult%22%7D%2C%7B%22userWord.difficulty%22%3A%22both%22%7D%5D%7D';
  const filterByDifficultWordsOnPage = (groupNum: number, pageNum: number) =>
    `%7B%22%24and%22%3A%5B%7B%22%24or%22%3A%5B%7B%22userWord.difficulty%22%3A%22weak%22%7D%2C%7B%22userWord.difficulty%22%3A%22difficult%22%7D%2C%7B%22userWord.difficulty%22%3A%22both%22%7D%5D%7D%2C%7B%22group%22%3A${
      groupNum - 1
    }%7D%2C%7B%22page%22%3A${pageNum - 1}%7D%5D%7D`;

  if (group && page) {
    filter = allDifficultWords ? filterByAllUserWords : filterByDifficultWordsOnPage(group, page);
    wordsPerPage = allDifficultWords ? ALL_WORDS_COUNT : MAX_WORDS_ON_PAGE;
  } else {
    filter = filterByAllUserWords;
    wordsPerPage = ALL_WORDS_COUNT;
  }

  const response: Response = await fetch(
    `${BASIS_URL}/users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=${filter}`,
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

export const updateUserStatistics = async (
  userId: string,
  learnedWords: number,
  token: string,
  optional?: IStatistics
) => {
  const response: Response = await fetch(`${BASIS_URL}/users/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ learnedWords, optional }),
  });
  const statistics: IStatisticsResponse = await response.json();
  return statistics;
};

export const getUserStatistics = async (userId: string, token: string) => {
  const response: Response = await fetch(`${BASIS_URL}/users/${userId}/statistics`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const statistics: IStatisticsResponse = await response.json();
  return statistics;
};
