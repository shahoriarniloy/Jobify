import React, { useContext, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Auth/CreateAccount/AuthContext";
import accountBg from '../../../assets/logo/loginbg.png';
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import auth from '../firebase/firebase.config';


const Login = ({ setLoginModalOpen, setSignUpModalOpen }) => {
    const location = useLocation();
    const { signInUser, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const from = location.state?.from?.pathname || "/";
    const googleProvider = new GoogleAuthProvider();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            await signInUser(email, password);
            toast.success("Signed In");
            e.target.reset();
            navigate('/');
        } catch (error) {
            setError("Invalid Credentials");
            toast.error("Invalid Credentials");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError("");
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const userInfo = {
                email: result.user.email,
                name: result.user.displayName || 'Guest',
                photoURL: result.user.photoURL,
                role: 'Job Seeker'
            };

            const response = await axiosSecure.post('/users', userInfo);
            const data = response.data;

            // console.log(data);
            // console.log(data.insertedId);
            // console.log(data.message);

            if (data.insertedId || data.messege === 'User already exists') {
                toast.success(data.message === 'User already exists' ? 'User already exists' : 'Signed in with Google');
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
            toast.error("Error signing in with Google");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-white w-[400px] max-w-2xl">
            <Helmet>
                <title>Login</title>
            </Helmet>


            <div className='p-7'>

                <h2 className='text-4xl font-semibold '>Sign In</h2>


                <div className="mt-8 ">
                    <form onSubmit={handleLogin}>
                        <div className='space-y-5 mt-5 w-full'>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-2"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>
                        <div className="mt-6">
                            <button className='btn w-full bg-[#0A65CC] text-white'>
                                {loading ? "Logging in..." : "Sign In"}
                            </button>
                        </div>
                    </form>
                    <p className='text-center my-3'>or</p>

                    <button
                        onClick={handleGoogleSignIn}
                        className="bg-white w-full flex items-center text-gray-700 justify-center gap-x-3 text-sm rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-6 py-2.5"
                    >
                        <img
                            src="https://i.ibb.co/tzD10YQ/6929234-google-logo-icon.png"
                            alt="Google Logo"
                            className="h-6 w-6"
                        />
                        Sign in with Google
                    </button>

                    <p className='mt-4 text-xs text-center'>Don't have an account? <span className='link-color'><button onClick={() => { setLoginModalOpen(false); setSignUpModalOpen(true) }}>Create account</button></span></p>
                </div>
            </div>

        </div>
    );
};




export default Login;
