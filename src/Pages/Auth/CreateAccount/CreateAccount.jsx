import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { TiArrowRight } from "react-icons/ti";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

const Register = ({ setLoginModalOpen, setSignUpModalOpen }) => {
    const [selectedIndex, setSelectedIndex] = useState(0); // Track selected tab
    const [showPassword, setShowPassword] = useState(false);
    console.log(selectedIndex)



    return (
        <div className="bg-white flex justify-center w-[400px] max-w-2xl ">

            <div className="w-full p-7">
                <h2 className='text-4xl font-semibold text-center'>Create Account</h2>

                <form className="mt-8">
                    <Tabs selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)}>
                        <div className="flex items-center  justify-between">
                            <p className="text text-[#0A65CC]">Your Account Type? </p>
                            <TabList className="flex space-x-4 border-b">
                                <Tab
                                    className={`pb-2 cursor-pointer ${selectedIndex === 0
                                            ? "border-b-2 border-blue-500 text-blue-500"
                                            : "text-gray-700"
                                        }`}
                                >
                                    Employee
                                </Tab>
                                <Tab
                                    className={`pb-2 cursor-pointer  ${selectedIndex === 1
                                            ? "border-b-2 border-blue-500 text-blue-500"
                                            : "text-gray-700"
                                        }`}
                                >
                                    Hr Manager
                                </Tab>
                            </TabList>
                        </div>

                        <TabPanel>
                            {/* Form for Tab 1 */}
                            <div className='flex gap-5 mt-4'>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className='space-y-5 mt-5'>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
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
                            </div>
                        </TabPanel>

                        <TabPanel>
                            {/* Form for Tab 2 */}
                            <div className='flex gap-5 mt-4'>
                                <input
                                    type="text"

                                    placeholder="Full Name"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className='space-y-5 mt-5'>
                                <input
                                    type="email"

                                    placeholder="Email Address"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </TabPanel>
                    </Tabs>

                    <div className="mt-6">
                        <button type="submit" className='btn w-full bg-[#0A65CC] text-white'>
                            Create Account <TiArrowRight className='text-2xl' />
                        </button>
                    </div>
                </form>

                <p className="text-xs text-center mt-3">
                    Already have an account?
                    <button
                        className='text-blue-500 underline'
                        onClick={() => { setLoginModalOpen(true); setSignUpModalOpen(false) }}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
