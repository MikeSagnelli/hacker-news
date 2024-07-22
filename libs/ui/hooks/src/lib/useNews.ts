import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import type {
  RootState,
  AppDispatch,
  INews,
  NewsState,
  LatestNewsState,
} from '@hacker-news/ui-reducers';
import { fetchLatestNews, fetchNews } from '@hacker-news/ui-reducers';

interface IUseNews {
  newsLoading: boolean;
  newsError: string | null;
  newsData: INews[];
  getMoreNews: () => void;
}

export const useNews = (): IUseNews => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading: latestLoading,
    error: latestError,
    data: latestData,
  } = useSelector((state: RootState) => state.latestNews as LatestNewsState);
  const {
    loading: newsLoading,
    error: newsError,
    data: newsData,
    page: newsPage,
    pageSize: newsPageSize,
  } = useSelector((state: RootState) => state.news as NewsState);
  const newsIds = latestData.slice(
    newsPage * newsPageSize,
    (newsPage + 1) * newsPageSize
  );

  const hasFetchedLatestNews = useRef(false);

  useEffect(() => {
    if (latestData.length && !latestLoading && !latestError) {
      hasFetchedLatestNews.current = true;
    }

    if (!hasFetchedLatestNews.current) {
      dispatch(fetchLatestNews());
      hasFetchedLatestNews.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (newsData.length && !newsLoading && !newsError) {
      return;
    }

    if (!latestLoading && !latestError && latestData.length) {
      dispatch(fetchNews({ newsIds }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestLoading, latestData, latestError, dispatch]);

  const getMoreNews = () => {
    dispatch(fetchNews({ newsIds }));
  };

  return {
    newsLoading,
    newsError,
    newsData,
    getMoreNews,
  };
};

export default useNews;
