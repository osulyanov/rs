import Header from './header';
import ThemeSwitcher from './theme-switcher';
import { Outlet } from 'react-router';
import { ThemeContext } from '../context/theme-context';
import { useState } from 'react';

function Layout() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeSwitcher />
      <div className={`container${theme === 'light' ? ' light-theme' : ''}`}>
        <Header />
        <Outlet />
      </div>
    </ThemeContext.Provider>
  );
}

export default Layout;
