export const THEMES = ['light', 'dark'] as const;

export type Theme = (typeof THEMES)[number];

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
