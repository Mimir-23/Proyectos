import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFilter, 
  FaFire, 
  FaTrophy, 
  FaGamepad, 
  FaStar,
  FaDesktop,
  FaSearch,
  FaTimes,
  FaChartLine,
  FaUsers,
  FaCheckCircle
} from 'react-icons/fa';
import Container from '../components/layout/Container';
import GameGrid from '../components/games/GameGrid';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Pagination from '../components/ui/Pagination';
import { rawgService } from '../services/rawgService';

const Popular = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  
  const [filters, setFilters] = useState({
    platform: '',
    genre: '',
    ordering: '-metacritic,-rating',
    rating: '',
    search: ''
  });
  
  const [showFilters, setShowFilters] = useState(false);

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoadingOptions(true);
        const [genresData, platformsData] = await Promise.all([
          rawgService.getGenres(),
          rawgService.getPlatforms()
        ]);
        
        setGenres([
          { id: '', name: 'Todos los géneros' },
          ...genresData.results.slice(0, 12)
        ]);
        setPlatforms([
          { id: '', name: 'Todas las plataformas' },
          { id: '4', name: 'PC' },
          { id: '18', name: 'PlayStation 4' },
          { id: '187', name: 'PlayStation 5' },
          { id: '1', name: 'Xbox One' },
          { id: '186', name: 'Xbox Series S/X' },
          { id: '7', name: 'Nintendo Switch' },
          { id: '3', name: 'iOS' },
          { id: '21', name: 'Android' }
        ]);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch games with filters
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          ordering: filters.ordering,
          page_size: pageSize,
          page: currentPage,
          locale: 'es',
        };

        if (filters.platform) {
          params.platforms = filters.platform;
        }

        if (filters.genre) {
          params.genres = filters.genre;
        }

        if (filters.rating) {
          params.metacritic = filters.rating;
        }

        if (filters.search) {
          params.search = filters.search;
        }

        const response = await rawgService.getGamesWithFilters(params);
        setGames(response.results);
        setTotalCount(response.count);
        setTotalPages(Math.ceil(response.count / pageSize));
      } catch (err) {
        setError(err.message);
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [filters, currentPage]);

  const sortOptions = [
    { value: '-metacritic,-rating', label: 'Mejor valorados', icon: FaTrophy },
    { value: '-released', label: 'Más recientes', icon: FaFire },
    { value: '-rating', label: 'Mayor puntuación', icon: FaStar },
    { value: '-added', label: 'Más populares', icon: FaUsers },
    { value: 'name', label: 'Nombre A-Z', icon: FaGamepad },
  ];

  const ratingOptions = [
    { value: '', label: 'Todas las puntuaciones' },
    { value: '85,100', label: '85+ (Obra maestra)' },
    { value: '75,100', label: '75+ (Excelente)' },
    { value: '65,100', label: '65+ (Muy bueno)' },
    { value: '50,100', label: '50+ (Bueno)' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const resetFilters = () => {
    setFilters({
      platform: '',
      genre: '',
      ordering: '-metacritic,-rating',
      rating: '',
      search: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeFiltersCount = [
    filters.platform !== '',
    filters.genre !== '',
    filters.rating !== '',
    filters.search !== ''
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Container>
        {/* Hero Section */}
        <motion.div
          className="pt-16 pb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-600 dark:text-orange-400 px-6 py-3 rounded-full border border-orange-200 dark:border-orange-800 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaFire className="h-4 w-4" />
            <span className="font-semibold">En tendencia</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold font-outfit text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Juegos
            <motion.span 
              className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Populares
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explora los juegos más populares y mejor valorados por millones de jugadores. 
            Encuentra tu próxima aventura favorita.
          </motion.p>

          {/* Quick Stats */}
          {totalCount > 0 && (
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm">
                <FaGamepad className="h-4 w-4 text-orange-500" />
                <span className="font-medium text-gray-900 dark:text-white">{totalCount.toLocaleString()}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">juegos</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm">
                <FaChartLine className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Top valorados</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="relative max-w-2xl mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar juegos populares..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleFilterChange('search', e.target.value);
              }}
              className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 shadow-lg"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  handleFilterChange('search', '');
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            {/* Filter Toggle and Stats */}
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaFilter className="h-4 w-4" />
                <span className="font-medium">Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-white text-orange-600 text-xs px-2 py-1 rounded-full font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  Limpiar filtros
                </button>
              )}

              {totalCount > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {games.length} de {totalCount.toLocaleString()} resultados (página {currentPage} de {totalPages})
                </div>
              )}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">Ordenar por:</span>
              <select
                value={filters.ordering}
                onChange={(e) => handleFilterChange('ordering', e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Platform Filter */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <FaDesktop className="h-5 w-5 text-orange-500" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">Plataforma</h3>
                    </div>
                    {loadingOptions ? (
                      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    ) : (
                      <select
                        value={filters.platform}
                        onChange={(e) => handleFilterChange('platform', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      >
                        {platforms.map(platform => (
                          <option key={platform.id} value={platform.id}>
                            {platform.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Genre Filter */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <FaGamepad className="h-5 w-5 text-orange-500" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">Género</h3>
                    </div>
                    {loadingOptions ? (
                      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    ) : (
                      <select
                        value={filters.genre}
                        onChange={(e) => handleFilterChange('genre', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      >
                        {genres.map(genre => (
                          <option key={genre.id} value={genre.id}>
                            {genre.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <FaStar className="h-5 w-5 text-orange-500" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">Puntuación</h3>
                    </div>
                    <select
                      value={filters.rating}
                      onChange={(e) => handleFilterChange('rating', e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    >
                      {ratingOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Games Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {error ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400 mb-4">Error al cargar los juegos</p>
              <Button onClick={() => window.location.reload()}>
                Reintentar
              </Button>
            </div>
          ) : (
            <>
              <GameGrid 
                games={games} 
                loading={loading && games?.length === 0} 
                error={error} 
              />
              
              {/* Pagination */}
              {!loading && games?.length > 0 && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  loading={loading}
                />
              )}
            </>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && games?.length === 0 && (
          <motion.div 
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <Spinner size="lg" />
              <motion.div
                className="absolute inset-0 border-4 border-orange-500/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
              Cargando juegos populares...
            </p>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && games?.length === 0 && (
          <motion.div
            className="text-center mt-16 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-md mx-auto">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <FaGamepad className="h-8 w-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No se encontraron juegos
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Intenta ajustar los filtros para encontrar más resultados.
              </p>

              <Button onClick={resetFilters}>
                Limpiar filtros
              </Button>
            </div>
          </motion.div>
        )}

        {/* Success State */}
        {!loading && games?.length > 0 && (
          <motion.div
            className="text-center mt-16 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-md mx-auto">
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <FaCheckCircle className="h-6 w-6 text-white" />
              </motion.div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                ¡Explora más!
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Descubre más juegos increíbles ajustando los filtros o explorando otras categorías.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors duration-200"
                >
                  <FaFire className="h-4 w-4 mr-2" />
                  Volver arriba
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default Popular;
