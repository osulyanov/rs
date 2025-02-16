import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: 'dark',
  setTheme: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
});
