import { formatNumber, timeAgo, getDomainFromUrl } from './string';

describe('string', () => {
  describe('timeAgo', () => {
    const now = Math.floor(Date.now() / 1000);

    it('should return seconds ago', () => {
      const unixTime = now - 30;
      expect(timeAgo(unixTime)).toBe('30 seconds ago');
    });

    it('should return minutes ago', () => {
      const unixTime = now - 300;
      expect(timeAgo(unixTime)).toBe('5 minutes ago');
    });

    it('should return hours ago', () => {
      const unixTime = now - 7200;
      expect(timeAgo(unixTime)).toBe('2 hours ago');
    });

    it('should return days ago', () => {
      const unixTime = now - 172800;
      expect(timeAgo(unixTime)).toBe('2 days ago');
    });

    it('should return weeks ago', () => {
      const unixTime = now - 1209600;
      expect(timeAgo(unixTime)).toBe('2 weeks ago');
    });

    it('should return months ago', () => {
      const unixTime = now - 5184000;
      expect(timeAgo(unixTime)).toBe('2 months ago');
    });

    it('should return years ago', () => {
      const unixTime = now - 63072000;
      expect(timeAgo(unixTime)).toBe('2 years ago');
    });

    // Additional tests for edge cases
    it('should return 1 second ago', () => {
      const unixTime = now - 1;
      expect(timeAgo(unixTime)).toBe('1 second ago');
    });

    it('should return 1 minute ago', () => {
      const unixTime = now - 60;
      expect(timeAgo(unixTime)).toBe('1 minute ago');
    });

    it('should return 1 hour ago', () => {
      const unixTime = now - 3600;
      expect(timeAgo(unixTime)).toBe('1 hour ago');
    });

    it('should return 1 day ago', () => {
      const unixTime = now - 86400;
      expect(timeAgo(unixTime)).toBe('1 day ago');
    });

    it('should return 1 week ago', () => {
      const unixTime = now - 604800;
      expect(timeAgo(unixTime)).toBe('1 week ago');
    });

    it('should return 1 month ago', () => {
      const unixTime = now - 2592000;
      expect(timeAgo(unixTime)).toBe('1 month ago');
    });

    it('should return 1 year ago', () => {
      const unixTime = now - 31536000;
      expect(timeAgo(unixTime)).toBe('1 year ago');
    });
  });

  describe('getDomainFromUrl', () => {
    it('should return the domain from a valid URL', () => {
      const url = 'https://www.example.com/path';
      const domain = getDomainFromUrl(url);
      expect(domain).toBe('www.example.com');
    });

    it('should log an error for an invalid URL', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .mockImplementation(() => {});
      const url = 'invalid-url';
      getDomainFromUrl(url);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid URL:',
        new TypeError('Invalid URL: invalid-url')
      );
      consoleSpy.mockRestore();
    });
  });

  describe('formatNumber', () => {
    it('should format the number with commas', () => {
      const num = 1234567;
      const formattedNumber = formatNumber(num);
      expect(formattedNumber).toBe('1,234,567');
    });

    it('should format the number with commas for a large number', () => {
      const num = 9876543210;
      const formattedNumber = formatNumber(num);
      expect(formattedNumber).toBe('9,876,543,210');
    });

    it('should format the number with commas for a small number', () => {
      const num = 123;
      const formattedNumber = formatNumber(num);
      expect(formattedNumber).toBe('123');
    });
  });
});
