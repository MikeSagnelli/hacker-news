import { configureStore } from '@reduxjs/toolkit';
import type { Action, Reducer } from '@reduxjs/toolkit';

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
  [key: string]: Reducer<LatestNewsState | NewsState, Action<string>>;
} = {
  [newsReducerName]: newsSliceReducer as Reducer<
    LatestNewsState | NewsState,
    Action<string>
  >,
  [latestNewsReducerName]: latestNewsSliceReducer as Reducer<
    LatestNewsState | NewsState,
    Action<string>
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
