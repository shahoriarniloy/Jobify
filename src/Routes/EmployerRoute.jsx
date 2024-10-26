import { Navigate } from "react-router-dom";
import useUserRole from "../Hooks/useUserRole";
import { toast } from "react-toastify";

const EmployerRoute = ({ children }) => {
  const { role } = useUserRole();
  if(!role){
    return
  }

  if (role == "Employer") {
    return children;

  }
  toast.warn("You don't have permission for this page!!");
  return <Navigate to="/" replace />;
};

export default EmployerRoute;
