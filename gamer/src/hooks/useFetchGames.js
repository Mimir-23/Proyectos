import { useState, useEffect } from 'react';
import { rawgService } from '../services/rawgService';

export const useFetchGames = (type = 'popular', params = {}) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchGames = async (pageNum = 1, reset = false) => {
    try {
      setLoading(true);
      let response;

      switch (type) {
        case 'popular':
          response = await rawgService.getPopularGames(pageNum);
          break;
        case 'new-releases':
          response = await rawgService.getNewReleases(pageNum);
          break;
        case 'genre':
          response = await rawgService.getGamesByGenre(params.genreId, pageNum);
          break;
        case 'search':
          response = await rawgService.searchGames(params.query, pageNum);
          break;
        default:
          response = await rawgService.getPopularGames(pageNum);
      }

      if (reset) {
        setGames(response.results);
      } else {
        setGames(prev => [...prev, ...response.results]);
      }

      setHasMore(!!response.next);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchGames(nextPage);
    }
  };

  const refetch = () => {
    setPage(1);
    setGames([]);
    fetchGames(1, true);
  };

  useEffect(() => {
    fetchGames(1, true);
  }, [type, params.genreId, params.query]);

  return {
    games,
    loading,
    error,
    hasMore,
    loadMore,
    refetch,
  };
};
