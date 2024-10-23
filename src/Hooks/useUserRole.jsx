import axiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useCurrentUser from "./useCurrentUser";

const useUserRole = () => {
  // const currentUser = useSelector((state) => state?.user?.currentUser);
  const { currentUser } = useCurrentUser();

  console.log(currentUser);

  const { data: role, isLoading } = useQuery({
    queryKey: ["loadedRole", currentUser?.email],
    queryFn: async () => {
      if (currentUser?.email) {
        const response = await axiosSecure.get(
          `/user-role?email=${currentUser.email}`
        );
        return response.data;
      }
      return null;
    },
    enabled: !!currentUser?.email,
  });

  return { role, isLoading };
};

export default useUserRole;
