import React, { useEffect, useState, useContext } from 'react';
import { fetchCharacters } from '../services/api';
import { Card, CardMedia, CardContent, Typography, Button, Grid, CardActions, IconButton, Fab } from '@mui/material';
import { FavoritesContext } from '../context/FavoritesContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star'; // Nuevo icono para favoritos
import { CharacterDetail } from './CharacterDetail';
import {FavoritesList} from './FavoritesList';

export const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openFavorites, setOpenFavorites] = useState(false);
  const { addFavorite, favorites, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    fetchCharacters().then((response) => setCharacters(response.data.results));
  }, []);

  const handleOpenModal = (character) => {
    setSelectedCharacter(character);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
    setOpenModal(false);
  };

  const isFavorite = (character) => favorites.some((fav) => fav.id === character.id);

  const handleFavoriteToggle = (character) => {
    if (isFavorite(character)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {characters.map((character) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardMedia component="img" image={character.image} alt={character.name} />
              <CardContent>
                <Typography variant="h6">{character.name}</Typography>
                <Typography variant="body2">Species: {character.species}</Typography>
                <Typography variant="body2">Status: {character.status}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleFavoriteToggle(character)}>
                  {isFavorite(character) ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                <Button size="small" color="primary" onClick={() => handleOpenModal(character)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal de detalles */}
      <CharacterDetail character={selectedCharacter} open={openModal} onClose={handleCloseModal} />

      {/* Botón flotante para abrir la lista de favoritos */}
      <Fab
        color="primary"
        aria-label="favorites"
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={() => setOpenFavorites(true)}
      >
        <StarIcon />
        {favorites.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: 'red',
            borderRadius: '50%',
            color: 'white',
            padding: '2px 6px',
            fontSize: '12px',
          }}>
            {favorites.length}
          </span>
        )}
      </Fab>

      {/* Componente de la lista de favoritos */}
      <FavoritesList open={openFavorites} onClose={() => setOpenFavorites(false)} />
    </div>
  );
};
