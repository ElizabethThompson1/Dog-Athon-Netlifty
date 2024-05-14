import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftCategories from '../components/events/LeftCategories';
import Event from '../components/events/Event';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3309/event/');
      console.log('API response:', response.data);
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (selectedDistance, selectedMonths) => {
    setSelectedDistance(selectedDistance);
    setSelectedMonths(selectedMonths);

    const filtered = events.filter(event => {
      return (
        (!selectedDistance.length || selectedDistance.includes(event.distance)) &&
        (!selectedMonths.length || selectedMonths.includes(event.month))
      );
    });
    setFilteredEvents(filtered);
  };

  if (loading) {
    return <p className="text-center mt-8">Loading events...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">Error loading events.</p>;
  }
  
  return (
    <div>
      <div className="bg-custom-blue text-white py-20 px-8 text-center">
        <h1 className="text-3xl font-semibold">Events</h1>
        <p className="text-lg">Find and explore upcoming events</p>
      </div>

      <div className="flex">
        <div className="w-1/4">
          <LeftCategories onFilter={handleFilter} />
        </div>
        <div className=" px-4 w-full">
          {filteredEvents.length > 0 ? (
             <div className="mt-4 w-full">
              {filteredEvents.map((event, index) => (
                <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                  <Event
                    event={event} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg mt-8 text-center">No events found for the selected criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
