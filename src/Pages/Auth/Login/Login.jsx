import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  signInWithGoogle,
  signInWithEmail,
  setCurrentUser,
} from "../../../Redux/userSlice";
import ButtonLoader from "../../../Shared/ButtonLoader";

const Login = ({ setLoginModalOpen, setSignUpModalOpen }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      const result = await dispatch(
        signInWithEmail({ email: email.value, password: password.value })
      ).unwrap();
      const user = result.user;

      dispatch(
        setCurrentUser({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        })
      );

      toast.success("Logged in successfully");
      navigate(from, { replace: true });
    } catch (error) {
      // console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await dispatch(signInWithGoogle()).unwrap();

      if (result) {
        dispatch(setCurrentUser(result));
        toast.success("Signed in with Google");
        navigate(from, { replace: true });
      } else {
        throw new Error("User data is undefined");
      }
    } catch (error) {
      // console.error("Google Sign-In Error:", error);
      toast.warn("Sign in with Google failed!");
    }
    setLoginModalOpen(false);
  };

  return (
    <div className="bg-white w-[400px] max-w-2xl">
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="p-7">
        <h2 className="text-4xl font-semibold">Sign In</h2>

        <div className="mt-8">
          <form onSubmit={handleLogin}>
            <div className="space-y-5 mt-5 w-full">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="mt-6">
              <button className="btn w-full bg-[#0A65CC] text-white">
                {loading ? <ButtonLoader /> : "Sign In"}
              </button>
            </div>
          </form>
          <p className="text-center my-3">or</p>

          <button
            onClick={handleGoogleSignIn}
            className="bg-white w-full flex items-center text-gray-700 justify-center gap-x-3 text-sm rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-6 py-2.5"
          >
            <img
              src="https://i.ibb.co/tzD10YQ/6929234-google-logo-icon.png"
              alt="Google Logo"
              className="h-6 w-6"
            />
            Sign in with Google
          </button>

          <p className="mt-4 text-xs text-center">
            Don't have an account?{" "}
            <span className="link-color">
              <button
                onClick={() => {
                  setLoginModalOpen(false);
                  setSignUpModalOpen(true);
                }}
              >
                Create account
              </button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
