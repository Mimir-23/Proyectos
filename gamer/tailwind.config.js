/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#825EE4',
        secondary: '#FFD700',
        dark: {
          bg: '#181818',
          text: '#FFFFFF',
        },
        light: {
          bg: '#FAFAFA',
          text: '#111111',
        }
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'scaleIn': 'scaleIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

