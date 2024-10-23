import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import Navbar2 from "../Shared/Navbar2";
import { FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";
import Loader from "../Shared/Loader";
import "../../locales/i18";
import { useState } from "react";
import useCurrentUser from "../Hooks/useCurrentUser";

const Main = () => {
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const {loading} = useCurrentUser();


  if (loading) return <Loader />;

  return (
    <div
      className={`roboto-regular ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-800 to-slate-900 text-white"
          : "bg-white text-black"
      }`}
    >
      <Navbar2 />
      <Navbar />


      <div className="min-h-[calc(100vh-240px)] relative">
        <Outlet />

        {/* Massage components */}
        <div className={isOpenMessage ? "fixed bottom-24 right-9 w-full max-w-xl h-full max-h-[50vh] rounded-lg bg-blue-400 shadow-lg" : "hidden"}>
          
        </div>
      </div>

      <button
        onClick={() => setIsOpenMessage(!isOpenMessage)}

        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <FaEnvelope size={24} />
      </button>

      <Footer />


      {/* <Modal
      classNames="absolute bottom-0"
      open={isOpenMessage}
      onClose={()=>setIsOpenMessage(false)}
      center
      >
        <h1>akane massage asbe</h1>
      </Modal> */}


    </div>
  );
};

export default Main;
