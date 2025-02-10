import './app.css';
import SpeciesLookup from '../pages/species-lookup.tsx';
import ErrorBoundary from './error-boundary.tsx';
import MessageBox from '../components/message-box.tsx';
import { Route, Routes } from 'react-router';
import NotFound from './not-found.tsx';
import Layout from './layout.tsx';
import SpecieDetails from '../components/specie-details.tsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SpeciesLookup />} />
        <Route path="species" element={<SpeciesLookup />}>
          <Route path=":specieId" element={<SpecieDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function AppErrorBoundary() {
  return (
    <ErrorBoundary fallback={<MessageBox message={'APP ERROR'} />}>
      <App />
    </ErrorBoundary>
  );
}

export default AppErrorBoundary;
