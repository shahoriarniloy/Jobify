import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar2 from "../../Shared/Navbar2";
import Footer from "../../Shared/Footer";
import { FaEnvelope } from "react-icons/fa";
import useCurrentUser from "../../Hooks/useCurrentUser";
import Loader from "../../Shared/Loader";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { loading } = useCurrentUser();
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  if (loading) return <Loader />;
  return (
    <div
      className={`roboto-regular ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar2 />

      <div className="lg:px-24 md:px-12 px-4 min-h-[calc(100vh-290px)]">
        <Outlet />

        {/* Massage components */}
        <div
          className={
            isOpenMessage
              ? "fixed bottom-24 right-9 w-full max-w-xl h-full max-h-[50vh] rounded-lg bg-blue-400 shadow-lg"
              : "hidden"
          }
        ></div>
      </div>
      <Footer />

      {/* <button
         onClick={() => setIsOpenMessage(!isOpenMessage)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <FaEnvelope size={24} />
      </button> */}
    </div>
  );
};

export default AuthLayout;
