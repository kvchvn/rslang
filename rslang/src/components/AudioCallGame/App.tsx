/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import './App.css';
import WordsZero from './components/WordsZero';
import OneState from './components/OneState/OneState';
import TwoState from './components/TwoState/TwoState';
import ThreeState from './components/ThreeState/ThreeState';
import FourState from './components/FourState/FourState';
import FiveState from './components/FiveState/FiveState';

function AppAudioCallGame() {
  const [btnState, setbtnState] = useState(true);
  const [zeroState, setZeroState] = useState(false);
  const [oneState, setOneState] = useState(false);
  const [twoState, setTwoState] = useState(false);
  const [threeState, setThreeState] = useState(false);
  const [fourState, setFourState] = useState(false);
  const [fiveState, setFiveState] = useState(false);

  const handleBtnState = () => {
    setbtnState(false);
  };
  const handleBackCategory = () => {
    setbtnState(true);
    setZeroState(false);
    setOneState(false);
    setTwoState(false);
    setThreeState(false);
    setFourState(false);
    setFiveState(false);
  };
  const handleZero = (): void => {
    setZeroState(true);
  };

  const handleOne = () => {
    setOneState(true);
  };
  const handleTwo = () => {
    setTwoState(true);
  };
  const handleThree = () => {
    setThreeState(true);
  };
  const handleFour = () => {
    setFourState(true);
  };
  const handleFive = () => {
    setFiveState(true);
  };

  return (
    <>
      {btnState ? (
        <div className="buttons-block">
          <h1 className="buttons-title">Выберите категорию в которую хотите сыграть</h1>
          <div onClick={handleBtnState} className="btn-category">
            <button onClick={handleZero}>zero</button>
            <button onClick={handleOne}>one</button>
            <button onClick={handleTwo}>two</button>
            <button onClick={handleThree}>three</button>
            <button onClick={handleFour}>four</button>
            <button onClick={handleFive}>five</button>
          </div>
        </div>
      ) : null}

      {zeroState ? <WordsZero zeroState={zeroState} /> : null}
      {oneState ? <OneState oneState={oneState} /> : null}
      {twoState ? <TwoState twoState={twoState} /> : null}
      {threeState ? <ThreeState threeState={threeState} /> : null}
      {fourState ? <FourState fourState={fourState} /> : null}
      {fiveState ? <FiveState fiveState={fiveState} /> : null}

      {zeroState ||
      oneState ||
      twoState ||
      threeState ||
      fourState ||
      fiveState ? (
        <button onClick={handleBackCategory}>Назад в категории</button>
      ) : null}
    </>
  );
}

export default AppAudioCallGame;
