import React, { createContext, useState } from 'react';
import axios from 'axios';
import { config } from '../environment';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (character) => {
        setFavorites((prevFavorites) => [...prevFavorites, character]);
    };

    const removeFavorite = (id) => {
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
    };

    const saveFavoritesToDatabase = async () => {
        try {
            await axios.post(`${config.apiUrl}/favorites`, { favorites });
            setFavorites([]);
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, saveFavoritesToDatabase }}>
            {children}
        </FavoritesContext.Provider>
    );
};
