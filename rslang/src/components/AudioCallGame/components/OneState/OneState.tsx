/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from "react";
import {getWordsApiOne} from '../../api/api';
import {createAnswers, createNumber, playAudio} from '../../utils/utils'


interface IOneState {
  oneState: boolean;
}

const OneState: React.FC<IOneState> = ({ oneState }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [wordsOne, setWordsOne] = useState([] as any[]);

  useEffect(() => {
    async function getStateWordsOne() {
      const dataWordsOne = await getWordsApiOne();
      setWordsOne(dataWordsOne);
    }
    getStateWordsOne();
  }, [])
  
  let answersBlockOne: any = [];

  useEffect(() => {
    if (wordsOne.length) {
      playAudio([`${wordsOne[currentQuestion].audio}`]);
    }
  });

  
  const handleAnswerOptionClick = (isCor: boolean): void => {
    createNumber();
    if (isCor) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < wordsOne.length) {
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

  answersBlockOne = createAnswers(wordsOne);

  return(
    <>
      {oneState ? (
      <div className="zero">
        {showScore ? (
          <div className="section__score">
            <div>
              Правильных ответов {score} из {wordsOne.length}
            </div>
            <button className="refresh__btn" onClick={refresh}>
              Начать сначала
            </button>
          </div>
        ) : (
          <div className="quiz">
            <div className="question__section">
              <div className="question__count">
                <span>Слово {currentQuestion + 1}</span> / {wordsOne.length}
              </div>
              <div className="question__text"  onClick={() =>
                    playAudio([`${wordsOne[currentQuestion].audio}`])
                  }>
                {wordsOne.length ? wordsOne[currentQuestion].transcription : null}
              </div>
            </div>
            <div className="answer__section">
              {answersBlockOne
                ? answersBlockOne[currentQuestion].answerOptions.map(
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
  
  )
};

export default OneState;
