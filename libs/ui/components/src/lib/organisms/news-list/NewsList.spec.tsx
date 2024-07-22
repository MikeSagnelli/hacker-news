import { render, screen, fireEvent } from '@testing-library/react';
import NewsList from './NewsList';
import { StyleWrapper } from '../../atoms';
import * as hooks from '@hacker-news/ui-hooks';
import { MemoryRouter } from 'react-router-dom';

const mockNews = [
  {
    id: 1,
    title: 'Test Title 1',
    url: 'http://example.com/1',
    score: 100,
    author: 'Author 1',
    time: 11111111,
    comments: 50,
    starred: false,
  },
  {
    id: 2,
    title: 'Test Title 2',
    url: 'http://example.com/2',
    score: 200,
    author: 'Author 2',
    time: 11111111,
    comments: 100,
    starred: true,
  },
];

const mockGetMoreNews = jest.fn();
jest.mock('@hacker-news/ui-hooks'); // Mock the hook

describe('NewsList Component', () => {
  const mockStarNews = {
    starredNews: [],
    starNews: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(hooks, 'useStarredNews').mockReturnValue(mockStarNews);
  });
  it('renders correctly with given props', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <NewsList
            news={mockNews}
            getMoreNews={mockGetMoreNews}
            loadingNews={false}
          />
        </StyleWrapper>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Title 1')).toBeInTheDocument();
    expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    expect(screen.getByText('show more')).toBeInTheDocument();
  });

  it('calls getMoreNews function when "show more" button is clicked', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <NewsList
            news={mockNews}
            getMoreNews={mockGetMoreNews}
            loadingNews={false}
          />
        </StyleWrapper>
      </MemoryRouter>
    );

    const showMoreButton = screen.getByText('show more');
    fireEvent.click(showMoreButton);

    expect(mockGetMoreNews).toHaveBeenCalledTimes(1);
  });

  it('disables "show more" button when loadingNews is true', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <NewsList
            news={mockNews}
            getMoreNews={mockGetMoreNews}
            loadingNews={true}
          />
        </StyleWrapper>
      </MemoryRouter>
    );

    const showMoreButton = screen.getAllByRole('button').pop();
    expect(showMoreButton).toBeDisabled();
  });
  it('"show more" button does not exist without getMoreNews', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <NewsList news={mockNews} loadingNews={false} />
        </StyleWrapper>
      </MemoryRouter>
    );

    const showMoreButton = screen.queryByText('show more');
    expect(showMoreButton).not.toBeInTheDocument();
  });
});
