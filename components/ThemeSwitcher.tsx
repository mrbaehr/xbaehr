import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type ThemePreference = 'light' | 'system' | 'dark';
type ResolvedTheme = Exclude<ThemePreference, 'system'>;

type ThemeContextValue = {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  selectTheme: (preference: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const themePreferences: ThemePreference[] = ['light', 'system', 'dark'];

function isThemePreference(value: string | null): value is ThemePreference {
  return value === 'light' || value === 'system' || value === 'dark';
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference !== 'system') {
    return preference;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function ThemeIcon({ theme }: { theme: ResolvedTheme }) {
  if (theme === 'light') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.6 15.8A8.5 8.5 0 0 1 8.2 3.4 8.5 8.5 0 1 0 20.6 15.8Z" />
    </svg>
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');

  useEffect(() => {
    const storedPreference = window.localStorage.getItem('xbaehr-theme');
    setPreference(isThemePreference(storedPreference) ? storedPreference : 'system');
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const nextTheme = resolveTheme(preference);
      setResolvedTheme(nextTheme);
      document.documentElement.dataset.theme = nextTheme;
    };

    applyTheme();

    if (preference === 'system') {
      mediaQuery.addEventListener('change', applyTheme);
    }

    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, [preference]);

  const selectTheme = (nextPreference: ThemePreference) => {
    window.localStorage.setItem('xbaehr-theme', nextPreference);
    setPreference(nextPreference);
  };

  return (
    <ThemeContext.Provider value={{ preference, resolvedTheme, selectTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeSwitcher() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('ThemeSwitcher must be rendered inside ThemeProvider.');
  }

  return (
    <details className="themeMenu">
      <summary aria-label={`Theme: ${theme.preference}. Open theme options`}>
        <ThemeIcon theme={theme.resolvedTheme} />
      </summary>
      <div className="themeMenuOptions" role="group" aria-label="Color theme">
        {themePreferences.map((preference) => (
          <button
            key={preference}
            type="button"
            aria-pressed={theme.preference === preference}
            onClick={(event) => {
              theme.selectTheme(preference);
              event.currentTarget.closest('details')?.removeAttribute('open');
            }}
          >
            {preference}
          </button>
        ))}
      </div>
    </details>
  );
}
