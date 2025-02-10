import './app.css';
import SpeciesLookup from '../pages/species-lookup';
import ErrorBoundary from './error-boundary';
import MessageBox from '../components/message-box';
import { Route, Routes } from 'react-router';
import NotFound from './not-found';
import Layout from './layout';
import SpecieDetails from '../components/specie-details';

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
