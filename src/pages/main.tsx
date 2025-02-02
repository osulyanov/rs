import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../app/App.tsx';

createRoot(
  document.getElementById('root') ?? document.createElement('div')
).render(
  <StrictMode>
    <App />
  </StrictMode>
);
