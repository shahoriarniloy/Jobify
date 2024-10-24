import { Navigate } from "react-router-dom";
import useCurrentUser from "../Hooks/useCurrentUser";
import useUserRole from "../Hooks/useUserRole";
import DashboardLoader from "../Shared/DashboardLoader";

const AdminRoute = ({ children }) => {
  const { currentUser } = useCurrentUser();
  const { role, isLoading } = useUserRole();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (role === "Admin") {
    return children;
  } else {
    return <Navigate to="/routenotfound" replace />;
  }
};

export default AdminRoute;
