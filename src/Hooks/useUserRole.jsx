import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Pages/Auth/CreateAccount/AuthContext';
import axiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const { currentUser } = useContext(AuthContext);

    const { data: role, isLoading } = useQuery({
        queryKey: ["loadedRole"],
        queryFn: async () => {
            if (currentUser.email) {
                const response = await axiosSecure.get(`/user-role?email=${currentUser?.email}`);
                return response.data;
            }
        }
    })

    return { role, isLoading };
};

export default useUserRole;
