import { render, screen, renderHook, act } from '@testing-library/react';
import { StyleWrapper, useCustomTheme } from './StyleWrapper';
import { theme } from '../../../theme';

const TestComponent = () => {
  const { setCurrentTheme } = useCustomTheme();
  return (
    <button onClick={() => setCurrentTheme(theme.dark)}>Change Theme</button>
  );
};

describe('StyleWrapper', () => {
  test('renders children correctly', () => {
    render(
      <StyleWrapper>
        <div>Test Child</div>
      </StyleWrapper>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  test('useCustomTheme provides setCurrentTheme function', () => {
    render(
      <StyleWrapper>
        <TestComponent />
      </StyleWrapper>
    );
    expect(
      screen.getByRole('button', { name: /Change Theme/i })
    ).toBeInTheDocument();
  });

  test('useCustomTheme throws error when used outside of StyleWrapper', () => {
    const consoleError = console.error;
    console.error = jest.fn(); // Suppress error output in test

    expect(() => render(<TestComponent />)).toThrow(
      'useCustomTheme must be used within a StyledWrapper'
    );

    console.error = consoleError; // Restore original console.error
  });

  test('setCurrentTheme correctly updates current theme', () => {
    const { result } = renderHook(() => useCustomTheme(), {
      wrapper: StyleWrapper,
    });
    expect(result.current.currentTheme).toBe(theme.light);

    act(() => {
      result.current.setCurrentTheme(theme.dark);
    });
    expect(result.current.currentTheme).toBe(theme.dark);
  });
});
