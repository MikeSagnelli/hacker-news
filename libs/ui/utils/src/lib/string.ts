export const timeAgo = (unixTime: number): string => {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const diffInSeconds = now - unixTime;

  const seconds = diffInSeconds;
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const weeks = Math.floor(diffInSeconds / 604800);
  const months = Math.floor(diffInSeconds / 2592000);
  const years = Math.floor(diffInSeconds / 31536000);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
};

export const getDomainFromUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch (error) {
    console.error('Invalid URL:', error);
    return '';
  }
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};
