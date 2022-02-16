import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import WordsComparing from '../components/SprintGame/WordsComparing';
import GameProgress from '../components/SprintGame/GameProgress';
import GameButtons from '../components/SprintGame/GameButtons';
import { useWordsData } from '../components/providers/WordsProvider';
import { ISprintGameData, IWordsProviderValue } from '../services/interfaces';
import { MAX_WORDS_ON_PAGE } from '../services/requests';
import Timer from '../components/SprintGame/Timer';

const FROM_TEXTBOOK_PAGE = 'textbook';

export default function SprintGame() {
  const location = useLocation();
  const { wordsData } = useWordsData() as IWordsProviderValue;
  const [gameData, setGameData] = useState<ISprintGameData>({
    step: 0,
    originalWord: '',
    translatedWord: '',
    answer: false,
    rowProgress: 0,
    totalProgress: [],
    isEnded: false,
  });

  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  const saveRoundAndPlayNext = (nextStep?: number, prevRoundResult?: boolean) => {
    if (!wordsData.wordsPage.length) return;
    if (gameData.isEnded) return;

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

    const rowProgress = prevRoundResult ? gameData.rowProgress + 1 : 0;
    let { totalProgress } = gameData;
    if (prevRoundResult !== undefined) {
      totalProgress = [...gameData.totalProgress, prevRoundResult];
    }

    setGameData((prevData) => ({
      ...prevData,
      step,
      originalWord,
      translatedWord,
      answer,
      rowProgress,
      totalProgress,
    }));
  };

  const getUserAnswer = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const userAnswer = target.classList.contains('true');
    saveRoundAndPlayNext(gameData.step + 1, userAnswer);
  };

  const endRound = () => {
    const isEnded = true;
    setGameData((prevData) => ({ ...prevData, isEnded }));
  };

  useEffect(() => saveRoundAndPlayNext(), [wordsData]);
  console.log(gameData);

  if (gameData.isEnded) {
    // create box with results
    return <h1>END GAME</h1>;
  }

  if (location.state === FROM_TEXTBOOK_PAGE) {
    return (
      <main className="page sprints-page sprint">
        <div className="wrapper sprint-wrapper">
          <h2 className="page__title sprint-page__title">Спринт</h2>
          <section className="page__main-content sprint-page__main-content">
            <div className="sprint-page__game-info">
              <GameProgress
                rowProgress={gameData.rowProgress}
                totalProgress={gameData.totalProgress}
              />
              <Timer endRound={endRound} />
            </div>
            <WordsComparing
              originalWord={gameData.originalWord}
              translatedWord={gameData.translatedWord}
            />
            <GameButtons answer={gameData.answer} getUserAnswer={getUserAnswer} />
          </section>
        </div>
      </main>
    );
  }

  return <p>from main menu</p>;
}
