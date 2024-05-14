import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const Gearbanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/clothes/image1.png',
    '/clothes/coupleshirt.png',
    '/clothes/womanshirt.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

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
