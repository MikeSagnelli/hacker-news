import { render, screen } from '@testing-library/react';
import StarIcon from './StarIcon';
import { StyleWrapper } from '../style-wrapper';
import { theme } from '../../../theme';

describe('StarIcon', () => {
  it('renders the SVG element', () => {
    render(
      <StyleWrapper>
        <StarIcon />
      </StyleWrapper>
    );
    const svgElement = screen.getByTestId('star-icon');
    expect(svgElement).toBeInTheDocument();
  });

  it('applies the correct fill color when filled is truthy', () => {
    render(
      <StyleWrapper>
        <StarIcon filled />
      </StyleWrapper>
    );
    const pathElement = screen.getByTestId('star-icon').querySelector('path');
    expect(pathElement).toHaveAttribute(
      'fill',
      theme.light.typography.accentColor
    );
    expect(pathElement).not.toHaveAttribute('stroke');
  });

  it('applies the correct stroke color when filled is falsy', () => {
    render(
      <StyleWrapper>
        <StarIcon />
      </StyleWrapper>
    );
    const pathElement = screen.getByTestId('star-icon').querySelector('path');
    expect(pathElement).toHaveAttribute(
      'stroke',
      theme.light.typography.secondaryColor
    );
    expect(pathElement).not.toHaveAttribute('fill');
  });
});
