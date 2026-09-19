import { useState, useEffect } from 'react';

const getInitialDark = () => {
  try {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
  } catch {
    // localStorage unavailable (e.g. private browsing); fall through to media query
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
};

export const useDarkMode = () => {
  const [isDark, setIsDarkState] = useState(getInitialDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Persist only explicit user choices, so the OS preference keeps applying until the user toggles
  const setIsDark = (value) => {
    setIsDarkState(value);
    try {
      localStorage.setItem('theme', value ? 'dark' : 'light');
    } catch {
      // localStorage unavailable; theme just won't persist
    }
  };

  return [isDark, setIsDark];
};
