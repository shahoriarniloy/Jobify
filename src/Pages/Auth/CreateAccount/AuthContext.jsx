import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, logOut } from "../../../Redux/userSlice";
import auth from "../Firebase/firebase.config";
import axiosSecure from "../../../Hooks/UseAxiosSecure";



export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  const signInUser = (email, password) => {

    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
    
    
  };

  const logOutUser = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        toast.success("You have successfully logged out.");
        dispatch(logOut());
        localStorage.removeItem("currentUser");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth,async (user) => {
      setLoading(true);
      if (user) {
        console.log(user)
        const {data} = await axiosSecure.get(`/users/${user.email}`);
        const serializableUser = {
          data
        };
        dispatch(setCurrentUser(serializableUser));
        localStorage.setItem("currentUser", JSON.stringify(serializableUser));
      } else {
        dispatch(logOut());
        localStorage.removeItem("currentUser");
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, [dispatch]);

  const authInfo = {
    currentUser,
    createUser,
    signInUser,
    signInWithGoogle,
    logOut: logOutUser,
    updateUserProfile,
    loading,
    setLoading
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
