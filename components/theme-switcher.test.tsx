import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeContext } from '@components/theme-context';
import ThemeSwitcher from '@components/theme-switcher';

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

    expect(setTheme).toHaveBeenCalled();
    expect(setTheme.mock.calls[0][0]('light')).toBe('dark');
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

    expect(setTheme).toHaveBeenCalled();
    expect(setTheme.mock.calls[0][0]('dark')).toBe('light');
  });
});
