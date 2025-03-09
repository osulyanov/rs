import { ThemeContext } from '@components/theme-context';
import { useContext } from 'react';

export default function ThemeSwitcher() {
  const { setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div onClick={toggleTheme} className="theme-toggle" title="Toggle theme">
      [☼/☽]
    </div>
  );
}
