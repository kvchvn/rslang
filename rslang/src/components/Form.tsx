import React, {useState} from "react";
import FormRegistr from "./FormRegistr/FormRegistr";
import FormSigIn from "./FormSigIn/FormSigIn";
import Logoff from "./Logoff/Logoff";
import User from "./User/User";



const Form:React.FC = () => {

    let stateLocalUser = Boolean(JSON.parse(localStorage.getItem("sigin")!));

    const [ stateUser, setUserState ] = useState(stateLocalUser);

    const changeFormStateUser = () => {
        setUserState(true)
    }
    const changeRemoveUser = () => {
        localStorage.removeItem('sigin');
        setUserState(false)
    }

    return (
        <>  
            <User stateUser={stateUser}/>
            <FormRegistr/>
            <FormSigIn changeFormStateUser={changeFormStateUser} />
            <Logoff
                changeRemoveUser={changeRemoveUser}
            />
            <h1>hello</h1>
        </>
    )
}

export default Form;

