import React, { useState } from 'react';
import FormRegistr from '../components/Autorization/FormRegistr/FormRegistr';
import FormSigIn from '../components/Autorization/FormSigIn/FormSigIn';
import Logoff from '../components/Autorization/Logoff/Logoff';
import User from '../components/Autorization/User/User';

const Form: React.FC = () => {
  const stateLocalUser = Boolean(JSON.parse(localStorage.getItem('sigin')!));

  const [stateUser, setUserState] = useState(stateLocalUser);

  const changeFormStateUser = () => {
    setUserState(true);
  };
  const changeRemoveUser = () => {
    localStorage.removeItem('sigin');
    setUserState(false);
  };

  return (
    <div className="form-block">
      <div className="form-block__item">
        <User stateUser={stateUser} />
        <FormRegistr />
        <FormSigIn changeFormStateUser={changeFormStateUser} />
        <Logoff changeRemoveUser={changeRemoveUser} />
      </div>
    </div>
  );
};

export default Form;
