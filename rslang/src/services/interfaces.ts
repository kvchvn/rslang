import { string } from 'prop-types';
import React from 'react';

interface IWordStandard {
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export interface IWord extends IWordStandard {
  id: string;
}

export type WordsPage = Array<IWord>;

export interface IAggregatedWord extends IWordStandard {
  id?: string;
  _id?: string;
  userWord: {
    difficulty: string;
  };
}

export type AggregatedWordsPage = Array<IAggregatedWord>;

export interface AggregatedWords {
  paginatedResults: AggregatedWordsPage;
  totalCount: [
    {
      count: number;
    }
  ];
}

export type AggregatedWordsResponse = [AggregatedWords];

export interface IChildren {
  children: React.ReactNode;
}

export interface IWordsData {
  wordsPage: WordsPage | [];
  userWords: AggregatedWordsPage | [];
  page: number;
  group: number;
  wordId: string;
  wordStatus: string;
}

export interface IOptionalParams {
  param: string;
}

export type UserWord = {
  difficulty: string;
  optional?: IOptionalParams;
  id: string;
  wordId: string;
};

export interface IWordsProviderValue {
  wordsData: IWordsData;
  setNextPage: () => void;
  setPrevPage: () => void;
  setPage: (pageNumber: number) => void;
  setWordsGroup: (e: React.MouseEvent<HTMLElement>) => void;
  showWordCard: (e: React.MouseEvent<HTMLElement>) => void;
  unmarkWord: (e: React.MouseEvent<HTMLElement>, wordId: string) => void;
  markWord: (e: React.MouseEvent<HTMLElement>, wordId: string) => void;
}

export interface ISprintGameData {
  step: number;
  originalWord: string;
  translatedWord: string;
  answer: boolean;
  rowRightAnswers: number;
  totalAnswers: Array<boolean>;
  score: number;
  isEnded: boolean;
}

export interface IUserData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface ISprintGameButtonsProps {
  answer: boolean;
  getUserAnswer: (e: React.MouseEvent<HTMLElement>) => void;
}
