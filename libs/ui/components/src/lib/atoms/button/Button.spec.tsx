import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { StyleWrapper } from '../style-wrapper';

describe('Button', () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Button component', () => {
    render(
      <StyleWrapper>
        <Button label="Click Me" onClick={mockOnClick} />
      </StyleWrapper>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    render(
      <StyleWrapper>
        <Button label="Click Me" onClick={mockOnClick} />
      </StyleWrapper>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('displays the correct label', () => {
    render(
      <StyleWrapper>
        <Button label="Click Me" onClick={mockOnClick} />
      </StyleWrapper>
    );
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
});
