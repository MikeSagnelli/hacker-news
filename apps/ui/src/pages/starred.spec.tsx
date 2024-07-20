import { render } from '@testing-library/react';
import { StarredPage } from './starred';

describe('Starred Page', () => {
  test('renders Home Page text', () => {
    const { getByText } = render(<StarredPage />);
    expect(getByText('Starred Page')).toBeInTheDocument();
  });
});
