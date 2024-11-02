import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { EpisodesPage } from './pages/EpisodesPage';
import { LocationsPage } from './pages/LocationsPage';
import { CharactersPage } from './pages/CharactersPage';
import { FavoritesProvider } from './context/FavoritesContext.jsx';

// Importaciones de Material UI
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { FavoritesPage } from './pages/FavoritesPage.jsx';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <AppBar position="static" sx={{ marginBottom: 2 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Rick and Morty App
            </Typography>
            <Link to="/episodes" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={{ color: 'white', marginRight: 2 }}>Episodes</Button>
            </Link>
            <Link to="/locations" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={{ color: 'white', marginRight: 2 }}>Locations</Button>
            </Link>
            <Link to="/characters" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={{ color: 'white', marginRight: 2 }}>Characters</Button>
            </Link>
            <Link to="/favorites" style={{textDecoration: 'none'}}>
              <Button color='inherit' sx={{color: 'white', marginRight: 2}}>Favorites</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: 3 }}>
          <Routes>
          <Route path="/" element={<CharactersPage />} />
            <Route path="/episodes" element={<EpisodesPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/characters" element={<CharactersPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Box>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
