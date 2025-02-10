import './app.css';
import SpeciesLookup from '../components/species-lookup.tsx';
import ErrorBoundary from './error-boundary.tsx';
import Header from './header.tsx';
import AppCrashingButton from '../components/app-crashing-button.tsx';
import MessageBox from '../components/message-box.tsx';
import { NavLink, Outlet, Route, Routes } from 'react-router';

function Layout() {
  return (
    <div className="container">
      <Header />
      <Outlet />
      <AppCrashingButton />
    </div>
  );
}

function SpecieDetail() {
  return (
    <div className="specie-detail">
      <h1>Specie Detail</h1>
      <Outlet />
    </div>
  );
}

function NotFound() {
  return (
    <MessageBox
      message={
        <>
          NOT FOUND |{' '}
          <NavLink to="/" className="link">
            GO HOME
          </NavLink>
        </>
      }
    />
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SpeciesLookup />} />
        <Route path="/species" element={<SpeciesLookup />}>
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
