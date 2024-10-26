import React from 'react';
import { IoSettings } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../Hooks/UseAxiosSecure';
import useCurrentUser from '../../Hooks/useCurrentUser';

const Message = () => {
    const {currentUser} = useCurrentUser();
    const { data } = useQuery({
        queryKey: ["load massage"],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/get-all-message?senderId=${currentUser?.email}`)
            return data;
        }
    })
    console.log(data)
    
    return (
        <div className='h-full'>
            <div className='flex h-full gap-2'>
                {/* connected Peoples */}
                <div className='border-r-2 w-1/3'>
                    {
                        data?.map(msg =>
                            <div className='flex items-center gap-2 border-b mb-2'>
                                <div><img className='size-[46px] rounded-full' src={msg.receiverImg} alt="" /></div>

                                <div>
                                    <h3>{msg.receiverName}</h3>
                                    <p>{msg.status}</p>
                                </div>
                            </div>
                        )
                    }

                </div>

                {/* conversation details */}
                <div className='w-2/3 flex flex-col justify-between h-full'>

                    <div>
                        <div className='flex justify-between w-full border-2 px-2 rounded-lg'>
                            <div className='flex items-center gap-3'>
                                {/* header */}
                                <div><img className='size-[46px] rounded-full' src="https://th.bing.com/th/id/OIP.Lpx9j83qR_cfQuaPHuvwWQHaHw?rs=1&pid=ImgDetMain" alt="" /></div>

                                <h1>Name</h1>
                            </div>

                            <button>
                                <IoSettings className='text-2xl' />
                            </button>
                        </div>

                        {/* message body */}

                        <div className='mt-4'>


                            <div className="chat chat-start">
                                <div className="chat-bubble">
                                    It's over Anakin,
                                    <br />
                                    I have the high ground.
                                </div>
                            </div>
                            <div className="chat chat-end">
                                <div className="chat-bubble">You underestimate my power!</div>
                            </div>


                        </div>

                    </div>

                    {/* send massage */}
                    <div className='flex items-center gap-4'>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered input-md w-full max-w-xs" />

                        <button className='btn bg-blue-700 text-white hover:bg-blue-600'>
                            send <BsFillSendFill />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Message;