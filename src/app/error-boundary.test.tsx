import { render, screen } from '@testing-library/react';
import ErrorBoundary from './error-boundary';

describe('ErrorBoundary', () => {
  const ChildComponent = () => <div>Child Component</div>;
  const FallbackComponent = () => <div>Fallback Component</div>;

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary fallback={<FallbackComponent />}>
        <ChildComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders fallback when there is an error', () => {
    const ErrorThrowingComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary fallback={<FallbackComponent />}>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Fallback Component')).toBeInTheDocument();
  });
});
