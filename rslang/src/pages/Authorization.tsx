import React, { useEffect, useState } from 'react';
import FormRegistr from '../components/Autorization/FormRegistr/FormRegistr';
import FormSigIn from '../components/Autorization/FormSigIn/FormSigIn';
import Logoff from '../components/Autorization/Logoff/Logoff';
import User from '../components/Autorization/User/User';
import { useWordsData } from '../components/providers/WordsProvider';
import { IWordsProviderValue } from '../services/interfaces';

function Form() {
  const { setPage } = useWordsData() as IWordsProviderValue;
  const stateLocalUser = Boolean(JSON.parse(localStorage.getItem('sigin')!));
  const [stateUser, setUserState] = useState(stateLocalUser);

  const changeFormStateUser = () => {
    setUserState(true);
  };
  const changeRemoveUser = () => {
    localStorage.removeItem('sigin');
    setUserState(false);
  };

  useEffect(() => {
    setPage(1);
  }, [stateUser]);

  return (
    <div className="form-block">
      <div className="form-block__item">
        <User stateUser={stateUser} />
        {!stateUser ? (
          <>
            <FormRegistr />
            <FormSigIn changeFormStateUser={changeFormStateUser} />
          </>
        ) : (
          <Logoff changeRemoveUser={changeRemoveUser} />
        )}
      </div>
    </div>
  );
}

export default Form;
