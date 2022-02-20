import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnswersBox from '../components/AudiocallGame/AnswersBox';
import { useWordsData } from '../components/providers/WordsProvider';
import GameProgress from '../components/SprintGame/GameProgress';
import GameResults from '../components/AudiocallGame/GameResults';
import PageTemplate from '../components/AudiocallGame/PageTemplate';
import { MEDIA_BASIS_URL } from '../components/Textbook/Word';
import {
  IAudiocallGameData,
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

const FROM_TEXTBOOK_PAGE = 'textbook';
const FROM_MAIN_PAGE = 'main';
const POINTS_FOR_RIGHT_ANSWER = 10;
const ADD_COMBO_FOR_RIGHT_ANSWERS_AMOUNT = 4;
const NUMBER_OF_ANSWERS_VARIANTS = 4;

export default function AudioCallGame() {
  const { wordsData, setWordsGroup, setPage } = useWordsData() as IWordsProviderValue;
  const [gameData, setGameData] = useState<IAudiocallGameData>({
    step: 0,
    word: wordsData.wordsPage[0],
    answersWords: [],
    answer: 0,
    rowRightAnswers: 0,
    maxRow: 0,
    totalAnswers: [],
    score: 0,
    isAnswered: false,
    isEnded: false,
  });

  const location = useLocation();
  const GROUP_AMOUNT = USER_ID && TOKEN ? DIFFICULT_WORD_GROUP_NUMBER : MAX_GROUP_NUMBER;
  const MAX_WORDS_COUNT = wordsData.wordsPage.length;
  const classnames = {
    gameInfo: 'audiocall-page__game-info',
    title: 'audiocall-page__list-title',
    imageBox: 'audiocall-page__word-box',
    wordImage: 'audiocall-page__word-image',
    button: 'button audiocall-page__button',
    mainContent: 'audiocall-page__content',
    buttonGroup: 'button group-nav__button sprint-game__group-button sprint-game__group-button_',
    listButtons: 'sprint-page__list-buttons',
    link: 'link sprint-page__link-game',
    buttonNext: 'button audiocall-page__button_next',
  };
  console.log(gameData);
  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  const shuffleArray = (array: Array<number>) => array.sort(() => Math.random() - 0.5);

  const getAnswersVariants = (min: number, max: number, step: number) => {
    const answersVariants: Set<number> = new Set();
    answersVariants.add(step);

    while (answersVariants.size < NUMBER_OF_ANSWERS_VARIANTS) {
      const wordIndex = getRandomNumber(min, max);
      answersVariants.add(wordIndex);
    }
    return shuffleArray(Array.from(answersVariants));
  };

  const playAudio = (src: string) => {
    const audio = new Audio(`${MEDIA_BASIS_URL}/${src}`);
    audio.autoplay = true;
    audio.onended = () => audio.remove();
  };

  const endGame = () => {
    if (gameData.isEnded) {
      getUserStatistics(USER_ID, TOKEN).then(async (statistics: IStatisticsResponse) => {
        const newLearnedWordsCount = statistics.learnedWords + gameData.totalAnswers.length;

        const receivedOptionalData: IStatisticsOptional = {
          rightAnswers: gameData.totalAnswers.filter((elem) => elem).length,
          totalAnswers: gameData.totalAnswers.length,
          maxRowRightAnswers: gameData.maxRow,
        };

        let optional = { audiocall: receivedOptionalData };

        if (statistics.optional && statistics.optional.audiocall) {
          const savedOptionalData = statistics.optional.audiocall;

          const newOptionalData: IStatisticsOptional = {
            rightAnswers: receivedOptionalData.rightAnswers + savedOptionalData.rightAnswers,
            totalAnswers: receivedOptionalData.totalAnswers + savedOptionalData.totalAnswers,
            maxRowRightAnswers: Math.max(
              savedOptionalData.maxRowRightAnswers,
              receivedOptionalData.maxRowRightAnswers
            ),
          };
          optional = { ...statistics.optional, ...{ audiocall: newOptionalData } };
        } else {
          optional = { ...statistics.optional, ...{ audiocall: receivedOptionalData } };
        }

        updateUserStatistics(USER_ID, newLearnedWordsCount, TOKEN, optional);
      });
    }
  };

  const saveRoundAndPlayNext = (nextStep?: number, prevRoundResult?: boolean) => {
    if (!wordsData.wordsPage.length) return;
    if (gameData.isEnded) return;

    if (nextStep === 3) {
      const isEnded = true;
      setGameData((prevData) => ({ ...prevData, isEnded }));
      endGame();
      setPage(FIRST_PAGE_NUMBER);
    }

    const step = nextStep || 0;
    const minValue = 0;
    const maxValue = MAX_WORDS_COUNT;
    let isAnswered = false;

    const word = wordsData.wordsPage[step];
    const wordAudio = word.audio;

    if (prevRoundResult === undefined) {
      playAudio(wordAudio);
    } else {
      isAnswered = true;
    }

    const answersVariants = getAnswersVariants(minValue, maxValue, step);
    const answersWords = answersVariants.map((wordIndex) => wordsData.wordsPage[wordIndex].word);

    const answer = answersWords.indexOf(word.word);

    const rowRightAnswers = prevRoundResult ? gameData.rowRightAnswers + 1 : 0;
    const maxRow = Math.max(gameData.maxRow, rowRightAnswers);
    const combos = Math.ceil(rowRightAnswers / ADD_COMBO_FOR_RIGHT_ANSWERS_AMOUNT);
    const score = gameData.score + POINTS_FOR_RIGHT_ANSWER * combos;

    let { totalAnswers } = gameData;
    if (prevRoundResult !== undefined) {
      totalAnswers = [...gameData.totalAnswers, prevRoundResult];
    }

    if (gameData.step === nextStep) {
      setGameData((prevData) => ({
        ...prevData,
        rowRightAnswers,
        maxRow,
        totalAnswers,
        score,
        isAnswered,
      }));
    } else {
      setGameData((prevData) => ({
        ...prevData,
        step,
        word,
        answersWords,
        answer,
        rowRightAnswers,
        maxRow,
        totalAnswers,
        isAnswered,
        score,
      }));
    }
  };

  const getUserAnswer = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const userAnswer = target.classList.contains('true');
    console.log(userAnswer);
    saveRoundAndPlayNext(gameData.step, userAnswer);
  };

  const goToNextRound = () => {
    saveRoundAndPlayNext(gameData.step + 1);
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

  useEffect(() => saveRoundAndPlayNext(), [wordsData]);

  useEffect(() => endGame(), [gameData.isEnded]);

  if (location.state === FROM_TEXTBOOK_PAGE || location.state === FROM_MAIN_PAGE) {
    return (
      <PageTemplate>
        <GameProgress
          rowRightAnswers={gameData.rowRightAnswers}
          totalAnswers={gameData.totalAnswers}
          score={gameData.score}
        />
        {gameData.isAnswered ? (
          <div className={classnames.imageBox}>
            <img
              className={classnames.wordImage}
              src={`${MEDIA_BASIS_URL}/${gameData.word.image}`}
              alt={`${gameData.word.wordTranslate}`}
            />
            <p>{gameData.word.word}</p>
          </div>
        ) : null}
        <div className={classnames.mainContent}>
          <button
            type="button"
            className={classnames.button}
            onClick={() => playAudio(gameData.word.audio)}
          />
          <AnswersBox
            answersWords={gameData.answersWords}
            getAnswer={getUserAnswer}
            answer={gameData.answer}
          />
        </div>
        <button
          className={classnames.buttonNext}
          type="button"
          onClick={goToNextRound}
          disabled={!gameData.isAnswered}
        />
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
      <Link to="/audiocall" state="main" className={classnames.link}>
        Играть
      </Link>
    </PageTemplate>
  );
}
