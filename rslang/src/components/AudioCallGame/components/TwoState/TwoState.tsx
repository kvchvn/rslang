/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */


import React, { useEffect, useState } from "react";
import { getWordsApiTwo } from "../../api/api";
import { createAnswers, createNumber, playAudio } from "../../utils/utils";

interface ITwoState {
  twoState: boolean;
}

const TwoState: React.FC<ITwoState> = ({ twoState }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const [wordsTwo, setWordsTwo] = useState([] as any[]);

  useEffect(() => {
    async function getStateWordsTwo() {
      const dataWordsOne = await getWordsApiTwo();
      setWordsTwo(dataWordsOne);
    }
    getStateWordsTwo();
  }, []);

  let answersBlockTwo: any = [];

  useEffect(() => {
    if (wordsTwo.length) {
      playAudio([`${wordsTwo[currentQuestion].audio}`]);
    }
  });

  const handleAnswerOptionClick = (isCor: boolean): void => {
    createNumber();
    if (isCor) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < wordsTwo.length) {
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

  answersBlockTwo = createAnswers(wordsTwo);
  console.log(wordsTwo);

  return (
    <>
      {twoState ? (
        <div className="zero">
          {showScore ? (
            <div className="section__score">
              <div>
                Правильных ответов {score} из {wordsTwo.length}
              </div>
              <button className="refresh__btn" onClick={refresh}>
                Начать сначала
              </button>
            </div>
          ) : (
            <div className="quiz">
              <div className="question__section">
                <div className="question__count">
                  <span>Слово {currentQuestion + 1}</span> / {wordsTwo.length}
                </div>
                <div
                  className="question__text"
                  onClick={() =>
                    playAudio([`${wordsTwo[currentQuestion].audio}`])
                  }
                >
                  {wordsTwo.length
                    ? wordsTwo[currentQuestion].transcription
                    : null}
                </div>
              </div>
              <div className="answer__section">
                {answersBlockTwo
                  ? answersBlockTwo[currentQuestion].answerOptions.map(
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

export default TwoState;
