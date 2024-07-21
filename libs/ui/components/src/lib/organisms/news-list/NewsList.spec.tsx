import { render, screen, fireEvent } from '@testing-library/react';
import NewsList from './NewsList';
import { StyleWrapper } from '../../atoms';

const mockNews = [
  {
    id: 1,
    index: 1,
    title: 'Test Title 1',
    url: 'http://example.com/1',
    score: 100,
    author: 'Author 1',
    time: '1 hour ago',
    comments: 50,
    starred: false,
    starPost: jest.fn(),
  },
  {
    id: 2,
    index: 2,
    title: 'Test Title 2',
    url: 'http://example.com/2',
    score: 200,
    author: 'Author 2',
    time: '2 hours ago',
    comments: 100,
    starred: true,
    starPost: jest.fn(),
  },
];

const mockGetMoreNews = jest.fn();

describe('NewsList Component', () => {
  it('renders correctly with given props', () => {
    render(
      <StyleWrapper>
        <NewsList
          news={mockNews}
          getMoreNews={mockGetMoreNews}
          loadingNews={false}
        />
      </StyleWrapper>
    );

    expect(screen.getByText('Test Title 1')).toBeInTheDocument();
    expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    expect(screen.getByText('show more')).toBeInTheDocument();
  });

  it('calls getMoreNews function when "show more" button is clicked', () => {
    render(
      <StyleWrapper>
        <NewsList
          news={mockNews}
          getMoreNews={mockGetMoreNews}
          loadingNews={false}
        />
      </StyleWrapper>
    );

    const showMoreButton = screen.getByText('show more');
    fireEvent.click(showMoreButton);

    expect(mockGetMoreNews).toHaveBeenCalledTimes(1);
  });

  it('disables "show more" button when loadingNews is true', () => {
    render(
      <StyleWrapper>
        <NewsList
          news={mockNews}
          getMoreNews={mockGetMoreNews}
          loadingNews={true}
        />
      </StyleWrapper>
    );

    const showMoreButton = screen.getAllByRole('button').pop();
    expect(showMoreButton).toBeDisabled();
  });
});
