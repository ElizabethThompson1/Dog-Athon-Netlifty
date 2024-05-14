import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import itemData from "./image.json";
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-white text-gray-800 h-screen w-full">
            <div className="container mx-auto py-16 h-full">
                <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-14 h-full">
                    <ImageList sx={{ width: 500, height: 450, transformStyle: 'preserve-3d' }} variant="woven" cols={3} gap={8}>
                        {itemData.map((item) => (
                            <ImageListItem key={item.image}>
                                <img
                                    srcSet={`${item.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item.image}?w=161&fit=crop&auto=format`}
                                    alt={`Event ${item.id}`}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <div className="w-full lg:w-6/12 lg:pl-4">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl font-bold mb-6 text-custom-blue">About</h1>
                            <p className="text-lg mb-6">Our company is dedicated to organizing events that promote fitness, mindfulness, and inclusivity. We believe in the transformative power of running and its ability to enhance mental health and foster connections within communities.</p>
                            <Link to="/about" className="bg-custom-cream text-white font-bold py-2 px-4 rounded-md mr-4 text-lg hover:bg-custom-gold hover:text-custom-cream transition-colors duration-300">Learn More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
