/* eslint-disable no-return-await */
/* eslint-disable prettier/prettier */
export const getWordsApiZero = async () => {
  const rawResponse = await fetch(
    "https://rs-lang-1.herokuapp.com/words?page=0&group=0",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return await rawResponse.json();
};

export const getWordsApiOne = async () => {
  const rawResponse = await fetch(
    "https://rs-lang-1.herokuapp.com/words?page=1&group=0",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return await rawResponse.json();
};

export const getWordsApiTwo = async () => {
  const rawResponse = await fetch(
    "https://rs-lang-1.herokuapp.com/words?page=2&group=1",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return await rawResponse.json();
};

export const getWordsApiThree = async () => {
  const rawResponse = await fetch(
    "https://rs-lang-1.herokuapp.com/words?page=3&group=2",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return await rawResponse.json();
};

export const getWordsApiFour = async () => {
  const rawResponse = await fetch(
    "https://rs-lang-1.herokuapp.com/words?page=3&group=3",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return await rawResponse.json();
};


export const getWordsApiFive = async () => {
  const rawResponse = await fetch(
    "https://rs-lang-1.herokuapp.com/words?page=3&group=4",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return await rawResponse.json();
};






