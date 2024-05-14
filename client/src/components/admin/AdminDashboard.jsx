
import React from 'react';
import CreateUser from './CreateUser';
import EventManagement from './EventManagement';

const AdminDashboard = ({ selectedOption }) => {
    return (
        <div className="admin-content">
            {selectedOption === 'createUser' && <CreateUser />}
            {selectedOption === 'eventManagement' && <EventManagement />}
        </div>
    );
};

export default AdminDashboard;
