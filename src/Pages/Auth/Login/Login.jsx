import React from 'react';
import accountBg from '../../../assets/logo/loginbg.png';
import { IoBagHandleSharp } from "react-icons/io5";
import { TiArrowRight } from "react-icons/ti";
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <div className="bg-white noto">
            <div className="flex justify-center h-screen">
                <div className="flex items-center w-full max-w-lg px-6 mx-auto lg:w-1/2">
                    <div className="flex-1">


                        <div className='space-y-4'>
                            <h2 className='text-2xl font-semibold'>Sign In</h2>
                            <p>Don't have account? <span className='link-color'><Link to={"/register"}>Create account</Link></span></p>
                        </div>




                        <div className="mt-8">
                            <form>

                                <div className='space-y-5 mt-5'>
                                    <input type="email" name="email" placeholder="Email Address" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />

                                    <input type="password" name="password" placeholder="Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />

                                    <div className='flex justify-between'>
                                        <div className='flex items-center gap-3'>
                                            <input type="checkbox" className="checkbox" />
                                            <p className='text-sm'>Remember me</p>
                                        </div>

                                        <Link
                                            className='link-color text-sm'
                                            to="/forget-password">Forget password?</Link>
                                    </div>
                                </div>



                                <div className="mt-6">
                                    <button className='btn w-full bg-[#0A65CC] text-white'>
                                        Sign In < TiArrowRight className='text-2xl' />
                                    </button>
                                </div>

                            </form>

                            <p className='text-center mt-8'>or</p>

                            <div class="flex flex-col md:flex-row gap-3 md:gap-0 justify-between mt-4">


                                <button class="bg-[#1877F2] flex gap-x-3 text-sm items-center justify-center text-white rounded-lg hover:bg-[#1877F2]/80 duration-300 transition-colors border border-transparent px-6 py-2.5">
                                    <svg class="w-4 h-4 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3033_94669)">
                                            <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3033_94669">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span>Sign in with Facebook</span>
                                </button>


                                <button class="bg-white flex items-center text-gray-700  justify-center gap-x-3 text-sm  rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-6 py-2.5">
                                    <svg class="w-4 h-4 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3033_94454)">
                                            <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4" />
                                            <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853" />
                                            <path d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC04" />
                                            <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3033_94454">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span>Sign in with Google</span>
                                </button>


                            </div>


                        </div>
                    </div>
                </div>


                <div className={`hidden bg-cover lg:block lg:w-1/2`}
                    style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.0) 50%, rgba(0, 0, 0, 0.10) 100%),url(${accountBg})` }}
                >
                    <div className="flex items-end pb-40 h-full px-20 ">
                        <div>
                            <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                Over 1,75,324 candidates <br /> waiting for good employees.
                            </h2>

                            <div className='flex justify-between mt-8 *:flex *:flex-col *:gap-3'>
                                <div className='text-white'>
                                    <div className=' bg-[#485971] p-4 rounded-lg'>
                                        <IoBagHandleSharp className='text-5xl' />
                                    </div>
                                    <h3 className='text-[20px] font-bold'>1,75,324</h3>
                                    <p>Live Job</p>
                                </div>
                                <div className='text-white'>
                                    <div className=' bg-[#485971] p-4 rounded-lg'>
                                        <IoBagHandleSharp className='text-5xl' />
                                    </div>
                                    <h3 className='text-[20px] font-bold'>1,75,324</h3>
                                    <p>Live Job</p>
                                </div>
                                <div className='text-white'>
                                    <div className=' bg-[#485971] p-4 rounded-lg'>
                                        <IoBagHandleSharp className='text-5xl' />
                                    </div>
                                    <h3 className='text-[20px] font-bold'>1,75,324</h3>
                                    <p>Live Job</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Login;