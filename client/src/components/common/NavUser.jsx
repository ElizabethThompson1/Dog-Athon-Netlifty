import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavUser = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [shouldReload, setShouldReload] = useState(false);

    useEffect(() => {
        // Retrieve user data from local storage
        const userDataString = localStorage.getItem('userInfo');
        if (userDataString) {
            try {
                // Parse user data as JSON
                const userData = JSON.parse(userDataString);
                if (userData) {
                    // Extract isAdmin and id from userData
                    const { isAdmin, id } = userData;
                    // Set isAdmin and userId based on parsed information
                    setIsAdmin(isAdmin || false);
                    setUserId(id || null);
                }
            } catch (error) {
                // Handle JSON parsing error
                console.error('Error parsing user data:', error);
            }
        }
    }, [shouldReload]); // Add shouldReload to the dependency array

    const handleLogout = () => {
        // Remove user data from local storage
        localStorage.removeItem('userInfo');
        // Redirect to the home page
        navigate('/');
        // Set shouldReload to trigger component reload
        setShouldReload(true);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-10 p-6 flex flex-row justify-between items-center bg-transparent">
            <div className="flex items-center">
                <Link to="/" className="flex items-center mr-8" aria-label="DO-ANTHON">
                    <img src="/header/dog-athon-logo.png" alt="Logo" style={{ height: '7.3rem', marginLeft: '3rem' }} />
                </Link>

                <nav>
                    <ul className="flex justify-center list-none m-0 p-0">
                        {['/', '/events', '/gear'].map((path, index) => (
                            <li key={index} className="mx-3 md:mx-5">
                                <Link
                                    to={path}
                                    className="text-custom-blue font-bold text-lg transition-colors duration-300 hover:text-custom-cream"
                                    style={{ textShadow: '1px 1px 0 white' }}
                                >
                                    {["HOME", "EVENTS", "GEAR"][index]}
                                </Link>
                            </li>
                        ))}
                        {userId && (
                            <li className="mx-3 md:mx-5">
                                <Link
                                    to={isAdmin ? `/user/dashboard/${userId}` : `/user/${userId}`}
                                    className="text-custom-blue font-bold text-lg transition-colors duration-300 hover:text-custom-cream"
                                    style={{ textShadow: '1px 1px 0 white' }}
                                >
                                    {isAdmin ? 'Dashboard' : 'Profile'}
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
            <div className="flex items-center">
                <Link to="/cart" className="text-custom-cream font-bold text-lg hover:text-custom-gold transition-colors duration-300">
                    <img src="/header/cart.svg" alt="Cart Icon" className="h-10 w-8 mr-6" />
                </Link>
                {!userId ? (
                    <Link to="/access" className="bg-custom-cream text-white font-bold py-2 px-4 rounded-md mr-4 text-lg hover:bg-custom-gold hover:text-custom-cream transition-colors duration-300">
                        Login
                    </Link>
                ) : (
                    <button onClick={handleLogout} className="bg-custom-cream text-white font-bold py-2 px-4 rounded-md mr-4 text-lg hover:bg-custom-gold hover:text-custom-cream transition-colors duration-300">
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
};

export default NavUser;
