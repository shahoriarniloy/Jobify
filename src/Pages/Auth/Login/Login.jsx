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
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { useTranslation } from "react-i18next"; // Import useTranslation
import useCurrentUser from "./../../../Hooks/useCurrentUser";

const Login = ({ setLoginModalOpen, setSignUpModalOpen }) => {
  const { t } = useTranslation(); // Initialize translation
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const { signInWithGoogle } = useCurrentUser();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      const result = await dispatch(
        signInWithEmail({ email: email.value, password: password.value })
      ).unwrap();

      const user = result;
      const userEmail = user.email;

      const response = await axiosSecure.get(`/users/${userEmail}`);
      const userData = response.data;

      dispatch(
        setCurrentUser({
          ...user,
          role: userData.role,
          photoURL: userData.photoURL || user.photoURL,
        })
      );

      toast.success(
        t("login.sign_in") + " " + t("login.login") + " " + t("login.success")
      ); // Optional success message
      navigate(from, { replace: true });
    } catch (error) {
      // console.error("Error during login:", error);
      toast.error(t("login_failed")); // Change to use translation
    }
  };

  const handleGoogleSignIn = async () => {
    signInWithGoogle().then((result) => {
      toast.success(
        `${result?.user?.displayName} sign with ${result?.providerId}`
      );
      setLoginModalOpen(false);
    });
  };

  return (
    <div className="bg-white w-[400px] max-w-2xl">
      <Helmet>
        <title>{t("login")}</title> {/* Title translation */}
      </Helmet>

      <div className="p-7">
        <h2 className="text-4xl font-semibold">{t("sign_in")}</h2>{" "}
        {/* Sign In translation */}
        <div className="mt-8">
          <form onSubmit={handleLogin}>
            <div className="space-y-5 mt-5 w-full">
              <input
                type="email"
                name="email"
                placeholder={t("email_placeholder")} // Email placeholder translation
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={t("password_placeholder")} // Password placeholder translation
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
                {loading ? <ButtonLoader /> : t("sign_in_button")}{" "}
                {/* Sign In button translation */}
              </button>
            </div>
          </form>
          <p className="text-center my-3">{t("or")}</p> {/* "or" translation */}
          <button
            onClick={handleGoogleSignIn}
            className="bg-white w-full flex items-center text-gray-700 justify-center gap-x-3 text-sm rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-6 py-2.5"
          >
            <img
              src="https://i.ibb.co/tzD10YQ/6929234-google-logo-icon.png"
              alt="Google Logo"
              className="h-6 w-6"
            />
            {t("google_sign_in")} {/* Google sign-in translation */}
          </button>
          <p className="mt-4 text-xs text-center">
            {t("dont_have_account")}
            <span className="link-color">
              <button
                onClick={() => {
                  setLoginModalOpen(false);
                  setSignUpModalOpen(true);
                }}
              >
                {t("create_account")} {/* Create account translation */}
              </button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
