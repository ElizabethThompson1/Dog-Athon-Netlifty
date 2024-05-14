import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const Event = ({ event }) => {
  const { title, day, month, year, address, description, imageUrl } = event; 

  const descriptionShortened = description.split(' ').slice(0, 10).join(' ');
  const isDescriptionLong = description.split(' ').length > 10;

  return (
    <Card className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 mx-auto flex flex-row md:flex-row bg-gray-100  shadow-md rounded-lg">
      <img
        src={imageUrl}
        alt="event image"
        className="w-full md:w-1/2 object-cover rounded-lg md:rounded-l-lg"
      />
      <CardBody className="p-4 md:w-1/2">
        <Typography variant="h6" className="text-custom-blue mb-2 uppercase font-sans">
          {title}
        </Typography>
        <Typography variant="h4" className="mb-2 font-serif">
          Date: {`${month} ${day}, ${year}`}
        </Typography>
        <Typography className="mb-2 font-serif">
          Location: {address}
        </Typography>
        <Typography className="mb-4 font-normal">
          {isDescriptionLong ? descriptionShortened + '...' : description}
          {isDescriptionLong && (
            <a href="#" className="text-blue-600 hover:underline ml-1">Read More</a>
          )}
        </Typography>
        <a href="#" className="inline-block">
          <Button variant="text" className="text-custom-cream flex items-center gap-2 font-serif">
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardBody>
    </Card>
  );
};

export default Event;
