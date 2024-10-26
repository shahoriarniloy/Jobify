import axiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCurrentUser from "./useCurrentUser";

const useUserRole = () => {
  const { currentUser } = useCurrentUser();
  const { data: role, isLoading } = useQuery({
    queryKey: ["loadedRole", currentUser?.email],
    queryFn: async () => {
      if (currentUser?.email) {
        const response = await axiosSecure.get(
          `/user-role?email=${currentUser.email}`
        );
        return response.data;
      } else {
        return null;
      }
    },
    enabled: !!currentUser?.email,
  });

  return { role, isLoading };
};

export default useUserRole;
