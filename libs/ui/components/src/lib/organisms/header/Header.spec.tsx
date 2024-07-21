import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { StyleWrapper, useCustomTheme } from '../../atoms';
import { MemoryRouter } from 'react-router-dom';
import { theme } from '../../../theme';

jest.mock('../../atoms', () => ({
  ...jest.requireActual('../../atoms'),
  useCustomTheme: jest.fn(),
}));

describe('Header', () => {
  const setCurrentTheme = jest.fn();
  const mockUseCustomTheme = useCustomTheme as jest.Mock;

  beforeEach(() => {
    mockUseCustomTheme.mockReturnValue({
      currentTheme: theme.light,
      setCurrentTheme,
    });
  });

  test('renders Header component', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <Header />
        </StyleWrapper>
      </MemoryRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('toggles theme on button click', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <Header />
        </StyleWrapper>
      </MemoryRouter>
    );
    const themeToggleButton = screen.getByRole('button');
    fireEvent.click(themeToggleButton);
    expect(setCurrentTheme).toHaveBeenCalled();
  });

  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <Header />
        </StyleWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('latest')).toBeInTheDocument();
  });
});
