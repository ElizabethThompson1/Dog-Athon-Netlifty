// AdminCards.js
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const AdminCards = ({ selectedOption, onSelect }) => {
  return (
    <div className="admin-content " style={{marginTop: '8rem'}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            className={`rounded-lg cursor-pointer ${
              selectedOption === 'display-gear' ? 'bg-blue-500' : 'bg-gray-200'
            }`}
            onClick={() => onSelect('display-gear')}
          >
            <CardContent className="p-4">
              <Typography
                variant="h5"
                component="h2"
                className={`text-black ${
                  selectedOption === 'display-gear' ? 'font-bold' : ''
                }`}
              >
                Display Gear
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            className={`rounded-lg cursor-pointer ${
              selectedOption === 'display-events'
                ? 'bg-blue-500'
                : 'bg-gray-200'
            }`}
            onClick={() => onSelect('display-events')}
          >
            <CardContent className="p-4">
              <Typography
                variant="h5"
                component="h2"
                className={`text-black ${
                  selectedOption === 'display-events' ? 'font-bold' : ''
                }`}
              >
                Display Events
              </Typography>
              {/* Add content for Display Events card */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            className={`rounded-lg cursor-pointer ${
              selectedOption === 'display-users'
                ? 'bg-blue-500'
                : 'bg-gray-200'
            }`}
            onClick={() => onSelect('display-users')}
          >
            <CardContent className="p-4">
              <Typography
                variant="h5"
                component="h2"
                className={`text-black ${
                  selectedOption === 'display-users' ? 'font-bold' : ''
                }`}
              >
                Display Users
              </Typography>
              {/* Add content for Display Users card */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminCards;
