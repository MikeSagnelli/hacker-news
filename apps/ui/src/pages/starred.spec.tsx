import { render, screen } from '@testing-library/react';
import { StarredPage } from './starred';
import { StyleWrapper } from '@hacker-news/ui-components';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import type { preloadedState as initialState } from '@hacker-news/ui-reducers';
import { reducer } from '@hacker-news/ui-reducers';

const mockStore = (preloadedState: typeof initialState) =>
  configureStore({
    reducer,
    preloadedState,
  });

describe('Starred Page', () => {
  test('renders No starred news when no starred news available', () => {
    const store = mockStore({
      latestNews: {
        data: [1],
        loading: false,
        error: null,
      },
      news: {
        data: [
          {
            id: 1,
            title: 'Test News',
            score: 284,
            author: 'johndoe',
            time: 11111111,
            comments: 24,
            url: 'https://test.com',
            starred: false,
          },
        ],
        loading: false,
        error: null,
        page: 0,
        pageSize: 10,
      },
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <StyleWrapper>
            <StarredPage />
          </StyleWrapper>
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/No starred news/i)).toBeInTheDocument();
  });
  test('renders starred news', () => {
    const store = mockStore({
      latestNews: {
        data: [1],
        loading: false,
        error: null,
      },
      news: {
        data: [
          {
            id: 1,
            title: 'Test News',
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
        page: 0,
        pageSize: 10,
      },
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <StyleWrapper>
            <StarredPage />
          </StyleWrapper>
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Test News/i)).toBeInTheDocument();
  });
});
