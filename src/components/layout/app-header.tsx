import { Link } from 'react-router';

import iconDark from '@/assets/icon-dark.svg';
import iconLight from '@/assets/icon-light.svg';
import { useTheme } from '@/features/theme/use-theme';

import styles from './app-header.module.css';

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const themeLabel = nextTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
  const themeIcon = nextTheme === 'dark' ? iconDark : iconLight;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          Where in the world?
        </Link>

        <button
          type="button"
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Activate ${nextTheme} theme`}
          aria-pressed={theme === 'dark'}
        >
          <img className={styles.themeIcon} src={themeIcon} alt="" aria-hidden="true" />
          <span className={styles.themeLabel}>{themeLabel}</span>
        </button>
      </div>
    </header>
  );
}
