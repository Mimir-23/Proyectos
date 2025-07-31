import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiMenu, 
  HiX, 
  HiSearch, 
  HiSun, 
  HiMoon 
} from 'react-icons/hi';
import { IoGameController } from 'react-icons/io5';
import { useDarkMode } from '../../hooks/useDarkMode';
import Container from './Container';
import ToggleSwitch from '../ui/ToggleSwitch';
import logo from '../../assets/logoup.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useDarkMode();
  const location = useLocation();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Juegos Populares', href: '/popular' },
    { name: 'Lanzamientos Recientes', href: '/new-releases' },
    { name: 'Géneros', href: '/genres' },
    { name: 'Buscar', href: '/search' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-sm dark:shadow-gray-900/20"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Container>
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Upnext Logo" 
                  className={`h-16 w-16 object-contain group-hover:scale-110 transition-all duration-300 ${
                    isDark 
                      ? '' 
                      : 'brightness-0 saturate-100 contrast-150 hue-rotate-0'
                  }`}
                  style={
                    !isDark 
                      ? {
                          filter: 'brightness(0.2) saturate(2) contrast(2) hue-rotate(0deg)',
                          mixBlendMode: 'normal'
                        }
                      : {}
                  }
                />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={`relative px-3 py-2 font-medium text-sm transition-all duration-300 rounded-lg group ${
                    isActive(item.href)
                      ? 'text-white bg-primary shadow-lg shadow-primary/25'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                  {/* Active indicator */}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-lg -z-10"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Theme Toggle & Mobile Menu */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Theme Toggle */}
            <div className="relative">
              <ToggleSwitch
                checked={isDark}
                onChange={toggleTheme}
                className="hidden sm:flex transform hover:scale-105 transition-transform duration-200"
              />
            </div>
            
            <motion.button
              onClick={toggleTheme}
              className="sm:hidden p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md group"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {isDark ? (
                  <HiSun className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-200" />
                ) : (
                  <HiMoon className="h-5 w-5 text-gray-600 group-hover:text-gray-700 transition-colors duration-200" />
                )}
              </motion.div>
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <HiX className="h-6 w-6 text-gray-600 dark:text-gray-300 transition-colors duration-200" />
                ) : (
                  <HiMenu className="h-6 w-6 text-gray-600 dark:text-gray-300 transition-colors duration-200" />
                )}
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              className="md:hidden overflow-hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="py-6 px-2">
                <div className="flex flex-col space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          isActive(item.href)
                            ? 'text-white bg-primary shadow-lg shadow-primary/25 transform scale-105'
                            : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 hover:transform hover:scale-105'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.nav>
  );
};

export default Navbar;
