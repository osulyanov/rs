import './App.css';
import { Component } from 'react';
import SpeciesLookup from '../components/SpeciesLookup.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import Header from './Header.tsx';
import ErrorMessage from './ErrorMessage.tsx';
import AppCrashingButton from '../components/AppCrashingButton.tsx';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <SpeciesLookup />
        <AppCrashingButton />
      </div>
    );
  }
}

function AppErrorBoundary() {
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <App />
    </ErrorBoundary>
  );
}

export default AppErrorBoundary;
