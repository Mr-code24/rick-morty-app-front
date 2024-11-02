import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText, IconButton, Snackbar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoritesContext } from '../context/FavoritesContext';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const FavoritesList = ({ open, onClose }) => {
    const { favorites, removeFavorite, saveFavoritesToDatabase } = React.useContext(FavoritesContext);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSaveFavorites = async () => {
        await saveFavoritesToDatabase();
        setSnackbarOpen(true); // Mostrar el Snackbar al guardar
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>
                    <IconButton color="error" onClick={onClose}>
                        <FavoriteIcon />
                    </IconButton>
                    Favorite Characters
                </DialogTitle>
                <DialogContent>
                    {favorites.length === 0 ? (
                        <Typography>No favorites added.</Typography>
                    ) : (
                        <List>
                            {favorites.map((character, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={character.name}
                                        secondary={`Species: ${character.species}, Status: ${character.status}`}
                                    />
                                    <Button onClick={() => removeFavorite(character.id)} color="error">
                                        Remove
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveFavorites} color="primary" variant="contained">
                        Save Favorites
                    </Button>
                    <Button onClick={onClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Favorites saved successfully!
                </Alert>
            </Snackbar>
        </>
    );
};
