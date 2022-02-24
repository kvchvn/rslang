import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WordsComparing from '../components/SprintGame/WordsComparing';
import GameProgress from '../components/SprintGame/GameProgress';
import GameButtons from '../components/SprintGame/GameButtons';
import { useWordsData } from '../components/providers/WordsProvider';
import {
  ISprintGameData,
  IStatisticsOptional,
  IStatisticsResponse,
  IWordsProviderValue,
} from '../services/interfaces';
import {
  DIFFICULT_WORD_GROUP_NUMBER,
  FIRST_PAGE_NUMBER,
  getUserStatistics,
  MAX_GROUP_NUMBER,
  TOKEN,
  updateUserStatistics,
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
  const { wordsData, setWordsGroup, setPrevPage, setPage } = useWordsData() as IWordsProviderValue;
  const [gameData, setGameData] = useState<ISprintGameData>({
    step: 0,
    originalWord: '',
    translatedWord: '',
    answer: false,
    rowRightAnswers: 0,
    maxRow: 0,
    totalAnswers: [],
    score: 0,
    isEnded: false,
  });

  const location = useLocation();
  const GROUP_AMOUNT = USER_ID && TOKEN ? DIFFICULT_WORD_GROUP_NUMBER : MAX_GROUP_NUMBER;
  const MAX_WORDS_COUNT = wordsData.wordsPage.length;
  const classnames = {
    gameInfo: 'sprint-page__game-info',
    title: 'sprint-page__list-title',
    listButtons: 'sprint-page__list-buttons',
    buttonGroup: 'button group-nav__button sprint-game__group-button sprint-game__group-button_',
    link: 'link sprint-page__link-game',
  };

  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  const endRound = (prevRoundResult?: boolean) => {
    const isEnded = true;

    if (prevRoundResult !== undefined) {
      const rowRightAnswers = prevRoundResult ? gameData.rowRightAnswers + 1 : 0;
      const combos = Math.ceil(rowRightAnswers / ADD_COMBO_FOR_RIGHT_ANSWERS_AMOUNT);
      const score = gameData.score + POINTS_FOR_RIGHT_ANSWER * combos;
      const totalAnswers = [...gameData.totalAnswers, prevRoundResult];

      setGameData((prevData) => ({ ...prevData, isEnded, score, totalAnswers, rowRightAnswers }));
    }
    setGameData((prevData) => ({ ...prevData, isEnded }));
    setPage(FIRST_PAGE_NUMBER);
  };

  const saveRoundAndPlayNext = (nextStep?: number, prevRoundResult?: boolean) => {
    if (!wordsData.wordsPage.length) return;
    if (gameData.isEnded) return;

    if (nextStep === wordsData.wordsPage.length) {
      if (wordsData.page === FIRST_PAGE_NUMBER) {
        endRound(prevRoundResult);
        return;
      }
      setPrevPage();
      const step = nextStep;
      setGameData((prevData) => ({ ...prevData, step }));
      return;
    }

    const step = nextStep || 0;
    const minValue = step <= 2 ? 0 : step - 2;
    const maxValue = step >= MAX_WORDS_COUNT - 2 ? MAX_WORDS_COUNT : step + 2;
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
    const maxRow = Math.max(gameData.maxRow, rowRightAnswers);
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
      maxRow,
      totalAnswers,
      score,
    }));
  };

  const getUserAnswer = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const userAnswer = target.classList.contains('true');
    saveRoundAndPlayNext(gameData.step + 1, userAnswer);
  };

  const resetGame = () => {
    const isEnded = false;
    const step = 0;
    const rowRightAnswers = 0;
    const maxRow = 0;
    const totalAnswers: Array<boolean> = [];
    const score = 0;
    setGameData((prevData) => ({
      ...prevData,
      isEnded,
      step,
      rowRightAnswers,
      maxRow,
      totalAnswers,
      score,
    }));
  };

  const endGame = () => {
    if (gameData.isEnded) {
      getUserStatistics(USER_ID, TOKEN)
        .then(async (statistics: IStatisticsResponse) => {
          const newLearnedWordsCount = statistics.learnedWords + gameData.totalAnswers.length;

          const receivedOptionalData: IStatisticsOptional = {
            rightAnswers: gameData.totalAnswers.filter((elem) => elem).length,
            totalAnswers: gameData.totalAnswers.length,
            maxRowRightAnswers: gameData.maxRow,
          };

          let optional = { sprint: receivedOptionalData };

          if (statistics.optional && statistics.optional.sprint) {
            const savedOptionalData = statistics.optional.sprint;

            const newOptionalData: IStatisticsOptional = {
              rightAnswers: receivedOptionalData.rightAnswers + savedOptionalData.rightAnswers,
              totalAnswers: receivedOptionalData.totalAnswers + savedOptionalData.totalAnswers,
              maxRowRightAnswers: Math.max(
                savedOptionalData.maxRowRightAnswers,
                receivedOptionalData.maxRowRightAnswers
              ),
            };
            optional = { ...statistics.optional, ...{ sprint: newOptionalData } };
          } else {
            optional = { ...statistics.optional, ...{ sprint: receivedOptionalData } };
          }

          updateUserStatistics(USER_ID, newLearnedWordsCount, TOKEN, optional);
        })
        .catch(async () => {
          await updateUserStatistics(USER_ID, 0, TOKEN);
          endGame();
        });
    }
  };

  useEffect(() => saveRoundAndPlayNext(), [wordsData]);

  useEffect(() => endGame(), [gameData.isEnded]);

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
          <GameResults
            resetGame={resetGame}
            totalAnswers={gameData.totalAnswers}
            score={gameData.score}
          />
        ) : null}
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <h3 className={classnames.title}>Выберите уровень сложности</h3>
      <ul className={classnames.listButtons}>
        {Array(GROUP_AMOUNT)
          .fill('')
          .map((_, index) => {
            return (
              <button
                type="button"
                key={index}
                data-group={index + 1}
                className={`${classnames.buttonGroup}${index + 1} ${
                  wordsData.group === index + 1 ? 'selected' : ''
                }`}
                onClick={(e) => setWordsGroup(e, true)}
              >
                {index === MAX_GROUP_NUMBER ? 'Сложные слова' : `${index + 1}`}
              </button>
            );
          })}
      </ul>
      <Link to="/sprint" state="main" className={classnames.link}>
        Играть
      </Link>
    </PageTemplate>
  );
}
