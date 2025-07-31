import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import GameCard from './GameCard';
import Button from '../ui/Button';

const GameCarousel = ({ games, title, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1280) setItemsPerView(4);
      else if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay || !games || games.length <= itemsPerView) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = games.length - itemsPerView;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, games, itemsPerView, interval]);

  if (!games || games.length === 0) return null;

  const canGoNext = currentIndex < games.length - itemsPerView;
  const canGoPrev = currentIndex > 0;

  const goNext = () => {
    if (canGoNext) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (canGoPrev) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="relative">
      {/* Minimalist Header */}
      {title && (
        <motion.div 
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-6">
            <motion.h2 
              className="text-4xl font-bold font-outfit bg-gradient-to-r from-gray-900 via-primary to-secondary dark:from-white dark:via-primary dark:to-secondary bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h2>
            
            <motion.div
              className="px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20 backdrop-blur-sm"
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(130, 94, 228, 0)",
                  "0 0 0 8px rgba(130, 94, 228, 0.1)",
                  "0 0 0 0 rgba(130, 94, 228, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm font-medium text-primary">
                {games?.length || 0} juegos
              </span>
            </motion.div>
          </div>
          
          {/* Sleek Navigation */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={goPrev}
              disabled={!canGoPrev}
              className={`group relative p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                canGoPrev 
                  ? 'bg-white/10 border-white/20 text-gray-700 dark:text-white hover:bg-primary/20 hover:border-primary/40' 
                  : 'bg-gray-100/50 border-gray-200/50 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={canGoPrev ? { scale: 1.05, y: -2 } : {}}
              whileTap={canGoPrev ? { scale: 0.95 } : {}}
            >
              <FaChevronLeft className="h-5 w-5" />
              {canGoPrev && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
            
            <motion.button
              onClick={goNext}
              disabled={!canGoNext}
              className={`group relative p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                canGoNext 
                  ? 'bg-white/10 border-white/20 text-gray-700 dark:text-white hover:bg-primary/20 hover:border-primary/40' 
                  : 'bg-gray-100/50 border-gray-200/50 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={canGoNext ? { scale: 1.05, y: -2 } : {}}
              whileTap={canGoNext ? { scale: 0.95 } : {}}
            >
              <FaChevronRight className="h-5 w-5" />
              {canGoNext && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Modern Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute -top-6 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
            animate={{ 
              width: `${((currentIndex + itemsPerView) / games.length) * 100}%`,
              background: [
                "linear-gradient(90deg, #825EE4 0%, #FFD700 50%, #825EE4 100%)",
                "linear-gradient(90deg, #FFD700 0%, #825EE4 50%, #FFD700 100%)",
                "linear-gradient(90deg, #825EE4 0%, #FFD700 50%, #825EE4 100%)"
              ]
            }}
            transition={{ 
              width: { duration: 0.5, ease: "easeOut" },
              background: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </div>

        <motion.div
          className="flex py-8"
          animate={{
            x: `${-currentIndex * (100 / itemsPerView)}%`,
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 30,
            mass: 0.8,
          }}
        >
          {games.map((game, index) => {
            const isVisible = index >= currentIndex && index < currentIndex + itemsPerView;
            
            return (
              <motion.div
                key={game.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
                initial={{ opacity: 0.3, scale: 0.85, filter: 'blur(4px)' }}
                animate={{ 
                  opacity: isVisible ? 1 : 0.3,
                  scale: isVisible ? 1 : 0.85,
                  filter: isVisible ? 'blur(0px)' : 'blur(4px)',
                  y: isVisible ? 0 : 20
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.23, 1, 0.32, 1],
                  delay: isVisible ? (index - currentIndex) * 0.1 : 0
                }}
              >
                <GameCard game={game} index={index} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Elegant Dots Indicator */}
      {games.length > itemsPerView && (
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            {Array.from({ length: Math.ceil(games.length / itemsPerView) }).map((_, index) => {
              const isActive = Math.floor(currentIndex / itemsPerView) === index;
              return (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className="relative group"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <motion.div
                    className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    animate={isActive ? { 
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(130, 94, 228, 0.3)",
                        "0 0 0 8px rgba(130, 94, 228, 0.1)",
                        "0 0 0 0 rgba(130, 94, 228, 0.3)"
                      ]
                    } : { scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Active Progress Ring */}
                  {isActive && autoPlay && (
                    <svg className="absolute inset-0 w-3 h-3 -m-2" style={{ transform: 'scale(2)' }}>
                      <motion.circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="rgba(255, 215, 0, 0.6)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="63"
                        strokeDashoffset="63"
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ 
                          duration: interval / 1000, 
                          ease: "linear",
                          repeat: Infinity 
                        }}
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '12px 12px' }}
                      />
                    </svg>
                  )}
                </motion.button>
              );
            })}
            
            {/* Page Info */}
            <div className="ml-6 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <motion.span
                key={Math.floor(currentIndex / itemsPerView) + 1}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-bold text-primary"
              >
                {Math.floor(currentIndex / itemsPerView) + 1}
              </motion.span>
              <span>/</span>
              <span>{Math.ceil(games.length / itemsPerView)}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GameCarousel;
