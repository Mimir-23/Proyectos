export const formatPlatforms = (platforms) => {
  if (!platforms || platforms.length === 0) return 'Multiplataforma';
  
  const platformNames = platforms.map(platform => platform.platform.name);
  
  if (platformNames.length <= 3) {
    return platformNames.join(', ');
  }
  
  return `${platformNames.slice(0, 3).join(', ')} +${platformNames.length - 3} más`;
};

export const getPlatformIcon = (platformName) => {
  const platform = platformName.toLowerCase();
  
  if (platform.includes('pc') || platform.includes('windows')) return '🖥️';
  if (platform.includes('playstation') || platform.includes('ps')) return '🎮';
  if (platform.includes('xbox')) return '🎮';
  if (platform.includes('nintendo') || platform.includes('switch')) return '🎮';
  if (platform.includes('ios') || platform.includes('android')) return '📱';
  
  return '🎮';
};
