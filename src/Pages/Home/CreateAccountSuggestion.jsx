import React from 'react';
import { FaArrowRight } from "react-icons/fa6";

const CreateAccountSuggestion = () => {
    return (
        <>

            <div className='container mx-auto flex flex-col md:flex-row items-center justify-around gap-6 px-2 py-[100px]'>

                <div className='bg-[#e4e5e8] p-8 lg:p-[50px] md:w-1/2 rounded-lg'>
                    <h2 className='text-2xl lg:text-4xl'>Become a Candidate</h2>
                    <p className='text-gray-500 mt-4 mb-8 text-sm lg:w-[300px]'>Join Jobify to take the next step in your career—become a top candidate today!</p>

                    <button className='flex justify-center items-center gap-3 text-blue-700 font-semibold px-6 p-3 bg-white rounded-md shadow-sm'>
                        Register Now <FaArrowRight />
                    </button>
                </div>

                <div className='bg-[#0851a3] p-8 lg:p-[50px] md:w-1/2 rounded-lg'>
                    <h2 className='text-2xl lg:text-4xl text-white'>Become a Employers</h2>
                    <p className='text-gray-300 mt-4 mb-8 text-sm lg:w-[300px]'>Partner with Jobify to find top talent and elevate your team—become an employer today</p>

                    <button className='flex justify-center items-center gap-3 text-blue-700 font-semibold px-6 p-3 bg-white rounded-md shadow-sm'>
                        Register Now <FaArrowRight />
                    </button>
                </div>

            </div>

        </>
    );
};

export default CreateAccountSuggestion;