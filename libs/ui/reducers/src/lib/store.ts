import { configureStore } from '@reduxjs/toolkit';
import type { Reducer } from '@reduxjs/toolkit';

import type { LatestNewsState, NewsState } from './reducers';
import {
  latestNewsSliceReducer,
  latestNewsReducerName,
  latestNewsInitialState,
  newsReducerName,
  newsSliceReducer,
  newsInitialState,
} from './reducers';

export const reducer: {
  [key: string]: Reducer<LatestNewsState | NewsState, any>;
} = {
  [newsReducerName]: newsSliceReducer as Reducer<
    LatestNewsState | NewsState,
    any
  >,
  [latestNewsReducerName]: latestNewsSliceReducer as Reducer<
    LatestNewsState | NewsState,
    any
  >,
};

export const preloadedState: {
  [key: string]: LatestNewsState | NewsState;
} = {
  [newsReducerName]: newsInitialState,
  [latestNewsReducerName]: latestNewsInitialState,
};

export const store = configureStore({
  reducer,
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
