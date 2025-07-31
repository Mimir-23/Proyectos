import axios from 'axios';

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

if (!RAWG_API_KEY) {
  console.error('⚠️  RAWG API Key no encontrada. Por favor configura VITE_RAWG_API_KEY en tu archivo .env');
}

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: RAWG_API_KEY,
  },
});

export const rawgService = {
  // Get popular games
  getPopularGames: async (page = 1, pageSize = 20) => {
    try {
      const response = await api.get('/games', {
        params: {
          ordering: '-metacritic,-rating',
          page,
          page_size: pageSize,
          locale: 'es',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular games:', error);
      throw error;
    }
  },

  // Get new releases
  getNewReleases: async (page = 1, pageSize = 20) => {
    try {
      const today = new Date();
      const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
      
      const response = await api.get('/games', {
        params: {
          dates: `${twoMonthsAgo.toISOString().split('T')[0]},${today.toISOString().split('T')[0]}`,
          ordering: '-released',
          page,
          page_size: pageSize,
          locale: 'es',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching new releases:', error);
      throw error;
    }
  },

  // Get games by genre
  getGamesByGenre: async (genreId, page = 1, pageSize = 20) => {
    try {
      const response = await api.get('/games', {
        params: {
          genres: genreId,
          ordering: '-metacritic,-rating',
          page,
          page_size: pageSize,
          locale: 'es',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching games by genre:', error);
      throw error;
    }
  },

  // Search games
  searchGames: async (query, page = 1, pageSize = 20) => {
    try {
      const response = await api.get('/games', {
        params: {
          search: query,
          ordering: '-metacritic,-rating',
          page,
          page_size: pageSize,
          locale: 'es',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching games:', error);
      throw error;
    }
  },

  // Get game details
  getGameDetails: async (gameId) => {
    try {
      const response = await api.get(`/games/${gameId}`, {
        params: {
          locale: 'es',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching game details:', error);
      throw error;
    }
  },

  // Get game screenshots
  getGameScreenshots: async (gameId) => {
    try {
      const response = await api.get(`/games/${gameId}/screenshots`);
      return response.data;
    } catch (error) {
      console.error('Error fetching game screenshots:', error);
      throw error;
    }
  },

  // Get genres
  getGenres: async () => {
    try {
      const response = await api.get('/genres', {
        params: {
          locale: 'es',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  },

  // Get platforms
  getPlatforms: async () => {
    try {
      const response = await api.get('/platforms', {
        params: {
          locale: 'es',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching platforms:', error);
      throw error;
    }
  },

  // Get games with filters
  getGamesWithFilters: async (params) => {
    try {
      const response = await api.get('/games', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching filtered games:', error);
      throw error;
    }
  },
};
