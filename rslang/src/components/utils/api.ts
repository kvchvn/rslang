export const changerRegistr = async (name: string, password: string, email: string) => {
  const rawResponse = await fetch('https://rs-lang-1.herokuapp.com/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      password,
      email,
    }),
  });
  return rawResponse.json();
};

export const changeSigIn = async (email: string, password: string) => {
  const rawResponse = await fetch('https://rs-lang-1.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return rawResponse.json();
};
