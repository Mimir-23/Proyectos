import { motion } from 'framer-motion';
import GameCard from './GameCard';
import Spinner from '../ui/Spinner';

const GameGrid = ({ games, loading, error, className = '' }) => {
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">
          ¡Oops! Algo salió mal
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {error}
        </p>
      </div>
    );
  }

  if (loading && (!games || games.length === 0)) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">
          No se encontraron juegos
        </div>
        <p className="text-gray-400 dark:text-gray-500">
          Intenta con diferentes criterios de búsqueda
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {games.map((game, index) => (
        <GameCard
          key={game.id}
          game={game}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default GameGrid;
