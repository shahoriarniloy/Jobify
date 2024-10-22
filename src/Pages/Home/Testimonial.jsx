import { useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Rating from 'react-rating'
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { FaQuoteLeft } from "react-icons/fa";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

const Testimonial = () => {
    return (
        <div className='bg-secondary'>
            <div className='container mx-auto py-24'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className='bg-white w-full p-8 rounded-md shadow-sm'>
                            <Rating
                                emptySymbol=<IoIosStarOutline className='text-3xl'/>
                                fullSymbol=<IoIosStar className='text-3xl text-[#FFAA00]'/>
                                placeholderSymbol=<IoIosStar className='text-3xl text-[#FFAA00]'/>
                                readonly="true"
                                placeholderRating="2"
                            />

                            <p className='text-[#464D61] mt-4'>“Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.”</p>

                            <div className='flex justify-between items-center mt-[80px]'>
                                <div className='flex items-center gap-3'>
                                    <div>
                                        <img
                                        className='w-[38px] h-[38px] rounded-full'
                                        src="" alt="" />
                                    </div>
                                    <div>
                                        <h1 className='font-bold'>Name</h1>
                                        <p className='text-[#767E94]'>UI/UX Designer</p>
                                    </div>
                                </div>

                                <div>
                                    <FaQuoteLeft className='text-5xl text-[#DADDE5]'/>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    );
};

export default Testimonial;