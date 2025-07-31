import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaTimes, 
  FaFilter, 
  FaStar, 
  FaClock, 
  FaGamepad,
  FaSort,
  FaChevronDown,
  FaSpinner,
  FaHistory
} from 'react-icons/fa';
import Container from '../components/layout/Container';
import GameGrid from '../components/games/GameGrid';
import Button from '../components/ui/Button';
import { rawgService } from '../services/rawgService';

const Search = () => {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'relevance',
    minRating: '',
    genre: '',
    platform: '',
    year: ''
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const searchInputRef = useRef(null);

  // Load search history from localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);
  }, []);

  const searchGames = async (searchQuery, appliedFilters = filters) => {
    if (!searchQuery.trim()) {
      setGames([]);
      setHasSearched(false);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Add search parameters based on filters
      const searchParams = {
        search: searchQuery,
        page_size: 20,
      };

      if (appliedFilters.sortBy !== 'relevance') {
        searchParams.ordering = appliedFilters.sortBy;
      }

      if (appliedFilters.minRating) {
        searchParams.rating = appliedFilters.minRating;
      }

      if (appliedFilters.genre) {
        searchParams.genres = appliedFilters.genre;
      }

      if (appliedFilters.platform) {
        searchParams.platforms = appliedFilters.platform;
      }

      if (appliedFilters.year) {
        searchParams.dates = `${appliedFilters.year}-01-01,${appliedFilters.year}-12-31`;
      }

      const response = await rawgService.searchGames(searchQuery, searchParams);
      setGames(response.results);
      setTotalResults(response.count || 0);
      
      // Save to search history
      saveToHistory(searchQuery);
    } catch (err) {
      setError(err.message);
      setGames([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const saveToHistory = (searchTerm) => {
    const newHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const getSuggestions = async (searchTerm) => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await rawgService.searchGames(searchTerm, { page_size: 5 });
      setSuggestions(response.results.map(game => game.name));
    } catch (err) {
      setSuggestions([]);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        searchGames(query);
        getSuggestions(query);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, filters]);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    searchInputRef.current?.blur();
  };

  const clearSearch = () => {
    setQuery('');
    setGames([]);
    setHasSearched(false);
    setShowSuggestions(false);
    setTotalResults(0);
    setFilters({
      sortBy: 'relevance',
      minRating: '',
      genre: '',
      platform: '',
      year: ''
    });
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    if (query && hasSearched) {
      searchGames(query, newFilters);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const popularSearches = [
    { name: 'Cyberpunk 2077', trending: true },
    { name: 'The Witcher 3', trending: false },
    { name: 'Grand Theft Auto V', trending: true },
    { name: 'Minecraft', trending: false },
    { name: 'Call of Duty', trending: true },
    { name: 'Fortnite', trending: false },
    { name: 'League of Legends', trending: false },
    { name: 'FIFA 24', trending: true },
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevancia' },
    { value: '-rating', label: 'Mejor valorados' },
    { value: '-released', label: 'Más recientes' },
    { value: '-added', label: 'Más populares' },
    { value: 'name', label: 'Alfabético' }
  ];

  const genreOptions = [
    { value: '', label: 'Todos los géneros' },
    { value: '4', label: 'Acción' },
    { value: '51', label: 'Indie' },
    { value: '3', label: 'Aventura' },
    { value: '5', label: 'RPG' },
    { value: '10', label: 'Estrategia' },
    { value: '2', label: 'Shooter' },
    { value: '40', label: 'Casual' },
    { value: '14', label: 'Simulación' },
    { value: '7', label: 'Puzzle' },
    { value: '11', label: 'Arcade' },
    { value: '83', label: 'Plataforma' },
    { value: '1', label: 'Racing' },
    { value: '15', label: 'Deportes' },
    { value: '6', label: 'Lucha' },
    { value: '19', label: 'Familiar' }
  ];

  const platformOptions = [
    { value: '', label: 'Todas las plataformas' },
    { value: '4', label: 'PC' },
    { value: '18,1,186', label: 'PlayStation' },
    { value: '1,186', label: 'Xbox' },
    { value: '7', label: 'Nintendo Switch' },
    { value: '3,21', label: 'Mobile' },
  ];

  return (
    <div className="py-8 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Container>
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold font-outfit text-gray-900 dark:text-white mb-4">
            🔍 Buscar Juegos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Encuentra tu próximo juego favorito con nuestra búsqueda avanzada
          </p>
        </motion.div>

        {/* Search Bar with Suggestions */}
        <motion.div
          className="max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 z-10" />
              {loading && (
                <FaSpinner className="absolute right-16 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary animate-spin z-10" />
              )}
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(query.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Busca por nombre del juego, género, desarrollador..."
                className="w-full pl-12 pr-16 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-200 shadow-lg"
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors z-10"
                >
                  <FaTimes className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && (suggestions.length > 0 || searchHistory.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl mt-2 shadow-xl z-50 max-h-80 overflow-y-auto"
                >
                  {suggestions.length > 0 && (
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Sugerencias</div>
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <div className="flex items-center">
                            <FaSearch className="h-4 w-4 text-gray-400 mr-3" />
                            <span className="text-gray-900 dark:text-white">{suggestion}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {searchHistory.length > 0 && (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Búsquedas recientes</div>
                        <button
                          onClick={clearHistory}
                          className="text-xs text-primary hover:text-primary/80 transition-colors"
                        >
                          Limpiar
                        </button>
                      </div>
                      {searchHistory.map((historyItem, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(historyItem)}
                          className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <div className="flex items-center">
                            <FaHistory className="h-4 w-4 text-gray-400 mr-3" />
                            <span className="text-gray-900 dark:text-white">{historyItem}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Filters Toggle */}
          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                showFilters 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-primary/50'
              }`}
            >
              <FaFilter className="h-4 w-4" />
              <span>Filtros avanzados</span>
              <FaChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>
        </motion.div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-4xl mx-auto mb-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaSort className="inline h-4 w-4 mr-2" />
                      Ordenar por
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-colors"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Genre Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaGamepad className="inline h-4 w-4 mr-2" />
                      Género
                    </label>
                    <select
                      value={filters.genre}
                      onChange={(e) => handleFilterChange('genre', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-colors"
                    >
                      {genreOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Platform Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Plataforma
                    </label>
                    <select
                      value={filters.platform}
                      onChange={(e) => handleFilterChange('platform', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-colors"
                    >
                      {platformOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaStar className="inline h-4 w-4 mr-2" />
                      Puntuación mínima
                    </label>
                    <select
                      value={filters.minRating}
                      onChange={(e) => handleFilterChange('minRating', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="">Cualquier puntuación</option>
                      <option value="4.5">4.5+ ⭐⭐⭐⭐⭐</option>
                      <option value="4.0">4.0+ ⭐⭐⭐⭐</option>
                      <option value="3.5">3.5+ ⭐⭐⭐</option>
                      <option value="3.0">3.0+ ⭐⭐</option>
                    </select>
                  </div>

                  {/* Year Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaClock className="inline h-4 w-4 mr-2" />
                      Año de lanzamiento
                    </label>
                    <select
                      value={filters.year}
                      onChange={(e) => handleFilterChange('year', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="">Cualquier año</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <Button
                      onClick={() => {
                        setFilters({
                          sortBy: 'relevance',
                          minRating: '',
                          genre: '',
                          platform: '',
                          year: ''
                        });
                        if (query && hasSearched) {
                          searchGames(query, {
                            sortBy: 'relevance',
                            minRating: '',
                            genre: '',
                            platform: '',
                            year: ''
                          });
                        }
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popular Searches */}
        {!hasSearched && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Búsquedas populares:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSearches.map((search) => (
                <motion.button
                  key={search.name}
                  onClick={() => setQuery(search.name)}
                  className={`relative px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                    search.trending
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary/10 border-2 border-gray-200 dark:border-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {search.trending && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                  {search.name}
                  {search.trending && (
                    <span className="ml-2 text-xs opacity-80">🔥</span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search Results */}
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Results Header */}
            <div className="mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white mb-2">
                      Resultados de búsqueda
                    </h2>
                    {!loading && (
                      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                        <span>
                          {games.length > 0 
                            ? `${games.length} de ${totalResults.toLocaleString()} juegos encontrados`
                            : `No se encontraron juegos`
                          }
                        </span>
                        {query && (
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                            "{query}"
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {games.length > 0 && (
                    <div className="mt-4 md:mt-0 flex items-center space-x-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Ordenado por:</span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                        {sortOptions.find(option => option.value === filters.sortBy)?.label || 'Relevancia'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Active Filters */}
                {(filters.genre || filters.platform || filters.minRating || filters.year) && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Filtros activos:</span>
                      {filters.genre && (
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                          {genreOptions.find(g => g.value === filters.genre)?.label}
                        </span>
                      )}
                      {filters.platform && (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                          {platformOptions.find(p => p.value === filters.platform)?.label}
                        </span>
                      )}
                      {filters.minRating && (
                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm">
                          {filters.minRating}+ ⭐
                        </span>
                      )}
                      {filters.year && (
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                          {filters.year}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Games Grid */}
            <GameGrid games={games} loading={loading} error={error} />

            {/* No Results */}
            {!loading && games.length === 0 && hasSearched && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border-2 border-gray-200 dark:border-gray-700 max-w-md mx-auto">
                  <div className="text-8xl mb-6">🎮</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    No se encontraron juegos
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    No encontramos juegos que coincidan con tu búsqueda "{query}". 
                    Intenta con diferentes términos o ajusta los filtros.
                  </p>
                  <div className="space-y-3">
                    <Button onClick={clearSearch} className="w-full">
                      Nueva búsqueda
                    </Button>
                    <Button 
                      onClick={() => {
                        setFilters({
                          sortBy: 'relevance',
                          minRating: '',
                          genre: '',
                          platform: '',
                          year: ''
                        });
                        if (query) searchGames(query, {
                          sortBy: 'relevance',
                          minRating: '',
                          genre: '',
                          platform: '',
                          year: ''
                        });
                      }}
                      variant="outline" 
                      className="w-full"
                    >
                      Quitar filtros
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Load More Results (if there are more) */}
            {games.length > 0 && games.length < totalResults && (
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button
                  onClick={() => {
                    // Here you could implement pagination or load more functionality
                    console.log('Load more results');
                  }}
                  variant="outline"
                  className="px-8 py-3"
                >
                  Ver más resultados ({totalResults - games.length} restantes)
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default Search;
