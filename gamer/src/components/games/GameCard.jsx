import { motion } from 'framer-motion';
import { 
  FaStar, 
  FaCalendarAlt, 
  FaGamepad,
  FaHeart,
  FaPlus,
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaAndroid,
  FaLinux,
  FaSteam
} from 'react-icons/fa';
import { SiNintendoswitch, SiStadia, SiEpicgames } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { formatPlatforms, getPlatformIcon } from '../../utils/formatPlatforms';
import { formatDateShort } from '../../utils/formatDate';
import { getImageUrl, getRatingColor } from '../../utils/helpers';

const GameCard = ({ game, index = 0 }) => {
  if (!game) return null;

  const {
    id,
    name,
    background_image,
    rating,
    metacritic,
    platforms,
    released,
    genres,
  } = game;

  // Platform icon helper (same as GameDetails)
  const getPlatformIconComponent = (platformName) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/games/${id}`} className="block">
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600">
          {/* Image Container */}
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              src={getImageUrl(background_image)}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Top Actions */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <motion.button 
                className="p-2.5 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHeart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors duration-200" />
              </motion.button>
              <motion.button 
                className="p-2.5 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus className="w-4 h-4 text-gray-600 transition-colors duration-200" />
              </motion.button>
            </div>

            {/* Rating Badge */}
            {(rating || metacritic) && (
              <div className="absolute top-4 left-4">
                <div className="flex items-center bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white shadow-lg">
                  <FaStar className="w-3.5 h-3.5 text-yellow-400 mr-1.5" />
                  <span className="font-semibold text-sm">
                    {rating ? rating.toFixed(1) : (metacritic / 20).toFixed(1)}
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Content */}
          <div className="p-5">
            {/* Title */}
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-tight">
              {name}
            </h3>

            {/* Release Date */}
            {released && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
                Release date: {formatDateShort(released)}
              </p>
            )}

            {/* Platform Icons */}
            {platforms && platforms.length > 0 && (
              <div className="flex items-center space-x-2 mb-4">
                {platforms.slice(0, 5).map((platformData, idx) => {
                  const IconComponent = getPlatformIconComponent(platformData.platform.name);
                  const colorClass = getPlatformColor(platformData.platform.name);
                  
                  return (
                    <div 
                      key={idx} 
                      className={`p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm ${colorClass} hover:scale-110 transition-transform duration-200`}
                      title={platformData.platform.name}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                  );
                })}
                {platforms.length > 5 && (
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm text-gray-600 dark:text-gray-400">
                    <span className="text-xs font-semibold">+{platforms.length - 5}</span>
                  </div>
                )}
              </div>
            )}

            {/* Genres */}
            {genres && genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                  >
                    {genre.name}
                  </span>
                ))}
                {genres.length > 3 && (
                  <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium rounded-lg">
                    +{genres.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GameCard;
