import { hackerNewsApi } from './api';

describe('hackerNewsApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchLatestNews', () => {
    it('should fetch and return latest news', async () => {
      const mockResponse = [1, 2, 3];
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await hackerNewsApi.fetchLatestNews();
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://hacker-news.firebaseio.com/v0/newstories.json'
      );
    });

    it('should return null and log error on fetch failure', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .mockImplementation(() => {});
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

      const result = await hackerNewsApi.fetchLatestNews();
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching latest news',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('fetchNewsItem', () => {
    it('should fetch and return news item by id', async () => {
      const mockResponse = { id: 1, title: 'Test News' };
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await hackerNewsApi.fetchNewsItem(1);
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://hacker-news.firebaseio.com/v0/item/1.json'
      );
    });

    it('should return null and log error on fetch failure', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .mockImplementation(() => {});
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

      const result = await hackerNewsApi.fetchNewsItem(1);
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching news item with id: 1',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
});
