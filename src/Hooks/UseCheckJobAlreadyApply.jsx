import React from 'react';
import axiosSecure from './UseAxiosSecure';
import useCurrentUser from './useCurrentUser';

const UseCheckJobAlreadyApply = async(jobID ) => {
    const {currentUser} = useCurrentUser();
    const {data} = await axiosSecure.get(`/check-already-applied?email=${currentUser?.email}&jobid=${jobID}`)
    // console.log(data)
    return data;
};

export default UseCheckJobAlreadyApply;