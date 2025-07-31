import { motion } from 'framer-motion';
import { 
  FaStar, 
  FaCalendarAlt, 
  FaExternalLinkAlt,
  FaGamepad
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Card className="h-full overflow-hidden">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={getImageUrl(background_image)}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick Actions */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="ghost"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              asChild
            >
              <Link to={`/games/${id}`}>
                <FaExternalLinkAlt className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Rating Badge */}
          {(rating || metacritic) && (
            <div className="absolute top-4 left-4">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                <FaStar className="h-4 w-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">
                  {rating || (metacritic / 20).toFixed(1)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold font-outfit text-gray-900 dark:text-white mb-2 line-clamp-2">
              {name}
            </h3>
            
            {/* Genres */}
            {genres && genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {genres.slice(0, 2).map((genre) => (
                  <span
                    key={genre.id}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
                {genres.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                    +{genres.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Platforms & Release Date */}
          <div className="space-y-2 mb-4">
            {platforms && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FaGamepad className="h-4 w-4 mr-2" />
                <span className="truncate">{formatPlatforms(platforms)}</span>
              </div>
            )}
            
            {released && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FaCalendarAlt className="h-4 w-4 mr-2" />
                <span>{formatDateShort(released)}</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            asChild
          >
            <Link to={`/games/${id}`}>
              Ver Detalles
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default GameCard;
