import React from 'react';

interface IUserFormState {
  stateUser: boolean;
}

function User({ stateUser }: IUserFormState) {
  const userName = JSON.parse(localStorage.getItem('sigin')!);

  return (
    <div className="title-user">
      {stateUser ? <p>Приветсвуем Вас, {userName[0].name}</p> : <p>Пользователь не авторизован</p>}
    </div>
  );
}

export default User;
