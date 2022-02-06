import React, { useState, useEffect } from "react";



interface IUserFormState {
  stateUser: boolean
}

const User: React.FC<IUserFormState> = ({stateUser}) => {

  let userName = JSON.parse(localStorage.getItem("sigin")!);
  console.log(stateUser);
  
  return (
    <>
      <div className="title-user">
        {
          stateUser ? <p>Приветсвуем Вас, {userName[0].name}</p> : <p>Пользователь не авторизован</p>
        }
      </div>
    </>
  );
};

export default User;
