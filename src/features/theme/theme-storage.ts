import type { Theme } from '@/features/theme/theme';

const THEME_STORAGE_KEY = 'rest-countries-theme';

export function getStoredTheme(): Theme | null {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null;
}

export function saveTheme(theme: Theme) {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}
