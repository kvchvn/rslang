import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WordsComparing from '../components/SprintGame/WordsComparing';
import GameProgress from '../components/SprintGame/GameProgress';
import GameButtons from '../components/SprintGame/GameButtons';
import { useWordsData } from '../components/providers/WordsProvider';
import { ISprintGameData, IWordsProviderValue } from '../services/interfaces';
import {
  DIFFICULT_WORD_GROUP_NUMBER,
  FIRST_PAGE_NUMBER,
  MAX_GROUP_NUMBER,
  MAX_WORDS_ON_PAGE,
  TOKEN,
  USER_ID,
} from '../services/requests';
import Timer from '../components/SprintGame/Timer';
import GameResults from '../components/SprintGame/GameResults';
import PageTemplate from '../components/SprintGame/PageTemplate';

const FROM_TEXTBOOK_PAGE = 'textbook';
const FROM_MAIN_PAGE = 'main';
const POINTS_FOR_RIGHT_ANSWER = 10;
const ADD_COMBO_FOR_RIGHT_ANSWERS_AMOUNT = 4;

export default function SprintGame() {
  const location = useLocation();
  const GROUP_AMOUNT = USER_ID && TOKEN ? DIFFICULT_WORD_GROUP_NUMBER : MAX_GROUP_NUMBER;
  const classnames = {
    gameInfo: 'sprint-page__game-info',
    buttonGroup: 'button group-nav__button',
  };

  const { wordsData, setWordsGroup, setPrevPage } = useWordsData() as IWordsProviderValue;
  const [gameData, setGameData] = useState<ISprintGameData>({
    step: 0,
    originalWord: '',
    translatedWord: '',
    answer: false,
    rowRightAnswers: 0,
    totalAnswers: [],
    score: 0,
    isEnded: false,
  });

  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  const endRound = () => {
    const isEnded = true;
    setGameData((prevData) => ({ ...prevData, isEnded }));
  };

  const saveRoundAndPlayNext = (nextStep?: number, prevRoundResult?: boolean) => {
    if (!wordsData.wordsPage.length) return;
    if (gameData.isEnded) return;

    if (nextStep === wordsData.wordsPage.length) {
      if (wordsData.page === FIRST_PAGE_NUMBER) {
        endRound();
        return;
      }
      setPrevPage();
      const step = nextStep;
      setGameData((prevData) => ({ ...prevData, step }));
      return;
    }

    const step = nextStep || 0;
    const minValue = step < 10 ? 0 : Math.round(MAX_WORDS_ON_PAGE / 2);
    const maxValue = step < 10 ? Math.round(MAX_WORDS_ON_PAGE / 2) : MAX_WORDS_ON_PAGE;
    const randomNum = getRandomNumber(minValue, maxValue);

    const originalWordObject = wordsData.wordsPage[step];
    const originalWord = originalWordObject.word;
    const translatedWordObject = wordsData.wordsPage[randomNum];
    const translatedWord = translatedWordObject.wordTranslate;

    let answer: boolean;
    if (originalWordObject.id === translatedWordObject.id) {
      answer = true;
    } else {
      answer = false;
    }

    const rowRightAnswers = prevRoundResult ? gameData.rowRightAnswers + 1 : 0;
    const combos = Math.ceil(rowRightAnswers / ADD_COMBO_FOR_RIGHT_ANSWERS_AMOUNT);
    const score = gameData.score + POINTS_FOR_RIGHT_ANSWER * combos;

    let { totalAnswers } = gameData;
    if (prevRoundResult !== undefined) {
      totalAnswers = [...gameData.totalAnswers, prevRoundResult];
    }

    setGameData((prevData) => ({
      ...prevData,
      step,
      originalWord,
      translatedWord,
      answer,
      rowRightAnswers,
      totalAnswers,
      score,
    }));
  };

  const getUserAnswer = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const userAnswer = target.classList.contains('true');
    saveRoundAndPlayNext(gameData.step + 1, userAnswer);
  };

  useEffect(() => saveRoundAndPlayNext(), [wordsData]);

  if (location.state === FROM_TEXTBOOK_PAGE || location.state === FROM_MAIN_PAGE) {
    return (
      <PageTemplate>
        <div className={classnames.gameInfo}>
          <GameProgress
            rowRightAnswers={gameData.rowRightAnswers}
            totalAnswers={gameData.totalAnswers}
            score={gameData.score}
          />
          <Timer endRound={endRound} isEnded={gameData.isEnded} />
        </div>
        <WordsComparing
          originalWord={gameData.originalWord}
          translatedWord={gameData.translatedWord}
        />
        <GameButtons answer={gameData.answer} getUserAnswer={getUserAnswer} />
        {gameData.isEnded ? (
          <GameResults totalAnswers={gameData.totalAnswers} score={gameData.score} />
        ) : null}
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <ul>
        {Array(GROUP_AMOUNT)
          .fill('')
          .map((_, index) => {
            return (
              <button
                type="button"
                key={index}
                data-group={index + 1}
                className={`${classnames.buttonGroup}`}
                onClick={(e) => setWordsGroup(e)}
              >
                {index === MAX_GROUP_NUMBER ? 'Сложные слова' : `${index + 1}`}
              </button>
            );
          })}
      </ul>
      <Link to="/sprint" state="main">
        Играть
      </Link>
    </PageTemplate>
  );
}
