// useConditionalDataFetch.js
import { useQuery } from "@tanstack/react-query";
import useUserRole from "../Hooks/useUserRole";
import axiosSecure from "../Hooks/UseAxiosSecure";
import useCurrentUser from "../Hooks/useCurrentUser";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "./userSlice";
import { useEffect } from "react";

const useConditionalDataFetch = () => {
  const dispatch = useDispatch();
  const { role, isLoading: roleLoading } = useUserRole();
  const { currentUser } = useCurrentUser();

  // console.log("Current User:", currentUser);

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchedData", role],
    queryFn: async () => {
      if (role === "Job Seeker") {
        const response = await axiosSecure.get(`/users/${currentUser.email}`);
        return response.data;
      } else if (role === "Employer") {
        const response = await axiosSecure.get(
          `/companies/${currentUser.email}`
        );
        return response.data;
      }
    },
    enabled: !!role && !roleLoading && !!currentUser?.email,
  });

  useEffect(() => {
    if (data) {
      // console.log("Fetched data:", data);
      dispatch(setLoggedUser(data));
    }
  }, [data, dispatch]);

  return { data, isLoading, error };
};

export default useConditionalDataFetch;
