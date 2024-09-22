import{ useContext } from 'react';
import { userDataContext } from './../Pages/Auth/CreateAccount/AuthContext';

const useCurrentUser = () => {
    const userInfo = useContext(userDataContext);
    return userInfo;
};

export default useCurrentUser;