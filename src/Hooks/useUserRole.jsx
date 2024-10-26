import axiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCurrentUser from "./useCurrentUser";
import DashboardLoader from "../Shared/DashboardLoader";

const useUserRole = () => {
  const { currentUser } = useCurrentUser();
  const { data: role={}, isLoading } = useQuery({
    queryKey: ["loadedRole"],
    queryFn: async () => {
      if (currentUser?.email) {
        const response = await axiosSecure.get(
          `/user-role?email=${currentUser.email}`
        );
        return response.data;
      }
      else{
        return null
      };
    },
    enabled: !!currentUser?.email,
  });
  if(isLoading) return <DashboardLoader/>;
  return { role, isLoading };
};

export default useUserRole;
