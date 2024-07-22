/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import type { INews } from './newsReducer';
import newsSliceReducer, {
  fetchNews,
  newsReducerName,
  toggleStarred,
} from './newsReducer';
import { hackerNewsApi } from '@hacker-news/ui-utils';

jest.mock('@hacker-news/ui-utils', () => ({
  hackerNewsApi: {
    fetchNewsItem: jest.fn(),
  },
}));

describe('newsSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [newsReducerName]: newsSliceReducer,
      },
    });
  });

  it('should handle initial state', () => {
    expect((store.getState() as any)[newsReducerName]).toEqual({
      loading: false,
      error: null,
      data: [],
      page: 0,
      pageSize: 10,
    });
  });

  it('should handle fetchNews.pending', () => {
    store.dispatch(fetchNews.pending('', { newsIds: [] }));
    expect((store.getState() as any)[newsReducerName]).toEqual({
      loading: true,
      error: null,
      data: [],
      page: 0,
      pageSize: 10,
    });
  });

  it('should handle fetchNews.fulfilled', () => {
    const mockData: INews[] = [
      {
        id: 1,
        title: 'Test News',
        url: 'http://example.com',
        score: 100,
        author: 'author',
        time: 1234567890,
        comments: 10,
        starred: false,
      },
    ];
    store.dispatch(fetchNews.fulfilled(mockData, '', { newsIds: [1] }));
    expect((store.getState() as any)[newsReducerName]).toEqual({
      loading: false,
      error: null,
      data: mockData,
      page: 1,
      pageSize: 10,
    });
  });

  it('should handle fetchNews.rejected', () => {
    const mockError = new Error('Failed to fetch');
    store.dispatch(fetchNews.rejected(mockError, '', { newsIds: [1] }));
    expect((store.getState() as any)[newsReducerName]).toEqual({
      loading: false,
      error: mockError.message,
      data: [],
      page: 0,
      pageSize: 10,
    });
  });

  it('should fetch news items successfully', async () => {
    const mockData: INews = {
      id: 1,
      title: 'Test News',
      url: 'http://example.com',
      score: 100,
      author: 'author',
      time: 1234567890,
      comments: 10,
      starred: false,
    };
    (hackerNewsApi.fetchNewsItem as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Test News',
      url: 'http://example.com',
      score: 100,
      by: 'author',
      time: 1234567890,
      descendants: 10,
    });

    await store.dispatch(fetchNews({ newsIds: [1] }) as any);

    expect((store.getState() as any)[newsReducerName]).toEqual({
      loading: false,
      error: null,
      data: [mockData],
      page: 1,
      pageSize: 10,
    });
  });

  it('should handle fetch news items failure', async () => {
    const mockError = new Error('Failed to fetch');
    (hackerNewsApi.fetchNewsItem as jest.Mock).mockRejectedValue(mockError);

    await store.dispatch(fetchNews({ newsIds: [1] }) as any);

    expect((store.getState() as any)[newsReducerName]).toEqual({
      loading: false,
      error: mockError.message,
      data: [],
      page: 0,
      pageSize: 10,
    });
  });

  // New tests to cover edge cases
  it('should handle fetchNews with empty newsIds array', async () => {
    await store.dispatch(fetchNews({ newsIds: [] }) as any);

    expect((store.getState() as any)[newsReducerName]).toEqual({
      loading: false,
      error: null,
      data: [],
      page: 1,
      pageSize: 10,
    });
  });

  it('should handle fetchNews with invalid newsIds', async () => {
    const mockError = new Error('Failed to fetch');
    (hackerNewsApi.fetchNewsItem as jest.Mock).mockRejectedValue(mockError);

    await store.dispatch(fetchNews({ newsIds: [-1] }) as any);

    expect((store.getState() as any)[newsReducerName]).toEqual({
      loading: false,
      error: mockError.message,
      data: [],
      page: 0,
      pageSize: 10,
    });
  });

  it('should handle fetchNews with invalid newsIds', async () => {
    (hackerNewsApi.fetchNewsItem as jest.Mock).mockRejectedValue({});

    await store.dispatch(fetchNews({ newsIds: [-1] }) as any);

    expect((store.getState() as any)[newsReducerName]).toEqual({
      loading: false,
      error: 'Error fetching news',
      data: [],
      page: 0,
      pageSize: 10,
    });
  });

  it('should handle toggleStarred', () => {
    const initialState: INews[] = [
      {
        id: 1,
        title: 'Test News',
        url: 'http://example.com',
        score: 100,
        author: 'author',
        time: 1234567890,
        comments: 10,
        starred: false,
      },
    ];

    store.dispatch(fetchNews.fulfilled(initialState, '', { newsIds: [1] }));
    store.dispatch(toggleStarred(1));

    expect((store.getState() as any)[newsReducerName].data[0].starred).toBe(
      true
    );

    store.dispatch(toggleStarred(1));

    expect((store.getState() as any)[newsReducerName].data[0].starred).toBe(
      false
    );
  });

  it('should handle toggleStarred when id is not existent', () => {
    const initialState: INews[] = [
      {
        id: 2,
        title: 'Test News',
        url: 'http://example.com',
        score: 100,
        author: 'author',
        time: 1234567890,
        comments: 10,
        starred: false,
      },
    ];

    store.dispatch(fetchNews.fulfilled(initialState, '', { newsIds: [1] }));
    store.dispatch(toggleStarred(1));

    expect((store.getState() as any)[newsReducerName].data[0].starred).toBe(
      false
    );
  });
});
