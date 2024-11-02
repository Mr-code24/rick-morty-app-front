import React, { useState, useEffect } from 'react';
import { fetchEpisodes } from '../services/api';
import { Card, CardContent, CardActions, Typography, Button, Grid } from '@mui/material';
import { EpisodeDetail } from './EpisodeDetail';

export const EpisodeList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchEpisodes().then((response) => setEpisodes(response.data.results));
  }, []);

  const handleOpen = (episode) => {
    setSelectedEpisode(episode);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEpisode(null);
  };

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {episodes.map((episode) => (
        <Grid item xs={12} sm={6} md={4} key={episode.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{episode.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Episode: {episode.episode}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Air Date: {episode.air_date}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => handleOpen(episode)} color="primary">
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <EpisodeDetail episode={selectedEpisode} open={open} onClose={handleClose} />
    </Grid>
  );
};
