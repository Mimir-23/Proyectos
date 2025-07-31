import { motion } from 'framer-motion';

const Container = ({ children, className = '', maxWidth = 'max-w-7xl' }) => {
  return (
    <motion.div
      className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidth} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default Container;
