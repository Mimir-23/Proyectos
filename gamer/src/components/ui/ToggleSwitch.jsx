import { motion } from 'framer-motion';

const ToggleSwitch = ({ checked, onChange, label, className = '' }) => {
  return (
    <label className={`flex items-center cursor-pointer ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <motion.div
          className={`block w-14 h-8 rounded-full ${
            checked ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
          }`}
          layout
        >
          <motion.div
            className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
            animate={{
              x: checked ? 24 : 0,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </motion.div>
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
};

export default ToggleSwitch;
