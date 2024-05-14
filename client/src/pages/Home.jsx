import React from 'react';
import Banner from '../components/banner/Banner';
import Founders from '../components/founders/Founders';
import CartSlider from '../components/gear/CartSlider';
import About from '../components/about/About';


const Home = () => {
  return (
    <div>
        <Banner />
        <About/>
        <Founders/>
        <CartSlider/>
    </div>
  )
}

export default Home