import { useTheme } from '../context/ThemeContext';

export const useDarkMode = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return {
    isDark,
    toggleTheme,
  };
};
