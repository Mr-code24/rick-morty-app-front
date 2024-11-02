import { Card, CardContent, Typography, Grid, CardActions, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchLocations } from '../services/api';
import { LocationDetail } from './LocationDetail';
export const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchLocations().then(response => setLocations(response.data.results));
  }, []);

  const handleOpenDetail = (location) => {
    setSelectedLocation(location);
    setOpen(true);
  };

  const handleCloseDetail = () => {
    setSelectedLocation(null);
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {locations.map((location) => (
          <Grid item xs={12} sm={6} md={4} key={location.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}
            >
              <CardContent>
                <Typography variant="h6" component="div" color="primary.main" gutterBottom>
                  {location.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Type:</strong> {location.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Dimension:</strong> {location.dimension}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Residents:</strong> {location.residents.length > 0 ? location.residents.length : "No known residents"}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained" color="primary" onClick={() => handleOpenDetail(location)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <LocationDetail location={selectedLocation} open={open} onClose={handleCloseDetail} />
    </>
      
  )
}
