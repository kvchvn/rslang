import React from 'react';

// type aliases, interfaces, etc.
export interface IWord {
  id: string;
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

export type WordsPage = Array<IWord>;

export interface IChildren {
  children: React.ReactNode;
}

export interface IWordsData {
  wordsPage: WordsPage | [];
  page: number;
  group: number;
  wordId: string;
  wordStatus: string;
}

export type UserWord = {
  difficulty: string
  optional?: IOptionalParams
  id: string
  wordId: string
}

export interface IOptionalParams {
  param: string
}

export interface IWordsProviderValue {
  wordsData: IWordsData
  setNextPage: () => void
  setPrevPage: () => void
  setPage: (pageNumber: number) => void
  setWordsGroup: (e: React.MouseEvent<HTMLElement>) => void
  showWordCard: (e: React.MouseEvent<HTMLElement>) => void
  unmarkWord: (e: React.MouseEvent<HTMLElement>, wordId: string) => void
  markWord: (e: React.MouseEvent<HTMLElement>, wordId: string) => void
}

