// AdminDashboardPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Route } from 'react-router-dom';
import AdminCards from '../components/admin/AdminCards';
import AdminNav from '../components/admin/AdminNav';
import EventManagement from '../components/admin/EventManagement';
import GearManagement from '../components/admin/GearManagement';
import CreateUser from '../components/admin/CreateUser';
import axios from 'axios';
import DisplayGear from '../components/admin/DisplayGear';
import DisplayUsers from '../components/admin/DisplayUsers';
import DisplayEvents from '../components/admin/DisplayEvent';


const AdminDashboardPage = () => {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState('user'); // Default to 'user'
  const [adminData, setAdminData] = useState(null); // State to store admin data

  // Fetch admin data or replace with your logic to retrieve admin data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:3309/user/${id}`);
        setAdminData(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, [id]);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="admin-dashboard-page">
      <div className="flex items-stretch h-screen w-screen">
        <div className="admin-nav w-1/4 bg-gray-800 text-white">
          <AdminNav onSelect={handleSelect} adminData={adminData} />
        </div>
        <div className="management-section flex-1">
          <div className="ml-4 p-4">
            <AdminCards selectedOption={selectedOption} onSelect={handleSelect} />
            {selectedOption === 'eventManagement' ? (
              <EventManagement />
            ) : selectedOption === 'display-gear' ? (
              <DisplayGear />
            ) : selectedOption === 'display-users' ? (
              <DisplayUsers />
            ) : selectedOption === 'display-events' ? (
              <DisplayEvents />
            ) : selectedOption === 'gearManagement' ? (
              <GearManagement />
            ) : selectedOption === 'user' ? (
              <CreateUser/>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
