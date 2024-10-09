import { Outlet, useNavigate } from "react-router-dom";
import Navbar2 from "../../Shared/Navbar2";
import Footer from "../../Shared/Footer";
import { FaEnvelope } from "react-icons/fa";
import useCurrentUser from "../../Hooks/useCurrentUser";
import Loader from "../../Shared/Loader";

const AuthLayout = () => {
  const { loading } = useCurrentUser();
  const navigate = useNavigate();

  const goToMessages = () => {
    navigate("/messages");
  };
  if (loading) return <Loader />;
  return (
    <div className="bg-white">
      <Navbar2 />
      <div className="auth-container lg:px-24 md:px-12 px-4">
        <Outlet />
      </div>
      <Footer />

      <button
        onClick={goToMessages}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <FaEnvelope size={24} />
      </button>
    </div>
  );
};

export default AuthLayout;
