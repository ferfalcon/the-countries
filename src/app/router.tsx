import { Route, Routes } from 'react-router';

import { AppShell } from '@/components/layout/app-shell';
import { CountryDetailsPage } from '@/pages/country-details/country-details-page';
import { HomePage } from '@/pages/home/home-page';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="country/:code" element={<CountryDetailsPage />} />
      </Route>
    </Routes>
  );
}
