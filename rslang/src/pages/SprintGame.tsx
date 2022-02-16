import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import WordsComparing from '../components/SprintGame/WordsComparing';
import GameProgress from '../components/SprintGame/GameProgress';
import GameButtons from '../components/SprintGame/GameButtons';
import RoundResult from '../components/SprintGame/RoundResult';
import { useWordsData } from '../components/providers/WordsProvider';
import { ISprintGameData, IWordsProviderValue } from '../services/interfaces';
import { MAX_WORDS_ON_PAGE } from '../services/requests';

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
  });

  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  const getAnswer = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const userAnswer = target.classList.contains('true');
    return userAnswer;
  };

  useEffect(() => {
    if (!wordsData.wordsPage.length) return;

    const step = 0;
    const randomNum = getRandomNumber(0, MAX_WORDS_ON_PAGE);

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

    const rowProgress = 0;
    const totalProgress: Array<boolean> = [];

    setGameData({ step, originalWord, translatedWord, answer, rowProgress, totalProgress });
  }, [wordsData]);

  if (location.state === FROM_TEXTBOOK_PAGE) {
    return (
      <main className="page sprints-page sprint">
        <div className="wrapper sprint-wrapper">
          <h2 className="page__title sprint-page__title">Спринт</h2>
          <section className="page__main-content sprint-page__main-content">
            <div className="sprint-page__game-info">
              <GameProgress />
              <p>TIME</p>
            </div>
            <RoundResult />
            <WordsComparing
              originalWord={gameData.originalWord}
              translatedWord={gameData.translatedWord}
            />
            <GameButtons answer={gameData.answer} getAnswer={getAnswer} />
          </section>
        </div>
      </main>
    );
  }
  return <p>from main menu</p>;
}
