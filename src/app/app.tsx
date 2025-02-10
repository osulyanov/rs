import './app.css';
import SpeciesLookup from '../pages/species-lookup.tsx';
import ErrorBoundary from './error-boundary.tsx';
import MessageBox from '../components/message-box.tsx';
import { Route, Routes, useParams } from 'react-router';
import NotFound from './not-found.tsx';
import Layout from './layout.tsx';

function SpecieDetail() {
  const { specieIndex } = useParams();
  return (
    <div className="specie-detail">
      <h1>Specie {specieIndex}</h1>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SpeciesLookup />} />
        <Route path="species" element={<SpeciesLookup />}>
          <Route path=":specieIndex" element={<SpecieDetail />} />
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
