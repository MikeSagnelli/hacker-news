import { renderHook, act } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleStarred } from '@hacker-news/ui-reducers';
import { useStarredNews } from './useStarredNews';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('@hacker-news/ui-reducers', () => ({
  toggleStarred: jest.fn(),
}));

describe('useStarredNews', () => {
  const dispatchMock = jest.fn();
  const useSelectorMock = useSelector as unknown as jest.Mock;
  const useDispatchMock = useDispatch as unknown as jest.Mock;

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatchMock);
    useSelectorMock.mockClear();
    dispatchMock.mockClear();
  });

  it('should return starred news', () => {
    const mockNews = [
      { id: 1, title: 'News 1', starred: true },
      { id: 2, title: 'News 2', starred: false },
      { id: 3, title: 'News 3', starred: true },
    ];

    useSelectorMock.mockReturnValue(mockNews);

    const { result } = renderHook(() => useStarredNews());

    expect(result.current.starredNews).toEqual([
      { id: 1, title: 'News 1', starred: true },
      { id: 3, title: 'News 3', starred: true },
    ]);
  });

  it('should dispatch toggleStarred action when starNews is called', () => {
    useSelectorMock.mockReturnValue([]);

    const { result } = renderHook(() => useStarredNews());

    act(() => {
      result.current.starNews(1);
    });

    expect(dispatchMock).toHaveBeenCalledWith(toggleStarred(1));
  });
});
