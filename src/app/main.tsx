import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app/App';
import { ThemeProvider } from '@/features/theme/theme-provider';
import '@/styles/tokens.css';
import '@/styles/globals.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element #root was not found.');
}

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
