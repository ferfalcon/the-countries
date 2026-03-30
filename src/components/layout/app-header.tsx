import { Link } from 'react-router';

import { useTheme } from '@/features/theme/use-theme';

import styles from './app-header.module.css';

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();

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
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          <span className={styles.themeLabel}>
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </span>
        </button>
      </div>
    </header>
  );
}
