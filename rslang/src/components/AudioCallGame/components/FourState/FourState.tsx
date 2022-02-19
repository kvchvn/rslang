/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { getWordsApiFour } from "../../api/api";
import { createAnswers, createNumber, playAudio } from "../../utils/utils";

interface IFourState {
  fourState: boolean;
}

const FourState: React.FC<IFourState> = ({ fourState }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const [wordsFour, setWordsFour] = useState([] as any[]);

  useEffect(() => {
    async function getStateWordsFour() {
      const dataWordsFour = await getWordsApiFour();
      setWordsFour(dataWordsFour);
    }
    getStateWordsFour();
  }, []);

  let answersBlockFour: any = [];

  useEffect(() => {
    if (wordsFour.length) {
      playAudio([`${wordsFour[currentQuestion].audio}`]);
    }
  });

  const handleAnswerOptionClick = (isCor: boolean): void => {
    createNumber();
    if (isCor) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < wordsFour.length) {
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

  answersBlockFour = createAnswers(wordsFour);

  return (
    <>
      {fourState ? (
        <div className="zero">
          {showScore ? (
            <div className="section__score">
              <div>
                Правильных ответов {score} из {wordsFour.length}
              </div>
              <button className="refresh__btn" onClick={refresh}>
                Начать сначала
              </button>
            </div>
          ) : (
            <div className="quiz">
              <div className="question__section">
                <div className="question__count">
                  <span>Слово {currentQuestion + 1}</span> / {wordsFour.length}
                </div>
                <div
                  className="question__text"
                  onClick={() =>
                    playAudio([`${wordsFour[currentQuestion].audio}`])
                  }
                >
                  {wordsFour.length
                    ? wordsFour[currentQuestion].transcription
                    : null}
                </div>
              </div>
              <div className="answer__section">
                {answersBlockFour
                  ? answersBlockFour[currentQuestion].answerOptions.map(
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

export default FourState;
