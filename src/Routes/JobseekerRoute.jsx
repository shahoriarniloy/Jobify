import { Navigate } from "react-router-dom";
import useUserRole from "../Hooks/useUserRole";
import { toast } from "react-toastify";

const JobseekerRoute = ({ children }) => {
  const { role } = useUserRole();

  if (!role) return;
  if (role == "Job Seeker") {
    return children;
  }
  toast.warn("You don't have permission for this page!!")
  return <Navigate to="/" replace />;

};

export default JobseekerRoute;
