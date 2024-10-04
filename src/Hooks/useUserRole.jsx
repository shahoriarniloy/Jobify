import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Pages/Auth/CreateAccount/AuthContext'; 
import axiosSecure from './UseAxiosSecure';

const useUserRole = () => {
    const { user } = useContext(AuthContext); 
    const [role, setRole] = useState(null);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            if (user?.email) {
                // console.log("email",user.email);
                try {
                    const response = await axiosSecure.get(`/user-role?email=${user.email}`);
                    setRole(response.data.role); 
                    setId(response.data.id); 
                } catch (err) {
                    setError(err.response ? err.response.data.message : err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); 
            }
        };

        fetchRole();
    }, [user]);

    return { role,id, loading, error };
};

export default useUserRole;
