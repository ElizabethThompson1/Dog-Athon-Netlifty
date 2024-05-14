import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';

const CartSlider = () => {
    const [gearData, setGearData] = useState([]);

    useEffect(() => {
        fetchGearData();
    }, []);

    const fetchGearData = async () => {
        try {
            const response = await axios.get('http://localhost:3309/gear/');
            setGearData(response.data);
        } catch (error) {
            console.error('Error fetching gear:', error);
        }
    };

    return (
        <div className="flex flex-col justify-between h-full py-8">
            <div className="flex flex-col items-center justify-center mb-8">
                <h2 className="text-4xl font-bold text-custom-blue mb-4">Gear Available</h2>
                <p className="text-lg text-gray-700 mb-8">Explore our collection of premium gear designed for your needs.</p>
            </div>
            <div className="flex-grow flex flex-wrap justify-around items-start overflow-hidden">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    // breakpoints={{
                    //     640: {
                    //         slidesPerView: 2,
                    //         spaceBetween: 20,
                    //     },
                    //     768: {
                    //         slidesPerView: 4,
                    //         spaceBetween: 40,
                    //     },
                    //     1024: {
                    //         slidesPerView: 5,
                    //         spaceBetween: 50,
                    //     },
                    // }}
                    modules={[Pagination]}
                    className="items-center"
                >
                    {gearData.map(gear => (
                        <SwiperSlide key={gear.id} className="contents-center">
                            <div className="max-w-sm w-full content-center bg-white shadow-md rounded-lg overflow-hidden flex flex-col relative">
                                <p className="absolute top-0 right-0 bg-custom-blue text-white px-2 py-1 rounded-tr-lg rounded-bl-lg">
                                    ${gear.price}
                                </p>
                                <img src={gear.imageUrl} alt={gear.name} className="w-full h-auto" style={{ objectFit: 'cover', height: '300px' }} />
                                <div className="p-6 flex-grow">
                                    <h3 className="text-1xl font-bold text-custom-blue">- {gear.name}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default CartSlider;
