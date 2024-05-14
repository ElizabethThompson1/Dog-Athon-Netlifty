import React from 'react';
import Gearbanner from '../components/gear/GearBanner';
import GearDisplay from '../components/gear/GearDisplay';

const GearPage = ({ userId }) => {
  return (
    <div>
      <Gearbanner />
      <div className="w-full"> 
        <GearDisplay userId={userId} />
      </div>
    </div>
  );
};

export default GearPage;
