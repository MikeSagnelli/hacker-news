/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import latestNewsSliceReducer, {
  fetchLatestNews,
  latestNewsInitialState,
} from './latestNewsReducer';
import { hackerNewsApi } from '@hacker-news/ui-utils';

jest.mock('@hacker-news/ui-utils', () => ({
  hackerNewsApi: {
    fetchLatestNews: jest.fn(),
  },
}));

describe('latestNewsSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        latestNews: latestNewsSliceReducer,
      },
    });
  });

  it('should handle initial state', () => {
    expect(
      (store.getState() as { latestNews: typeof latestNewsInitialState })
        .latestNews
    ).toEqual(latestNewsInitialState);
  });

  it('should handle fetchLatestNews.pending', () => {
    store.dispatch(fetchLatestNews.pending('', undefined));
    expect(
      (store.getState() as { latestNews: typeof latestNewsInitialState })
        .latestNews
    ).toEqual({
      ...latestNewsInitialState,
      loading: true,
    });
  });

  it('should handle fetchLatestNews.fulfilled', () => {
    const mockData = [1, 2, 3];
    store.dispatch(fetchLatestNews.fulfilled(mockData, '', undefined));
    expect(
      (store.getState() as { latestNews: typeof latestNewsInitialState })
        .latestNews
    ).toEqual({
      ...latestNewsInitialState,
      loading: false,
      data: mockData,
    });
  });

  it('should handle fetchLatestNews.rejected', () => {
    const mockError = new Error('Failed to fetch');
    store.dispatch(fetchLatestNews.rejected(mockError, '', undefined));
    expect(
      (store.getState() as { latestNews: typeof latestNewsInitialState })
        .latestNews
    ).toEqual({
      ...latestNewsInitialState,
      loading: false,
      error: mockError.message,
    });
  });

  it('should fetch latest news successfully', async () => {
    const mockData = [1, 2, 3];
    (hackerNewsApi.fetchLatestNews as jest.Mock).mockResolvedValue(mockData);

    await store.dispatch(fetchLatestNews() as any);

    expect(
      (store.getState() as { latestNews: typeof latestNewsInitialState })
        .latestNews
    ).toEqual({
      ...latestNewsInitialState,
      loading: false,
      data: mockData,
    });
  });

  it('should handle fetch latest news failure', async () => {
    const mockError = new Error('Failed to fetch');
    (hackerNewsApi.fetchLatestNews as jest.Mock).mockRejectedValue(mockError);

    await store.dispatch(fetchLatestNews() as any);

    expect(
      (store.getState() as { latestNews: typeof latestNewsInitialState })
        .latestNews
    ).toEqual({
      ...latestNewsInitialState,
      loading: false,
      error: mockError.message,
    });
  });

  it('should handle fetch latest news failure without Error object', async () => {
    (hackerNewsApi.fetchLatestNews as jest.Mock).mockRejectedValue({});

    await store.dispatch(fetchLatestNews() as any);

    expect(
      (store.getState() as { latestNews: typeof latestNewsInitialState })
        .latestNews
    ).toEqual({
      ...latestNewsInitialState,
      loading: false,
      error: 'Error fetching latest news',
    });
  });
});
