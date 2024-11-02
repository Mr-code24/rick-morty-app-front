import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton, Box, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const CharacterDetail = ({ character, open, onClose }) => {
  if (!character) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center' }}>
        {character.name}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
        <Box sx={{ textAlign: 'center', marginBottom: 2, width: '100%' }}>
          <img
            src={character.image}
            alt={character.name}
            style={{
              width: '100%',
              maxWidth: '300px',
              height: 'auto',
              borderRadius: '50%',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
              marginBottom: '16px',
            }}
          />
        </Box>
        <Divider variant="middle" sx={{ width: '100%', mb: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Character Details</Typography>
        <Box sx={{ width: '100%', mt: 2 }}>
          <Typography variant="body1" gutterBottom><strong>Species:</strong> {character.species}</Typography>
          <Typography variant="body1" gutterBottom><strong>Status:</strong> {character.status}</Typography>
          <Typography variant="body1" gutterBottom><strong>Gender:</strong> {character.gender}</Typography>
          <Typography variant="body1" gutterBottom><strong>Origin:</strong> {character.origin.name}</Typography>
          <Typography variant="body1" gutterBottom><strong>Location:</strong> {character.location.name}</Typography>
          <Typography variant="body1" gutterBottom><strong>Number of Episodes:</strong> {character.episode.length}</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
        <Button onClick={onClose} color="primary" variant="contained" size="large">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
