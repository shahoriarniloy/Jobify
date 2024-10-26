import { Navigate } from "react-router-dom";
import useCurrentUser from "../Hooks/useCurrentUser";
import useUserRole from "../Hooks/useUserRole";
import { toast } from "react-toastify";

const EmployerRoute = ({ children }) => {
  const { currentUser } = useCurrentUser();
  const { role} = useUserRole();

  if (!currentUser?.email || role !== "Employer") {
    toast.warn("Please Login First !!!")
    return <Navigate to="/login" replace />;
  }
    return children;
};

export default EmployerRoute;
