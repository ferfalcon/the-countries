import { Outlet } from 'react-router';

import { AppHeader } from '@/components/layout/app-header';

import styles from './app-shell.module.css';

export function AppShell() {
  return (
    <div className={styles.shell}>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
