import { BrowserRouter } from 'react-router';

import { AppRouter } from '@/app/router';

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
