import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaStar, 
  FaCalendarAlt, 
  FaExternalLinkAlt, 
  FaPlay, 
  FaChevronLeft, 
  FaChevronRight,
  FaGamepad,
  FaUsers,
  FaHeart,
  FaShare,
  FaDownload,
  FaEye,
  FaTrophy,
  FaExpand,
  FaTimes,
  FaDesktop,
  FaPlayCircle,
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaAndroid,
  FaLinux,
  FaSteam
} from 'react-icons/fa';
import { SiNintendoswitch, SiStadia, SiEpicgames } from 'react-icons/si';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import GameGrid from '../components/games/GameGrid';
import { rawgService } from '../services/rawgService';
import { formatDate } from '../utils/formatDate';
import { formatPlatforms } from '../utils/formatPlatforms';
import { getImageUrl, getRatingColor } from '../utils/helpers';
import { useFetchGames } from '../hooks/useFetchGames';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { games: similarGames } = useFetchGames('popular', { pageSize: 4 });

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const [gameData, screenshotsData] = await Promise.all([
          rawgService.getGameDetails(id),
          rawgService.getGameScreenshots(id)
        ]);

        setGame(gameData);
        setScreenshots(screenshotsData.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => 
      prev === screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => 
      prev === 0 ? screenshots.length - 1 : prev - 1
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you could save to localStorage or make an API call
  };

  const shareGame = async () => {
    if (navigator.share && game) {
      try {
        await navigator.share({
          title: game.name,
          text: `¡Mira este increíble juego: ${game.name}!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const getRatingText = (rating) => {
    if (rating >= 4.5) return 'Excepcional';
    if (rating >= 4) return 'Excelente';
    if (rating >= 3.5) return 'Muy bueno';
    if (rating >= 3) return 'Bueno';
    return 'Regular';
  };

  const getPlatformIcon = (platformName) => {
    const name = platformName.toLowerCase();
    
    if (name.includes('pc') || name.includes('windows')) return FaWindows;
    if (name.includes('playstation')) return FaPlaystation;
    if (name.includes('xbox')) return FaXbox;
    if (name.includes('nintendo') || name.includes('switch')) return SiNintendoswitch;
    if (name.includes('ios') || name.includes('iphone') || name.includes('ipad')) return FaApple;
    if (name.includes('android')) return FaAndroid;
    if (name.includes('linux')) return FaLinux;
    if (name.includes('stadia')) return SiStadia;
    if (name.includes('epic')) return SiEpicgames;
    if (name.includes('steam')) return FaSteam;
    
    return FaGamepad; // Default icon
  };

  const getPlatformColor = (platformName) => {
    const name = platformName.toLowerCase();
    
    if (name.includes('pc') || name.includes('windows')) return 'text-blue-500';
    if (name.includes('playstation')) return 'text-blue-600';
    if (name.includes('xbox')) return 'text-green-500';
    if (name.includes('nintendo') || name.includes('switch')) return 'text-red-500';
    if (name.includes('ios') || name.includes('iphone') || name.includes('ipad')) return 'text-gray-600';
    if (name.includes('android')) return 'text-green-600';
    if (name.includes('linux')) return 'text-orange-500';
    if (name.includes('stadia')) return 'text-orange-600';
    if (name.includes('epic')) return 'text-gray-800 dark:text-gray-200';
    if (name.includes('steam')) return 'text-blue-700';
    
    return 'text-gray-500'; // Default color
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Container>
          <div className="flex justify-center items-center min-h-[70vh]">
            <div className="text-center">
              <div className="relative">
                <Spinner size="xl" />
                <motion.div
                  className="absolute inset-0 border-4 border-primary/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium">
                Cargando detalles del juego...
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Container>
          <div className="text-center py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
                <FaGamepad className="h-10 w-10 text-red-500" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                ¡Oops! Algo salió mal
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {error || 'No se pudo cargar la información del juego. Por favor, intenta de nuevo más tarde.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.location.reload()}>
                  Intentar de nuevo
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">Volver al inicio</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {isImageExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageExpanded(false)}
          >
            <motion.div
              className="relative max-w-6xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageUrl(screenshots[currentScreenshot]?.image || game.background_image, 'original')}
                alt={game.name}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setIsImageExpanded(false)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Container>
        {/* Breadcrumb Navigation */}
        <motion.div
          className="pt-8 pb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link to="/popular" className="hover:text-primary transition-colors">
              Juegos
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate">
              {game.name}
            </span>
          </nav>
        </motion.div>

        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Button variant="ghost" asChild className="group">
            <Link to="/" className="flex items-center space-x-2">
              <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Volver</span>
            </Link>
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          className="grid grid-cols-1 xl:grid-cols-5 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Game Image/Screenshots - Takes 3 columns on XL screens */}
          <div className="xl:col-span-3 space-y-6">
            {/* Main Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden group shadow-2xl">
              <img
                src={getImageUrl(screenshots[currentScreenshot]?.image || game.background_image, 'large')}
                alt={game.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay with controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                  <button
                    onClick={() => setIsImageExpanded(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <FaExpand className="h-4 w-4" />
                    <span>Ver en pantalla completa</span>
                  </button>
                </div>
              </div>
              
              {/* Navigation arrows */}
              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevScreenshot}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all duration-200 hover:scale-110"
                  >
                    <FaChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextScreenshot}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all duration-200 hover:scale-110"
                  >
                    <FaChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Screenshot Thumbnails */}
            {screenshots.length > 1 && (
              <motion.div 
                className="flex space-x-3 overflow-x-auto pb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {screenshots.slice(0, 8).map((screenshot, index) => (
                  <motion.button
                    key={screenshot.id}
                    onClick={() => setCurrentScreenshot(index)}
                    className={`flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-3 transition-all duration-200 hover:scale-105 ${
                      index === currentScreenshot 
                        ? 'border-primary shadow-lg shadow-primary/25' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={getImageUrl(screenshot.image)}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Game Info Sidebar - Takes 2 columns on XL screens */}
          <div className="xl:col-span-2 space-y-6">
            {/* Game Title & Basic Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-3xl lg:text-4xl font-bold font-outfit text-gray-900 dark:text-white mb-4 leading-tight">
                  {game.name}
                </h1>

                {/* Genre Tags */}
                {game.genres && game.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {game.genres.slice(0, 4).map((genre) => (
                      <motion.span
                        key={genre.id}
                        className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {genre.name}
                      </motion.span>
                    ))}
                  </div>
                )}

                {/* Quick Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {game.rating && (
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="flex items-center justify-center mb-1">
                        <FaStar className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {game.rating}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {getRatingText(game.rating)}
                      </div>
                    </div>
                  )}

                  {game.metacritic && (
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold text-white mb-1 ${
                        game.metacritic >= 75 ? 'bg-green-500' :
                        game.metacritic >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                        {game.metacritic}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Metacritic</div>
                    </div>
                  )}

                  {game.ratings_count && (
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="flex items-center justify-center mb-1">
                        <FaUsers className="h-4 w-4 text-primary mr-1" />
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {(game.ratings_count / 1000).toFixed(1)}K
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Reseñas</div>
                    </div>
                  )}

                  {game.playtime && (
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {game.playtime}h
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Promedio</div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex space-x-3">
                    <button
                      onClick={toggleFavorite}
                      className={`flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                        isFavorite 
                          ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                      }`}
                    >
                      <FaHeart className="h-5 w-5" />
                    </button>
                    
                    <button
                      onClick={shareGame}
                      className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105"
                    >
                      <FaShare className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {game.website && (
                      <Button asChild>
                        <a href={game.website} target="_blank" rel="noopener noreferrer">
                          <FaExternalLinkAlt className="h-4 w-4 mr-2" />
                          Sitio Oficial
                        </a>
                      </Button>
                    )}
                    
                    <Button variant="outline" className="group">
                      <FaPlayCircle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                      Ver Tráiler
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Game Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Release Info */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FaCalendarAlt className="h-4 w-4 text-primary mr-2" />
                  Información de lanzamiento
                </h3>
                <div className="space-y-2 text-sm">
                  {game.released && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Fecha:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatDate(game.released)}
                      </span>
                    </div>
                  )}
                  {game.developers && game.developers.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Desarrollador:</span>
                      <span className="font-medium text-gray-900 dark:text-white text-right">
                        {game.developers[0].name}
                      </span>
                    </div>
                  )}
                  {game.publishers && game.publishers.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Editor:</span>
                      <span className="font-medium text-gray-900 dark:text-white text-right">
                        {game.publishers[0].name}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Platform Summary */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FaDesktop className="h-4 w-4 text-primary mr-2" />
                  Disponible en ({game.platforms?.length || 0})
                </h3>
                
                {game.platforms && (
                  <div className="grid grid-cols-4 gap-2">
                    {game.platforms.slice(0, 8).map((platformData) => {
                      const platform = platformData.platform;
                      const IconComponent = getPlatformIcon(platform.name);
                      const colorClass = getPlatformColor(platform.name);
                      
                      return (
                        <motion.div
                          key={platform.id}
                          className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          title={platform.name}
                        >
                          <IconComponent className={`h-5 w-5 ${colorClass} group-hover:scale-110 transition-transform duration-200`} />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-1 truncate w-full text-center">
                            {platform.name.length > 8 ? platform.name.substring(0, 6) + '...' : platform.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Game Overview Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Description - Takes 3 columns */}
          <div className="lg:col-span-3">
            {game.description_raw && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-fit">
                <h2 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white mb-6 flex items-center">
                  <FaEye className="h-6 w-6 text-primary mr-3" />
                  Acerca de este juego
                </h2>
                <div className="relative">
                  <p className={`text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap ${
                    !showFullDescription && game.description_raw.length > 600 
                      ? 'line-clamp-8' 
                      : ''
                  }`}>
                    {showFullDescription || game.description_raw.length <= 600 
                      ? game.description_raw 
                      : `${game.description_raw.substring(0, 600)}...`
                    }
                  </p>
                  
                  {game.description_raw.length > 600 && (
                    <motion.button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="mt-6 inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-all duration-200 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showFullDescription ? (
                        <>
                          <FaChevronLeft className="h-4 w-4 mr-2" />
                          Ver menos
                        </>
                      ) : (
                        <>
                          Ver descripción completa
                          <FaChevronRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Game Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaTrophy className="h-5 w-5 text-primary mr-2" />
                  Estadísticas
                </h3>
                <div className="space-y-4">
                  {game.added && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Añadido por</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {(game.added / 1000).toFixed(1)}K usuarios
                      </span>
                    </div>
                  )}
                  
                  {game.playtime && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Tiempo promedio</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {game.playtime} horas
                      </span>
                    </div>
                  )}

                  {game.updated && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Actualizado</span>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {formatDate(game.updated)}
                      </span>
                    </div>
                  )}

                  {game.esrb_rating && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Clasificación</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {game.esrb_rating.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* All Genres */}
              {game.genres && game.genres.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FaGamepad className="h-5 w-5 text-primary mr-2" />
                    Géneros
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.map((genre) => (
                      <motion.span
                        key={genre.id}
                        className="px-3 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-xl text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {genre.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Developer & Publisher Info */}
              {((game.developers && game.developers.length > 0) || (game.publishers && game.publishers.length > 0)) && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Desarrolladores y Editores
                  </h3>
                  <div className="space-y-4">
                    {game.developers && game.developers.length > 0 && (
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Desarrolladores</div>
                        <div className="space-y-1">
                          {game.developers.map((developer) => (
                            <div key={developer.id} className="text-gray-900 dark:text-white font-medium">
                              {developer.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {game.publishers && game.publishers.length > 0 && (
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Editores</div>
                        <div className="space-y-1">
                          {game.publishers.map((publisher) => (
                            <div key={publisher.id} className="text-gray-900 dark:text-white font-medium">
                              {publisher.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Detailed Platforms Section */}
        {game.platforms && game.platforms.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white mb-6 flex items-center">
                <FaDesktop className="h-6 w-6 text-primary mr-3" />
                Plataformas disponibles ({game.platforms.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {game.platforms.map((platformData) => {
                  const platform = platformData.platform;
                  const IconComponent = getPlatformIcon(platform.name);
                  const colorClass = getPlatformColor(platform.name);
                  
                  return (
                    <motion.div
                      key={platform.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
                      whileHover={{ scale: 1.02, x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${colorClass} group-hover:scale-110 transition-transform duration-200`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {platform.name}
                          </div>
                          {platformData.released_at && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Lanzado: {formatDate(platformData.released_at)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Platform requirements indicator */}
                      {(platformData.requirements_en || platformData.requirements_ru) && (
                        <div className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                          Requisitos
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Platform categories summary */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-3">
                  {[...new Set(game.platforms.map(p => {
                    const name = p.platform.name.toLowerCase();
                    if (name.includes('pc') || name.includes('windows') || name.includes('linux')) return 'PC';
                    if (name.includes('playstation')) return 'PlayStation';
                    if (name.includes('xbox')) return 'Xbox';
                    if (name.includes('nintendo') || name.includes('switch')) return 'Nintendo';
                    if (name.includes('ios') || name.includes('android')) return 'Móvil';
                    return 'Otros';
                  }))].map(category => (
                    <span 
                      key={category}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Similar Games */}
        {similarGames && similarGames.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="text-center mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-6 lg:px-8">
              <motion.h2 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-outfit text-gray-900 dark:text-white mb-2 sm:mb-3 lg:mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Juegos Recomendados
              </motion.h2>
              <motion.p
                className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 dark:text-gray-400 max-w-sm sm:max-w-md lg:max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Descubre otros juegos increíbles que podrían gustarte
              </motion.p>
            </div>
            
            <div className="px-2 sm:px-4 lg:px-0">
              <GameGrid
                games={similarGames}
                loading={false}
                className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              />
            </div>
          </motion.section>
        )}
      </Container>
    </div>
  );
};

export default GameDetails;
