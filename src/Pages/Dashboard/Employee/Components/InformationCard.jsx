import React from 'react';
import { BsBagCheck } from 'react-icons/bs';
import { CiBookmark } from 'react-icons/ci';
import { LuBellRing } from 'react-icons/lu';

const InformationCard = () => {
    return (
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'> {/* Adjust grid columns based on screen size */}
            <div className='flex items-center bg-[#e7f0fa] p-4 sm:p-6 justify-between rounded-md'> {/* Responsive padding */}
                <div>
                    <h1 className='text-2xl sm:text-3xl font-bold'>{589}</h1> {/* Adjust text size */}
                    <p className='text-sm sm:text-base'>Applied jobs</p> {/* Adjust text size */}
                </div>
                <div className='bg-white p-3 sm:p-4 rounded-md'>
                    <BsBagCheck className='text-3xl sm:text-4xl text-[#0a65cc]' /> {/* Responsive icon size */}
                </div>
            </div>

            <div className='flex items-center bg-[#fff6e6] p-4 sm:p-6 justify-between rounded-md'> {/* Responsive padding */}
                <div>
                    <h1 className='text-2xl sm:text-3xl font-bold'>{238}</h1> {/* Adjust text size */}
                    <p className='text-sm sm:text-base'>Favorite jobs</p> {/* Adjust text size */}
                </div>
                <div className='bg-white p-3 sm:p-4 rounded-md'>
                    <CiBookmark className='text-3xl sm:text-4xl text-[#ffa500]' /> {/* Responsive icon size */}
                </div>
            </div>

            <div className='flex items-center bg-[#e7f6ea] p-4 sm:p-6 justify-between rounded-md'> {/* Responsive padding */}
                <div>
                    <h1 className='text-2xl sm:text-3xl font-bold'>{574}</h1> {/* Adjust text size */}
                    <p className='text-sm sm:text-base'>Job Alerts</p> {/* Adjust text size */}
                </div>
                <div className='bg-white p-3 sm:p-4 rounded-md'>
                    <LuBellRing className='text-3xl sm:text-4xl text-[#0ba02c]' /> {/* Responsive icon size */}
                </div>
            </div>
        </div>
    );
};

export default InformationCard;
