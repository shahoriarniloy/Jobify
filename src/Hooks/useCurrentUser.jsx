import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Pages/Auth/CreateAccount/AuthContext"; 

const useCurrentUser = () => {
    const { user, logOut, loading } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (!loading) {
            console.log(user);
            setCurrentUser(user);
            console.log('current user',currentUser);
        }
    }, [currentUser,user, loading]);

    return { currentUser, logout: logOut };
};

export default useCurrentUser;
