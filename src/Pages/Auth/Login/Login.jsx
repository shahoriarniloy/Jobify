import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import ButtonLoader from "../../../Shared/ButtonLoader";
import { useTranslation } from "react-i18next";
import useCurrentUser from "./../../../Hooks/useCurrentUser";
import { useSelector } from "react-redux";

const Login = ({ setLoginModalOpen, setSignUpModalOpen }) => {
  const { signInWithGoogle, signInUser, loading } = useCurrentUser();
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.theme);

  const [showPassword, setShowPassword] = useState(false);
  // my test
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password).then((res) => {
      if (res.user) {
        toast.success("Successfully logedIn");
        setLoginModalOpen(false);
      }
    });
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
    <div className="flex justify-center mt-24">
      <div
        className={
          theme === "dark"
            ? "bg-[#1A202C] text-white w-[400px] max-w-2xl shadow-lg rounded-lg"
            : "bg-white text-black w-[400px] max-w-2xl shadow-lg rounded-lg"
        }
      >
        <Helmet>
          <title>{t("login")}</title>
        </Helmet>

        <div className="p-7">
          <h2
            className={
              theme === "dark"
                ? "text-4xl font-semibold text-slate-200"
                : "text-4xl font-semibold text-black"
            }
          >
            {t("sign_in")}
          </h2>{" "}
          <div className="mt-8">
            <form onSubmit={handleLogin}>
              <div className="space-y-5 mt-5 w-full">
                <input
                  type="email"
                  name="email"
                  placeholder={t("email_placeholder")}
                  className={
                    theme === "dark"
                      ? "block w-full px-4 py-2 mt-2 text-white placeholder-gray-400 bg-[#2D3748] border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                      : "block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  }
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={t("password_placeholder")}
                    className={
                      theme === "dark"
                        ? "block w-full px-4 py-2 mt-2 text-white placeholder-gray-400 bg-[#2D3748] border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                        : "block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    }
                    required
                  />
                  <button
                    type="button"
                    className={
                      theme === "dark"
                        ? "absolute right-2 top-2 text-gray-400 hover:text-white"
                        : "absolute right-2 top-2 text-gray-700 hover:text-black"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className={
                    theme === "dark"
                      ? "btn w-full bg-blue-600 hover:bg-blue-700 text-white"
                      : "btn w-full bg-[#0A65CC] hover:bg-blue-500 text-white"
                  }
                >
                  {loading ? <ButtonLoader /> : t("sign_in_button")}{" "}
                </button>
              </div>
            </form>
            <p className="text-center my-3">{t("or")}</p>{" "}
            <button
              onClick={handleGoogleSignIn}
              className={
                theme === "dark"
                  ? "bg-[#2D3748] w-full flex items-center text-white justify-center gap-x-3 text-sm rounded-lg hover:bg-[#4A5568] duration-300 transition-colors border border-gray-600 px-6 py-2.5"
                  : "bg-white w-full flex items-center text-gray-700 justify-center gap-x-3 text-sm rounded-lg hover:bg-gray-100 duration-300 transition-colors border border-gray-200 px-6 py-2.5"
              }
            >
              <img
                src="https://i.ibb.co/tzD10YQ/6929234-google-logo-icon.png"
                alt="Google Logo"
                className="h-6 w-6"
              />
              {t("google_sign_in")}
            </button>
            <p className="mt-4 text-xs text-center">
              {t("dont_have_account")}
              <span
                className={
                  theme === "dark"
                    ? "text-blue-400 hover:underline"
                    : "text-blue-600 hover:underline"
                }
              >
                <button
                  onClick={() => {
                    setLoginModalOpen(false);
                    setSignUpModalOpen(true);
                  }}
                >
                  {t("create_account")}
                </button>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
