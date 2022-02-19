/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { getWordsApiFive } from "../../api/api";
import { createAnswers, createNumber, playAudio } from "../../utils/utils";

interface IFiveState {
  fiveState: boolean;
}

const FiveState: React.FC<IFiveState> = ({ fiveState }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const [wordsFive, setWordsFive] = useState([] as any[]);

  useEffect(() => {
    async function getStateWordsFive() {
      const dataWordsFive = await getWordsApiFive();
      setWordsFive(dataWordsFive);
    }
    getStateWordsFive();
  }, []);

  let answersBlockFive: any = [];

  useEffect(() => {
    if (wordsFive.length) {
      playAudio([`${wordsFive[currentQuestion].audio}`]);
    }
  });

  const handleAnswerOptionClick = (isCor: boolean): void => {
    createNumber();
    if (isCor) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < wordsFive.length) {
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

  answersBlockFive = createAnswers(wordsFive);

  return (
    <>
      {fiveState ? (
        <div className="zero">
          {showScore ? (
            <div className="section__score">
              <div>
                Правильных ответов {score} из {wordsFive.length}
              </div>
              <button className="refresh__btn" onClick={refresh}>
                Начать сначала
              </button>
            </div>
          ) : (
            <div className="quiz">
              <div className="question__section">
                <div className="question__count">
                  <span>Слово {currentQuestion + 1}</span> / {wordsFive.length}
                </div>
                <div
                  className="question__text"
                  onClick={() =>
                    playAudio([`${wordsFive[currentQuestion].audio}`])
                  }
                >
                  {wordsFive.length
                    ? wordsFive[currentQuestion].transcription
                    : null}
                </div>
              </div>
              <div className="answer__section">
                {answersBlockFive
                  ? answersBlockFive[currentQuestion].answerOptions.map(
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

export default FiveState;
