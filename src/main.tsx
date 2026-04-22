import { StrictMode, startTransition } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

startTransition(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter />
    </StrictMode>
  );
});
