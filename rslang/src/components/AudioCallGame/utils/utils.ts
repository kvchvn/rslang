/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
export  function createNumber() {
    let numReserve: any = [];
    while (numReserve.length < 3) {
      let randomNumber = Math.ceil(Math.random() * 19);
      let found = false;
      for (let i = 0; i < numReserve.length; i++) {
        if (numReserve[i] === randomNumber) {
          found = true;
          break;
        }
      }
      if (!found) {
        numReserve[numReserve.length] = randomNumber;
      }
    }
    return numReserve;
  }


  export function createAnswers(arr: any) {
    let newNumberArr = createNumber();
    if (arr.length) {
      const answers = [
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[0].wordTranslate, isCorrect: true },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
            { answerText: arr[1].wordTranslate, isCorrect: true },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[2].wordTranslate, isCorrect: true },
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[3].wordTranslate, isCorrect: true },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
            { answerText: arr[4].wordTranslate, isCorrect: true },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[5].wordTranslate, isCorrect: true },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[6].wordTranslate, isCorrect: true },
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
          ],
        },

        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
            { answerText: arr[7].wordTranslate, isCorrect: true },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[8].wordTranslate, isCorrect: true },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[9].wordTranslate, isCorrect: true },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[10].wordTranslate, isCorrect: true },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
          ],
        },

        {
          answerOptions: [
            { answerText: arr[11].wordTranslate, isCorrect: true },
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
            { answerText: arr[12].wordTranslate, isCorrect: true },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[13].wordTranslate, isCorrect: true },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
            { answerText: arr[14].wordTranslate, isCorrect: true },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[15].wordTranslate, isCorrect: true },
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
            { answerText: arr[16].wordTranslate, isCorrect: true },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[17].wordTranslate, isCorrect: true },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[18].wordTranslate, isCorrect: true },
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
          ],
        },
        {
          answerOptions: [
            { answerText: arr[newNumberArr[0]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[1]].wordTranslate, isCorrect: false },
            { answerText: arr[newNumberArr[2]].wordTranslate, isCorrect: false },
            { answerText: arr[19].wordTranslate, isCorrect: true },
          ],
        },
      ];
      return answers;
    }
  }


  const media_basic = 'https://raw.githubusercontent.com/rolling-scopes-school/react-rslang-be/main/';

  export const playAudio = (sources: Array<string>) => {
    const audio = new Audio(`${media_basic}/${sources[0]}`);
    audio.play();
    audio.addEventListener('ended', () => {
      audio.remove();
    })
    
  }