import React from 'react';
import InformationCard from '../Employee/Components/InformationCard';
import ButtonWithIcon from '../../../Shared/ButtonWithIcon';
import RecentAppliedJobTable from '../Employee/Components/RecentAppliedJobTable';


const EmployeeHome = () => {
    return (
        <>
            <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>Hello, {"Abumahid"}</h2>
                <p className='text-sm'>Here is your daily activities and job alerts</p>

            </div>
            {/* Information Notification card */}
            <InformationCard />

            {/* Account complete notification */}
            <div className='flex justify-between items-center bg-[#E05151] p-8 rounded-lg mt-6'>
                <div className='flex items-center gap-6'>
                    <img
                        className='size-[64px] rounded-full'
                        src="https://th.bing.com/th/id/OIP.L9B1n8lj7aocldq2QeKEtgHaHa?rs=1&pid=ImgDetMain" alt=""
                    />
                    <div className='text-white'>
                        <h2 className='text-xl font-semibold'>Your profile editing is not completed.</h2>
                        <p>Complete your profile editing & build your custom Resume</p>

                    </div>
                </div>
                <button>
                    <ButtonWithIcon
                        btnName={"Edit Profile"}
                        customStyle={"text-[#E05151] bg-white"}
                    />
                </button>
            </div>


            {/* Recently applied jobs */}
            <div>
                <div className='flex items-center justify-between mt-8'>
                    <h3 className='font-bold'>Recently Applied</h3>

                    <button>
                        <ButtonWithIcon btnName={"View All"} textSize={"text-base"} />
                    </button>
                </div>
            </div>

            {/* Recent applied jobs */}
            <RecentAppliedJobTable />
        </>
    );
};

export default EmployeeHome;