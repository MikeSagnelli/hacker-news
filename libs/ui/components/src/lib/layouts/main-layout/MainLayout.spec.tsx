import { render, screen } from '@testing-library/react';
import MainLayout from './MainLayout';
import { StyleWrapper } from '../../atoms';
import { MemoryRouter } from 'react-router-dom';

describe('MainLayout', () => {
  it('renders the MainLayout component with children', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <MainLayout>
            <div>Child Content</div>
          </MainLayout>
        </StyleWrapper>
      </MemoryRouter>
    );

    expect(screen.getByText(/Child Content/i)).toBeInTheDocument();
  });

  it('renders the Header and Footer components', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <MainLayout>
            <div>Child Content</div>
          </MainLayout>
        </StyleWrapper>
      </MemoryRouter>
    );

    expect(screen.getAllByText(/latest/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Hacker News/i)).toBeInTheDocument();
  });

  it('applies the correct layout structure and styles', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <MainLayout>
            <div>Child Content</div>
          </MainLayout>
        </StyleWrapper>
      </MemoryRouter>
    );

    const mainGrid = screen.getByTestId('main-layout');
    expect(mainGrid).toHaveStyle('display: flex');
    expect(mainGrid).toHaveStyle('flex-direction: column');
    expect(mainGrid).toHaveStyle('min-height: calc(100vh - 4px)');

    const innerGrid = mainGrid.firstChild;
    expect(innerGrid).toHaveStyle('display: flex');
    expect(innerGrid).toHaveStyle('flex: 1');
    expect(innerGrid).toHaveStyle('flex-direction: column');

    const footerGrid = mainGrid.lastChild;
    expect(footerGrid).toHaveStyle('flex: 0');
  });
});
