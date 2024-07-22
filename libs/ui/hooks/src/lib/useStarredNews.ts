import { useSelector, useDispatch } from 'react-redux';

import type {
  RootState,
  AppDispatch,
  INews,
  NewsState,
} from '@hacker-news/ui-reducers';
import { toggleStarred } from '@hacker-news/ui-reducers';

interface IUseStarredNews {
  starredNews: INews[];
  starNews: (newsId: number) => void;
}

export const useStarredNews = (): IUseStarredNews => {
  const dispatch = useDispatch<AppDispatch>();
  const starredNews = useSelector(
    (state: RootState) => (state.news as NewsState).data
  ).filter((news) => news.starred);

  const starNews = (newsId: number) => {
    dispatch(toggleStarred(newsId));
  };

  return {
    starredNews,
    starNews,
  };
};

export default useStarredNews;
