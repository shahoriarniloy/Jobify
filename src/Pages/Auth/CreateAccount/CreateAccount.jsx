import { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import accountBg from '../../../assets/logo/loginbg.png';
import { IoBagHandleSharp } from "react-icons/io5";
import { TiArrowRight } from "react-icons/ti";

const Register = ({ setLoginModalOpen, setSignUpModalOpen }) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { updateUserProfile, signInUser, setUser } = useContext(AuthContext);

    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

    const password = watch("password");

    const onSubmit = async (data) => {
        const { name, email, password, role } = data;

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: name });

            const userInfo = { name, email, role: "Job Seeker" };
            const userResponse = await axiosSecure.post('/users', userInfo);

            if (userResponse.status !== 200) {
                throw new Error('Failed to register user');
            }

            navigate(location?.state ? location.state : '/');
            toast.success("Registered successfully");
        } catch (error) {
            // console.error(error);
            setRegisterError(error.message);
        }
    };

    return (
        <div className="bg-white flex justify-center w-[400px] max-w-2xl ">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>

            <div className="w-full p-7">


                <h2 className='text-4xl font-semibold'>Create Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                    <div className='flex gap-5'>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            placeholder="Full Name"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className='space-y-5 mt-5'>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Email Address"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters long" },
                                    validate: {
                                        hasUpperCase: value => /[A-Z]/.test(value) || "Password must contain an uppercase letter",
                                        hasLowerCase: value => /[a-z]/.test(value) || "Password must contain a lowercase letter"
                                    }
                                })}
                                placeholder="Password"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        <div className="relative">
                            <input
                                type={showConfirmedPassword ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: value => {
                                        if (value !== password) {
                                            return "Passwords do not match";
                                        }
                                        return true;
                                    }
                                })}
                                placeholder="Confirm Password"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}>
                                {showConfirmedPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    </div>
                    {registerError && <p className="text-red-500 text-center">{registerError}</p>}
                    <div className="mt-6">
                        <button type="submit" className='btn w-full bg-[#0A65CC] text-white'>
                            Create Account <TiArrowRight className='text-2xl' />
                        </button>
                    </div>
                </form>
                <p className='text-center my-3'>or</p>
                <div className="flex flex-col gap-3 justify-between">
                    <button

                        className="bg-white flex items-center text-gray-700 justify-center gap-x-3 text-sm rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-6 py-2.5"
                    >
                        <img
                            src="https://i.ibb.co/tzD10YQ/6929234-google-logo-icon.png"
                            alt="Google Logo"
                            className="h-6 w-6"
                        />
                        Sign in with Google
                    </button>
                </div>

                <p className="text-xs text-center mt-3">Already have an account? <span className='link-color'>
                    <button
                        onClick={() => { setLoginModalOpen(true); setSignUpModalOpen(false) }}

                    >Login</button>
                </span>
                </p>


            </div>

        </div>
    );
};

export default Register;
