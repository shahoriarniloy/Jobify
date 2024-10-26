import { Navigate } from "react-router-dom";
import useUserRole from "../Hooks/useUserRole";
import { toast } from "react-toastify";
import useCurrentUser from "../Hooks/useCurrentUser";

const JobseekerRoute = ({ children }) => {
  const { role } = useUserRole();
  const { currentUser } = useCurrentUser();
  

  if (!currentUser?.email || role !== "Job Seeker") {
    toast.warn("Please Login First!!!")
    return <Navigate to="/" replace />;
  }
  return children;

};

export default JobseekerRoute;
