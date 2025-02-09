import './App.css';
import SpeciesLookup from '../components/SpeciesLookup.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import Header from './Header.tsx';
import AppCrashingButton from '../components/app-crashing-button.tsx';
import MessageBox from '../components/MessageBox.tsx';

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
    <ErrorBoundary fallback={<MessageBox message={'APP ERROR'} />}>
      <App />
    </ErrorBoundary>
  );
}

export default AppErrorBoundary;
