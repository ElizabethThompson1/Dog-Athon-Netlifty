import React, { useState, useEffect } from 'react';
import Login from './LoginPage';
import Register from './RegistrationPage';


const Accesse = () => {
    const [selectedOption, setSelectedOption] = useState('login');

    return (
        <div className="admin-dashboard-page flex flex-col items-center justify-center h-screen w-screen">
            <div className="content flex flex-grow">
                <div className="management-section mt-8 flex-1 p-4 flex items-center justify-center">
                    {selectedOption === 'login' ? (
                        <Login />
                    ) : selectedOption === 'register' ? (
                        <Register />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Accesse;
