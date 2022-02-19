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
    statisticsBox: 'statistics-page__statistics-box statistics-box',
    statisticsSprint: 'statistics-box__sprint-box statistics-box__part statistics_sprint',
    statisticsAudiocall: 'statistics-box__audiocall-box statistics-box__part statistics_audiocall',
    statisticsTotal: 'statistics-box__total-box statistics-box__part statistics_total',
    subtitle: 'statistics-box__subtitle',
    info: 'statistics-box__info',
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
        <h2 className={classnames.mainTitle}>Статистика</h2>
        <section className={classnames.mainSection}>
          <ul className={classnames.statisticsBox}>
            <li className={classnames.statisticsSprint}>
              <h3 className={classnames.subtitle}>Спринт</h3>
              <ul className={classnames.info}>
                <li>
                  Новых слов:
                  <span>{statistics.sprintGame.newWords}</span>
                </li>
                <li>
                  Правильных ответов:
                  <span>{statistics.sprintGame.rightAnswersPercent}%</span>
                </li>
                <li>
                  Макс. серия правильных ответов:
                  <span>{statistics.sprintGame.maxRowRightAnswers}</span>
                </li>
              </ul>
            </li>
            <li className={classnames.statisticsAudiocall}>
              <h3 className={classnames.subtitle}>Аудиовызов</h3>
              <ul className={classnames.info}>
                <li>
                  Новых слов:
                  <span>{statistics.audiocallGame.newWords}</span>
                </li>
                <li>
                  Правильных ответов:
                  <span>{statistics.audiocallGame.rightAnswersPercent}%</span>
                </li>
                <li>
                  Макс. серия правильных ответов:
                  <span>{statistics.audiocallGame.maxRowRightAnswers}</span>
                </li>
              </ul>
            </li>
            <li className={classnames.statisticsTotal}>
              <h3 className={classnames.subtitle}>Общая статистика</h3>
              <ul className={classnames.info}>
                <li>
                  Новых слов:
                  <span>{statistics.total.newWords}</span>
                </li>
                <li>
                  Изученных слов:
                  <span>{statistics.total.learnedWords}</span>
                </li>
                <li>
                  Правильных ответов:
                  <span>{statistics.total.rightAnswersPercent}%</span>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
