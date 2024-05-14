import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoGrid } from "react-icons/io5";
import { FaGripLines } from "react-icons/fa";

const GearDisplay = () => {
    const [sortBy, setSortBy] = useState('');
    const [displayStyle, setDisplayStyle] = useState('grid');
    const [gearData, setGearData] = useState([]);
    const userId = localStorage.getItem('userId');
    const guestToken = localStorage.getItem('guestToken');

    useEffect(() => {
        fetchGearData();
    }, []);

    const fetchGearData = async () => {
        try {
            const token = userId || guestToken; 
            const response = await axios.get('http://localhost:3309/gear/', {
                headers: {
                    Authorization: token ? token : ''
                }
            });
            setGearData(response.data);
        } catch (error) {
            console.error('Error fetching gear:', error);
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleDisplayToggle = () => {
        setDisplayStyle(displayStyle === 'grid' ? 'flex' : 'grid');
    };


    const addItemToCart = async (gearId) => {
        try {
            const token = userId || guestToken; 
            const cartResponse = await axios.get(`http://localhost:3309/users/${token}/cart`);
            const cartId = cartResponse.data.id;
    
            // Add item to cart
            const response = await axios.post(`http://localhost:3309/snipcart/${cartId}/${gearId}`);
            console.log(response.data.message);
    
            // If the user is a guest, save the guest token in localStorage
            if (!userId && !guestToken) {
                localStorage.setItem('guestToken', response.data.token);
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };
    

    let filteredData = [...gearData];
    return (
        <div className="flex flex-col items-center">
            <div className="mb-4">
                <div className="flex">
                    <div>
                        <button className="bg-custom-blue text-white px-4 py-2 rounded" onClick={handleDisplayToggle}>
                            {displayStyle === 'grid' ? <IoGrid size="24" /> : <FaGripLines size="24" />}
                        </button>
                    </div>
                    <div className="mr-8">
                        <label className="mr-2">Sort By:</label>
                        <select className="border rounded-md px-2 py-1" value={sortBy} onChange={handleSortChange}>
                            <option value="">Select</option>
                            <option value="newest">Newest</option>
                            <option value="priceHighToLow">Price: High to Low</option>
                            <option value="priceLowToHigh">Price: Low to High</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={`${displayStyle} ${displayStyle === 'grid' ? 'grid-cols-4 gap-4' : 'flex flex-wrap justify-center'}`}>
                {filteredData.map(item => (
                    <div key={item.id} className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col relative">
                        <p className="absolute top-0 right-0 bg-custom-blue text-white px-2 py-1 rounded-tr-lg rounded-bl-lg">
                            ${item.price}
                        </p>
                        <img src={item.imageUrl} alt={item.name} className="w-full h-auto" style={{ objectFit: 'cover', height: '300px' }} />
                        <div className="p-6 flex-grow">
                            <h3 className="text-xl font-bold text-custom-blue">{item.name}</h3>
                            <div className="flex justify-between mt-4">
                                <button className="bg-custom-blue text-white px-4 py-2 rounded w-full" onClick={() => addItemToCart(item.id)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GearDisplay;
