import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './app';

describe('App', () => {
  test('renders HomePage component for the default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home page/i)).toBeInTheDocument();
  });

  test('renders StarredPage component for the /starred route', () => {
    render(
      <MemoryRouter initialEntries={['/starred']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Starred page/i)).toBeInTheDocument();
  });
});
