import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, 
  FaStar, 
  FaCalendarAlt, 
  FaExternalLinkAlt, 
  FaChartLine,
  FaSearch,
  FaGamepad,
  FaTh,
  FaArrowRight,
  FaUsers,
  FaClock,
  FaHeart
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import GameCarousel from '../components/games/GameCarousel';
import GameGrid from '../components/games/GameGrid';
import { useFetchGames } from '../hooks/useFetchGames';
import { formatDate } from '../utils/formatDate';
import { formatPlatforms } from '../utils/formatPlatforms';
import { getImageUrl } from '../utils/helpers';

const Home = () => {
  const { games: popularGames, loading: popularLoading } = useFetchGames('popular', { pageSize: 12 });
  const { games: newGames, loading: newLoading } = useFetchGames('new-releases', { pageSize: 8 });
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  
  // Get first 5 games for hero carousel
  const heroGames = popularGames?.slice(0, 5) || [];

  // Auto-advance carousel every 7 seconds
  useEffect(() => {
    if (heroGames.length > 1) {
      const interval = setInterval(() => {
        setCurrentHeroIndex(prev => (prev + 1) % heroGames.length);
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [heroGames.length]);

  const currentGame = heroGames[currentHeroIndex];

  return (
    <div className="space-y-16">
      {/* Hero Carousel Section */}
      {currentGame && (
        <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[85vh] flex items-center overflow-hidden">
          {/* Background Image with enhanced transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroIndex}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${getImageUrl(currentGame.background_image, 'large')})`,
              }}
              initial={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
              transition={{ 
                duration: 1.5, 
                ease: [0.25, 0.1, 0.25, 1],
                filter: { duration: 0.8 }
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 sm:from-black/80 sm:via-black/50 sm:to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              
              {/* Floating particles effect - Hidden on mobile for performance */}
              <div className="absolute inset-0 overflow-hidden hidden sm:block">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`${currentHeroIndex}-${i}`}
                    className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/20 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, -50, -100],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroIndex}
                className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-white"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="flex items-center space-x-1 sm:space-x-2 mb-3 sm:mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <FaChartLine className="h-4 w-4 sm:h-5 md:h-6 lg:w-6 text-secondary flex-shrink-0" />
                  <span className="text-secondary font-medium text-xs sm:text-sm md:text-base">
                    Juego Destacado #{currentHeroIndex + 1}
                  </span>
                </motion.div>

                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-outfit mb-4 sm:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {currentGame.name}
                </motion.h1>

                <motion.div
                  className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {currentGame.rating && (
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <FaStar className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-yellow-400 flex-shrink-0" />
                      <span className="font-medium">{currentGame.rating}</span>
                    </div>
                  )}

                  {currentGame.released && (
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <FaCalendarAlt className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                      <span className="truncate">{formatDate(currentGame.released)}</span>
                    </div>
                  )}
                </motion.div>

                {currentGame.platforms && (
                  <motion.div
                    className="mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <span className="text-gray-300 text-sm sm:text-base mr-2">Plataformas:</span>
                    <span className="text-white text-sm sm:text-base break-words">
                      {formatPlatforms(currentGame.platforms)}
                    </span>
                  </motion.div>
                )}

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  <Button size="sm" className="sm:hidden" asChild>
                    <Link to={`/games/${currentGame.id}`}>
                      <FaExternalLinkAlt className="h-4 w-4 mr-2" />
                      Ver Detalles
                    </Link>
                  </Button>
                  
                  <Button size="lg" className="hidden sm:inline-flex" asChild>
                    <Link to={`/games/${currentGame.id}`}>
                      <FaExternalLinkAlt className="h-5 w-5 mr-2" />
                      Ver Detalles
                    </Link>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="sm:hidden">
                    <FaPlay className="h-4 w-4 mr-2" />
                    Tráiler
                  </Button>
                  
                  <Button variant="outline" size="lg" className="hidden sm:inline-flex">
                    <FaPlay className="h-5 w-5 mr-2" />
                    Ver Tráiler
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </Container>
        </section>
      )}

      {/* Popular Games Carousel */}
      <section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-outfit text-gray-900 dark:text-white mb-4">
                🔥 Juegos Populares
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Los juegos más populares y mejor valorados del momento
              </p>
            </div>

            <GameCarousel
              games={popularGames?.slice(5, 13)}
              loading={popularLoading}
            />

            <div className="text-center mt-8">
              <Button variant="outline" size="lg" asChild>
                <Link to="/popular">
                  Ver Todos los Populares
                </Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* New Releases Grid */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-outfit text-gray-900 dark:text-white mb-4">
                ✨ Lanzamientos Recientes
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Descubre los juegos que acaban de llegar al mercado
              </p>
            </div>

            <GameGrid
              games={newGames}
              loading={newLoading}
              className="mb-8"
            />

            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/new-releases">
                  Ver Todos los Lanzamientos
                </Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Minimalist CTA Section */}
      <section className="py-24">
        <Container>
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FaGamepad className="h-4 w-4" />
              <span>Encuentra tu próximo juego favorito</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Explora el mundo de los
              <motion.span 
                className="block text-primary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                videojuegos
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Descubre, explora y encuentra información detallada sobre miles de juegos. 
              Tu próxima aventura te está esperando.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  to="/genres"
                  className="group inline-flex items-center justify-center space-x-3 bg-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary/90"
                >
                  <FaTh className="h-5 w-5" />
                  <span>Explorar Géneros</span>
                  <motion.div
                    className="overflow-hidden"
                    initial={{ width: 0 }}
                    whileHover={{ width: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaArrowRight className="h-4 w-4 ml-1" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  to="/search"
                  className="group inline-flex items-center justify-center space-x-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <FaSearch className="h-5 w-5" />
                  <span>Buscar Juegos</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { 
                  icon: FaGamepad, 
                  number: "10,000+", 
                  label: "Juegos",
                  color: "text-blue-500" 
                },
                { 
                  icon: FaUsers, 
                  number: "50,000+", 
                  label: "Reseñas",
                  color: "text-green-500" 
                },
                { 
                  icon: FaTh, 
                  number: "100+", 
                  label: "Géneros",
                  color: "text-purple-500" 
                },
                { 
                  icon: FaClock, 
                  number: "24/7", 
                  label: "Disponible",
                  color: "text-orange-500" 
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="group text-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-300 cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional CTA */}

          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
