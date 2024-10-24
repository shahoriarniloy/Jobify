import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import auth from "../Firebase/firebase.config";
import axiosSecure from "../../../Hooks/UseAxiosSecure";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        // const { data } = await axiosSecure.get(`/users/${user.email}`);
        // const serializableUser = {
        //   data
        // };
        // dispatch(setCurrentUser(serializableUser));
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
  }, [loading, logOutUser]);

  const authInfo = {
    currentUser,
    createUser,
    signInUser,
    signInWithGoogle,
    logOutUser,
    loading,
    setLoading,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
