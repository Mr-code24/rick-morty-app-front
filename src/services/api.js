import axios from 'axios';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchEpisodes = () => axios.get(`${API_BASE_URL}/episode`);
export const fetchLocations = () => axios.get(`${API_BASE_URL}/location`);
export const fetchCharacters = () => axios.get(`${API_BASE_URL}/character`);
export const fetchEpisodeById = (id) => axios.get(`${API_BASE_URL}/episode/${id}`);
export const fetchLocationById = (id) => axios.get(`${API_BASE_URL}/location/${id}`);
export const fetchCharacterById = (id) => axios.get(`${API_BASE_URL}/character/${id}`);
