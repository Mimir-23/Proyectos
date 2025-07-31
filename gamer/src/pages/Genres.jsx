import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFilter, 
  FaGamepad, 
  FaSearch, 
  FaTimes,
  FaStar,
  FaDesktop,
  FaCheckCircle,
  FaUsers,
  FaChartLine
} from 'react-icons/fa';
import Container from '../components/layout/Container';
import GameGrid from '../components/games/GameGrid';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Pagination from '../components/ui/Pagination';
import { rawgService } from '../services/rawgService';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;
  const [platforms, setPlatforms] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  
  const [filters, setFilters] = useState({
    platform: '',
    ordering: '-metacritic,-rating',
    rating: '',
    search: ''
  });
  
  const [showFilters, setShowFilters] = useState(false);

  // Popular genres with background images and better styling
  const popularGenres = [
    { 
      id: 4, 
      name: 'Acción', 
      icon: '⚔️', 
      color: 'from-red-500 to-orange-500',
      bgImage: 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg', // Cyberpunk 2077
      description: 'Combate intenso y adrenalina'
    },
    { 
      id: 51, 
      name: 'Indie', 
      icon: '🎨', 
      color: 'from-purple-500 to-pink-500',
      bgImage: 'https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg', // Stardew Valley
      description: 'Creatividad e innovación'
    },
    { 
      id: 3, 
      name: 'Aventura', 
      icon: '🗺️', 
      color: 'from-green-500 to-blue-500',
      bgImage: 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg', // Zelda BOTW
      description: 'Explora mundos increíbles'
    },
    { 
      id: 5, 
      name: 'RPG', 
      icon: '🐉', 
      color: 'from-blue-500 to-purple-500',
      bgImage: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg', // Witcher 3
      description: 'Rol e historias épicas'
    },
    { 
      id: 10, 
      name: 'Estrategia', 
      icon: '♟️', 
      color: 'from-yellow-500 to-red-500',
      bgImage: 'https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg', // Civilization VI
      description: 'Planifica y conquista'
    },
    { 
      id: 2, 
      name: 'Shooter', 
      icon: '🎯', 
      color: 'from-gray-500 to-gray-700',
      bgImage: 'https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg', // Counter-Strike
      description: 'Precisión y competencia'
    },
    { 
      id: 14, 
      name: 'Simulación', 
      icon: '🛠️', 
      color: 'from-cyan-500 to-blue-500',
      bgImage: 'https://media.rawg.io/media/games/d69/d69810315bd7e226ea2d21f9156af629.jpg', // Euro Truck Simulator
      description: 'Experiencias realistas'
    },
    { 
      id: 15, 
      name: 'Deportes', 
      icon: '⚽', 
      color: 'from-green-500 to-yellow-500',
      bgImage: 'https://media.rawg.io/media/games/b59/b59560a7277b16b53e4786b4abe45baa.jpg', // FIFA
      description: 'Competición deportiva'
    },
  ];

  // Fetch genres and platforms on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingGenres(true);
        setLoadingOptions(true);
        
        const [genresResponse, platformsResponse] = await Promise.all([
          rawgService.getGenres(),
          rawgService.getPlatforms()
        ]);
        
        setGenres(genresResponse.results);
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
        
        if (genresResponse.results.length > 0) {
          setSelectedGenre(genresResponse.results[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingGenres(false);
        setLoadingOptions(false);
      }
    };

    fetchData();
  }, []);

  // Fetch games when genre or filters change
  useEffect(() => {
    const fetchGames = async () => {
      if (!selectedGenre) return;
      
      try {
        setLoading(true);
        setError(null);

        const params = {
          genres: selectedGenre.id,
          ordering: filters.ordering,
          page_size: pageSize,
          page: currentPage,
          locale: 'es',
        };

        if (filters.platform) {
          params.platforms = filters.platform;
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
  }, [selectedGenre, filters, currentPage]);

  const sortOptions = [
    { value: '-metacritic,-rating', label: 'Mejor valorados', icon: FaStar },
    { value: '-released', label: 'Más recientes', icon: FaGamepad },
    { value: '-rating', label: 'Mayor puntuación', icon: FaChartLine },
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
    filters.rating !== '',
    filters.search !== ''
  ].filter(Boolean).length;

  if (loadingGenres) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Container>
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <Spinner size="xl" />
              <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
                Cargando géneros...
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

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
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 text-violet-600 dark:text-violet-400 px-6 py-3 rounded-full border border-violet-200 dark:border-violet-800 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaGamepad className="h-4 w-4" />
            <span className="font-semibold">Explora por categorías</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold font-outfit text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Géneros
            <motion.span 
              className="block bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              de Juegos
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre juegos increíbles organizados por género. 
            Desde acción trepidante hasta aventuras épicas, encuentra tu estilo perfecto.
          </motion.p>

          {/* Quick Stats */}
          {selectedGenre && totalCount > 0 && (
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm">
                <FaGamepad className="h-4 w-4 text-violet-500" />
                <span className="font-medium text-gray-900 dark:text-white">{totalCount.toLocaleString()}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">juegos de {selectedGenre.name}</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm">
                <FaChartLine className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Los mejores del género</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Popular Genres Grid with Background Images */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Géneros Populares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularGenres.map((genre, index) => (
              <motion.button
                key={genre.id}
                onClick={() => setSelectedGenre(genre)}
                className={`relative group overflow-hidden rounded-2xl h-48 transition-all duration-300 hover:scale-105 active:scale-95 ${
                  selectedGenre?.id === genre.id ? 'ring-4 ring-violet-500 ring-opacity-50' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${genre.bgImage})` }}
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-75 group-hover:opacity-60 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-center items-center text-white p-6">
                  <div className="text-4xl mb-3 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {genre.icon}
                  </div>
                  <div className="text-xl font-bold mb-2 text-center drop-shadow-lg">
                    {genre.name}
                  </div>
                  <div className="text-sm opacity-90 text-center">
                    {genre.description}
                  </div>
                </div>

                {/* Active Indicator */}
                {selectedGenre?.id === genre.id && (
                  <motion.div
                    className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaCheckCircle className="h-4 w-4 text-violet-500" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* All Genres List */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Todos los géneros:
          </h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedGenre?.id === genre.id
                    ? 'bg-violet-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        {selectedGenre && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={`Buscar en ${selectedGenre.name}...`}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleFilterChange('search', e.target.value);
                }}
                className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 shadow-lg"
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

            {/* Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              {/* Filter Toggle and Stats */}
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl hover:from-violet-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaFilter className="h-4 w-4" />
                  <span className="font-medium">Filtros</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-white text-violet-600 text-xs px-2 py-1 rounded-full font-bold">
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
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-6"
                >
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Platform Filter */}
                      <div>
                        <div className="flex items-center space-x-2 mb-4">
                          <FaDesktop className="h-5 w-5 text-violet-500" />
                          <h3 className="font-semibold text-gray-900 dark:text-white">Plataforma</h3>
                        </div>
                        {loadingOptions ? (
                          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                        ) : (
                          <select
                            value={filters.platform}
                            onChange={(e) => handleFilterChange('platform', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                          >
                            {platforms.map(platform => (
                              <option key={platform.id} value={platform.id}>
                                {platform.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                      {/* Rating Filter */}
                      <div>
                        <div className="flex items-center space-x-2 mb-4">
                          <FaStar className="h-5 w-5 text-violet-500" />
                          <h3 className="font-semibold text-gray-900 dark:text-white">Puntuación</h3>
                        </div>
                        <select
                          value={filters.rating}
                          onChange={(e) => handleFilterChange('rating', e.target.value)}
                          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
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
          </motion.div>
        )}

        {/* Selected Genre Games */}
        {selectedGenre && (
          <motion.div
            key={selectedGenre.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold font-outfit text-gray-900 dark:text-white mb-2">
                Juegos de {selectedGenre.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Los mejores títulos del género {selectedGenre.name}
              </p>
            </div>

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
                  loading={loading}
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
                    className="absolute inset-0 border-4 border-violet-500/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
                  Cargando juegos de {selectedGenre.name}...
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
                    Intenta ajustar los filtros o seleccionar otro género.
                  </p>

                  <Button onClick={resetFilters}>
                    Limpiar filtros
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default Genres;
