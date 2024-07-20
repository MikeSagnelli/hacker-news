import { render } from '@testing-library/react';

import UiHooks from './ui-hooks';

describe('UiHooks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiHooks />);
    expect(baseElement).toBeTruthy();
  });
});
