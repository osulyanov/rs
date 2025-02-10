import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../app/app';
import { BrowserRouter } from 'react-router';

createRoot(
  document.getElementById('root') ?? document.createElement('div')
).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
