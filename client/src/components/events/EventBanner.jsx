import React from 'react';

const EventBanner = () => {
  return (
    <div className="relative h-screen overflow-hidden flex items-center">
      <div className="absolute left-32 top-1/2 transform -translate-y-1/2 text-black font-serif z-10">
        <h2 className="text-8xl font-bold">Step into Adventure:</h2>
        <p className="text-6xl mt-6">A Pawsitive Running Journey</p>
      </div>
      <img src='/events/banner6.png' alt="Event Banner" className="absolute top-0 left-0 w-full h-auto" />
    </div>
  );
};

export default EventBanner;
