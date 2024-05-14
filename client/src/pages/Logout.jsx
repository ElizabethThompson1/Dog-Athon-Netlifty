import React from 'react';

const Logout = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
    };

    return (
        <button onClick={handleLogout} className="bg-custom-cream text-white font-bold py-2 px-4 rounded-md mr-4 text-lg hover:bg-custom-gold hover:text-custom-cream transition-colors duration-300">
            Logout
        </button>
    );
};

export default Logout;
