import './app.css';
import SpeciesLookup from '../components/species-lookup.tsx';
import ErrorBoundary from './error-boundary.tsx';
import Header from './header.tsx';
import AppCrashingButton from '../components/app-crashing-button.tsx';
import MessageBox from '../components/message-box.tsx';

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
