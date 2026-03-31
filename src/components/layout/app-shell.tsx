import { Outlet } from 'react-router';

import { AppHeader } from '@/components/layout/app-header';

import styles from './app-shell.module.css';

export function AppShell() {
  return (
    <div className={styles.shell}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <AppHeader />
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
