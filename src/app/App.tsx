import './App.css';
import SpeciesLookup from '../components/SpeciesLookup.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import Header from './Header.tsx';
import ErrorMessage from './ErrorMessage.tsx';
import AppCrashingButton from '../components/AppCrashingButton.tsx';

function App() {
  return (
    <div className="container">
      <Header />
      <SpeciesLookup />
      <AppCrashingButton />
    </div>
  );
}

function AppErrorBoundary() {
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <App />
    </ErrorBoundary>
  );
}

export default AppErrorBoundary;
