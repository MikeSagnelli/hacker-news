import { render, screen, fireEvent } from '@testing-library/react';
import NewsItem from './NewsItem';
import { StyleWrapper } from '../../atoms';

const mockProps = {
  id: 1,
  index: 1,
  title: 'Test Title',
  url: 'http://example.com',
  score: 100,
  author: 'Test Author',
  time: '1 hour ago',
  comments: 50,
  starred: false,
  starPost: jest.fn(),
};

describe('NewsItem Component', () => {
  it('renders correctly with given props', () => {
    render(
      <StyleWrapper>
        <NewsItem {...mockProps} />
      </StyleWrapper>
    );

    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('(http://example.com)')).toBeInTheDocument();
    expect(
      screen.getByText('100 points by Test Author 1 hour ago')
    ).toBeInTheDocument();
    expect(screen.getByText('50 comments')).toBeInTheDocument();
    expect(screen.getByText('save')).toBeInTheDocument();
  });

  it('calls starPost function when star button is clicked', () => {
    render(
      <StyleWrapper>
        <NewsItem {...mockProps} />
      </StyleWrapper>
    );

    const starButton = screen.getByRole('button');
    fireEvent.click(starButton);

    expect(mockProps.starPost).toHaveBeenCalledTimes(1);
  });

  it('displays "saved" when starred is true', () => {
    render(
      <StyleWrapper>
        <NewsItem {...mockProps} starred />
      </StyleWrapper>
    );

    expect(screen.getByText('saved')).toBeInTheDocument();
  });
});
