import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from './Navigation';
import { StyleWrapper } from '../../atoms';
import { useLocation } from 'react-router-dom';
import { theme } from '../../../theme';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('Navigation', () => {
  const mockRoutes = [
    { url: '/home', label: 'Home' },
    { url: '/about', label: 'About' },
  ];

  it('renders the Navigation component with routes', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/home' });

    render(
      <MemoryRouter>
        <StyleWrapper>
          <Navigation routes={mockRoutes} />
        </StyleWrapper>
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('applies the correct styles and props to TextLink', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/home' });

    render(
      <MemoryRouter>
        <StyleWrapper>
          <Navigation routes={mockRoutes} />
        </StyleWrapper>
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');

    expect(homeLink).toHaveStyle(
      `color: ${theme.light.typography.accentColor}`
    );
    expect(homeLink).toHaveStyle('font-weight: 800');
    expect(aboutLink).not.toHaveStyle(
      `color: ${theme.light.typography.accentColor}`
    );
    expect(aboutLink).not.toHaveStyle('font-weight: 800');
  });

  it('applies the correct border style to Nav components', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/home' });

    render(
      <MemoryRouter>
        <StyleWrapper>
          <Navigation routes={mockRoutes} />
        </StyleWrapper>
      </MemoryRouter>
    );

    const aboutLink = screen.getByText('About');
    expect(aboutLink.parentElement).toHaveStyle(
      `border-left: 1px solid ${theme.light.typography.primaryColor}`
    );
  });
});
