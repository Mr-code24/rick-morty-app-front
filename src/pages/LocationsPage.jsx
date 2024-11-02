import React, { useEffect, useState } from 'react';
import { fetchLocations } from '../services/api';
import {Typography } from '@mui/material';
import { LocationList } from '../components/LocationList';

export const LocationsPage = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations().then((response) => setLocations(response.data.results));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Locations
      </Typography>
      <LocationList/>
    </div>
  );
}
