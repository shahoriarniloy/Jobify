import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import Navbar2 from "../Shared/Navbar2";
import { FaEnvelope } from "react-icons/fa";
import useCurrentUser from "../Hooks/useCurrentUser";
import Loader from "../Shared/Loader";

const Main = () => {
  const navigate = useNavigate();
  const { loading } = useCurrentUser();
  const goToMessages = () => {
    navigate("/messages");
  };
  if (loading) return <Loader />;
  return (
    <div className="roboto-regular bg-[#f6f8f8]">
      <Navbar2 />
      <Navbar />

      <div className="lg:px-24 md:px-12 px-4 ">
        <div className="lg:px-24 md:px-12 px-4 min-h-screen   mt-4">
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
