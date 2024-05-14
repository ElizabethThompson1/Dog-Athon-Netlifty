import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import runsData from "./runs.json";

import 'swiper/css'; 
import 'swiper/css/bundle'; // Import additional Swiper styles 

const Banner = () => {
    return (
        <Swiper
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {runsData.map(({image, title ,cost,id }) => (
                <SwiperSlide key={id}>
                    <div className="relative h-screen overflow-hidden">
                        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover object-center scale-95" />
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="text-white text-center font-bold">
                                <h3>{title}</h3>
                                <p>{cost}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Banner;
