import useCurrentUser from "./useCurrentUser";
import { useState, useEffect } from "react";

const useUserRole = () => {
  const { currentUser, isLoading: isUserLoading } = useCurrentUser(); // Assuming useCurrentUser provides an isLoading state
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isUserLoading) {
      setRole(currentUser?.data?.role);
      setIsLoading(false); // Loading is done once currentUser is available
    }
  }, [currentUser, isUserLoading]);

  return { role, isLoading };
};

export default useUserRole;
