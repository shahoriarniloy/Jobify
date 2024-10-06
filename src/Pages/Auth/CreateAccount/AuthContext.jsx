import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        });
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const userInfo = {
                    email: user.email,
                    name: user.displayName || 'Guest',
                    photoURL: user.photoURL
                };
                setUser(userInfo);
            })
            .catch((error) => {
                console.error(error); // Consider logging the error for debugging
            })
            .finally(() => setLoading(false)); // Ensure loading state is reset
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
            
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(true);
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
            setLoading(false); 
        });

        return () => unSubscribe();

    }, []);

    const authInfo = { currentUser, createUser, signInUser, signInWithGoogle, logOut, updateUserProfile, loading };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
};
