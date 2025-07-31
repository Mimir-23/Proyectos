import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ behavior = 'auto', delay = 0 } = {}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to allow page to load before scrolling
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: behavior
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [pathname, behavior, delay]);

  return null;
};

export default ScrollToTop;
