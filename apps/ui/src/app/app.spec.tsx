import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './app';

describe('App', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Latest page/i)).toBeInTheDocument();
  });

  test('renders StarredPage for "/starred" route', () => {
    render(
      <MemoryRouter initialEntries={['/starred']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Starred page/i)).toBeInTheDocument();
  });
});
