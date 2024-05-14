import React from 'react';
import { FiUsers, FiCalendar } from 'react-icons/fi';
import { IoShirtOutline } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';

const AdminNav = ({ onSelect, adminData }) => {
    return (
        <div className="admin-nav pl-0 bg-gray-800 text-white h-full flex flex-col justify-between" >
            {/* Navigation buttons */}
            <div className="flex flex-col mt-8" style={{marginTop: '8rem'}}>
                <div className="py-4 px-6 text-center">
                    <h3 className="text-lg font-semibold">Welcome {adminData && adminData.username}</h3>
                </div>
                <button onClick={() => onSelect('user')} className="p-6 pr-7 flex items-center hover:bg-gray-700 transition duration-300">
                    <FaUserPlus className="mr-2" /> Create User
                </button>
                <button onClick={() => onSelect('eventManagement')} className="p-6 pr-7 flex items-center hover:bg-gray-700 transition duration-300">
                    <FiCalendar className="mr-2" /> Event Management
                </button>
                <button onClick={() => onSelect('gearManagement')} className="p-6 pr-7 flex items-center hover:bg-gray-700 transition duration-300">
                    <IoShirtOutline className="mr-2" /> Gear Management
                </button>
            </div>

        </div>
    );
};

export default AdminNav;
