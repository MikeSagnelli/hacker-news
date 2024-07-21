import { render, screen } from '@testing-library/react';
import { HackerNewsLogo } from './HackerNewsLogo';
import { StyleWrapper } from '../style-wrapper';
import { theme } from '../../../theme';
import { MemoryRouter } from 'react-router-dom';

describe('HackerNewsLogo', () => {
  it('renders correctly with the given theme', () => {
    render(
      <MemoryRouter>
        <StyleWrapper>
          <HackerNewsLogo />
        </StyleWrapper>
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();

    const svgElement = linkElement.querySelector('svg');
    expect(svgElement).toBeInTheDocument();

    const pathElements = svgElement?.querySelectorAll('path');
    pathElements?.forEach((path, index) => {
      if (index === pathElements.length - 1) {
        expect(path).toHaveAttribute('fill', 'white');
        return;
      }

      expect(path).toHaveAttribute('fill', theme.light.typography.primaryColor);
    });
  });
});
