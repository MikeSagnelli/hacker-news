import { render, screen } from '@testing-library/react';
import SunIcon from './SunIcon';

describe('SunIcon', () => {
  it('renders the SVG element', () => {
    render(<SunIcon />);
    const svgElement = screen.getByTestId('sun-icon');
    expect(svgElement).toBeInTheDocument();
  });
});
