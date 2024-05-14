import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 

const UserProfilePage = () => {
    const { id } = useParams(); 
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:3309/user/${id}`, { 
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setEvents(response.data.events);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]); 

    return (
        <div>
            <h1>User Profile</h1>
            {user && (
                <div>
                    <h2>{user.full_name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Birthday: {user.birthday}</p>
                    <h3>Events Signed Up For:</h3>
                    <ul>
                        {events.map(event => (
                            <li key={event.id}>
                                {event.name} - {event.date}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserProfilePage;
