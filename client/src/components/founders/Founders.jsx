import React from 'react';
import Avatar from '@mui/material/Avatar';

const foundersData = [
  {
    id: 1,
    name: 'Merridee Drury',
    imageUrl: '/founders/mer.jpeg'
  },
  {
    id: 2,
    name: 'Elizabeth Thompson',
    imageUrl: "/founders/liz.png"
  },
  {
    id: 3,
    name: 'Sha Dennie',
    imageUrl: "/founders/sha.jpeg"
  }
];

const Founders = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold text-custom-blue mb-8">Meet the Team</h2>
      <p className="text-lg text-gray-700 mb-12">We are a passionate team of professionals dedicated to our work.</p>
      <div className="flex flex-wrap justify-center gap-8">
        {foundersData.map(founder => (
          <div key={founder.id} className="flex flex-col items-center">
            <Avatar alt={founder.name} src={founder.imageUrl} sx={{ width: 200, height: 200, borderRadius: '50%' }} />
            <p className="mt-4 text-lg font-semibold text-gray-900">{founder.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Founders;
