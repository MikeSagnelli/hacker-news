import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { StyleWrapper } from '../../atoms';
import { MemoryRouter } from 'react-router-dom';
import { theme } from '../../../theme';

describe('Footer', () => {
  it('renders the footer component', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <Footer />
        </StyleWrapper>
      </MemoryRouter>
    );

    expect(screen.getByText('Hacker News')).toBeInTheDocument();
  });

  it('applies the correct styles', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <Footer />
        </StyleWrapper>
      </MemoryRouter>
    );

    const footerElement = screen.getByRole('contentinfo');
    const gridElement = footerElement.firstChild as HTMLElement;
    const computedStyles = window.getComputedStyle(gridElement);

    expect(computedStyles.borderTop).toBe(
      `2px solid ${theme.light.global.secondaryColor}`
    );
    expect(computedStyles.display).toBe('flex');
    expect(computedStyles.flexDirection).toBe('column');
    expect(computedStyles.rowGap).toBe('16px');
    expect(computedStyles.justifyContent).toBe('center');
    expect(computedStyles.paddingTop).toBe('28px');
    expect(computedStyles.width).toBe('100%');
  });

  it('contains the navigation links', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <Footer />
        </StyleWrapper>
      </MemoryRouter>
    );

    expect(screen.getByText('latest')).toBeInTheDocument();
    expect(screen.getByText('starred')).toBeInTheDocument();
  });
});
