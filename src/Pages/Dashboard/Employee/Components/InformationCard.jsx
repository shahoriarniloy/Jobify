import React from 'react';
import { BsBagCheck } from 'react-icons/bs';
import { CiBookmark } from 'react-icons/ci';
import { LuBellRing } from 'react-icons/lu';

const InformationCard = () => {
    return (
        <div className='mt-6 grid grid-cols-3 gap-6'>
            <div className='flex items-center bg-[#e7f0fa] p-6 justify-between rounded-md'>
                <div>
                    <h1 className='text-3xl font-bold'>{589}</h1>
                    <p>Applied jobs</p>
                </div>
                <div className=' bg-white p-4 rounded-md'>
                    <BsBagCheck className='text-4xl text-[#0a65cc]' />
                </div>
            </div>

            <div className='flex items-center bg-[#fff6e6] p-6 justify-between rounded-md'>
                <div>
                    <h1 className='text-3xl font-bold'>{238}</h1>
                    <p>Favorite jobs</p>
                </div>
                <div className=' bg-white p-4 rounded-md'>
                    <CiBookmark className='text-4xl text-[#ffa500]' />
                </div>
            </div>

            <div className='flex items-center bg-[#e7f6ea] p-6 justify-between rounded-md'>
                <div>
                    <h1 className='text-3xl font-bold'>{574}</h1>
                    <p>Job Alerts</p>
                </div>
                <div className=' bg-white p-4 rounded-md'>
                    <LuBellRing className='text-4xl text-[#0ba02c]' />
                </div>
            </div>

        </div>
    );
};

export default InformationCard;