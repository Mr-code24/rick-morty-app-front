import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import { config } from '../environment';

export const FavoritesDisplay = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${config.apiUrl}/favorites`);
            setFavorites(response.data);
        } catch (err) {
            setError('Error fetching favorites');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFavorite = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/favorites/${id}`);
            setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== id));
            setSnackbarOpen(true); // Mostrar confirmación de eliminación
        } catch (err) {
            setError('Error deleting favorite');
            console.error(err);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <>
            <Grid container spacing={2}>
                {favorites.map((favorite) => (
                    <Grid key={favorite.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                            <CardMedia
                                component="img"
                                alt={favorite.name}
                                image={favorite.image}
                            />
                            <CardContent>
                                <Typography variant="h5">{favorite.name}</Typography>
                                <Typography color="textSecondary">Species: {favorite.species}</Typography>
                                <Typography color="textSecondary">Status: {favorite.status}</Typography>
                                <IconButton color="error" onClick={() => handleDeleteFavorite(favorite.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Favorite deleted successfully!
                </MuiAlert>
            </Snackbar>
        </>
    );
};
