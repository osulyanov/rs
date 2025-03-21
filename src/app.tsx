import './App.css';
import { ErrorBoundary } from './components/error-boundary';
import { ErrorMessage } from './components/error-message';
import { Header } from './components/header';

export const App = () => {
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <div className="container">
        <Header />
      </div>
    </ErrorBoundary>
  );
};
