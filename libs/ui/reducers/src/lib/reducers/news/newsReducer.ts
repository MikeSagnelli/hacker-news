import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hackerNewsApi } from '@hacker-news/ui-utils';

export const newsReducerName = 'news';

export const fetchNews = createAsyncThunk(
  `${newsReducerName}/fetchNews`,
  async ({ newsIds }: { newsIds: number[] }) => {
    const newsItems = await Promise.all(
      newsIds.map(async (id) => {
        const response = await hackerNewsApi.fetchNewsItem(id);
        return {
          id: response.id,
          title: response.title,
          url: response.url,
          score: response.score,
          author: response.by,
          time: response.time,
          comments: response.descendants,
          starred: false,
        };
      })
    );
    return newsItems;
  }
);

export interface INews {
  id: number;
  title: string;
  url: string;
  score: number;
  author: string;
  time: number;
  comments: number;
  starred: boolean;
}

export interface NewsState {
  data: INews[];
  page: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
}

export const newsInitialState = {
  data: [],
  page: 0,
  pageSize: 10,
  loading: false,
  error: null,
} satisfies NewsState as NewsState;

const newsSlice = createSlice({
  name: newsReducerName,
  initialState: newsInitialState,
  reducers: {
    toggleStarred: (state, action: PayloadAction<number>) => {
      const newsItem = state.data.find((item) => item.id === action.payload);
      if (newsItem) {
        newsItem.starred = !newsItem.starred;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload];
        state.page += 1;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching news';
      });
  },
});

export const { toggleStarred } = newsSlice.actions;
export const newsSliceReducer = newsSlice.reducer;

export default newsSliceReducer;
