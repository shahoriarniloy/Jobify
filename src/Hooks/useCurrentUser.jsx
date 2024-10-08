

import { useContext } from "react";
import { AuthContext } from "../Pages/Auth/CreateAccount/AuthContext";

const useCurrentUser = () => {
    const userInfo = useContext(AuthContext);
   

    return userInfo;
};

export default useCurrentUser;
