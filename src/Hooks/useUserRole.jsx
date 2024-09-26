import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Pages/Auth/CreateAccount/AuthContext'; // Adjust the path based on your project structure
import axiosSecure from './UseAxiosSecure'; // Adjust the path based on your project structure

const useUserRole = () => {
    const { user } = useContext(AuthContext); // Directly get the user from AuthContext
    const [role, setRole] = useState(null);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            if (user?.email) {
                console.log("email",user.email);
                try {
                    const response = await axiosSecure.get(`/user-role?email=${user.email}`);
                    setRole(response.data.role); // Assuming the response contains the role in the data
                    setId(response.data.id); // Assuming the response contains the role in the data
                } catch (err) {
                    setError(err.response ? err.response.data.message : err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // If no email, stop loading
            }
        };

        fetchRole();
    }, [user]);

    return { role,id, loading, error };
};

export default useUserRole;
