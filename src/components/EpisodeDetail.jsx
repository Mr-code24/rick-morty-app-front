import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton, Box, Divider, Grid, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const EpisodeDetail = ({ episode, open, onClose }) => {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (open && episode) {
      const fetchCharacters = async () => {
        try {
          const characterRequests = episode.characters.map(url => axios.get(url));
          const characterResponses = await Promise.all(characterRequests);
          const characterData = characterResponses.map(response => response.data);
          setCharacters(characterData);
        } catch (error) {
          console.error("Error fetching characters", error);
        }
      };

      fetchCharacters();
    }
  }, [open, episode]);

  const handleCharacterClick = (characterId) => {
    navigate(`/characters/${characterId}`);
  };

  if (!episode) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center' }}>
        {episode.name}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#fff',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: 4, overflowX: 'hidden' }}>
        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Episode Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Episode:</strong> {episode.episode}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Air Date:</strong> {episode.air_date}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" color="primary" gutterBottom>
            Characters in this Episode
          </Typography>
          <Grid container spacing={2}>
            {characters.map((character) => (
              <Grid item xs={12} sm={4} key={character.id}>
                <Link
                  component="button"
                  variant="body1"
                  onClick={() => handleCharacterClick(character.id)}
                  underline="hover"
                  color="primary"
                >
                  {character.name}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
