import React, { useEffect, useState } from 'react';
import { IStatisticsPageData } from '../services/interfaces';
import {
  getAllUserWords,
  getUserStatistics,
  TOKEN,
  USER_ID,
  WEAK_WORD,
} from '../services/requests';

export default function Statistics() {
  const [statistics, setStatistics] = useState<IStatisticsPageData>({
    sprintGame: {
      rightAnswersPercent: 0,
      newWords: 0,
      maxRowRightAnswers: 0,
    },
    audiocallGame: {
      rightAnswersPercent: 0,
      newWords: 0,
      maxRowRightAnswers: 0,
    },
    total: {
      newWords: 0,
      learnedWords: 0,
      rightAnswersPercent: 0,
    },
  });

  const classnames = {
    main: 'page statistics-page statistics',
    wrapper: 'wrapper statistics-wrapper',
    mainTitle: 'page__title statistics-page__title',
    mainSection: 'page__main-content statistics-page__main-content',
  };

  const getStatistics = () => {
    getUserStatistics(USER_ID, TOKEN).then(async (updatedStat) => {
      let { sprintGame, audiocallGame, total } = statistics;

      if (updatedStat.optional.sprint) {
        const updated = updatedStat.optional.sprint;
        sprintGame = {
          rightAnswersPercent: Math.round((updated.rightAnswers / updated.totalAnswers) * 100),
          newWords: updated.totalAnswers,
          maxRowRightAnswers: updated.maxRowRightAnswers,
        };
      }
      if (updatedStat.optional.audiocall) {
        const updated = updatedStat.optional.audiocall;
        audiocallGame = {
          rightAnswersPercent: Math.round((updated.rightAnswers / updated.totalAnswers) * 100),
          newWords: updated.totalAnswers,
          maxRowRightAnswers: updated.maxRowRightAnswers,
        };
      }

      total = {
        rightAnswersPercent:
          (sprintGame.rightAnswersPercent + audiocallGame.rightAnswersPercent) / 2,
        newWords: updatedStat.learnedWords,
        learnedWords: (await getAllUserWords(USER_ID, TOKEN)).filter(
          (word) => word.difficulty === WEAK_WORD
        ).length,
      };

      if (!sprintGame.rightAnswersPercent || !audiocallGame.rightAnswersPercent) {
        total.rightAnswersPercent = Math.max(
          sprintGame.rightAnswersPercent,
          audiocallGame.rightAnswersPercent
        );
      }

      setStatistics((prevStatistics) => ({ ...prevStatistics, sprintGame, audiocallGame, total }));
    });
  };

  useEffect(() => getStatistics(), [statistics.total.newWords]);

  return (
    <main className={classnames.main}>
      <div className={classnames.wrapper}>
        <h2 className={classnames.mainTitle}>Спринт</h2>
        <section className={classnames.mainSection}>
          <ul>
            <li>
              <h3>Спринт</h3>
              <ul>
                <li>{`Новых слов: ${statistics.sprintGame.newWords}`}</li>
                <li>{`Правильных ответов: ${statistics.sprintGame.rightAnswersPercent}%`}</li>
                <li>{`Серия правильных ответов: ${statistics.sprintGame.maxRowRightAnswers}`}</li>
              </ul>
            </li>
            <li>
              <h3>Аудиовызов</h3>
              <ul>
                <li>{`Новых слов: ${statistics.audiocallGame.newWords}`}</li>
                <li>{`Правильных ответов: ${statistics.audiocallGame.rightAnswersPercent}%`}</li>
                <li>{`Серия правильных ответов: ${statistics.audiocallGame.maxRowRightAnswers}`}</li>
              </ul>
            </li>
            <li>
              <h3>Общая статистика</h3>
              <ul>
                <li>{`Новых слов: ${statistics.total.newWords}`}</li>
                <li>{`Изученных слов: ${statistics.total.learnedWords}`}</li>
                <li>{`Правильных ответов: ${statistics.total.rightAnswersPercent}%`}</li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
