import { configureStore } from '@reduxjs/toolkit';
import {
  latestNewsSliceReducer,
  latestNewsReducerName,
  latestNewsInitialState,
  newsReducerName,
  newsSliceReducer,
  newsInitialState,
} from './reducers';

export const reducer = {
  [newsReducerName]: newsSliceReducer,
  [latestNewsReducerName]: latestNewsSliceReducer,
};

export const preloadedState = {
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
