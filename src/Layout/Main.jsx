import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import Navbar2 from "../Shared/Navbar2";
import { FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";
import Loader from "../Shared/Loader";
import "../../locales/i18";
import Modal from "react-responsive-modal";
import { useState } from "react";

const Main = () => {
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  const { loading } = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.user.currentUser);


  if (loading) return <Loader />;

  return (
    <div
      className={`roboto-regular relative ${theme === "dark" ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
        }`}
    >
      <Navbar2 />
      <Navbar />

      
        <div className="min-h-[calc(100vh-240px)]">
          <Outlet />
        </div>

        <button
          onClick={()=>setIsOpenMessage(!isOpenMessage)}
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

      <div className={isOpenMessage?"sticky right-0 w-full max-w-4xl h-full max-h-56 bg-blue-400":"hidden"}>

      </div>
    </div>
  );
};

export default Main;
