import './app.css';
import SpeciesLookup from '../components/species-lookup.tsx';
import ErrorBoundary from './error-boundary.tsx';
import MessageBox from '../components/message-box.tsx';
import { Outlet, Route, Routes } from 'react-router';
import NotFound from './not-found.tsx';
import Layout from './layout.tsx';

function SpecieDetail() {
  return (
    <div className="specie-detail">
      <h1>Specie Detail</h1>
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SpeciesLookup />} />
        <Route path="species" element={<SpeciesLookup />}>
          <Route path=":specieId" element={<SpecieDetail />} />
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
