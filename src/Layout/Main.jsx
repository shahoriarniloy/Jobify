import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import Navbar2 from "../Shared/Navbar2";
import { FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";
import Loader from "../Shared/Loader";

const Main = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  const { loading } = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.user.currentUser);

  const goToMessages = () => {
    navigate("/messages");
  };

  if (loading) return <Loader />;

  return (
    <div
      className={`roboto-regular ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="">
        <Navbar2 />
      </div>
      <Navbar />

      <div className="lg:px-24 md:px-6 px-4 ">
        <div className="mt-4">
          <Outlet />
        </div>

        <button
          onClick={goToMessages}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          <FaEnvelope size={24} />
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
