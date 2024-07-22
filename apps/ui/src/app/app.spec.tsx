import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { preloadedState as initialState } from '@hacker-news/ui-reducers';
import { reducer } from '@hacker-news/ui-reducers';
import { StyleWrapper } from '@hacker-news/ui-components';
import App from './app';

const mockStore = (preloadedState: typeof initialState) =>
  configureStore({
    reducer,
    preloadedState,
  });

const store = mockStore({
  latestNews: {
    data: [1, 2],
    loading: false,
    error: null,
  },
  news: {
    data: [
      {
        id: 1,
        title: 'Test News 1',
        score: 284,
        author: 'johndoe',
        time: 11111111,
        comments: 24,
        url: 'https://test.com',
        starred: false,
      },
      {
        id: 2,
        title: 'Test News 2',
        score: 284,
        author: 'johndoe',
        time: 11111111,
        comments: 24,
        url: 'https://test.com',
        starred: true,
      },
    ],
    loading: false,
    error: null,
    page: 1,
    pageSize: 10,
  },
});

describe('App', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <StyleWrapper>
            <App />
          </StyleWrapper>
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Test News 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test News 2/i)).toBeInTheDocument();
  });

  test('renders StarredPage for "/starred" route', () => {
    render(
      <MemoryRouter initialEntries={['/starred']}>
        <Provider store={store}>
          <StyleWrapper>
            <App />
          </StyleWrapper>
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Test News 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Test News 1/i)).not.toBeInTheDocument();
  });
});
