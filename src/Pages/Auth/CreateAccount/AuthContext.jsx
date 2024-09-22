import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import auth from './../Firebase/firebase.config';




export const userDataContext = createContext(null);

// Auth provider
const googleProvider = new GoogleAuthProvider();

const AuthContext = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false);

    // login with google
    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // observer State
    useEffect(() => {
        const observer = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setLoading(false);
            }
            else {
                setCurrentUser([])
                setLoading(false)
            }

        })
        return () => observer();
    }, [loading])




    const info = {
        loginWithGoogle,
        currentUser,
        loading
    }

    return (
        <userDataContext.Provider value={info}>
            {children}
        </userDataContext.Provider>
    );
};

export default AuthContext;