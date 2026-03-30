import type { Theme } from '@/features/theme/theme';

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}
