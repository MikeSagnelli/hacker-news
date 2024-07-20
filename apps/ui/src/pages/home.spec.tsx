import { render } from '@testing-library/react';
import { HomePage } from './home';

describe('Home Page', () => {
  test('renders Home Page text', () => {
    const { getByText } = render(<HomePage />);
    expect(getByText('Home Page')).toBeInTheDocument();
  });
});
