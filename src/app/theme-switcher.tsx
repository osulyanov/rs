import { ThemeContext } from '../context/theme-context';
import { useContext } from 'react';

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <div onClick={toggleTheme} className="theme-toggle" title="Toggle theme">
      [☼/☽]
    </div>
  );
}

export default ThemeSwitcher;
