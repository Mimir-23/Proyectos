export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getImageUrl = (url, size = 'medium') => {
  if (!url) return '/placeholder-game.jpg';
  
  // RAWG provides different image sizes
  const sizeMap = {
    small: '420',
    medium: '640',
    large: '1280',
  };
  
  return url.replace('media/', `media/resize/${sizeMap[size]}/-/`);
};

export const getRatingColor = (rating) => {
  if (rating >= 4.5) return 'text-green-500';
  if (rating >= 4.0) return 'text-yellow-500';
  if (rating >= 3.0) return 'text-orange-500';
  return 'text-red-500';
};

export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};
