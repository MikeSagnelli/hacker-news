import { render, screen, fireEvent } from '@testing-library/react';
import NewsItem from './NewsItem';
import { StyleWrapper } from '../../atoms';
import * as hooks from '@hacker-news/ui-hooks';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@hacker-news/ui-hooks'); // Mock the hook

const mockProps = {
  id: 1,
  index: 1,
  title: 'Test Title',
  url: 'http://example.com',
  score: 100,
  author: 'Test Author',
  time: 11111111,
  comments: 50,
  starred: false,
};

describe('NewsItem Component', () => {
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
          <NewsItem {...mockProps} />
        </StyleWrapper>
      </MemoryRouter>
    );

    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('(example.com)')).toBeInTheDocument();
    expect(
      screen.getByText('100 points by Test Author 54 years ago')
    ).toBeInTheDocument();
    expect(screen.getByText('50 comments')).toBeInTheDocument();
    expect(screen.getByText('save')).toBeInTheDocument();
  });

  it('calls starNews function when star button is clicked', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <NewsItem {...mockProps} />
        </StyleWrapper>
      </MemoryRouter>
    );

    const starButton = screen.getByRole('button');
    fireEvent.click(starButton);

    expect(mockStarNews.starNews).toHaveBeenCalledTimes(1); // Check that starNews was called
  });

  it('displays "saved" when starred is true', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <NewsItem {...mockProps} starred />
        </StyleWrapper>
      </MemoryRouter>
    );

    expect(screen.getByText('saved')).toBeInTheDocument();
  });
});
