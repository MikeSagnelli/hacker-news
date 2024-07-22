import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hackerNewsApi } from '@hacker-news/ui-utils';

export const latestNewsReducerName = 'latestNews';

export const fetchLatestNews = createAsyncThunk(
  `${latestNewsReducerName}/fetchLatestNews`,
  async () => {
    const response = await hackerNewsApi.fetchLatestNews();
    return response;
  }
);

interface LatestNewsState {
  data: number[];
  loading: boolean;
  error: string | null;
}

export const latestNewsInitialState = {
  data: [],
  loading: false,
  error: null,
} satisfies LatestNewsState as LatestNewsState;

const latestNewsSlice = createSlice({
  name: latestNewsReducerName,
  initialState: latestNewsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLatestNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching latest news';
      });
  },
});

export const latestNewsSliceReducer = latestNewsSlice.reducer;

export default latestNewsSliceReducer;
