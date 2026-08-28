import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import '../styles/globals.css';

type ThemePreference = 'light' | 'system' | 'dark';

const themePreferences: ThemePreference[] = ['light', 'system', 'dark'];

function isThemePreference(value: string | null): value is ThemePreference {
  return value === 'light' || value === 'system' || value === 'dark';
}

function resolveTheme(preference: ThemePreference) {
  if (preference !== 'system') {
    return preference;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App({ Component, pageProps }: AppProps) {
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');

  useEffect(() => {
    const storedPreference = window.localStorage.getItem('xbaehr-theme');
    setThemePreference(isThemePreference(storedPreference) ? storedPreference : 'system');
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      document.documentElement.dataset.theme = resolveTheme(themePreference);
    };

    applyTheme();

    if (themePreference === 'system') {
      mediaQuery.addEventListener('change', applyTheme);
    }

    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, [themePreference]);

  const selectTheme = (preference: ThemePreference) => {
    window.localStorage.setItem('xbaehr-theme', preference);
    setThemePreference(preference);
  };

  return (
    <>
      <Component {...pageProps} />
      <div className="themeSwitcher" role="group" aria-label="Color theme">
        {themePreferences.map((preference) => (
          <button
            key={preference}
            type="button"
            aria-pressed={themePreference === preference}
            className="themeSwitcherButton"
            onClick={() => selectTheme(preference)}
          >
            {preference}
          </button>
        ))}
      </div>
    </>
  );
}
