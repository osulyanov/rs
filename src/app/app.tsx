import './App.css';
import { ErrorBoundary } from './error-boundary';
import { ErrorMessage } from './error-message';
import { Header } from './header';

function App() {
  return (
    <div className="container">
      <Header />
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
