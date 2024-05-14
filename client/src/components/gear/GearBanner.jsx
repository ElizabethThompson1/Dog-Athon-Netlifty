import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const Gearbanner = () => {

  const images = [
    '/clothes/image1.png',
    '/clothes/coupleshirt.png',
    '/clothes/womanshirt.png'
  ];


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
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="w-full"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Gearbanner;
