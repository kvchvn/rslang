/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { getWordsApiZero } from "../api/api";
import "./WordZero.css";
import { createNumber, createAnswers, playAudio } from "../utils/utils";

interface IZero {
  zeroState: boolean;
}

const WordsZero: React.FC<IZero> = ({ zeroState }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const [wordsZero, setWordsZero] = useState([] as any[]);

  let answersBlockZero: any = [];

  useEffect(() => {
    async function getStateWordsZero() {
      const dataWordsZero = await getWordsApiZero();
      setWordsZero(dataWordsZero);
    }
    getStateWordsZero();
  }, []);

  useEffect(() => {
    if (wordsZero.length) {
      playAudio([`${wordsZero[currentQuestion].audio}`]);
    }
  });

  const handleAnswerOptionClick = (isCor: boolean): void => {
    createNumber();
    if (isCor) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < wordsZero.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const refresh = (): void => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  answersBlockZero = createAnswers(wordsZero);

  return (
    <>
      {zeroState ? (
        <div className="zero">
          {showScore ? (
            <div className="section__score">
              <div>
                Правильных ответов {score} из {wordsZero.length}
              </div>
              <button className="refresh__btn" onClick={refresh}>
                Начать сначала
              </button>
            </div>
          ) : (
            <div className="quiz">
              <div className="question__section">
                <div className="question__count">
                  <span>Слово {currentQuestion + 1}</span> / {wordsZero.length}
                </div>
                <div
                  className="question__text"
                  onClick={() =>
                    playAudio([`${wordsZero[currentQuestion].audio}`])
                  }
                >
                  {wordsZero.length
                    ? wordsZero[currentQuestion].transcription
                    : null}
                </div>
              </div>
              <div className="answer__section">
                {answersBlockZero
                  ? answersBlockZero[currentQuestion].answerOptions.map(
                      (item: any, index: number) => {
                        return (
                          <button
                            onClick={() =>
                              handleAnswerOptionClick(item.isCorrect)
                            }
                            key={index}
                          >
                            {item.answerText}
                          </button>
                        );
                      }
                    )
                  : null}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default WordsZero;
