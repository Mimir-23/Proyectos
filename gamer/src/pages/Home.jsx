import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
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
  FaHeart,
  FaRobot,
  FaTrophy,
  FaCrown,
  FaAward,
  FaMedal
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
                  <Link 
                    to={`/games/${currentGame.id}`}
                    className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-white hover:bg-purple-600 focus:ring-primary px-4 py-2 text-sm sm:hidden"
                  >
                    <FaExternalLinkAlt className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </Link>
                  
                  <Link 
                    to={`/games/${currentGame.id}`}
                    className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-white hover:bg-purple-600 focus:ring-primary px-8 py-4 text-lg hidden sm:inline-flex"
                  >
                    <FaExternalLinkAlt className="h-5 w-5 mr-2" />
                    Ver Detalles
                  </Link>
                  
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
              <Link 
                to="/popular"
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black px-8 py-4 text-lg"
              >
                Ver Todos los Populares
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Robot Mascot Section */}
      <section className="py-16">
        <Container>
          <motion.div
            className="grid lg:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <FaRobot className="h-3 w-3" />
                  <span>Te presentamos a</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold font-outfit text-gray-900 dark:text-white mb-4">
                  ¡Hola! Soy
                  <span className="text-primary"> GameBot</span>
                </h2>
                
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  La mascota oficial de este sitio. Me encanta ayudar a los gamers a 
                  descubrir nuevos juegos, explorar géneros increíbles y encontrar 
                  experiencias gaming únicas. ¡Vamos a explorar juntos!
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <FaSearch className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">Búsqueda</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Encuentra juegos específicos
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <FaStar className="h-4 w-4 text-green-500" />
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">Recomendaciones</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Descubre nuevos favoritos
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <FaTh className="h-4 w-4 text-blue-500" />
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">Géneros</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Explora por categorías
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <FaGamepad className="h-4 w-4 text-purple-500" />
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">Detalles</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Información completa
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link 
                  to="/search"
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-white hover:bg-purple-600 focus:ring-primary px-6 py-3 text-base group"
                >
                  <FaSearch className="h-4 w-4 mr-2" />
                  Buscar Juegos
                </Link>
                
                <Link 
                  to="/genres"
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black px-6 py-3 text-base"
                >
                  <FaTh className="h-4 w-4 mr-2" />
                  Ver Géneros
                </Link>
              </motion.div>
            </div>

            {/* Robot 3D Model */}
            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-[320px] md:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                {/* Spline 3D Robot */}
                <div className="relative z-10 w-full h-full">
                  <Spline
                    scene="https://prod.spline.design/4vwjJtEiQB6zylxC/scene.splinecode"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>

                {/* Subtle interaction hint */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <FaRobot className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900 dark:text-white">
                        ¡Hola! Soy GameBot
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Haz clic para interactuar conmigo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
              <Link 
                to="/new-releases"
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black px-8 py-4 text-lg"
              >
                Ver Todos los Lanzamientos
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* GOTY Section - Game of the Year Awards */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-900/10 dark:via-yellow-900/10 dark:to-orange-900/10">
        <Container>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FaTrophy className="h-4 w-4" />
              <span>Premios Game of the Year</span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Los <span className="text-amber-600 dark:text-amber-400">GOTY</span> de los últimos 
              <span className="text-amber-600 dark:text-amber-400"> 5 años</span>
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Los juegos que han marcado historia y se han alzado con el prestigioso premio al Juego del Año
            </motion.p>
          </motion.div>

          {/* GOTY Timeline */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { 
                year: "2023",
                title: "Baldur's Gate 3",
                genre: "RPG",
                description: "La obra maestra de los RPG modernos",
                icon: FaCrown,
                bgColor: "bg-purple-50 dark:bg-purple-900/20",
                textColor: "text-purple-600 dark:text-purple-400",
                gameId: "324997",
                image: "https://media.rawg.io/media/games/699/69907ecf13f172e9e144069769c3be73.jpg"
              },
              { 
                year: "2022",
                title: "Elden Ring",
                genre: "Action RPG",
                description: "FromSoftware redefine el género",
                icon: FaTrophy,
                bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
                textColor: "text-yellow-600 dark:text-yellow-400",
                gameId: "612020",
                image: "https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e348.jpg"
              },
              { 
                year: "2021",
                title: "It Takes Two",
                genre: "Co-op",
                description: "Cooperación llevada a la perfección",
                icon: FaAward,
                bgColor: "bg-pink-50 dark:bg-pink-900/20",
                textColor: "text-pink-600 dark:text-pink-400",
                gameId: "455597",
                image: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2021/02/It-Takes-Two-Trailer.jpg"
              },
              { 
                year: "2020",
                title: "The Last of Us Part II",
                genre: "Action",
                description: "Narrativa cinematográfica excepcional",
                icon: FaMedal,
                bgColor: "bg-green-50 dark:bg-green-900/20",
                textColor: "text-green-600 dark:text-green-400",
                gameId: "51325",
                image: "https://media.rawg.io/media/games/909/909974d1c7863c2027241e265fe7011f.jpg"
              },
              { 
                year: "2019",
                title: "Sekiro: Shadows Die Twice",
                genre: "Action",
                description: "La obra maestra ninja de FromSoftware",
                icon: FaStar,
                bgColor: "bg-red-50 dark:bg-red-900/20",
                textColor: "text-red-600 dark:text-red-400",
                gameId: "50734",
                image: "https://media.rawg.io/media/games/67f/67f62d1f062a6164f57575e0604ee9f6.jpg"
              }
            ].map((goty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -6 }}
                className="group cursor-pointer"
              >
                <Link 
                  to={`/games/${goty.gameId}`}
                  className={`group block rounded-2xl ${goty.bgColor} border-2 border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
                >
                  {/* Game Image Background */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img 
                      src={goty.image}
                      alt={goty.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Award Badge on Image */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2 bg-amber-500 text-white px-3 py-1 rounded-full">
                      <goty.icon className="h-4 w-4" />
                      <span className="text-sm font-bold">{goty.year}</span>
                    </div>
                    
                    {/* GOTY Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-3 py-1 rounded-full">
                      <span className="text-xs font-bold">GOTY</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    {/* Game Info */}
                    <div>
                      <h3 className={`text-xl font-bold ${goty.textColor} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                        {goty.title}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-white/80 dark:bg-gray-800/80 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 mb-3">
                        {goty.genre}
                      </span>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {goty.description}
                      </p>
                    </div>
                    
                    {/* Hover indicator */}
                    <div className={`inline-flex items-center space-x-2 ${goty.textColor} text-sm font-medium opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300`}>
                      <span>Ver detalles</span>
                      <FaArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                  
                  {/* Background shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
              Descubre por qué estos juegos han marcado la historia del gaming
            </p>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
