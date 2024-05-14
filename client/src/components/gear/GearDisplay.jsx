import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoGrid } from "react-icons/io5";
import { FaGripLines } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const GearDisplay = () => {
  const [sortBy, setSortBy] = useState('');
  const [displayStyle, setDisplayStyle] = useState('grid');
  const [gearData, setGearData] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).id : null);
  const [guestToken, setGuestToken] = useState(localStorage.getItem('guestToken'));

  useEffect(() => {
    if (!userId && !guestToken) {
      const newGuestToken = uuidv4();
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
      localStorage.setItem('guestToken', newGuestToken);
      localStorage.setItem('guestTokenExpiry', expirationTime);
      setGuestToken(newGuestToken);
    } else {
      const guestTokenExpiry = localStorage.getItem('guestTokenExpiry');
      if (guestToken && guestTokenExpiry && Date.now() > guestTokenExpiry) {
        const newGuestToken = uuidv4();
        const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem('guestToken', newGuestToken);
        localStorage.setItem('guestTokenExpiry', expirationTime);
        setGuestToken(newGuestToken);
      }
    }
  }, [userId, guestToken]);

  useEffect(() => {
    fetchGearData();
  }, []);
  
  console.log(apiUrl);

  const fetchGearData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/gear/`);
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

  const addItemToCart = async (item) => {
    try {
      const token = userId || guestToken;
      const response = await axios.post(`${apiUrl}/cart/add`, {
        userId: userId,
        guestToken: guestToken,
        item: {
          _id: item._id,
          _type: 'gear', 
        }
      });
      console.log(response.data);

      if (!userId && !guestToken && response.data.guestToken) {
        localStorage.setItem('guestToken', response.data.guestToken);
        setGuestToken(response.data.guestToken);
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
      <div className={`${displayStyle} ${displayStyle === 'grid' ? 'grid grid-cols-4 gap-4' : 'flex flex-wrap justify-center'}`}>
        {filteredData.map(item => (
          <div key={item._id} className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col relative">
            <p className="absolute top-0 right-0 bg-custom-blue text-white px-2 py-1 rounded-tr-lg rounded-bl-lg">
              ${item.price}
            </p>
            <img src={item.imageUrl} alt={item.name} className="w-full h-auto" style={{ objectFit: 'cover', height: '300px' }} />
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold text-custom-blue">{item.name}</h3>
              <div className="flex justify-between mt-4">
                <button className="bg-custom-blue text-white px-4 py-2 rounded w-full" onClick={() => addItemToCart(item)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GearDisplay;
