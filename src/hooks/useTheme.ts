import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

// Same `theme` key the /present deck reads, so one choice follows the visitor.
// Storage can throw when the visitor blocks site data; fall back to the OS.
export function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // storage blocked
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggle = () =>
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch {
        // storage blocked: the choice lasts for this page only
      }
      return next;
    });

  return { theme, toggle };
}
