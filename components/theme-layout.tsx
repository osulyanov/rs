'use client';
import React, { useEffect, useState } from 'react';
import ThemeSwitcher from '@components/theme-switcher';
import { ThemeContext } from './theme-context';

export default function ThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeSwitcher />
      <div className={`container${theme === 'light' ? ' light-theme' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
