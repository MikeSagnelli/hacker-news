import { act, render, screen } from '@testing-library/react';
import { HomePage } from './home';
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

const store = mockStore({
  latestNews: {
    data: [],
    loading: false,
    error: null,
  },
  news: {
    data: [],
    loading: false,
    error: null,
    page: 0,
    pageSize: 10,
  },
});

describe('Home Page', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders error message when there is an error', async () => {
    const store = mockStore({
      latestNews: {
        data: [1],
        loading: false,
        error: null,
      },
      news: {
        data: [],
        loading: false,
        error: 'error',
        page: 0,
        pageSize: 10,
      },
    });

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.reject('Error'),
      })
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <StyleWrapper>
              <HomePage />
            </StyleWrapper>
          </Provider>
        </MemoryRouter>
      );
    });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('renders loading spinner when loading', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <StyleWrapper>
              <HomePage />
            </StyleWrapper>
          </Provider>
        </MemoryRouter>
      );
    });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('fetches and displays latest news', async () => {
    const mockNews = [
      {
        id: 1,
        title: 'Test News',
        score: 284,
        by: 'johndoe',
        time: 11111111,
        descendants: 24,
      },
    ];

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockNews),
      })
    );

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

    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <StyleWrapper>
              <HomePage />
            </StyleWrapper>
          </Provider>
        </MemoryRouter>
      );
    });

    expect(await screen.findByText('Test News')).toBeInTheDocument();
  });
});
