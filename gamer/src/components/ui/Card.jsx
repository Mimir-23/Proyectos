import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden';
  const hoverClasses = hover ? 'card-hover' : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;
  
  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
