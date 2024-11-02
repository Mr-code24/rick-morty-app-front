import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton, Box, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export const LocationDetail = ({ location, open, onClose }) => {
  if (!location) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center' }}>
        {location.name}
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
      <DialogContent dividers sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
        <Box sx={{ textAlign: 'center', marginBottom: 2, width: '100%' }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Type:</strong> {location.type}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Dimension:</strong> {location.dimension}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Residents:</strong> {location.residents.length > 0 ? location.residents.length : "No known residents"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" color="primary" gutterBottom>
            Additional Information
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>First Appearance:</strong> {location.created}
          </Typography>
          {/* Puedes añadir más datos específicos si la API lo permite */}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
