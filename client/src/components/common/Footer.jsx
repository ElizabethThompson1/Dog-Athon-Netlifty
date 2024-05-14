import React from 'react';

const Footer = () => {
  return (
      <div className='text-center bg-light  text-white p-0 h-1/4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Dog-Athon.com
      </div>
  );
};

export default Footer;
