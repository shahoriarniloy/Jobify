import { Navigate } from "react-router-dom";
import useCurrentUser from "../Hooks/useCurrentUser";
import useUserRole from "../Hooks/useUserRole";
import { toast } from "react-toastify";

const AdminRoute = ({ children }) => {
  const { currentUser } = useCurrentUser();
  const { role } = useUserRole();

  if (!currentUser?.email || role !== "Admin") {
    toast.warn("Please Login First !!!")
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminRoute;
