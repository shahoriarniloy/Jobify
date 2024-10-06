import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Auth/CreateAccount/AuthContext";
import axiosSecure from "../../../Hooks/UseAxiosSecure";


const Login = ({ setLoginModalOpen, setSignUpModalOpen }) => {
    const { signInWithGoogle } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";


    

    const handleLogin = async (e) => {
        
    };

    const handleGoogleSignIn = async () => {
        signInWithGoogle()
            .then((result) => {
                toast.success('Signed in with Google');

            })
            .catch((error) => {
                toast.warn('Sign in failed !');
            })
        setLoginModalOpen(false);

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
