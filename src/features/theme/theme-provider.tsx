import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

import { applyTheme } from '@/features/theme/apply-theme';
import { getStoredTheme, saveTheme } from '@/features/theme/theme-storage';
import type { Theme, ThemeContextValue } from '@/features/theme/theme';

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): Theme {
  return getStoredTheme() ?? 'light';
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
