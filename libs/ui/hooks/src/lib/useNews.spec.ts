import { renderHook, act } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLatestNews, fetchNews } from '@hacker-news/ui-reducers';
import { useNews } from './useNews';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('@hacker-news/ui-reducers', () => ({
  fetchLatestNews: jest.fn(),
  fetchNews: jest.fn(),
}));

describe('useNews', () => {
  const dispatchMock = jest.fn();
  const useSelectorMock = useSelector as unknown as jest.Mock;
  const useDispatchMock = useDispatch as unknown as jest.Mock;

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatchMock);
    useSelectorMock.mockClear();
    dispatchMock.mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch latest news on mount if not already fetched', () => {
    useSelectorMock
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: [],
      })
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: [],
        page: 0,
        pageSize: 10,
      });

    renderHook(() => useNews());

    expect(dispatchMock).toHaveBeenCalledWith(fetchLatestNews());
  });

  it('should not fetch latest news on mount if already fetched', () => {
    useSelectorMock
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: [{ id: 1 }],
      })
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: [],
        page: 0,
        pageSize: 10,
      });

    renderHook(() => useNews());

    expect(dispatchMock).not.toHaveBeenCalledWith(fetchLatestNews);
  });

  it('should fetch more news when getMoreNews is called', () => {
    useSelectorMock
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: [{ id: 1 }],
      })
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: [],
        page: 0,
        pageSize: 10,
      });

    const { result } = renderHook(() => useNews());

    act(() => {
      result.current.getMoreNews();
    });

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchNews({
        newsIds: [],
      })
    );
  });

  it('should return the correct state', () => {
    useSelectorMock
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: [{ id: 1 }],
      })
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: [{ id: 2 }],
        page: 0,
        pageSize: 10,
      });

    const { result } = renderHook(() => useNews());

    expect(result.current.newsLoading).toBe(false);
    expect(result.current.newsError).toBe(null);
    expect(result.current.newsData).toEqual([{ id: 2 }]);
  });
});
