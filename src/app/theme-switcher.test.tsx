import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeContext } from '../context/theme-context';
import ThemeSwitcher from './theme-switcher';

describe('ThemeSwitcher', () => {
  it('should toggle theme from light to dark', () => {
    const setTheme = jest.fn();
    const theme = 'light';

    render(
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );

    const toggleButton = screen.getByTitle('Toggle theme');
    fireEvent.click(toggleButton);

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('should toggle theme from dark to light', () => {
    const setTheme = jest.fn();
    const theme = 'dark';

    render(
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );

    const toggleButton = screen.getByTitle('Toggle theme');
    fireEvent.click(toggleButton);

    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
