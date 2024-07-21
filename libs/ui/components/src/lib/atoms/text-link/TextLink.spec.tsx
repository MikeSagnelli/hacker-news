import { render, screen, fireEvent } from '@testing-library/react';
import TextLink from './TextLink';
import { StyleWrapper } from '../style-wrapper';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../../theme';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('TextLink', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the TextLink component with children', () => {
    render(
      <StyleWrapper>
        <TextLink url="/test">Test Link</TextLink>
      </StyleWrapper>
    );
    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toBeInTheDocument();
  });

  it('handles click event and navigates to the specified URL', () => {
    render(
      <StyleWrapper>
        <TextLink url="/test">Test Link</TextLink>
      </StyleWrapper>
    );
    const linkElement = screen.getByText('Test Link');
    fireEvent.click(linkElement);
    expect(mockNavigate).toHaveBeenCalledWith('/test');
  });

  it('applies the color prop correctly', () => {
    render(
      <StyleWrapper>
        <TextLink url="/test" color="red">
          Test Link
        </TextLink>
      </StyleWrapper>
    );
    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveStyle('color: red');
  });

  it('applies the default theme color when color prop is not provided', () => {
    render(
      <StyleWrapper>
        <TextLink url="/test">Test Link</TextLink>
      </StyleWrapper>
    );
    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveStyle(
      `color: ${theme.light.typography.primaryColor}`
    );
  });
});
