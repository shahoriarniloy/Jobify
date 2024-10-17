import React from 'react';
import axiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DashboardLoader from './../../Shared/DashboardLoader';


const TopCompanies = () => {
    
    const {data, isLoading} = useQuery({
        queryKey:["top-companies"],
        queryFn: async ()=>{
            const {data} = await axiosSecure.get("/companies")
            return data?.Companies;
        }
    })
   if(isLoading) return <DashboardLoader/>
    return (
        <div>
            <div>
                <h1 className='text-3xl font-semibold mb-2 tracking-wider text-black text-center '>Top Companies</h1>

                <div>
                    {
                     
                            <div>
                                <div>

                                </div>

                            </div>
                       
                    }
                </div>

            </div>
        </div>
    );
};

export default TopCompanies;