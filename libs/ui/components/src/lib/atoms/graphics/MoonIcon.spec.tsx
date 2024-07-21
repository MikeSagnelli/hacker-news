import { render, screen } from '@testing-library/react';
import MoonIcon from './MoonIcon';

describe('MoonIcon', () => {
  it('renders the SVG element', () => {
    render(<MoonIcon />);
    const svgElement = screen.getByTestId('moon-icon');
    expect(svgElement).toBeInTheDocument();
  });
});
